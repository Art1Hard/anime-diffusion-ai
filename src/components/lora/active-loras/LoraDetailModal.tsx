import { useEffect, useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import COLORS from "@/constants/colors";
import StyledText from "@/components/ui/StyledText";
import { IActiveLora } from "@/types/lora";
import CustomBottomSheetModal from "@/components/ui/modals/CustomBottomSheetModal";

interface Props {
	visible: boolean;
	lora: IActiveLora | null;
	onClose: () => void;
	onWeightChange: (path: string, weight: number) => void;
	onToggleTriggerWord: (path: string, index: number) => void;
}

const LoraDetailModal = ({
	visible,
	lora,
	onClose,
	onWeightChange,
	onToggleTriggerWord,
}: Props) => {
	const [inputValue, setInputValue] = useState("");

	useEffect(() => {
		if (lora) {
			setInputValue(lora.weight.toFixed(2));
		}
	}, [lora?.lora.path]);

	if (!lora) return null;

	const decreaseWeight = () => {
		const newWeight = Math.max(-5, lora.weight - 0.1);
		const weight = Math.round(newWeight * 10) / 10;

		onWeightChange(lora.lora.path, weight);
		setInputValue(weight.toFixed(2));
	};

	const increaseWeight = () => {
		const newWeight = Math.min(5, lora.weight + 0.1);
		const weight = Math.round(newWeight * 10) / 10;

		onWeightChange(lora.lora.path, weight);
		setInputValue(weight.toFixed(2));
	};

	const handleWeightChange = (text: string) => {
		setInputValue(text);

		const normalized = text.replace(",", ".");
		const parsed = parseFloat(normalized);

		if (Number.isNaN(parsed)) return;

		const clamped = Math.max(-5, Math.min(5, Math.round(parsed * 100) / 100));

		onWeightChange(lora.lora.path, clamped);
	};

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

			<View style={styles.weightSection}>
				<StyledText style={styles.label}>Weight</StyledText>

				<View style={styles.weightControls}>
					<Pressable onPress={decreaseWeight} style={styles.weightButton}>
						<Ionicons name="remove" size={20} color={COLORS.textPrimary} />
					</Pressable>

					<TextInput
						value={inputValue}
						onChangeText={handleWeightChange}
						keyboardType="decimal-pad"
						selectTextOnFocus
						style={styles.weightInput}
					/>

					<Pressable onPress={increaseWeight} style={styles.weightButton}>
						<Ionicons name="add" size={20} color={COLORS.textPrimary} />
					</Pressable>
				</View>
			</View>

			<View style={styles.triggerSection}>
				<StyledText style={styles.label}>Trigger words</StyledText>

				<ScrollView
					horizontal
					showsHorizontalScrollIndicator={false}
					contentContainerStyle={styles.triggerContainer}>
					{lora.triggerWords.map(({ word, enabled }, index) => (
						<Pressable
							key={`${word}-${index}`}
							onPress={() => onToggleTriggerWord(lora.lora.path, index)}
							style={[styles.triggerChip, enabled && styles.triggerChipActive]}>
							<StyledText
								style={enabled ? styles.textActive : styles.textInactive}>
								{word}
							</StyledText>
						</Pressable>
					))}
				</ScrollView>
			</View>
		</CustomBottomSheetModal>
	);
};

export default LoraDetailModal;

const styles = StyleSheet.create({
	weightInput: {
		color: COLORS.textPrimary,
		fontSize: 24,
		fontWeight: "700",
		minWidth: 60,
		textAlign: "center",
		paddingVertical: 4,
	},

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

	weightSection: {
		marginBottom: 20,
	},

	label: {
		color: COLORS.textSecondary,
		fontSize: 14,
		marginBottom: 12,
	},

	weightControls: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		gap: 20,
	},

	weightButton: {
		width: 40,
		height: 40,
		borderRadius: 20,
		backgroundColor: COLORS.surface,
		alignItems: "center",
		justifyContent: "center",
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

	textActive: {
		color: "#fff",
	},

	textInactive: {
		color: COLORS.textSecondary,
	},
});
