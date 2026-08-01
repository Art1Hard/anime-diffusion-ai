import sdApi from "@/api/interceptors";
import { ILoraItem } from "@/types/lora";

export const fetchLorasApi = async (): Promise<ILoraItem[]> => {
	const { data } = await sdApi.get<ILoraItem[]>("/loras");
	return data;
};

export const refreshLorasApi = async (): Promise<void> => {
	await sdApi.post("/refresh-loras");
};
