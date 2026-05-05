import { View } from "react-native";
import COLORS from "@/constants/colors";

interface ProgressBarProps {
	progress: number;
}

const ProgressBar = ({ progress }: ProgressBarProps) => {
	return (
		<View
			style={{
				width: "100%",
				height: 6,
				backgroundColor: COLORS.surfaceLight,
				borderRadius: 6,
				overflow: "hidden",
			}}>
			<View
				style={{
					width: `${Math.min(progress * 100, 100)}%`,
					height: "100%",
					backgroundColor: COLORS.primary,
				}}
			/>
		</View>
	);
};

export default ProgressBar;
