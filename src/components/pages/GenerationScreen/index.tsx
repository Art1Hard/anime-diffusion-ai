import { generateImage } from "@/api/generate";
import COLORS from "@/shared/styles/colors";
import { useState } from "react";
import { ActivityIndicator, Keyboard, Pressable, View } from "react-native";
import saveImage from "@/shared/utils/save-image";
import StyledButton from "@/components/ui/StyledButton";
import StyledTextInput from "@/components/ui/StyledTextInput";
import { useGenerationStore } from "@/store/useGenerationStore";
import ScreenContainer from "@/components/ui/ScreenContainer";
import StyledText from "@/components/ui/StyledText";
import { useGenerationSettingsStore } from "@/store/useGenerationSettingsStore";
import { MODEL_PRESETS } from "@/shared/data/model-presets";
import { useRouter } from "expo-router";
import { Image } from "expo-image";

const GenerationScreen = () => {
	const selectedModel = useGenerationSettingsStore((gss) => gss.selectedModel);

	const router = useRouter();

	const [prompt, setPrompt] = useState("");
	const [negativePrompt, setNegativePrompt] = useState("");
	const [loading, setLoading] = useState(false);
	const image = useGenerationStore((gs) => gs.image);
	const setImage = useGenerationStore((gs) => gs.setImage);

	const onGenerate = async () => {
		setLoading(true);
		try {
			const data = await generateImage({
				prompt,
				negative: negativePrompt,
				modelPath: selectedModel,
			});
			const base64 = data.images[0];
			setImage(base64);
		} catch (e) {
			console.log(e);
		} finally {
			setLoading(false);
		}
	};

	return (
		<ScreenContainer>
			<Pressable
				onPress={() => router.push("/settings")}
				style={{
					padding: 10,
					marginBottom: 10,
					borderWidth: 1,
					borderColor: COLORS.border,
					borderRadius: 5,
					gap: 5,
				}}>
				<StyledText
					center
					variant="micro"
					style={{ color: COLORS.textSecondary }}>
					Selected model:
				</StyledText>
				<StyledText center variant="small">
					{MODEL_PRESETS.find((preset) => preset.path === selectedModel)!.name}
				</StyledText>
			</Pressable>

			<StyledTextInput
				value={prompt}
				onChangeText={setPrompt}
				placeholder="Please enter any prompt..."
				multiline
				numberOfLines={4}
				textAlignVertical="top"
				style={{ marginBottom: 10, height: 100 }}
			/>

			<StyledTextInput
				value={negativePrompt}
				onChangeText={setNegativePrompt}
				autoCapitalize="none"
				placeholder="You can enter negative prompt..."
				style={{ marginBottom: 15 }}
			/>

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
						<View
							style={{ width: "100%", height: "100%", position: "relative" }}>
							<Image
								contentFit="contain"
								source={{ uri: `data:image/png;base64,${image}` }}
								style={{
									width: "100%",
									height: "100%",
									marginBottom: 10,
								}}
							/>
						</View>
					)
				)}
			</View>

			<View style={{ flexDirection: "row", gap: "2%" }}>
				<StyledButton
					disabled={loading}
					title="Generate"
					onPress={onGenerate}
					style={{ width: "60%" }}
					icon={{ name: "color-wand", size: 20 }}
				/>
				<StyledButton
					disabled={image && !loading ? false : true}
					variant="success"
					style={{
						width: "38%",
						justifyContent: "center",
					}}
					onPress={() => {
						if (!image) return;

						Keyboard.dismiss();
						saveImage(image);
					}}
					icon={{ name: "images", size: 20 }}
					title="Save"
				/>
			</View>
		</ScreenContainer>
	);
};

export default GenerationScreen;
