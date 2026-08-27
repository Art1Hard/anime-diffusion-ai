import { Pressable, View } from "react-native";
import styles from "./styles";
import StyledText from "@/components/ui/StyledText";
import { Ionicons } from "@expo/vector-icons";
import COLORS from "@/constants/colors";
import { useSectionHeader } from "@/screens/GalleryScreen/hooks";

const GallerySelectionHeader = () => {
	const {
		enabledSelectionMode,
		selectedImageIds,
		handleCancel,
		handleSave,
		handleDelete,
	} = useSectionHeader();

	if (!enabledSelectionMode) return null;

	return (
		<View style={styles.actionBar}>
			<Pressable onPress={handleCancel}>
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
