import COLORS from "@/constants/colors";
import { View, ViewProps } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface ScreenContainerProps extends ViewProps {
	extendedBottom?: boolean;
	edges?: ("bottom" | "top")[];
}

const ScreenContainer = ({ edges, style, ...props }: ScreenContainerProps) => {
	const insets = useSafeAreaInsets();

	return (
		<View
			style={[
				{
					paddingHorizontal: 15,
					paddingVertical: 20,
					paddingBottom: 21 + (edges?.includes("bottom") ? insets.bottom : 0),
					flex: 1,
					backgroundColor: COLORS.background,
				},
				style,
			]}
			{...props}
		/>
	);
};

export default ScreenContainer;
