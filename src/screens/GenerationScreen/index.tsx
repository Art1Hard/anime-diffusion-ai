import COLORS from "@/constants/colors";
import { ActivityIndicator, Keyboard, Pressable, View } from "react-native";
import saveImage from "@/utils/save-image";
import StyledButton from "@/components/ui/StyledButton";
import StyledTextInput from "@/components/ui/StyledTextInput";
import ScreenContainer from "@/components/ui/ScreenContainer";
import StyledText from "@/components/ui/StyledText";
import { MODEL_PRESETS } from "@/constants/model-presets";
import { useRouter } from "expo-router";
import { Image } from "expo-image";
import useGeneration from "./hooks/useGeneration";

const GenerationScreen = () => {
	const router = useRouter();
	const { selectedModel, prompts, setPrompts, loading, image, generate } =
		useGeneration();

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
				value={prompts.positive}
				onChangeText={(positive) => setPrompts((p) => ({ ...p, positive }))}
				placeholder="Please enter any prompt..."
				multiline
				numberOfLines={4}
				textAlignVertical="top"
				style={{ marginBottom: 10, height: 100 }}
			/>

			<StyledTextInput
				value={prompts.negative}
				onChangeText={(negative) => setPrompts((p) => ({ ...p, negative }))}
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
					onPress={generate}
					style={{ width: "60%" }}
					icon={{ name: "color-wand", size: 20 }}
				/>
				<StyledButton
					disabled={!image || loading}
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
