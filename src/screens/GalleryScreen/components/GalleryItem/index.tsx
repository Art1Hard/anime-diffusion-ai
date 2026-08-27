import { IImageItem } from "@/types/model-presets";
import { Image } from "expo-image";
import { memo } from "react";
import { Pressable, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "./styles";
import COLORS from "@/constants/colors";

interface GalleryItemProps {
	item: IImageItem;
	index: number;
	isSelected: boolean;
	selectionMode: boolean;
	onPress: (item: IImageItem, index: number) => void;
	onLongPress: (item: IImageItem) => void;
}

const GalleryItem = ({
	item,
	index,
	isSelected,
	selectionMode,
	onPress,
	onLongPress,
}: GalleryItemProps) => {
	return (
		<Pressable
			onPress={() => onPress(item, index)}
			onLongPress={() => onLongPress(item)}
			delayLongPress={250}>
			<View>
				<Image
					source={{ uri: item.uri }}
					cachePolicy="memory-disk"
					contentFit="cover"
					style={[styles.image, isSelected && styles.imageSelected]}
				/>
				{selectionMode && (
					<View
						style={[
							styles.checkCircle,
							isSelected && styles.checkCircleActive,
						]}>
						{isSelected && (
							<Ionicons name="checkmark" size={14} color={COLORS.textPrimary} />
						)}
					</View>
				)}
			</View>
		</Pressable>
	);
};

export default memo(GalleryItem);
