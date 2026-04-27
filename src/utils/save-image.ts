import * as FileSystem from "expo-file-system/legacy";
import * as MediaLibrary from "expo-media-library";
import requestLibraryPermissionAsync from "./request-library-permission";
import { ToastAndroid } from "react-native";

const saveImage = async (base64: string) => {
	const hasPermission = await requestLibraryPermissionAsync();
	if (!hasPermission) return;

	const fileUri = FileSystem.cacheDirectory + "image.png";

	await FileSystem.writeAsStringAsync(fileUri, base64, {
		encoding: FileSystem.EncodingType.Base64,
	});

	await MediaLibrary.saveToLibraryAsync(fileUri);

	ToastAndroid.show("Saved to gallery ✅", ToastAndroid.SHORT);
};

export default saveImage;
