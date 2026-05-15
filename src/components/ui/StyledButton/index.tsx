import { Pressable, PressableProps } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import StyledText from "../StyledText";
import styles from "./styles";
import COLORS from "@/constants/colors";
import { ComponentProps } from "react";

interface StyledButtonProps extends Omit<PressableProps, "children"> {
	title?: string;
	variant?: "default" | "success" | "warning" | "error";
	icon?: {
		name: ComponentProps<typeof Ionicons>["name"];
		size?: number;
		color?: string;
	};
}

const variantStyles = {
	default: styles.default,
	success: styles.success,
	warning: styles.warning,
	error: styles.error,
} as const;

const StyledButton = ({
	title,
	icon,
	variant = "default",
	style,
	disabled,
	...props
}: StyledButtonProps) => {
	return (
		<Pressable
			disabled={disabled}
			style={(state) => [
				styles.root,
				variantStyles[variant],
				disabled && styles.disabled,
				typeof style === "function" ? style(state) : style,
			]}
			{...props}>
			<>
				{title && (
					<StyledText variant="button" style={[styles.text]}>
						{title}
					</StyledText>
				)}
				{icon && (
					<Ionicons
						name={icon.name}
						size={icon.size}
						color={icon.color ? icon.color : COLORS.textPrimary}
					/>
				)}
			</>
		</Pressable>
	);
};

export default StyledButton;
