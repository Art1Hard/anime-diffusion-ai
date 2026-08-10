import ScreenContainer from "@/components/ui/ScreenContainer";
import { StyleProp, Text, View, ViewStyle } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import COLORS from "@/constants/colors";
import styles from "./styles";
import { ComponentProps, PropsWithChildren } from "react";

interface SettingSectionProps extends PropsWithChildren {
	title: string;
	iconName: ComponentProps<typeof Ionicons>["name"];
	style?: StyleProp<ViewStyle>;
}

const SettingSection = ({
	title,
	iconName,
	style,
	children,
}: SettingSectionProps) => {
	return (
		<View style={style}>
			<View style={styles.header}>
				<Ionicons name={iconName} size={20} color={COLORS.primary} />
				<Text style={styles.title}>{title}</Text>
			</View>
			{children}
		</View>
	);
};

export default SettingSection;
