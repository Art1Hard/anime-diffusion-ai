import { Pressable, StyleProp, Text, View, ViewStyle } from "react-native";
import styles from "./styles";

interface RadioCardProps {
	title: string;
	desc: string;
	isActive: boolean;
	style?: StyleProp<ViewStyle>;
	onSelect: () => void;
}

const RadioCard = ({
	title,
	desc,
	isActive,
	style,
	onSelect,
}: RadioCardProps) => {
	return (
		<Pressable
			style={[styles.card, isActive && styles.cardActive, style]}
			onPress={onSelect}>
			<View style={styles.cardInfo}>
				<Text style={styles.cardTitle}>{title}</Text>
				<Text style={styles.cardDesc}>{desc}</Text>
			</View>
			<View style={[styles.radio, isActive && styles.radioActive]}>
				{isActive && <View style={styles.radioDot} />}
			</View>
		</Pressable>
	);
};

export default RadioCard;
