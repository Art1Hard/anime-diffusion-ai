import { MODEL_DEFAULT_PRESETS } from "@/constants/model-presets";
import { useGenerationSettingsStore } from "@/store";
import SettingSection from "../ui/SettingSection";
import RadioCard from "../ui/RadioCard";

import styles from "./styles";
import { View } from "react-native";
import { useCallback } from "react";

interface ModelCardProps {
	model: (typeof MODEL_DEFAULT_PRESETS)[0];
	isActive: boolean;
	onSelect: (path: string) => void;
}

const ModelCard = ({ model, isActive, onSelect }: ModelCardProps) => {
	const handlePress = useCallback(() => {
		onSelect(model.path);
	}, [model.path, onSelect]);

	return (
		<RadioCard
			title={model.name}
			desc={model.description}
			isActive={isActive}
			onSelect={handlePress}
		/>
	);
};

const ModelSelection = () => {
	const selectedModelPath = useGenerationSettingsStore(
		(gs) => gs.selectedModelPath,
	);
	const setSelectedModelPath = useGenerationSettingsStore(
		(gs) => gs.setSelectedModelPath,
	);

	const handleSelect = useCallback(
		(path: string) => {
			setSelectedModelPath(path);
		},
		[setSelectedModelPath],
	);

	return (
		<SettingSection title="Choose your model" iconName="cube">
			<View style={styles.cardContainer}>
				{MODEL_DEFAULT_PRESETS.map((model) => (
					<ModelCard
						model={model}
						isActive={selectedModelPath === model.path}
						onSelect={handleSelect}
						key={model.path}
					/>
				))}
			</View>
		</SettingSection>
	);
};

export default ModelSelection;
