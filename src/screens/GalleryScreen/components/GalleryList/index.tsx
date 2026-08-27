import { IImageItem } from "@/types/model-presets";
import { useCallback } from "react";
import { FlatList, ListRenderItemInfo } from "react-native";
import GalleryItem from "../GalleryItem";
import styles from "./styles";
import { useList } from "@/screens/GalleryScreen/hooks";

const GalleryList = () => {
	const {
		selectedImageIds,
		images,
		enabledSelectionMode,
		listRef,
		handlePress,
		handleLongPress,
		keyExtractor,
	} = useList();

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

	return (
		<FlatList
			ref={listRef}
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
