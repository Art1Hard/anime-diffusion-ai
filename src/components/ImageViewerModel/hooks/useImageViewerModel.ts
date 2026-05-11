import { useGenerationStore } from "@/store/generation";
import { useEffect, useState } from "react";
import { SystemBars } from "react-native-edge-to-edge";
import { Easing, useSharedValue, withTiming } from "react-native-reanimated";

const useImageViewerModel = () => {
	const [isDetails, setIsDetails] = useState(true);
	const image = useGenerationStore((gs) => gs.image);
	const lastImageParams = useGenerationStore((gs) => gs.lastImageParams);

	const progress = useSharedValue(1);

	const showDetails = () => setIsDetails(true);
	const hideDetails = () => setIsDetails(false);
	const toggleDetails = () => setIsDetails((value) => !value);

	useEffect(() => {
		SystemBars.setHidden({ statusBar: !isDetails });

		return () => SystemBars.setHidden(false);
	}, [isDetails]);

	useEffect(() => {
		SystemBars.setHidden({ statusBar: !isDetails });
		progress.value = withTiming(isDetails ? 1 : 0, {
			duration: 200,
			easing: Easing.inOut(Easing.ease),
		});
		return () => SystemBars.setHidden(false);
	}, [isDetails]);

	return {
		image,
		lastImageParams,
		progress,
		isDetails,
		showDetails,
		hideDetails,
		toggleDetails,
	};
};

export default useImageViewerModel;
