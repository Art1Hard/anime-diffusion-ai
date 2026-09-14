import { useLoraStore } from "@/store";
import { IActiveLora } from "@/types/lora";
import { useEffect, useState } from "react";

const useLoraWeight = (lora: IActiveLora) => {
	const updateLoraWeight = useLoraStore((s) => s.updateLoraWeight);

	useEffect(() => {
		if (lora) {
			setInputValue(lora.weight.toFixed(2));
		}
	}, [lora?.lora.path]);

	const [inputValue, setInputValue] = useState("");

	const decreaseWeight = () => {
		const newWeight = Math.max(-5, lora.weight - 0.1);
		const weight = Math.round(newWeight * 10) / 10;

		updateLoraWeight(lora.lora.path, weight);
		setInputValue(weight.toFixed(2));
	};

	const increaseWeight = () => {
		const newWeight = Math.min(5, lora.weight + 0.1);
		const weight = Math.round(newWeight * 10) / 10;

		updateLoraWeight(lora.lora.path, weight);
		setInputValue(weight.toFixed(2));
	};

	const handleWeightChange = (text: string) => {
		setInputValue(text);

		const normalized = text.replace(",", ".");
		const parsed = parseFloat(normalized);

		if (Number.isNaN(parsed)) return;

		const clamped = Math.max(-5, Math.min(5, Math.round(parsed * 100) / 100));

		updateLoraWeight(lora.lora.path, clamped);
	};

	return { inputValue, handleWeightChange, increaseWeight, decreaseWeight };
};

export default useLoraWeight;
