import StyledText from "@/components/ui/StyledText";
import COLORS from "@/constants/colors";
import { IActiveLora } from "@/types/lora";
import { Pressable, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import LoraModifierSection from "./LoraModifierSection";
import { useLoraStore } from "@/store";

interface LoraTriggerWordsSectionProps {
	lora: IActiveLora;
}

const LoraTriggerWordsSection = ({ lora }: LoraTriggerWordsSectionProps) => {
	const toggleTriggerWord = useLoraStore((s) => s.toggleTriggerWord);

	return (
		<LoraModifierSection label="Trigger words">
			<ScrollView
				horizontal
				showsHorizontalScrollIndicator={false}
				contentContainerStyle={styles.contentContainer}>
				{lora.triggerWords.map(({ word, enabled }, index) => (
					<Pressable
						key={`${word}-${index}`}
						onPress={() => toggleTriggerWord(lora.lora.path, index)}
						style={[styles.chip, enabled && styles.chipActive]}>
						<StyledText style={enabled ? styles.textActive : styles.text}>
							{word}
						</StyledText>
					</Pressable>
				))}
			</ScrollView>
		</LoraModifierSection>
	);
};

export default LoraTriggerWordsSection;

const styles = StyleSheet.create({
	contentContainer: {
		gap: 8,
		paddingVertical: 4,
	},

	chip: {
		paddingHorizontal: 14,
		paddingVertical: 8,
		borderRadius: 16,
		backgroundColor: COLORS.surface,
		borderWidth: 1,
		borderColor: COLORS.border,
	},

	chipActive: {
		backgroundColor: COLORS.primary,
		borderColor: COLORS.primary,
	},

	text: {
		color: COLORS.textMuted,
	},

	textActive: {
		color: COLORS.textPrimary,
	},
});
