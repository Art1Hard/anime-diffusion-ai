import { Pressable, View } from "react-native";
import styles from "./styles";
import StyledText from "@/components/ui/StyledText";
import { Ionicons } from "@expo/vector-icons";
import { useCallback } from "react";
import { useGalleryStore } from "@/store";
import COLORS from "@/constants/colors";

const GallerySelectionHeader = () => {
	const selectedImageIds = useGalleryStore((s) => s.selectedImageIds);
	const enabledSelectionMode = useGalleryStore((s) => s.enabledSelectionMode);

	const removeImages = useGalleryStore((s) => s.removeImages);
	const saveImages = useGalleryStore((s) => s.saveImages);

	const disableSelectionMode = useGalleryStore((s) => s.disableSelectionMode);

	const handleDelete = useCallback(() => {
		removeImages(selectedImageIds);
		disableSelectionMode();
	}, [selectedImageIds, removeImages, disableSelectionMode]);

	const handleSave = useCallback(() => {
		saveImages(selectedImageIds);
		disableSelectionMode();
	}, [selectedImageIds, saveImages, disableSelectionMode]);

	if (!enabledSelectionMode) return null;

	return (
		<View style={styles.actionBar}>
			<Pressable onPress={() => disableSelectionMode()}>
				<StyledText style={styles.actionText}>Cancel</StyledText>
			</Pressable>
			<StyledText style={styles.counter}>
				{selectedImageIds.size} selected
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
	);
};

export default GallerySelectionHeader;
