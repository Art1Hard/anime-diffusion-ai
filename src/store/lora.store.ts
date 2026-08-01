import { create } from "zustand";
import { fetchLorasApi, refreshLorasApi } from "@/api/loras";
import { buildParsedLora } from "@/utils/lora-parser";
import { IParsedLora } from "@/types/lora";

type LoraStore = {
	loras: IParsedLora[];
	isLoading: boolean;
	error: string | null;

	fetchLoras: () => Promise<void>;
	refreshLoras: () => Promise<void>;
};

export const useLoraStore = create<LoraStore>((set, get) => ({
	loras: [],
	isLoading: false,
	error: null,

	fetchLoras: async () => {
		if (get().loras.length > 0) return; // кэш на сессию

		set({ isLoading: true, error: null });
		try {
			const items = await fetchLorasApi();
			const parsed = await Promise.all(items.map(buildParsedLora));
			set({ loras: parsed });
		} catch (e) {
			console.log(e);
			set({ error: "Не удалось загрузить список лор" });
		} finally {
			set({ isLoading: false });
		}
	},

	refreshLoras: async () => {
		set({ isLoading: true, error: null, loras: [] });
		try {
			await refreshLorasApi();
			const items = await fetchLorasApi();
			const parsed = await Promise.all(items.map(buildParsedLora));
			set({ loras: parsed });
		} catch (e) {
			console.log(e);
			set({ error: "Не удалось обновить список лор" });
		} finally {
			set({ isLoading: false });
		}
	},
}));
