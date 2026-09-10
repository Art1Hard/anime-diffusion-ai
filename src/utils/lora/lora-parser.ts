import sdApi from "@/api/interceptors";
import { ILoraItem, IParsedLora } from "@/types/lora";

// origin сервера без хвоста /sdapi/v1 — по нему живёт gradio-роут /file=
export const getServerOrigin = () =>
	(sdApi.defaults.baseURL || "").replace(/\/sdapi\/v1\/?$/, "");

const withoutExt = (path: string) => path.replace(/\.[^./\\]+$/, "");

const buildFileUrl = (fullPath: string, origin: string) => {
	const normalized = fullPath.replace(/\\/g, "/"); // бэкслеши → прямые слэши
	const encoded = encodeURI(normalized); // сохраняет ":" "/", кодирует только пробелы/юникод
	return `${origin}/file=${encoded}`;
};

const PREVIEW_EXTENSIONS = ["png", "jpg", "jpeg", "preview.png"];

export const buildPreviewCandidates = (
	path: string,
	origin: string,
): string[] => {
	const base = withoutExt(path);
	return PREVIEW_EXTENSIONS.map((ext) =>
		buildFileUrl(`${base}.${ext}`, origin),
	);
};

type Sidecar = {
	triggerWords: string[];
	weight: number | null;
	baseModel: string | null;
	description: string | null;
};

// используем sdApi (не голый axios) — так подхватываются те же
// auth-интерцепторы, что и у остальных запросов. Передаём абсолютный URL,
// axios в этом случае игнорирует baseURL и бьёт напрямую по origin сервера.
const fetchLoraSidecar = async (
	path: string,
	origin: string,
): Promise<Sidecar | null> => {
	if (!origin) return null;

	const url = buildFileUrl(`${withoutExt(path)}.json`, origin);

	try {
		const { data } = await sdApi.get(url, { timeout: 5000 });

		const json = typeof data === "string" ? JSON.parse(data) : data;

		const activationText: string | undefined =
			json.activationText ?? json["activation text"];
		const triggerWords: string[] = activationText
			? activationText
					.split(",")
					.map((w: string) => w.trim())
					.filter(Boolean)
			: (json.trainedWords ?? []);

		return {
			triggerWords,
			weight:
				typeof json.preferredWeight === "number" ? json.preferredWeight : null,
			baseModel: json.sdVersion ?? json.baseModel ?? null,
			description: json.description || null, // пустая строка "" тоже должна давать null
		};
	} catch (e) {
		return null;
	}
};

export const buildParsedLora = async (
	item: ILoraItem,
): Promise<IParsedLora> => {
	const origin = getServerOrigin();
	const sidecar = await fetchLoraSidecar(item.path, origin);

	return {
		name: item.name,
		alias: item.alias,
		path: item.path,
		triggerWords: sidecar?.triggerWords ?? [],
		defaultWeight: sidecar?.weight ?? 1,
		baseModel: sidecar?.baseModel ?? null,
		description: sidecar?.description ?? null,
		previewCandidates: buildPreviewCandidates(item.path, origin),
		raw: item,
	};
};
