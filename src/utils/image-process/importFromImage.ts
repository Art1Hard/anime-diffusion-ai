import * as ImagePicker from "expo-image-picker";
import { MODEL_DEFAULT_PRESETS } from "@/constants/model-presets";
import { removeRatingTags } from "@/utils/rating";
import { ToastAndroid } from "react-native";
import parsePngInfo from "./parsePngInfo";

const importFromImage = async () => {
	try {
		const result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ["images"],
			base64: true,
		});

		if (result.canceled || !result.assets[0].base64) return;

		const info = parsePngInfo(result.assets[0].base64);
		if (!info) {
			ToastAndroid.show("No metadata found ❌", ToastAndroid.SHORT);
			return;
		}

		const model = MODEL_DEFAULT_PRESETS.find((m) => m.path === info.model);

		if (!model) {
			ToastAndroid.show("Model not found ❌", ToastAndroid.SHORT);
			return;
		}

		const clean = (text: string, base: string) =>
			removeRatingTags((text ?? "").replace(base, "").trim());

		ToastAndroid.show("Imported successfully ✅", ToastAndroid.SHORT);

		return {
			prompt: clean(info.prompt, model.params.basePrompt),
			negativePrompt: clean(
				info.negativePrompt,
				model.params.baseNegativePrompt,
			),
		};
	} catch {
		ToastAndroid.show("Failed to import ❌", ToastAndroid.SHORT);
	}
};

export default importFromImage;
