import COLORS from "@/constants/colors";
import { ActivityIndicator, Keyboard, Pressable, View } from "react-native";
import StyledButton from "@/components/ui/StyledButton";
import ScreenContainer from "@/components/ui/ScreenContainer";
import { Image } from "expo-image";
import useGeneration from "./hooks/useGeneration";
import { saveImageToGallery } from "@/utils/image-process";
import GenerationFields from "./components/GenerationFields/GenerationFields";
import { useRouter } from "expo-router";

const GenerationScreen = () => {
	const { loading, image, generate } = useGeneration();
	const router = useRouter();

	return (
		<ScreenContainer>
			<GenerationFields style={{ marginBottom: 15 }} />

			<View
				style={{
					width: "100%",
					marginBottom: 15,
					justifyContent: "center",
					alignItems: "center",
					flex: 1,
				}}>
				{loading ? (
					<ActivityIndicator
						color={COLORS.primary}
						size={50}
						style={{ height: "100%" }}
					/>
				) : (
					image && (
						<>
							<Pressable
								onPress={() => router.push("/image-viewer")}
								style={{ width: "100%", height: "100%", position: "relative" }}>
								<Image
									contentFit="contain"
									source={{ uri: image }}
									style={{
										width: "100%",
										height: "100%",
										marginBottom: 10,
									}}
								/>
							</Pressable>
						</>
					)
				)}
			</View>

			<View
				style={{
					flexDirection: "row",
					gap: 12,
				}}>
				<StyledButton
					disabled={loading}
					title="Generate"
					onPress={generate}
					style={{ flex: 1.9 }}
					icon={{ name: "color-wand", size: 20 }}
				/>
				<StyledButton
					disabled={!image || loading}
					variant="success"
					style={{
						flex: 1.1,
						justifyContent: "center",
					}}
					onPress={() => {
						if (!image) return;

						Keyboard.dismiss();
						saveImageToGallery(image);
					}}
					icon={{ name: "images", size: 20 }}
					title="Save"
				/>
			</View>
		</ScreenContainer>
	);
};

export default GenerationScreen;
