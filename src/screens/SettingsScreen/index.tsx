import { useState } from "react";
import {
	View,
	Text,
	ScrollView,
	TouchableOpacity,
	TextInput,
	Switch,
	Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import COLORS from "@/constants/colors";
import ScreenContainer from "@/components/ui/ScreenContainer";
import { MODEL_DEFAULT_PRESETS } from "@/constants/model-presets";
import styles from "./styles";
import { useGenerationSettingsStore } from "@/store/generationSettings";

const SettingsScreen = () => {
	const selectedModelPath = useGenerationSettingsStore(
		(gs) => gs.selectedModelPath,
	);
	const setSelectedModel = useGenerationSettingsStore(
		(gs) => gs.setSelectedModelPath,
	);

	const rating = useGenerationSettingsStore((gs) => gs.rating);
	const setRating = useGenerationSettingsStore((gs) => gs.setRating);

	const [seed, setSeed] = useState("-1");
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
						<Text style={styles.paramLabel}>Seed (зерно генерации)</Text>
						<TouchableOpacity
							style={styles.randomBtn}
							onPress={() =>
								setSeed(Math.floor(Math.random() * 1000000).toString())
							}>
							<Ionicons
								name="shuffle-outline"
								size={16}
								color={COLORS.primary}
							/>
							<Text style={styles.randomBtnText}>Случайный</Text>
						</TouchableOpacity>
					</View>
					<TextInput
						style={styles.input}
						value={seed}
						onChangeText={setSeed}
						placeholder="-1 (случайный)"
						placeholderTextColor={COLORS.textMuted}
						keyboardType="numeric"
					/>
					<Text style={styles.paramHint}>
						-1 = случайное значение, фиксированный seed воспроизводит результат
					</Text>
				</View>

				<View style={styles.paramCard}>
					<View style={styles.paramHeader}>
						<Text style={styles.paramLabel}>Шаги генерации</Text>
						<Text style={styles.paramValue}>{steps}</Text>
					</View>
					<View style={styles.sliderContainer}>
						<Text style={styles.sliderLabel}>20</Text>
						<View style={styles.sliderTrack}>
							<View style={[styles.sliderFill, { width: "50%" }]} />
							<View style={styles.sliderThumb} />
						</View>
						<Text style={styles.sliderLabel}>50</Text>
					</View>
					<Text style={styles.paramHint}>
						Больше шагов = выше качество, но медленнее
					</Text>
				</View>

				<View style={styles.paramCard}>
					<View style={styles.paramHeader}>
						<Text style={styles.paramLabel}>CFG Scale (соответствие)</Text>
						<Text style={styles.paramValue}>{guidanceScale}</Text>
					</View>
					<View style={styles.sliderContainer}>
						<Text style={styles.sliderLabel}>1</Text>
						<View style={styles.sliderTrack}>
							<View style={[styles.sliderFill, { width: "65%" }]} />
							<View style={styles.sliderThumb} />
						</View>
						<Text style={styles.sliderLabel}>15</Text>
					</View>
					<Text style={styles.paramHint}>Как точно ИИ следует промпту</Text>
				</View>
			</ScreenContainer>

			<ScreenContainer>
				<View style={styles.sectionHeader}>
					<Ionicons name="expand-outline" size={20} color={COLORS.primary} />
					<Text style={styles.sectionTitle}>Разрешение</Text>
				</View>

				<View style={styles.resolutionGrid}>
					{["512×512", "768×768", "1024×1024"].map((res) => (
						<TouchableOpacity key={res} style={styles.resolutionBtn}>
							<Text style={styles.resolutionText}>{res}</Text>
						</TouchableOpacity>
					))}
				</View>
			</ScreenContainer>

			<ScreenContainer edges={["bottom"]}>
				<TouchableOpacity style={styles.resetBtn}>
					<Ionicons
						name="refresh-outline"
						size={20}
						color={COLORS.textSecondary}
					/>
					<Text style={styles.resetBtnText}>Сбросить</Text>
				</TouchableOpacity>
			</ScreenContainer>
		</ScrollView>
	);
};

export default SettingsScreen;
