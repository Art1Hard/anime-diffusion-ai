import COLORS from "@/constants/colors";
import { useGenerationStore } from "@/store/generation";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import ImageViewer from "react-native-image-zoom-viewer";

const imageViewer = () => {
	const [showDetails, setShowDetails] = useState(false);
	const image = useGenerationStore((gs) => gs.image);
	const lastImageParams = useGenerationStore((gs) => gs.lastImageParams);
	const router = useRouter();

	if (!image) {
		return null;
	}

	return (
		<View
			style={{
				flex: 1,
				backgroundColor: "black",
			}}>
			<ImageViewer
				minScale={0.7}
				maxScale={5}
				imageUrls={[{ url: image }]}
				enableSwipeDown
				swipeDownThreshold={120}
				onCancel={() => {
					router.back();
				}}
				renderImage={(props) => <Image {...props} />}
				maxOverflow={50}
				renderIndicator={() => <></>}
				saveToLocalByLongPress={false}
				backgroundColor="transparent"
				onClick={() => setShowDetails(!showDetails)}
				renderHeader={() => (
					<>
						{showDetails && (
							<View
								style={{
									position: "absolute",
									zIndex: 100000,
									left: 0,
									right: 0,
									bottom: 0,
									maxHeight: "30%",
									backgroundColor: "rgba(0,0,0,0.6)",
								}}>
								<ScrollView
									nestedScrollEnabled
									contentContainerStyle={{
										padding: 15,
									}}>
									<Text
										style={{
											color: "white",
											fontSize: 15,
											fontWeight: "700",
											marginBottom: 10,
										}}>
										Параметры генерации
									</Text>

									{lastImageParams &&
										Object.entries(lastImageParams).map(([key, value]) => (
											<Text
												key={key}
												style={{
													color: "#ccc",
													fontSize: 13,
													marginBottom: 4,
												}}>
												<Text
													style={{
														color: COLORS.primary || "red",
														fontWeight: "700",
													}}>
													{key}:{" "}
												</Text>
												{String(value)}
											</Text>
										))}
								</ScrollView>
							</View>
						)}
					</>
				)}
			/>
		</View>
	);
};

export default imageViewer;
