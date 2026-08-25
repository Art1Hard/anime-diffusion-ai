import { GALLERY_SIZES } from "@/constants/sizes";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
	list: {
		paddingVertical: 20,
		paddingBottom: 15,
		margin: -GALLERY_SIZES.listGap,
	},
});

export default styles;
