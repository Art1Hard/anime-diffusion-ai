import { isExplicit, isRating, Rating } from "./rating";

export const buildPrompt = (prompts: {
	ratingPrompt: Rating | string;
	prompt: string;
	basePrompt?: string;
}): string => {
	const { ratingPrompt, prompt, basePrompt } = prompts;
	const tokens: string[] = [];

	if (!isRating(ratingPrompt) || !isExplicit(ratingPrompt))
		tokens.push(ratingPrompt);

	tokens.push(prompt);
	if (basePrompt) tokens.push(basePrompt);

	return tokens.filter((token) => Boolean(token)).join(", ");
};

export const buildLoraTag = (name: string, weight: number = 1) =>
	`<lora:${name}:${weight}>`;

export const insertLoraIntoPrompt = (
	currentPrompt: string,
	lora: { name: string; triggerWords: string[] },
	weight: number = 1,
): string => {
	const tag = buildLoraTag(lora.name, weight);
	const keywords = lora.triggerWords.join(", ");

	return [currentPrompt.trim(), tag, keywords]
		.filter(Boolean)
		.join(", ")
		.replace(/,\s*,/g, ",")
		.trim();
};
