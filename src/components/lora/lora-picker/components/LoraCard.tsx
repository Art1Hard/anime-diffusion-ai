import { memo, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Image } from "expo-image";
import { IParsedLora } from "@/types/lora";
import COLORS from "@/constants/colors";
import { Pressable } from "react-native-gesture-handler";
import StyledText from "@/components/ui/StyledText";

type Props = {
	lora: IParsedLora;
	onPress: (lora: IParsedLora) => void;
};

const LoraCard = ({ lora, onPress }: Props) => {
	const [imgIndex, setImgIndex] = useState(0);
	const currentUri = lora.previewCandidates[imgIndex];

	return (
		<Pressable style={styles.root} onPress={() => onPress(lora)}>
			{currentUri ? (
				<Image
					source={{ uri: currentUri }}
					style={styles.preview}
					onError={() => setImgIndex((i) => i + 1)}
				/>
			) : (
				<View style={[styles.preview, styles.previewFallback]}>
					<StyledText style={styles.previewFallbackText}>LoRA</StyledText>
				</View>
			)}

			<View style={styles.info}>
				<StyledText variant="small" style={styles.name} numberOfLines={1}>
					{lora.name || lora.alias}
				</StyledText>

				{lora.baseModel ? (
					<StyledText variant="micro" style={styles.baseModel}>
						{lora.baseModel}
					</StyledText>
				) : null}

				{lora.triggerWords.length > 0 && (
					<View style={styles.tagsRow}>
						{lora.triggerWords.slice(0, 4).map((tag) => (
							<View key={tag} style={styles.tag}>
								<Text style={styles.tagText} numberOfLines={1}>
									{tag}
								</Text>
							</View>
						))}
					</View>
				)}
			</View>
		</Pressable>
	);
};

export default memo(LoraCard);

const styles = StyleSheet.create({
	root: {
		flexDirection: "row",
		gap: 12,
		paddingVertical: 10,
		paddingHorizontal: 12,
		borderRadius: 12,
		backgroundColor: COLORS.surfaceLight,
	},
	preview: { width: 56, height: 56, borderRadius: 8 },
	previewFallback: {
		backgroundColor: COLORS.surfaceLighter,
		alignItems: "center",
		justifyContent: "center",
	},
	previewFallbackText: {
		color: COLORS.textSecondary,
		fontSize: 11,
		fontWeight: "600",
	},
	info: { flex: 1, justifyContent: "center" },
	name: { fontWeight: "600", marginBottom: 2 },
	baseModel: { color: COLORS.textSecondary },
	tagsRow: {
		flexDirection: "row",
		overflow: "hidden",
		borderTopRightRadius: 12,
		borderBottomRightRadius: 12,
		gap: 6,
		marginTop: 6,
	},
	tag: {
		backgroundColor: COLORS.surfaceLighter,
		borderRadius: 6,
		paddingHorizontal: 6,
		paddingVertical: 2,
	},
	tagText: { color: COLORS.textSecondary, fontSize: 10 },
});
