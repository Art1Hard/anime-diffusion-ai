import { View, ViewProps } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import COLORS from "@/constants/colors";

interface ScreenContainerProps extends ViewProps {
	edges?: ("bottom" | "top")[];
}

const BASE_PADDING = 20;
const HORIZONTAL_PADDING = 15;

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
					paddingHorizontal: HORIZONTAL_PADDING,
					paddingTop: BASE_PADDING + (hasTop ? insets.top : 0),
					paddingBottom: BASE_PADDING + (hasBottom ? insets.bottom : 0),
				},
				style,
			]}
			{...props}
		/>
	);
};

export default ScreenContainer;
