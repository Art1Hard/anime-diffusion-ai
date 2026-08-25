import COLORS from "@/constants/colors";
import { useGalleryStore } from "@/store";
import { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { CONTAINER_SIZES } from "@/constants/sizes";
import GalleryList from "./GalleryList";
import GallerySelectionHeader from "./GallerySelectionHeader";
import { initDatabase } from "@/database";

const GalleryScreen = () => {
	const [ready, setReady] = useState(false);
	const loadImages = useGalleryStore((s) => s.loadImages);

	useEffect(() => {
		initDatabase()
			.then(() => loadImages())
			.then(() => setReady(true))
			.catch((e) => console.error("DB init failed", e));
	}, []);

	if (!ready) return null;

	return (
		<View style={styles.root}>
			<GallerySelectionHeader />
			<GalleryList />
		</View>
	);
};

const styles = StyleSheet.create({
	root: {
		flex: 1,
		backgroundColor: COLORS.background,
		paddingHorizontal: CONTAINER_SIZES.horizontalPadding,
	},
});

export default GalleryScreen;
