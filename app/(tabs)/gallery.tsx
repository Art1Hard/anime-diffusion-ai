import COLORS from "@/shared/styles/colors";
import { useGalleryStore } from "@/store/useGalleryStore";
import { useState } from "react";
import { Image } from "expo-image";
import {
	View,
	FlatList,
	Pressable,
	Modal,
	StyleSheet,
	Dimensions,
} from "react-native";

const { width } = Dimensions.get("window");
const listGap = 4;
const viewHorizontalPadding = 15;
const ITEM_SIZE = width / 2 - listGap - viewHorizontalPadding;

export default function GalleryScreen() {
	const [selected, setSelected] = useState<string | null>(null);
	const images = useGalleryStore((s) => s.images);

	return (
		<View style={styles.container}>
			<FlatList
				data={images}
				numColumns={2}
				showsVerticalScrollIndicator={false}
				keyExtractor={(item) => item.id}
				contentContainerStyle={styles.list}
				renderItem={({ item }) => (
					<Pressable onPress={() => setSelected(item.uri)}>
						<Image
							source={{ uri: `data:image/png;base64,${item.uri}` }}
							cachePolicy="memory-disk"
							contentFit="cover"
							style={styles.image}
						/>
					</Pressable>
				)}
			/>

			<Modal visible={!!selected} transparent>
				<Pressable style={styles.modal} onPress={() => setSelected(null)}>
					<Image
						source={{ uri: `data:image/png;base64,${selected}` }}
						contentFit="contain"
						style={styles.fullImage}
					/>
				</Pressable>
			</Modal>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: COLORS.background,
		paddingHorizontal: viewHorizontalPadding,
	},
	list: {
		paddingVertical: 20,
		margin: -listGap,
	},
	image: {
		width: ITEM_SIZE,
		height: ITEM_SIZE,
		borderRadius: 10,
		margin: listGap,
	},
	modal: {
		flex: 1,
		backgroundColor: COLORS.overlay,
		justifyContent: "center",
		alignItems: "center",
	},
	fullImage: {
		width: "90%",
		height: "70%",
		borderRadius: 12,
	},
});
