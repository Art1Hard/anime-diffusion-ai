import { Modal, View, Pressable, ScrollView, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import COLORS from "@/constants/colors";
import StyledText from "@/components/ui/StyledText";
import { IActiveLora } from "@/types/lora";
import { useEffect, useState } from "react";
import { TextInput } from "react-native-gesture-handler";

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
	if (!lora) return null;

	const decreaseWeight = () => {
		const newWeight = Math.max(-5, lora.weight - 0.1);
		onWeightChange(lora.lora.path, Math.round(newWeight * 10) / 10);
	};

	const increaseWeight = () => {
		const newWeight = Math.min(5, lora.weight + 0.1);
		onWeightChange(lora.lora.path, Math.round(newWeight * 10) / 10);
	};

	const [inputValue, setInputValue] = useState(lora.weight.toFixed(1));

	// Синхронизируем инпут, если вес меняется извне (кнопками)
	useEffect(() => {
		setInputValue(lora.weight.toFixed(1));
	}, [lora.weight]);

	const handleSubmit = () => {
		const parsed = parseFloat(inputValue.replace(",", "."));
		if (!Number.isNaN(parsed)) {
			const clamped = Math.max(-5, Math.min(5, Math.round(parsed * 10) / 10));
			onWeightChange(lora.lora.path, clamped);
		}
	};

	return (
		<Modal
			visible={visible}
			animationType="slide"
			transparent
			onRequestClose={onClose}>
			<Pressable style={styles.backdrop} onPress={onClose} />

			<View style={styles.sheet}>
				<View style={styles.handle} />

				{/* Заголовок */}
				<View style={styles.header}>
					<StyledText style={styles.title}>
						{lora.lora.alias || lora.lora.name}
					</StyledText>
					<Pressable onPress={onClose}>
						<Ionicons name="close" size={24} color={COLORS.textPrimary} />
					</Pressable>
				</View>

				{/* Вес */}
				<View style={styles.weightSection}>
					<StyledText style={styles.label}>Weight</StyledText>
					<View style={styles.weightControls}>
						<Pressable onPress={decreaseWeight} style={styles.weightButton}>
							<Ionicons name="remove" size={20} color={COLORS.textPrimary} />
						</Pressable>

						<TextInput
							value={inputValue}
							onChangeText={setInputValue}
							onBlur={handleSubmit}
							onSubmitEditing={handleSubmit}
							keyboardType="decimal-pad"
							selectTextOnFocus
							style={styles.weightInput}
						/>

						<Pressable onPress={increaseWeight} style={styles.weightButton}>
							<Ionicons name="add" size={20} color={COLORS.textPrimary} />
						</Pressable>
					</View>
				</View>

				{/* Trigger words */}
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
								style={[
									styles.triggerChip,
									enabled && styles.triggerChipActive,
								]}>
								<StyledText
									style={enabled ? styles.textActive : styles.textInactive}>
									{word}
								</StyledText>
							</Pressable>
						))}
					</ScrollView>
				</View>
			</View>
		</Modal>
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
	backdrop: {
		flex: 1,
		backgroundColor: "rgba(0,0,0,0.5)",
	},
	sheet: {
		maxHeight: "60%",
		backgroundColor: COLORS.background,
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
		padding: 16,
	},
	handle: {
		width: 40,
		height: 4,
		borderRadius: 2,
		backgroundColor: COLORS.border,
		alignSelf: "center",
		marginBottom: 12,
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
	weightValue: {
		color: COLORS.textPrimary,
		fontSize: 24,
		fontWeight: "700",
		minWidth: 50,
		textAlign: "center",
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
