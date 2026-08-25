import { IImageItem } from "@/types/model-presets";
import { useCallback } from "react";
import { FlatList, ListRenderItemInfo } from "react-native";
import GalleryItem from "../GalleryItem";
import { useGalleryStore } from "@/store";
import { useRouter } from "expo-router";
import { ROUTES } from "@/constants/routes";
import styles from "./styles";

const GalleryList = () => {
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

	const renderItem = useCallback(
		({ item, index }: ListRenderItemInfo<IImageItem>) => (
			<GalleryItem
				item={item}
				index={index}
				isSelected={selectedImageIds.has(item.id)}
				selectionMode={enabledSelectionMode}
				onPress={handlePress}
				onLongPress={handleLongPress}
			/>
		),
		[selectedImageIds, enabledSelectionMode, handlePress, handleLongPress],
	);

	const keyExtractor = useCallback(
		(item: IImageItem) => item.id.toString(),
		[],
	);

	return (
		<FlatList
			data={images}
			numColumns={3}
			showsVerticalScrollIndicator={false}
			keyExtractor={keyExtractor}
			contentContainerStyle={styles.list}
			renderItem={renderItem}
			extraData={selectedImageIds}
			removeClippedSubviews={true}
			maxToRenderPerBatch={10}
			windowSize={5}
		/>
	);
};

export default GalleryList;
