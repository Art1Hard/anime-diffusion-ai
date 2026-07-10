import COLORS from "@/constants/colors";
import { useGalleryStore } from "@/store";
import { useEffect, useState } from "react";
import { Image } from "expo-image";
import {
	View,
	FlatList,
	Pressable,
	Modal,
	StyleSheet,
	Dimensions,
} from "react-native";
import { initDatabase } from "@/database";
import { useRouter } from "expo-router";
import { ROUTES } from "@/constants/routes";

const { width } = Dimensions.get("window");
const listGap = 4;
const viewHorizontalPadding = 15;
const ITEM_SIZE = width / 2 - listGap - viewHorizontalPadding;

export default function Route() {
	const [ready, setReady] = useState(false);
	const loadImages = useGalleryStore((s) => s.loadImages);
	const route = useRouter();

	useEffect(() => {
		initDatabase()
			.then(() => loadImages())
			.then(() => setReady(true))
			.catch((e) => console.error("DB init failed", e));
	}, []);

	const [selected, setSelected] = useState<string | null>(null);
	const images = useGalleryStore((s) => s.images);

	if (!ready) return null;

	return (
		<View style={styles.container}>
			<FlatList
				data={images}
				numColumns={2}
				showsVerticalScrollIndicator={false}
				keyExtractor={(item) => item.id.toString()}
				contentContainerStyle={styles.list}
				renderItem={({ item, index }) => (
					<Pressable
						onPress={() =>
							route.push({
								pathname: ROUTES.IMAGE_VIEWER_GALLERY,
								params: {
									index: index.toString(),
								},
							})
						}>
						<Image
							source={{ uri: item.uri }}
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
						source={{ uri: selected }}
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
