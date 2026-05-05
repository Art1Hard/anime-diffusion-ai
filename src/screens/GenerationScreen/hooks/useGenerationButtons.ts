import { saveImageToGallery } from "@/utils/image-process";
import { Keyboard } from "react-native";

const useGenerationButtons = () => {
	const saveImageHandler = (image: string | null) => {
		if (!image) return;

		Keyboard.dismiss();
		saveImageToGallery(image);
	};

	return { saveImageHandler };
};

export default useGenerationButtons;
