import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { View } from "react-native";
import ImageViewer from "react-native-image-zoom-viewer";
import styles from "./styles";
import { Footer, Header } from "./components";
import useImageViewerModel from "./hooks/useImageViewerModel";
import { useGalleryStore } from "@/store";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";

const ImageViewerModel = () => {
	const { index } = useLocalSearchParams();
	const router = useRouter();
	const initialIndex = Number(index ?? 0);
	const [currentIndex, setCurrentIndex] = useState(initialIndex);

	const { lastImageParams, progress, hideDetails, toggleDetails } =
		useImageViewerModel();

	const images = useGalleryStore((s) => s.images);

	const imageUrls = images.map(({ uri }) => ({
		url: uri,
	}));

	if (!images) {
		return null;
	}

	return (
		<View style={styles.root}>
			<ImageViewer
				minScale={0.7}
				maxScale={5}
				imageUrls={imageUrls}
				index={initialIndex}
				enableSwipeDown
				swipeDownThreshold={120}
				onCancel={() => router.back()}
				onSwipeDown={hideDetails}
				onChange={(index) => {
					if (index != null) {
						setCurrentIndex(index);
					}
				}}
				renderHeader={() => (
					<Header progress={progress} lastImageParams={lastImageParams} />
				)}
				renderFooter={() => (
					<Footer image={images[currentIndex]} progress={progress} />
				)}
				renderImage={(props) => <Image {...props} />}
				maxOverflow={200}
				renderIndicator={() => <></>}
				saveToLocalByLongPress={false}
				doubleClickInterval={200}
				onClick={toggleDetails}
			/>
		</View>
	);
};

export default ImageViewerModel;
