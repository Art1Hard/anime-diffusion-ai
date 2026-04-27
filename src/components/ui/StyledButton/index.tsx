import { Pressable, PressableProps } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import StyledText from "../StyledText";
import styles from "./styles";
import COLORS from "@/shared/styles/colors";
import { ComponentProps } from "react";

interface StyledButtonProps extends Omit<PressableProps, "children"> {
	title?: string;
	variant?: "default" | "success";
	icon?: {
		name: ComponentProps<typeof Ionicons>["name"];
		size?: number;
		color?: string;
	};
}

const variantStyles = {
	default: styles.default,
	success: styles.success,
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
