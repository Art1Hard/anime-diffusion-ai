import StyledText from "@/components/ui/StyledText";
import StyledTextInput from "@/components/ui/StyledTextInput";
import { useRouter } from "expo-router";
import { Keyboard, Pressable, View, ViewProps } from "react-native";
import styles from "./styles";
import COLORS from "@/constants/colors";
import useGenerationFields from "@/screens/GenerationScreen/hooks/useGenerationFields";

const GenerationFields = (props: ViewProps) => {
	const {
		prompt,
		setPrompt,
		negativePrompt,
		setNegativePrompt,
		selectedModelName,
	} = useGenerationFields();

	const router = useRouter();

	return (
		<View {...props}>
			<Pressable
				onPress={() => {
					Keyboard.dismiss();
					router.push("/settings");
				}}
				style={styles.model}>
				<StyledText
					center
					variant="micro"
					style={{ color: COLORS.textSecondary }}>
					Selected model:
				</StyledText>
				<StyledText center variant="small">
					{selectedModelName}
				</StyledText>
			</Pressable>

			<StyledTextInput
				value={prompt}
				onChangeText={(value) => setPrompt(value)}
				placeholder="Please enter any prompt..."
				multiline
				numberOfLines={4}
				textAlignVertical="top"
				style={{ marginBottom: 10, height: 100 }}
			/>

			<StyledTextInput
				value={negativePrompt}
				onChangeText={(value) => setNegativePrompt(value)}
				autoCapitalize="none"
				placeholder="You can enter negative prompt..."
			/>
		</View>
	);
};

export default GenerationFields;
