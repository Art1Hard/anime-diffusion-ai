import { useState } from "react";
import {
	View,
	Text,
	StyleSheet,
	ScrollView,
	TouchableOpacity,
	TextInput,
	Switch,
	Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import COLORS from "@/shared/styles/colors";
import ScreenContainer from "@/components/ui/ScreenContainer";
import { MODEL_PRESETS } from "@/shared/data/model-presets";
import { useGenerationSettingsStore } from "@/store/useGenerationSettingsStore";

export default function SettingsScreen() {
	const selectedModel = useGenerationSettingsStore((gss) => gss.selectedModel);
	const setSelectedModel = useGenerationSettingsStore(
		(gss) => gss.setSelectedModel,
	);
	const [seed, setSeed] = useState("-1");
	const [steps, setSteps] = useState("30");
	const [guidanceScale, setGuidanceScale] = useState("7.5");
	const [highQuality, setHighQuality] = useState(true);
	const [saveToGallery, setSaveToGallery] = useState(true);

	const models = [
		{ id: "sdxl-1.0", name: "SDXL 1.0", desc: "Лучшее качество" },
		{ id: "sd-2.1", name: "SD 2.1", desc: "Быстрая генерация" },
		{ id: "dreamshaper", name: "DreamShaper", desc: "Стилизация" },
		{ id: "realistic-vision", name: "Realistic Vision", desc: "Реализм" },
	];

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

				{MODEL_PRESETS.map((model) => (
					<Pressable
						key={model.path}
						style={[
							styles.modelCard,
							selectedModel === model.path && styles.modelCardActive,
						]}
						onPress={() => setSelectedModel(model.path)}>
						<View style={styles.modelInfo}>
							<Text style={styles.modelName}>{model.name}</Text>
							<Text style={styles.modelDesc}>{model.name}</Text>
						</View>
						<View
							style={[
								styles.radio,
								selectedModel === model.path && styles.radioActive,
							]}>
							{selectedModel === model.path && <View style={styles.radioDot} />}
						</View>
					</Pressable>
				))}
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

				{/* <View style={styles.paramCard}>
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
				</View> */}
			</ScreenContainer>

			<ScreenContainer>
				<View style={styles.sectionHeader}>
					<Ionicons name="image-outline" size={20} color={COLORS.primary} />
					<Text style={styles.sectionTitle}>Качество и вывод</Text>
				</View>

				<View style={styles.toggleCard}>
					<View style={styles.toggleInfo}>
						<Text style={styles.toggleLabel}>🎨 Высокое качество</Text>
						<Text style={styles.toggleDesc}>
							Улучшенная детализация (медленнее)
						</Text>
					</View>
					<Switch
						value={highQuality}
						onValueChange={setHighQuality}
						trackColor={{ false: COLORS.border, true: COLORS.primary }}
						thumbColor={COLORS.textPrimary}
					/>
				</View>

				<View style={styles.toggleCard}>
					<View style={styles.toggleInfo}>
						<Text style={styles.toggleLabel}>💾 Сохранять в галерею</Text>
						<Text style={styles.toggleDesc}>Автосохранение результатов</Text>
					</View>
					<Switch
						value={saveToGallery}
						onValueChange={setSaveToGallery}
						trackColor={{ false: COLORS.border, true: COLORS.primary }}
						thumbColor={COLORS.textPrimary}
					/>
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

			<ScreenContainer>
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
}

const styles = StyleSheet.create({
	title: {
		fontSize: 32,
		fontWeight: "800",
		color: COLORS.textPrimary,
		marginBottom: 8,
	},
	subtitle: {
		fontSize: 16,
		color: COLORS.textSecondary,
	},

	sectionHeader: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 16,
		gap: 8,
	},
	sectionTitle: {
		fontSize: 18,
		fontWeight: "700",
		color: COLORS.textPrimary,
	},

	// Model Cards
	modelCard: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		backgroundColor: COLORS.surface,
		borderRadius: 12,
		padding: 16,
		marginBottom: 12,
		borderWidth: 2,
		borderColor: "transparent",
	},
	modelCardActive: {
		backgroundColor: COLORS.surfaceLight,
		borderColor: COLORS.primary,
		shadowColor: COLORS.glow,
		shadowOffset: { width: 0, height: 0 },
		shadowOpacity: 1,
		shadowRadius: 12,
		elevation: 8,
	},
	modelInfo: {
		flex: 1,
	},
	modelName: {
		fontSize: 16,
		fontWeight: "600",
		color: COLORS.textPrimary,
		marginBottom: 4,
	},
	modelDesc: {
		fontSize: 13,
		color: COLORS.textSecondary,
	},
	radio: {
		width: 24,
		height: 24,
		borderRadius: 12,
		borderWidth: 2,
		borderColor: COLORS.border,
		alignItems: "center",
		justifyContent: "center",
	},
	radioActive: {
		borderColor: COLORS.primary,
	},
	radioDot: {
		width: 12,
		height: 12,
		borderRadius: 6,
		backgroundColor: COLORS.primary,
	},

	// Param Cards
	paramCard: {
		backgroundColor: COLORS.surface,
		borderRadius: 12,
		padding: 16,
		marginBottom: 12,
	},
	paramHeader: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 12,
	},
	paramLabel: {
		fontSize: 15,
		fontWeight: "600",
		color: COLORS.textPrimary,
	},
	paramValue: {
		fontSize: 15,
		fontWeight: "700",
		color: COLORS.primary,
	},
	input: {
		backgroundColor: COLORS.surfaceLight,
		borderRadius: 8,
		padding: 12,
		color: COLORS.textPrimary,
		fontSize: 15,
		borderWidth: 1,
		borderColor: COLORS.border,
	},
	paramHint: {
		fontSize: 12,
		color: COLORS.textMuted,
		marginTop: 8,
	},
	randomBtn: {
		flexDirection: "row",
		alignItems: "center",
		gap: 4,
		backgroundColor: COLORS.surfaceLight,
		paddingHorizontal: 10,
		paddingVertical: 6,
		borderRadius: 6,
	},
	randomBtnText: {
		fontSize: 13,
		color: COLORS.primary,
		fontWeight: "600",
	},

	// Slider
	sliderContainer: {
		flexDirection: "row",
		alignItems: "center",
		gap: 12,
	},
	sliderTrack: {
		flex: 1,
		height: 4,
		backgroundColor: COLORS.border,
		borderRadius: 2,
		position: "relative",
	},
	sliderFill: {
		height: 4,
		backgroundColor: COLORS.primary,
		borderRadius: 2,
	},
	sliderThumb: {
		position: "absolute",
		right: 0,
		top: -6,
		width: 16,
		height: 16,
		borderRadius: 8,
		backgroundColor: COLORS.primary,
		borderWidth: 3,
		borderColor: COLORS.background,
	},
	sliderLabel: {
		fontSize: 13,
		color: COLORS.textMuted,
		fontWeight: "600",
	},

	// Toggle Cards
	toggleCard: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		backgroundColor: COLORS.surface,
		borderRadius: 12,
		padding: 16,
		marginBottom: 12,
	},
	toggleInfo: {
		flex: 1,
	},
	toggleLabel: {
		fontSize: 15,
		fontWeight: "600",
		color: COLORS.textPrimary,
		marginBottom: 4,
	},
	toggleDesc: {
		fontSize: 13,
		color: COLORS.textSecondary,
	},

	// Resolution
	resolutionGrid: {
		flexDirection: "row",
		gap: 12,
	},
	resolutionBtn: {
		flex: 1,
		backgroundColor: COLORS.surface,
		borderRadius: 12,
		padding: 16,
		alignItems: "center",
		borderWidth: 2,
		borderColor: "transparent",
	},
	resolutionText: {
		fontSize: 14,
		fontWeight: "600",
		color: COLORS.textPrimary,
	},

	// Reset
	resetBtn: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		gap: 8,
		marginHorizontal: 20,
		padding: 16,
		borderRadius: 12,
		borderWidth: 1,
		borderColor: COLORS.border,
	},
	resetBtnText: {
		fontSize: 15,
		fontWeight: "600",
		color: COLORS.textSecondary,
	},
});
