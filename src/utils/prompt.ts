import { isExplicit, isRating, Rating } from "./rating";

export const buildPrompt = (prompts: {
	ratingPrompt: Rating | string;
	prompt: string;
	basePrompt?: string;
	loraString?: string;
}): string => {
	const { ratingPrompt, prompt, basePrompt, loraString } = prompts;
	const tokens: string[] = [];

	if (!isRating(ratingPrompt) || !isExplicit(ratingPrompt))
		tokens.push(ratingPrompt);

	if (basePrompt) tokens.push(basePrompt);

	if (loraString) tokens.push(loraString);

	tokens.push(prompt);

	return tokens.filter((token) => Boolean(token)).join(", ");
};
