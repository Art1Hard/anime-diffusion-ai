import { IActiveLora } from "@/types/lora";

const convertActiveLorasToString = (loras: IActiveLora[]) => {
	return loras
		.map(({ lora, weight, triggerWords }) => {
			const tag = `<lora:${lora.name}:${weight}>`;
			const words = triggerWords
				.filter((tw) => tw.enabled)
				.map((tw) => tw.word)
				.join(", ");
			return [tag, words].filter(Boolean).join(", ");
		})
		.join(", ");
};

export default convertActiveLorasToString;
