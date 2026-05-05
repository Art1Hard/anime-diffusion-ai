import COLORS from "@/constants/colors";
import { TAB_SIZES } from "@/constants/sizes";
import { View, ViewProps } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface ScreenContainerProps extends ViewProps {
	extendedBottom?: boolean;
}

const ScreenContainer = ({
	extendedBottom,
	style,
	...props
}: ScreenContainerProps) => {
	const insets = useSafeAreaInsets();

	return (
		<View
			style={[
				{
					paddingHorizontal: 15,
					paddingVertical: 20,
					paddingBottom:
						20 + (extendedBottom ? TAB_SIZES.height : 0) + insets.bottom,
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
