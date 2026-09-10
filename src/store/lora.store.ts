import { create } from "zustand";
import { fetchLoras, refreshLoras } from "@/api/loras";
import { buildParsedLora } from "@/utils/lora/lora-parser";
import { IActiveLora, IParsedLora } from "@/types/lora";
import { ToastAndroid } from "react-native";

type LoraStore = {
	loras: IParsedLora[];
	activeLoras: IActiveLora[];
	isLoading: boolean;
	error: string | null;

	fetchLoras: () => Promise<void>;
	refreshLoras: () => Promise<void>;

	addLora: (
		lora: IParsedLora,
		settings: { enableTriggerWords?: boolean; weight?: number },
	) => void;

	clearActiveLoras: () => void;

	removeLoraByPath: (path: string) => void;
	findLoraByAlias: (alias: string) => IParsedLora | null;

	updateLoraWeight: (path: string, weight: number) => void;
	toggleTriggerWord: (path: string, index: number) => void;
};

export const useLoraStore = create<LoraStore>((set, get) => ({
	loras: [],
	isLoading: false,
	error: null,
	activeLoras: [],

	fetchLoras: async () => {
		if (get().loras.length > 0) return; // кэш на сессию

		set({ isLoading: true, error: null });
		try {
			const items = await fetchLoras();
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
			await refreshLoras();
			const items = await fetchLoras();
			const parsed = await Promise.all(items.map(buildParsedLora));
			set({ loras: parsed });
		} catch (e) {
			console.log(e);
			set({ error: "Не удалось обновить список лор" });
		} finally {
			set({ isLoading: false });
		}
	},

	addLora: (lora, { enableTriggerWords = true, weight }) => {
		set((state) => {
			const exists = state.activeLoras.some(
				(active) => active.lora.path === lora.path,
			);

			if (exists) {
				ToastAndroid.show(
					"Невозможно добавить существующую LoRA",
					ToastAndroid.SHORT,
				);
				return state;
			}

			return {
				activeLoras: [
					...state.activeLoras,
					{
						lora,
						weight: weight || lora.defaultWeight || 1,
						triggerWords: lora.triggerWords.map((word) => ({
							word,
							enabled: enableTriggerWords,
						})),
					},
				],
			};
		});
	},

	clearActiveLoras: () => {
		set({ activeLoras: [] });
	},

	removeLoraByPath: (path) => {
		const filteredLoras = get().activeLoras.filter(
			(activeLora) => activeLora.lora.path !== path,
		);

		set({ activeLoras: filteredLoras });
	},

	findLoraByAlias: (alias) => {
		const findedLora = get().loras.find((lora) => lora.alias === alias);
		return findedLora || null;
	},

	updateLoraWeight: (path, weight) => {
		set((state) => ({
			activeLoras: state.activeLoras.map((active) =>
				active.lora.path === path ? { ...active, weight } : active,
			),
		}));
	},

	toggleTriggerWord: (path, index) => {
		set((state) => ({
			activeLoras: state.activeLoras.map((active) =>
				active.lora.path === path
					? {
							...active,
							triggerWords: active.triggerWords.map((tw, i) =>
								i === index ? { ...tw, enabled: !tw.enabled } : tw,
							),
						}
					: active,
			),
		}));
	},
}));
