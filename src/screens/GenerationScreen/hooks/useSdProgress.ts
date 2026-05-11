import { useRef } from "react";
import sdApi from "@/api/interceptors";
import { IProgressResponse } from "@/types/model-presets";

export const useSdProgress = ({
	onProgress,
	onPreview,
}: {
	onProgress: (p: number) => void;
	onPreview: (img: string | null) => void;
}) => {
	const intervalRef = useRef<NodeJS.Timeout | null>(null);
	const lastProgressRef = useRef(0);

	const start = () => {
		lastProgressRef.current = 0;
		onProgress(0);
		onPreview(null);

		if (intervalRef.current) clearInterval(intervalRef.current);

		intervalRef.current = setInterval(async () => {
			try {
				const res = await sdApi.get<IProgressResponse>("/progress");
				const data = res.data;

				const next = Math.max(lastProgressRef.current, data.progress);
				lastProgressRef.current = next;
				onProgress(next);

				if (data.currentImage) {
					onPreview(`data:image/png;base64,${data.currentImage}`);
				}

				if (data.state?.jobCount === 0) {
					stop();
				}
			} catch {
				stop();
			}
		}, 700);
	};

	const stop = () => {
		if (intervalRef.current) {
			clearInterval(intervalRef.current);
			intervalRef.current = null;
		}
	};

	return { start, stop };
};
