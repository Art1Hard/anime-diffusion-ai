import COLORS from "@/constants/colors";
import { GestureResponderEvent, Pressable } from "react-native";
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
		<Pressable
			onPress={onOpenDetail} // открыть детали с тогглами
			style={{
				flexDirection: "row",
				alignItems: "center",
				backgroundColor: COLORS.surface,
				borderRadius: 8,
				paddingHorizontal: 12,
				paddingVertical: 6,
				gap: 6,
			}}>
			<StyledText variant="micro" style={{ color: COLORS.textPrimary }}>
				{lora.name.toLowerCase() || lora.alias.toLowerCase()}
			</StyledText>
			<StyledText variant="micro" style={{ color: COLORS.textSecondary }}>
				{weight}
			</StyledText>
			<Pressable onPress={onRemove}>
				<Ionicons name="close" size={18} color={COLORS.textMuted} />
			</Pressable>
		</Pressable>
	);
};

export default LoraChip;
