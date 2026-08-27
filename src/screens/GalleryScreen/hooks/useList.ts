import { ROUTES } from "@/constants/routes";
import { useGalleryStore } from "@/store";
import { IImageItem } from "@/types/model-presets";
import { useRouter } from "expo-router";
import { useCallback, useEffect, useRef } from "react";
import { FlatList } from "react-native";

const useList = () => {
	const images = useGalleryStore((s) => s.images);

	const selectedImageIds = useGalleryStore((s) => s.selectedImageIds);
	const enabledSelectionMode = useGalleryStore((s) => s.enabledSelectionMode);

	const scrollToTopTrigger = useGalleryStore((s) => s.scrollToTopTrigger);
	const listRef = useRef<FlatList<IImageItem>>(null);

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

	useEffect(() => {
		listRef.current?.scrollToOffset({ offset: 0, animated: true });
	}, [scrollToTopTrigger]);

	return {
		images,
		selectedImageIds,
		enabledSelectionMode,
		listRef,
		handlePress,
		handleLongPress,
		keyExtractor,
	};
};

export default useList;
