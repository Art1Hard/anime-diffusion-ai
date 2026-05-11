import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { View } from "react-native";
import ImageViewer from "react-native-image-zoom-viewer";
import styles from "./styles";
import { Footer, Header } from "./components";
import useImageViewerModel from "./hooks/useImageViewerModel";

const ImageViewerModel = () => {
	const router = useRouter();

	const { image, lastImageParams, progress, hideDetails, toggleDetails } =
		useImageViewerModel();

	if (!image) {
		return null;
	}

	return (
		<View style={styles.root}>
			<ImageViewer
				minScale={0.7}
				maxScale={5}
				imageUrls={[{ url: image }]}
				enableSwipeDown
				swipeDownThreshold={120}
				onCancel={() => router.back()}
				onSwipeDown={hideDetails}
				renderHeader={() => (
					<Header progress={progress} lastImageParams={lastImageParams} />
				)}
				renderFooter={() => (
					<Footer progress={progress} lastImageParams={lastImageParams} />
				)}
				renderImage={(props) => <Image {...props} />}
				maxOverflow={50}
				renderIndicator={() => <></>}
				saveToLocalByLongPress={false}
				doubleClickInterval={200}
				onClick={toggleDetails}
			/>
		</View>
	);
};

export default ImageViewerModel;
