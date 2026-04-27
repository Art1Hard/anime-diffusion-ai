import COLORS from "@/shared/styles/colors";
import { View, ViewProps } from "react-native";

const ScreenContainer = ({ style, ...props }: ViewProps) => {
	return (
		<View
			style={[
				{
					paddingHorizontal: 15,
					paddingVertical: 20,
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
