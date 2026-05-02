import COLORS from "@/constants/colors";
import { TextInput, TextInputProps } from "react-native";
import styles from "./styles";

interface StyledTextInputProps extends Omit<
	TextInputProps,
	"placeholderTextColor"
> {}

const StyledTextInput = ({ style, ...props }: StyledTextInputProps) => {
	return (
		<TextInput
			placeholderTextColor={COLORS.textMuted}
			style={[styles.root, style]}
			cursorColor={COLORS.accentSoft}
			selectionColor={COLORS.accentSoft}
			selectionHandleColor={COLORS.accentSoft}
			{...props}
		/>
	);
};

export default StyledTextInput;
