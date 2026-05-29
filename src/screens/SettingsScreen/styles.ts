import { StyleSheet } from "react-native";
import COLORS from "@/constants/colors";

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
		gap: 12,
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
		borderRadius: 8,
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

export default styles;
