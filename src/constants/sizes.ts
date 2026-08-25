import { Dimensions } from "react-native";
const { width } = Dimensions.get("window");

export const FONT_SIZES = {
	title: 20,
	subtitle: 18,
	base: 16,
	small: 14,
	micro: 12,
	nano: 8,
};

export const GALLERY_SIZES = {
	listGap: 4,
	getItemSize: () => width / 3 - CONTAINER_SIZES.horizontalPadding,
};

export const CONTAINER_SIZES = {
	basePadding: 20,
	horizontalPadding: 15,
};
