import StyledButton from "@/components/ui/StyledButton";
import { useGalleryStore, useGenerationStore } from "@/store";
import { IImageItem } from "@/types/model-presets";
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
	image: IImageItem;
	progress: SharedValue<number>;
}

const Footer = ({ progress, image, style, ...props }: FooterProps) => {
	const router = useRouter();

	const removeImg = useGalleryStore((gs) => gs.removeImage);

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
				<StyledButton
					variant="error"
					icon={{ name: "trash", size: 20 }}
					onPress={() => {
						SystemBars.setHidden(false);
						removeImg(image.id);
						router.back();
					}}
					style={styles.deleteBtn}
				/>

				<StyledButton
					title="Save image"
					icon={{ name: "save-outline", size: 20 }}
					variant="success"
					onPress={() => saveImageToGallery(image.uri)}
					style={styles.saveBtn}
				/>
			</SafeAreaView>
		</Animated.View>
	);
};

export default Footer;
