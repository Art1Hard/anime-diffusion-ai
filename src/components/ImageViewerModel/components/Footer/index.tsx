import StyledButton from "@/components/ui/StyledButton";
import { useGenerationStore } from "@/store";
import { ITxt2ImgPayload } from "@/types/model-presets";
import { useRouter } from "expo-router";
import { ViewProps } from "react-native";
import { SystemBars } from "react-native-edge-to-edge";
import Animated, {
	SharedValue,
	useAnimatedStyle,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./styles";
import { saveImageToGallery } from "@/utils/image-process";

interface FooterProps extends ViewProps {
	progress: SharedValue<number>;
	lastImageParams: ITxt2ImgPayload | null;
}

const Footer = ({
	progress,
	lastImageParams,
	style,
	...props
}: FooterProps) => {
	const router = useRouter();

	const image = useGenerationStore((gs) => gs.image);
	const generate = useGenerationStore((gs) => gs.generate);

	const footerStyle = useAnimatedStyle(() => ({
		opacity: progress.value,
		transform: [{ translateY: (1 - progress.value) * 160 }],
	}));

	return (
		<Animated.View style={footerStyle}>
			<SafeAreaView
				edges={["bottom"]}
				style={[styles.container, style]}
				{...props}>
				{!lastImageParams?.enableHr && (
					<StyledButton
						title="Hires fix"
						icon={{ name: "trending-up-outline", size: 20 }}
						onPress={() => {
							SystemBars.setHidden(false);
							generate(true);
							router.back();
						}}
						style={styles.hiresBtn}
					/>
				)}

				<StyledButton
					title="Save image"
					icon={{ name: "save-outline", size: 20 }}
					variant="success"
					onPress={() => saveImageToGallery(image)}
					style={styles.saveBtn}
				/>
			</SafeAreaView>
		</Animated.View>
	);
};

export default Footer;
