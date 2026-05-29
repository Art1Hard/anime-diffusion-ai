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
