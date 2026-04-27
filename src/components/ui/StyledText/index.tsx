import { Text, type TextProps } from "react-native";
import styles from "./styles";

interface StyledTextProps extends TextProps {
	variant?: "base" | "small" | "micro" | "subtitle" | "title" | "button";
	center?: boolean;
}

const variantStyles = {
	base: styles.root,
	small: styles.small,
	micro: styles.micro,
	title: styles.title,
	subtitle: styles.subtitle,
	button: styles.button,
} as const;

const StyledText = ({
	variant = "base",
	center = false,
	style,
	...props
}: StyledTextProps) => {
	return (
		<Text
			style={[variantStyles[variant], style, center && { textAlign: "center" }]}
			{...props}
		/>
	);
};

export default StyledText;
