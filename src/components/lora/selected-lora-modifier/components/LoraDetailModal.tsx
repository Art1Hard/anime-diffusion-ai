import { StyleSheet, View } from "react-native";
import COLORS from "@/constants/colors";
import StyledText from "@/components/ui/StyledText";
import { IActiveLora } from "@/types/lora";
import CustomBottomSheetModal from "@/components/ui/modals/CustomBottomSheetModal";
import LoraWeightSection from "./LoraWeightSection";
import LoraTriggerWordsSection from "./LoraTriggerWordsSection";

interface Props {
	visible: boolean;
	lora: IActiveLora | null;
	onClose: () => void;
	onToggleTriggerWord: (path: string, index: number) => void;
}

const LoraDetailModal = ({ visible, lora, onClose }: Props) => {
	if (!lora) return null;

	return (
		<CustomBottomSheetModal
			enableDynamicSizing
			onClose={onClose}
			visible={visible}>
			<View style={styles.header}>
				<StyledText style={styles.title}>
					{lora.lora.name || lora.lora.alias}
				</StyledText>
			</View>

			<LoraWeightSection lora={lora} />

			<LoraTriggerWordsSection lora={lora} />
		</CustomBottomSheetModal>
	);
};

export default LoraDetailModal;

const styles = StyleSheet.create({
	header: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 20,
	},

	title: {
		color: COLORS.textPrimary,
		fontSize: 18,
		fontWeight: "700",
	},

	label: {
		color: COLORS.textSecondary,
		fontSize: 14,
		marginBottom: 12,
	},

	triggerSection: {
		marginBottom: 20,
	},

	triggerContainer: {
		gap: 8,
		paddingVertical: 4,
	},

	triggerChip: {
		paddingHorizontal: 14,
		paddingVertical: 8,
		borderRadius: 16,
		backgroundColor: COLORS.surface,
		borderWidth: 1,
		borderColor: COLORS.border,
	},

	triggerChipActive: {
		backgroundColor: COLORS.primary,
		borderColor: COLORS.primary,
	},

	triggerText: {
		color: COLORS.textMuted,
	},

	triggerTextActive: {
		color: COLORS.textPrimary,
	},
});
