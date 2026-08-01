import COLORS from "@/constants/colors";
import { useGalleryStore } from "@/store";
import { useEffect, useState, useCallback } from "react";
import { Image } from "expo-image";
import {
	View,
	FlatList,
	Pressable,
	StyleSheet,
	Dimensions,
} from "react-native";
import { initDatabase } from "@/database";
import { useRouter } from "expo-router";
import { ROUTES } from "@/constants/routes";
import { Ionicons } from "@expo/vector-icons"; // или любая другая иконка-либа, которая у тебя есть
import { FONT_SIZES } from "@/constants/sizes";
import StyledText from "@/components/ui/StyledText";

const { width } = Dimensions.get("window");
const listGap = 4;
const viewHorizontalPadding = 15;
const ITEM_SIZE = width / 2 - listGap - viewHorizontalPadding;

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

	// ⬇️ переносим сюда, ДО early return
	const toggleSelect = useCallback((id: number) => {
		setSelectedIds((prev) => {
			const next = new Set(prev);
			if (next.has(id)) {
				next.delete(id);
			} else {
				next.add(id);
			}
			if (next.size === 0) setSelectionMode(false);
			return next;
		});
	}, []);

	if (!ready) return null;

	const handlePress = (item: (typeof images)[number], index: number) => {
		if (selectionMode) {
			toggleSelect(item.id);
		} else {
			route.push({
				pathname: ROUTES.IMAGE_VIEWER_GALLERY,
				params: { index: index },
			});
		}
	};

	const handleLongPress = (item: (typeof images)[number]) => {
		if (!selectionMode) setSelectionMode(true);
		toggleSelect(item.id);
	};

	const cancelSelection = () => {
		setSelectionMode(false);
		setSelectedIds(new Set());
	};

	const handleDelete = () => {
		removeImages(selectedIds);
		cancelSelection();
	};

	const handleSave = () => {
		// логика сохранения выбранных, например через expo-media-library
		cancelSelection();
	};

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
				keyExtractor={(item) => item.id.toString()}
				contentContainerStyle={styles.list}
				style={{ paddingTop: selectionMode ? 50 : 0 }}
				renderItem={({ item, index }) => {
					const id = item.id;
					const isSelected = selectedIds.has(id);
					return (
						<Pressable
							onPress={() => handlePress(item, index)}
							onLongPress={() => handleLongPress(item)}
							delayLongPress={250}>
							<View>
								<Image
									source={{ uri: item.uri }}
									cachePolicy="memory-disk"
									contentFit="cover"
									style={[styles.image, isSelected && styles.imageSelected]}
								/>
								{selectionMode && (
									<View
										style={[
											styles.checkCircle,
											isSelected && styles.checkCircleActive,
										]}>
										{isSelected && (
											<Ionicons
												name="checkmark"
												size={14}
												color={COLORS.textPrimary}
											/>
										)}
									</View>
								)}
							</View>
						</Pressable>
					);
				}}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: COLORS.background,
		paddingHorizontal: viewHorizontalPadding,
	},
	list: {
		paddingVertical: 20,
		margin: -listGap,
	},
	image: {
		width: ITEM_SIZE,
		height: ITEM_SIZE,
		borderRadius: 10,
		margin: listGap,
	},
	imageSelected: {
		opacity: 0.6,
	},
	checkCircle: {
		position: "absolute",
		top: 12,
		right: 12,
		width: 22,
		height: 22,
		borderRadius: 11,
		borderWidth: 1.5,
		borderColor: COLORS.textPrimary,
		backgroundColor: "rgba(0,0,0,0.25)",
		alignItems: "center",
		justifyContent: "center",
	},
	checkCircleActive: {
		backgroundColor: COLORS.primaryHover,
		borderColor: "transparent",
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
