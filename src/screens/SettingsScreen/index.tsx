import { useState } from "react";
import {
	View,
	Text,
	ScrollView,
	TouchableOpacity,
	Switch,
	Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import COLORS from "@/constants/colors";
import ScreenContainer from "@/components/ui/ScreenContainer";
import { MODEL_DEFAULT_PRESETS } from "@/constants/model-presets";
import styles from "./styles";
import { useGenerationSettingsStore } from "@/store";
import StyledTextInput from "@/components/ui/StyledTextInput";

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

const SettingsScreen = () => {
	const selectedModelPath = useGenerationSettingsStore(
		(gs) => gs.selectedModelPath,
	);
	const setSelectedModel = useGenerationSettingsStore(
		(gs) => gs.setSelectedModelPath,
	);

	const rating = useGenerationSettingsStore((gs) => gs.rating);
	const setRating = useGenerationSettingsStore((gs) => gs.setRating);

	const seed = useGenerationSettingsStore((gs) => gs.seed);
	const setSeed = useGenerationSettingsStore((gs) => gs.setSeed);

	const isDetailedFace = useGenerationSettingsStore((gs) => gs.isDetailedFace);
	const toggleDetailedFace = useGenerationSettingsStore(
		(gs) => gs.toggleDetailedFace,
	);

	const isHires = useGenerationSettingsStore((gs) => gs.isHires);
	const toggleHires = useGenerationSettingsStore((gs) => gs.toggleHires);

	const orientation = useGenerationSettingsStore((gs) => gs.orientation);
	const setOrientation = useGenerationSettingsStore((gs) => gs.setOrientation);

	const [steps, setSteps] = useState("30");
	const [guidanceScale, setGuidanceScale] = useState("7.5");

	return (
		<ScrollView
			style={{ backgroundColor: COLORS.background }}
			showsVerticalScrollIndicator={false}>
			{/* Model Selection */}
			<ScreenContainer>
				<View style={styles.sectionHeader}>
					<Ionicons name="cube" size={20} color={COLORS.primary} />
					<Text style={styles.sectionTitle}>Choose your model</Text>
				</View>

				{MODEL_DEFAULT_PRESETS.map((model) => (
					<Pressable
						key={model.path}
						style={[
							styles.modelCard,
							selectedModelPath === model.path && styles.modelCardActive,
						]}
						onPress={() => setSelectedModel(model.path)}>
						<View style={styles.modelInfo}>
							<Text style={styles.modelName}>{model.name}</Text>
							<Text style={styles.modelDesc}>{model.description}</Text>
						</View>
						<View
							style={[
								styles.radio,
								selectedModelPath === model.path && styles.radioActive,
							]}>
							{selectedModelPath === model.path && (
								<View style={styles.radioDot} />
							)}
						</View>
					</Pressable>
				))}
			</ScreenContainer>

			<ScreenContainer>
				<View style={styles.sectionHeader}>
					<Ionicons name="flame-outline" size={20} color={COLORS.primary} />
					<Text style={styles.sectionTitle}>Generation Rating</Text>
				</View>

				<View style={styles.toggleCard}>
					<View style={styles.toggleInfo}>
						<Text style={styles.toggleLabel}>Sensitive</Text>
						<Text style={styles.toggleDesc}>
							Suggestive content with mild erotic themes
						</Text>
					</View>
					<Switch
						value={rating === "sensitive"}
						onValueChange={(value) => {
							setRating(value ? "sensitive" : "general");
						}}
						trackColor={{ false: COLORS.border, true: COLORS.primary }}
						thumbColor={COLORS.textPrimary}
					/>
				</View>

				<View style={styles.toggleCard}>
					<View style={styles.toggleInfo}>
						<Text style={styles.toggleLabel}>NSFW</Text>
						<Text style={styles.toggleDesc}>
							Adult content with nudity or sexual themes
						</Text>
					</View>
					<Switch
						value={rating === "nsfw"}
						onValueChange={(value) => {
							setRating(value ? "nsfw" : "general");
						}}
						trackColor={{ false: COLORS.border, true: COLORS.primary }}
						thumbColor={COLORS.textPrimary}
					/>
				</View>

				<View style={styles.toggleCard}>
					<View style={styles.toggleInfo}>
						<Text style={styles.toggleLabel}>Explicit</Text>
						<Text style={styles.toggleDesc}>
							Unrestricted explicit adult content
						</Text>
					</View>
					<Switch
						value={rating === "explicit"}
						onValueChange={(value) => {
							setRating(value ? "explicit" : "general");
						}}
						trackColor={{ false: COLORS.border, true: COLORS.primary }}
						thumbColor={COLORS.textPrimary}
					/>
				</View>
			</ScreenContainer>

			<ScreenContainer>
				<View style={styles.sectionHeader}>
					<Ionicons name="options-outline" size={20} color={COLORS.primary} />
					<Text style={styles.sectionTitle}>Продвинутые параметры</Text>
				</View>

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

				<View style={styles.toggleCard}>
					<View style={styles.toggleInfo}>
						<Text style={styles.toggleLabel}>ADetailer</Text>
						<Text style={styles.toggleDesc}>
							If it's enabled, correcting face of&nbsp;character(s)
						</Text>
					</View>
					<Switch
						value={isDetailedFace}
						onValueChange={toggleDetailedFace}
						trackColor={{ false: COLORS.border, true: COLORS.primary }}
						thumbColor={COLORS.textPrimary}
					/>
				</View>

				<View style={styles.toggleCard}>
					<View style={styles.toggleInfo}>
						<Text style={styles.toggleLabel}>Hires-fix</Text>
						<Text style={styles.toggleDesc}>
							If it's enabled, improving resolution of&nbsp;image
						</Text>
					</View>
					<Switch
						value={isHires}
						onValueChange={toggleHires}
						trackColor={{ false: COLORS.border, true: COLORS.primary }}
						thumbColor={COLORS.textPrimary}
					/>
				</View>
			</ScreenContainer>

			{/* Orientation */}
			<ScreenContainer>
				<View style={styles.sectionHeader}>
					<Ionicons name="crop-outline" size={20} color={COLORS.primary} />
					<Text style={styles.sectionTitle}>Orientation</Text>
				</View>

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
									orientation === item.key
										? COLORS.primary
										: COLORS.textSecondary
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
			</ScreenContainer>
		</ScrollView>
	);
};

export default SettingsScreen;
