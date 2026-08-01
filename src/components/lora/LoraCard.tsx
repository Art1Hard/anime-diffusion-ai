import React, { useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { IParsedLora } from "@/types/lora";

type Props = {
	lora: IParsedLora;
	onPress: (lora: IParsedLora) => void;
};

const LoraCard = ({ lora, onPress }: Props) => {
	const [imgIndex, setImgIndex] = useState(0);
	const currentUri = lora.previewCandidates[imgIndex];

	return (
		<Pressable style={styles.card} onPress={() => onPress(lora)}>
			{currentUri ? (
				<Image
					source={{ uri: currentUri }}
					style={styles.preview}
					onError={() => setImgIndex((i) => i + 1)}
				/>
			) : (
				<View style={[styles.preview, styles.previewFallback]}>
					<Text style={styles.previewFallbackText}>LoRA</Text>
				</View>
			)}

			<View style={styles.info}>
				<Text style={styles.name} numberOfLines={1}>
					{lora.alias || lora.name}
				</Text>

				{lora.baseModel ? (
					<Text style={styles.baseModel}>{lora.baseModel}</Text>
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

export default LoraCard;

const styles = StyleSheet.create({
	card: {
		flexDirection: "row",
		gap: 12,
		paddingVertical: 10,
		paddingHorizontal: 12,
		borderRadius: 12,
		backgroundColor: "#1c1c1e",
		marginBottom: 8,
	},
	preview: { width: 56, height: 56, borderRadius: 8 },
	previewFallback: {
		backgroundColor: "#333",
		alignItems: "center",
		justifyContent: "center",
	},
	previewFallbackText: { color: "#888", fontSize: 11, fontWeight: "600" },
	info: { flex: 1, justifyContent: "center" },
	name: { color: "#fff", fontSize: 14, fontWeight: "600" },
	baseModel: { color: "#888", fontSize: 11, marginTop: 2 },
	tagsRow: { flexDirection: "row", flexWrap: "wrap", gap: 6, marginTop: 6 },
	tag: {
		backgroundColor: "#2c2c2e",
		borderRadius: 6,
		paddingHorizontal: 6,
		paddingVertical: 2,
	},
	tagText: { color: "#aaa", fontSize: 10 },
});
