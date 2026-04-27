import { useEffect, useRef } from "react";
import { Animated } from "react-native";

const useGlowBadge = () => {
	const glow = useRef(new Animated.Value(0.5)).current;

	useEffect(() => {
		Animated.loop(
			Animated.sequence([
				Animated.timing(glow, {
					toValue: 1,
					duration: 1000,
					useNativeDriver: true,
				}),
				Animated.timing(glow, {
					toValue: 0.5,
					duration: 1000,
					useNativeDriver: true,
				}),
			]),
		).start();
	}, []);

	return glow;
};

export default useGlowBadge;
