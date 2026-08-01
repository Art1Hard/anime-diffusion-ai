import * as FileSystem from "expo-file-system";

const convertGeneratedImage = async (base64: string) => {
	const dir = FileSystem.documentDirectory + "gallery/";

	const info = await FileSystem.getInfoAsync(dir);

	if (!info.exists) {
		await FileSystem.makeDirectoryAsync(dir, {
			intermediates: true,
		});
	}

	const path = dir + `generated_${Date.now()}.png`;

	await FileSystem.writeAsStringAsync(path, base64, {
		encoding: FileSystem.EncodingType.Base64,
	});

	return path;
};

export default convertGeneratedImage;
