import { IModelPreset } from "@/types/model-presets";

const extractVaeName = (modelPreset: IModelPreset) => {
	const modules =
		modelPreset.params?.overrideSettings?.forgeAdditionalModules ?? [];

	const vaePath = modules.find(
		(path) =>
			path.toLowerCase().includes("\\vae\\") ||
			path.toLowerCase().includes("/vae/"),
	);

	if (!vaePath) return null;

	// достаём имя файла (последний сегмент пути) с расширением
	return vaePath.split(/[\\/]/).pop();
};

export default extractVaeName;
