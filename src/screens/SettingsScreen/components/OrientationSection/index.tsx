import { Pressable, Text, View } from "react-native";
import SettingSection from "../ui/SettingSection";
import { useGenerationSettingsStore } from "@/store";

import { Ionicons } from "@expo/vector-icons";
import styles from "./styles";
import COLORS from "@/constants/colors";

const ORIENTATION_OPTIONS = [
	{
		key: "portrait" as const,
		label: "Portrait",
		icon: "phone-portrait-outline" as const,
	},
	{
		key: "landscape" as const,
		label: "Landscape",
		icon: "phone-landscape-outline" as const,
	},
];

const OrientationSection = () => {
	const orientation = useGenerationSettingsStore((gs) => gs.orientation);
	const setOrientation = useGenerationSettingsStore((gs) => gs.setOrientation);

	return (
		<SettingSection iconName="crop-outline" title="Orientation">
			<View style={styles.orientationGrid}>
				{ORIENTATION_OPTIONS.map((item) => (
					<Pressable
						key={item.key}
						style={[
							styles.orientationBtn,
							orientation === item.key && styles.orientationBtnActive,
						]}
						onPress={() => setOrientation(item.key)}>
						<Ionicons
							name={item.icon as any}
							size={24}
							color={
								orientation === item.key ? COLORS.primary : COLORS.textSecondary
							}
						/>
						<Text
							style={[
								styles.orientationText,
								orientation === item.key && styles.orientationTextActive,
							]}>
							{item.label}
						</Text>
					</Pressable>
				))}
			</View>
		</SettingSection>
	);
};

export default OrientationSection;
