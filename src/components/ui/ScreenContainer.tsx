import { View, ViewProps } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import COLORS from "@/constants/colors";
import { CONTAINER_SIZES } from "@/constants/sizes";

interface ScreenContainerProps extends ViewProps {
	edges?: ("bottom" | "top")[];
}

const ScreenContainer = ({
	edges = [],
	style,
	...props
}: ScreenContainerProps) => {
	const insets = useSafeAreaInsets();
	const hasTop = edges.includes("top");
	const hasBottom = edges.includes("bottom");

	return (
		<View
			style={[
				{
					flex: 1,
					backgroundColor: COLORS.background,
					paddingHorizontal: CONTAINER_SIZES.horizontalPadding,
					paddingTop: CONTAINER_SIZES.basePadding + (hasTop ? insets.top : 0),
					paddingBottom:
						CONTAINER_SIZES.basePadding + (hasBottom ? insets.bottom : 0),
				},
				style,
			]}
			{...props}
		/>
	);
};

export default ScreenContainer;
