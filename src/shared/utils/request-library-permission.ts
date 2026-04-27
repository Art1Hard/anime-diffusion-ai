import * as MediaLibrary from "expo-media-library";

const requestLibraryPermissionAsync = async () => {
	const { status } = await MediaLibrary.requestPermissionsAsync();
	return status === "granted";
};

export default requestLibraryPermissionAsync;
