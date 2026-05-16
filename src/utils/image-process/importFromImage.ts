import * as ImagePicker from "expo-image-picker";
import { MODEL_DEFAULT_PRESETS } from "@/constants/model-presets";
import { removeRatingTags } from "@/utils/rating";
import { ToastAndroid } from "react-native";
import parsePngInfo from "./parsePngInfo";
import sdApi from "@/api/interceptors";

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
		if (!data.parameters.prompt) {
			ToastAndroid.show("No metadata found ❌", ToastAndroid.SHORT);
			return;
		}

		const model = MODEL_DEFAULT_PRESETS.find(
			(m) => m.path === data.parameters?.model,
		);

		if (!model) {
			ToastAndroid.show("Model not found ❌", ToastAndroid.SHORT);
			return;
		}

		console.log(`Промпт: ${data.parameters?.model}`);

		const clean = (text: string, base: string) =>
			removeRatingTags((text ?? "").replace(base, "").trim());

		ToastAndroid.show("Imported successfully ✅", ToastAndroid.SHORT);

		return {
			prompt: clean(data.parameters?.prompt, model.params.basePrompt.trim()),
			negativePrompt: clean(
				data.parameters?.negativePrompt,
				model.params.baseNegativePrompt.trim(),
			),
		};
	} catch {
		ToastAndroid.show("Failed to import ❌", ToastAndroid.SHORT);
	}
};

export default importFromImage;
