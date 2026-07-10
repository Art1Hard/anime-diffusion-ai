import COLORS from "@/constants/colors";
import { ITxt2ImgPayload } from "@/types/model-presets";
import { ScrollView, Text, ViewProps } from "react-native";
import Animated, {
	SharedValue,
	useAnimatedStyle,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./styles";
import StyledText from "@/components/ui/StyledText";

interface HeaderProps extends ViewProps {
	progress: SharedValue<number>;
	lastImageParams: ITxt2ImgPayload | null;
}

const Header = ({
	progress,
	lastImageParams,
	style,
	...props
}: HeaderProps) => {
	const headerStyle = useAnimatedStyle(() => ({
		opacity: progress.value,
		transform: [{ translateY: (1 - progress.value) * -80 }],
	}));

	return (
		<Animated.View style={[styles.root, headerStyle, style]} {...props}>
			<SafeAreaView edges={["top"]} style={styles.container}>
				<ScrollView nestedScrollEnabled contentContainerStyle={styles.scroll}>
					<StyledText variant="subtitle" style={{ marginBottom: 10 }}>
						Параметры генерации
					</StyledText>
					{lastImageParams &&
						Object.entries(lastImageParams).map(([key, value]) => (
							<StyledText variant="micro" key={key} style={{ marginBottom: 5 }}>
								<Text
									style={{
										color: COLORS.primary,
										fontWeight: "700",
									}}>
									{key}:{" "}
								</Text>
								{String(value)}
							</StyledText>
						))}
				</ScrollView>
			</SafeAreaView>
		</Animated.View>
	);
};

export default Header;
