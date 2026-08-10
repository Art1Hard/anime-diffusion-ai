import { Text, TouchableOpacity, View } from "react-native";
import SettingSection from "../ui/SettingSection";
import StyledTextInput from "@/components/ui/StyledTextInput";

import { Ionicons } from "@expo/vector-icons";
import styles from "./styles";
import COLORS from "@/constants/colors";
import { useGenerationSettingsStore } from "@/store";
import ToggleCard from "../ui/ToggleCard";

const AdvancedSection = () => {
	const seed = useGenerationSettingsStore((gs) => gs.seed);
	const setSeed = useGenerationSettingsStore((gs) => gs.setSeed);

	const isDetailedFace = useGenerationSettingsStore((gs) => gs.isDetailedFace);
	const toggleDetailedFace = useGenerationSettingsStore(
		(gs) => gs.toggleDetailedFace,
	);

	const isHires = useGenerationSettingsStore((gs) => gs.isHires);
	const toggleHires = useGenerationSettingsStore((gs) => gs.toggleHires);

	return (
		<SettingSection iconName="options-outline" title="Advanced">
			<View style={styles.paramCard}>
				<View style={styles.paramHeader}>
					<Text style={styles.paramLabel}>Seed</Text>
				</View>

				<View>
					<StyledTextInput
						style={styles.input}
						value={seed === -1 ? "" : seed.toString()}
						onChangeText={(value) =>
							setSeed(value === "" ? -1 : parseInt(value) || -1)
						}
						placeholder="-1 (random)"
						keyboardType="numeric"
					/>
					{seed > 0 && (
						<TouchableOpacity
							style={styles.resetBtn}
							onPress={() => setSeed(-1)}>
							<Ionicons
								name="close-circle-outline"
								size={18}
								color={COLORS.textMuted}
							/>
						</TouchableOpacity>
					)}
				</View>
				<Text style={styles.paramHint}>
					-1 = случайное значение, фиксированный seed воспроизводит результат
				</Text>
			</View>

			<View style={styles.cardContainer}>
				<ToggleCard
					title="ADetailer"
					desc="If it's enabled, correcting face of&nbsp;character(s)"
					switchValue={isDetailedFace}
					switchOnValueChange={toggleDetailedFace}
				/>

				<ToggleCard
					title="Hires-fix"
					desc="If it's enabled, improving resolution of&nbsp;image"
					switchValue={isHires}
					switchOnValueChange={toggleHires}
				/>
			</View>
		</SettingSection>
	);
};

export default AdvancedSection;
