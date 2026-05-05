import { useRef } from "react";
import sdApi from "@/api/interceptors";

export const useSdProgress = ({
	onProgress,
	onPreview,
}: {
	onProgress: (p: number) => void;
	onPreview: (img: string | null) => void;
}) => {
	const intervalRef = useRef<NodeJS.Timeout | null>(null);

	const start = () => {
		onProgress(0);
		onPreview(null);
		if (intervalRef.current) clearInterval(intervalRef.current);

		intervalRef.current = setInterval(async () => {
			try {
				const res = await sdApi.get("/progress");
				const data = res.data;

				onProgress(data.progress ?? 0);

				if (data.current_image) {
					onPreview(`data:image/png;base64,${data.current_image}`);
				}

				if (data.state?.job_count === 0) {
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
