import { MODEL_DEFAULT_PRESETS } from "@/constants/model-presets";
import { useGenerationSettingsStore } from "@/store";
import SettingSection from "../ui/SettingSection";

import styles from "./styles";
import { View } from "react-native";
import COLORS from "@/constants/colors";

import { Picker } from "@react-native-picker/picker";

const ModelSelection = () => {
	const selectedModelPath = useGenerationSettingsStore(
		(gs) => gs.selectedModelPath,
	);
	const setSelectedModelPath = useGenerationSettingsStore(
		(gs) => gs.setSelectedModelPath,
	);

	return (
		<SettingSection title="Choose your model" iconName="cube">
			<View style={styles.root}>
				<Picker
					selectedValue={selectedModelPath}
					onValueChange={(itemValue) => setSelectedModelPath(itemValue)}
					dropdownIconColor={COLORS.primary}
					mode="dropdown">
					{MODEL_DEFAULT_PRESETS.map((model) => (
						<Picker.Item
							style={{
								backgroundColor: COLORS.surface,
							}}
							key={model.path}
							label={model.name}
							value={model.path}
							color={COLORS.textPrimary}
						/>
					))}
				</Picker>
			</View>
		</SettingSection>
	);
};

export default ModelSelection;
