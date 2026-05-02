import { ITxt2ImgPayload, ITxt2ImgResponse } from "@/types/model-presets";
import sdApi from "./interceptors";

export const generateImage = async (
	body: ITxt2ImgPayload,
): Promise<ITxt2ImgResponse> => {
	const res = await sdApi.post<ITxt2ImgResponse>("/txt2img", body, {
		headers: { "Content-Type": "application/json" },
	});

	return res.data;
};
