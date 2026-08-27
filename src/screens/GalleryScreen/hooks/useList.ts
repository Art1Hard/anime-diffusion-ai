import { ROUTES } from "@/constants/routes";
import { useGalleryStore } from "@/store";
import { IImageItem } from "@/types/model-presets";
import { useRouter } from "expo-router";
import { useCallback } from "react";

const useList = () => {
	const images = useGalleryStore((s) => s.images);

	const selectedImageIds = useGalleryStore((s) => s.selectedImageIds);
	const enabledSelectionMode = useGalleryStore((s) => s.enabledSelectionMode);

	const toggleSelectedStateImage = useGalleryStore(
		(s) => s.toggleSelectedStateImage,
	);

	const route = useRouter();

	const handlePress = useCallback(
		(item: IImageItem, index: number) => {
			if (enabledSelectionMode) toggleSelectedStateImage(item.id);
			else
				route.push({
					pathname: ROUTES.IMAGE_VIEWER_GALLERY,
					params: { index },
				});
		},
		[enabledSelectionMode, toggleSelectedStateImage, route],
	);

	const handleLongPress = useCallback(
		(item: IImageItem) => {
			toggleSelectedStateImage(item.id);
		},
		[toggleSelectedStateImage],
	);

	const keyExtractor = useCallback(
		(item: IImageItem) => item.id.toString(),
		[],
	);

	return {
		images,
		selectedImageIds,
		enabledSelectionMode,
		handlePress,
		handleLongPress,
		keyExtractor,
	};
};

export default useList;
