import { View, ViewProps } from "react-native";
import { ActivityIndicator } from "react-native";
import COLORS from "@/constants/colors";
import { Image } from "expo-image";
import ProgressBar from "../../../components/ui/ProgressBar";
import { useGenerationStore } from "@/store";

const GenerationPreviewLoader = ({ style, ...props }: ViewProps) => {
	const progress = useGenerationStore((gs) => gs.progress);
	const previewImage = useGenerationStore((gs) => gs.previewImage);

	return (
		<View
			style={[{ alignItems: "center", gap: 15, width: "100%" }, style]}
			{...props}>
			{previewImage ? (
				<Image
					source={{ uri: `data:image/png;base64,${previewImage}` }}
					style={{
						width: "100%",
						height: "92%",
					}}
					contentFit="contain"
				/>
			) : (
				<ActivityIndicator
					color={COLORS.primary}
					style={{ height: "92%" }}
					size="large"
				/>
			)}

			<ProgressBar progress={progress} />
		</View>
	);
};

export default GenerationPreviewLoader;
