import { ToastAndroid } from "react-native";
import * as MediaLibrary from "expo-media-library";
import requestLibraryPermissionAsync from "@/utils/request-library-permission";

const saveImage = async (fileUri: string | null) => {
	if (!fileUri) {
		ToastAndroid.show("Not found image for save", ToastAndroid.SHORT);
		return;
	}

	try {
		const hasPermission = await requestLibraryPermissionAsync();
		if (!hasPermission) return;

		await MediaLibrary.createAssetAsync(fileUri);

		ToastAndroid.show("Saved to gallery ✅", ToastAndroid.SHORT);
	} catch (error) {
		console.error("Save error:", error);
		ToastAndroid.show("Failed to save ❌", ToastAndroid.SHORT);
	}
};

export default saveImage;
