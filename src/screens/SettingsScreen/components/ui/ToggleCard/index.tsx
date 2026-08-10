import COLORS from "@/constants/colors";
import { Switch, Text, View, ViewProps } from "react-native";
import styles from "./styles";

interface ToggleCardProps extends ViewProps {
	title: string;
	desc: string;
	switchValue: boolean;
	switchOnValueChange: (value: boolean) => void;
}

const ToggleCard = ({
	title,
	desc,
	switchValue,
	switchOnValueChange,
	style,
	...props
}: ToggleCardProps) => {
	return (
		<View style={[styles.toggleCard, style]} {...props}>
			<View style={styles.toggleInfo}>
				<Text style={styles.toggleLabel}>{title}</Text>
				<Text style={styles.toggleDesc}>{desc}</Text>
			</View>
			<Switch
				value={switchValue}
				onValueChange={switchOnValueChange}
				trackColor={{ false: COLORS.border, true: COLORS.primary }}
				thumbColor={COLORS.textPrimary}
			/>
		</View>
	);
};

export default ToggleCard;
