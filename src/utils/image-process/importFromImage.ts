import * as ImagePicker from "expo-image-picker";
import { MODEL_DEFAULT_PRESETS } from "@/constants/model-presets";
import { removeRatingTags } from "@/utils/rating";
import { ToastAndroid } from "react-native";
import sdApi from "@/api/interceptors";

export type ParsedLora = {
	alias: string;
	weight: number;
};

export const parseLoras = (input: string) => {
	const loras: ParsedLora[] = [];

	const prompt = input
		.replace(/<lora:([^:>]+):(-?\d+(?:\.\d+)?)>/g, (_, alias, weight) => {
			loras.push({
				alias,
				weight: Number(weight),
			});

			return "";
		})
		.replace(/,\s*,/g, ",")
		.replace(/^\s*,|,\s*$/g, "")
		.trim();

	return {
		loras,
		prompt,
	};
};

const importFromImage = async () => {
	try {
		const result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ["images"],
			base64: true,
		});

		if (result.canceled || !result.assets[0].base64) return;

		const { data } = await sdApi.post("/png-info", {
			image: `data:image/png;base64,${result.assets[0].base64}`,
		});

		const prompt: string = data.parameters.prompt;

		if (!prompt) {
			ToastAndroid.show("No metadata found ❌", ToastAndroid.SHORT);
			return;
		}

		const model = MODEL_DEFAULT_PRESETS.find(
			(m) => m.hash === data.parameters?.modelHash,
		);

		const clean = (text: string, base: string) =>
			removeRatingTags((text ?? "").replace(base, ""))
				.replace(/^,\s*/, "") // ← удаляет запятую в начале
				.replace(/,\s*$/, "") // ← удаляет запятую в конце
				.trim();

		ToastAndroid.show("Imported successfully ✅", ToastAndroid.SHORT);

		console.log(model?.params.basePrompt);
		console.log(model?.name);

		const resultParse = parseLoras(prompt);

		return {
			prompt: clean(resultParse.prompt, model?.params.basePrompt ?? ""),
			negativePrompt: clean(
				data.parameters?.negativePrompt,
				model?.params.baseNegativePrompt ?? "",
			),
			seed: data.parameters?.seed,
			model,
			loras: resultParse.loras,
		};
	} catch {
		ToastAndroid.show("Failed to import ❌", ToastAndroid.SHORT);
	}
};

export default importFromImage;
