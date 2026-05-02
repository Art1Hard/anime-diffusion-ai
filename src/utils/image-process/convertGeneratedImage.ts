import * as FileSystem from "expo-file-system";

const convertGeneratedImage = async (base64: string) => {
	const path = FileSystem.cacheDirectory + `generated_${Date.now()}.png`;

	await FileSystem.writeAsStringAsync(path, base64, {
		encoding: FileSystem.EncodingType.Base64,
	});

	return path;
};

export default convertGeneratedImage;
