import { View } from "react-native";
import COLORS from "@/constants/colors";
import { useEffect } from "react";
import Animated, {
	useSharedValue,
	useAnimatedStyle,
	withTiming,
	Easing,
} from "react-native-reanimated";

interface ProgressBarProps {
	progress: number;
}

const ProgressBar = ({ progress }: ProgressBarProps) => {
	const animated = useSharedValue(0);

	useEffect(() => {
		animated.value = withTiming(progress, {
			duration: 300,
			easing: Easing.out(Easing.ease),
		});
	}, [progress]);

	const animatedStyle = useAnimatedStyle(() => {
		return {
			width: `${animated.value * 100}%`,
		};
	});

	return (
		<View
			style={{
				width: "100%",
				height: 6,
				backgroundColor: COLORS.surfaceLight,
				borderRadius: 6,
				overflow: "hidden",
			}}>
			<Animated.View
				style={[
					{
						height: "100%",
						backgroundColor: COLORS.primary,
					},
					animatedStyle,
				]}
			/>
		</View>
	);
};

export default ProgressBar;
