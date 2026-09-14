import COLORS from "@/constants/colors";
import { GestureResponderEvent, Pressable, StyleSheet } from "react-native";
import StyledText from "@/components/ui/StyledText";
import { IParsedLora } from "@/types/lora";
import { Ionicons } from "@expo/vector-icons";

interface LoraChipProps {
	lora: IParsedLora;
	weight: number;
	onOpenDetail?: (e: GestureResponderEvent) => void | null;
	onRemove?: (e: GestureResponderEvent) => void | null;
}

const LoraChip = ({ lora, weight, onOpenDetail, onRemove }: LoraChipProps) => {
	return (
		<Pressable onPress={onOpenDetail} style={styles.root}>
			<StyledText variant="micro" style={styles.name}>
				{lora.name.toLowerCase() || lora.alias.toLowerCase()}
			</StyledText>
			<StyledText variant="micro" style={styles.weight}>
				{weight}
			</StyledText>
			<Pressable onPress={onRemove}>
				<Ionicons name="close" size={18} color={COLORS.textMuted} />
			</Pressable>
		</Pressable>
	);
};

export default LoraChip;

const styles = StyleSheet.create({
	root: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: COLORS.surface,
		borderRadius: 8,
		paddingHorizontal: 12,
		paddingVertical: 6,
		gap: 6,
	},

	name: { color: COLORS.textPrimary },
	weight: { color: COLORS.textSecondary },
});
