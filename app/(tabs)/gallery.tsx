import COLORS from "@/constants/colors";
import { useGalleryStore } from "@/store";
import { useEffect, useState, useCallback } from "react";
import {
	View,
	FlatList,
	Pressable,
	StyleSheet,
	ListRenderItemInfo,
} from "react-native";
import { initDatabase } from "@/database";
import { useRouter } from "expo-router";
import { ROUTES } from "@/constants/routes";
import { Ionicons } from "@expo/vector-icons";
import { CONTAINER_SIZES, FONT_SIZES, GALLERY_SIZES } from "@/constants/sizes";
import StyledText from "@/components/ui/StyledText";
import { IImageItem } from "@/types/model-presets";
import GalleryItem from "@/screens/GalleryScreen/GalleryItem";

export default function Route() {
	const [ready, setReady] = useState(false);
	const loadImages = useGalleryStore((s) => s.loadImages);
	const removeImages = useGalleryStore((s) => s.removeImages);
	const route = useRouter();

	const [selectionMode, setSelectionMode] = useState(false);
	const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());

	const images = useGalleryStore((s) => s.images);

	useEffect(() => {
		initDatabase()
			.then(() => loadImages())
			.then(() => setReady(true))
			.catch((e) => console.error("DB init failed", e));
	}, []);

	const toggleSelect = useCallback((id: number) => {
		setSelectedIds((prev) => {
			const next = new Set(prev);
			if (next.has(id)) next.delete(id);
			else next.add(id);
			if (next.size === 0) setSelectionMode(false);
			return next;
		});
	}, []);

	// ⬇️ ВСЕ через useCallback, ВСЕ до if (!ready)
	const handlePress = useCallback(
		(item: IImageItem, index: number) => {
			if (selectionMode) toggleSelect(item.id);
			else
				route.push({
					pathname: ROUTES.IMAGE_VIEWER_GALLERY,
					params: { index },
				});
		},
		[selectionMode, toggleSelect, route],
	);

	const handleLongPress = useCallback(
		(item: IImageItem) => {
			if (!selectionMode) setSelectionMode(true);
			toggleSelect(item.id);
		},
		[selectionMode, toggleSelect],
	);

	const cancelSelection = useCallback(() => {
		setSelectionMode(false);
		setSelectedIds(new Set());
	}, []);

	const handleDelete = useCallback(() => {
		removeImages(selectedIds);
		cancelSelection();
	}, [selectedIds, removeImages, cancelSelection]);

	const handleSave = useCallback(() => {
		cancelSelection();
	}, [cancelSelection]);

	const renderItem = useCallback(
		({ item, index }: ListRenderItemInfo<IImageItem>) => (
			<GalleryItem
				item={item}
				index={index}
				isSelected={selectedIds.has(item.id)}
				selectionMode={selectionMode}
				onPress={handlePress}
				onLongPress={handleLongPress}
			/>
		),
		[selectedIds, selectionMode, handlePress, handleLongPress],
	);

	const keyExtractor = useCallback(
		(item: IImageItem) => item.id.toString(),
		[],
	);

	// ⬇️ Только сейчас early return
	if (!ready) return null;

	return (
		<View style={styles.container}>
			{selectionMode && (
				<View style={styles.actionBar}>
					<Pressable onPress={cancelSelection}>
						<StyledText style={styles.actionText}>Cancel</StyledText>
					</Pressable>
					<StyledText style={styles.counter}>
						{selectedIds.size} selected
					</StyledText>
					<View style={{ flexDirection: "row", gap: 20 }}>
						<Pressable onPress={handleSave}>
							<Ionicons
								name="download-outline"
								size={22}
								color={COLORS.textPrimary}
							/>
						</Pressable>
						<Pressable onPress={handleDelete}>
							<Ionicons name="trash-outline" size={22} color="red" />
						</Pressable>
					</View>
				</View>
			)}

			<FlatList
				data={images}
				numColumns={2}
				showsVerticalScrollIndicator={false}
				keyExtractor={keyExtractor}
				contentContainerStyle={styles.list}
				renderItem={renderItem}
				extraData={selectedIds}
				removeClippedSubviews={true}
				maxToRenderPerBatch={10}
				windowSize={5}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: COLORS.background,
		paddingHorizontal: CONTAINER_SIZES.horizontalPadding,
	},
	list: {
		paddingVertical: 20,
		margin: -GALLERY_SIZES.listGap,
	},
	actionBar: {
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		zIndex: 20,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingVertical: 12,
		backgroundColor: "rgba(0,0,0,0.8)",
		paddingHorizontal: 12,
		marginHorizontal: 22,
		borderRadius: 30,
		marginTop: 8,
	},
	actionText: {
		color: COLORS.textPrimary,
		fontSize: FONT_SIZES.small,
	},
	counter: {
		color: COLORS.textPrimary,
		fontSize: 16,
		fontWeight: "600",
	},
});
