import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { Pressable, View, ViewProps } from "react-native";
import styles from "./styles";
import { ROUTES } from "@/constants/routes";
import GenerationPreviewLoader from "@/screens/GenerationScreen/components/GenerationPreviewLoader";

interface GenerationOutputProps extends ViewProps {
	isLoading: boolean;
	image: string | null;
}

const GenerationOutput = ({
	image,
	isLoading,
	style,
	...props
}: GenerationOutputProps) => {
	const router = useRouter();

	return (
		<View style={[styles.root, style]} {...props}>
			{isLoading && <GenerationPreviewLoader />}

			{!isLoading && image && (
				<Pressable
					onPress={() => router.push(ROUTES.IMAGE_VIEWER)}
					style={styles.imgBtn}>
					<Image
						contentFit="contain"
						source={{ uri: image }}
						style={styles.image}
					/>
				</Pressable>
			)}
		</View>
	);
};

export default GenerationOutput;
