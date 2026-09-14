import StyledText from "@/components/ui/StyledText";
import COLORS from "@/constants/colors";
import {
	StyleProp,
	StyleSheet,
	View,
	ViewProps,
	ViewStyle,
} from "react-native";

interface LoraModifierSectionProps extends ViewProps {
	label: string;
	contentStyle?: StyleProp<ViewStyle>;
}

const LoraModifierSection = ({
	label,
	contentStyle,
	children,
	style,
	...props
}: LoraModifierSectionProps) => {
	return (
		<View {...props} style={[styles.root, style]}>
			<StyledText style={styles.label}>{label}</StyledText>
			<View style={contentStyle}>{children}</View>
		</View>
	);
};

export default LoraModifierSection;

const styles = StyleSheet.create({
	root: {
		marginBottom: 20,
	},
	label: {
		color: COLORS.textSecondary,
		fontSize: 14,
		marginBottom: 12,
	},
});
