const RATINGS = ["general", "sensitive", "nsfw", "explicit"] as const;

export type Rating = (typeof RATINGS)[number];

export const getRatingPrompts = (selected: Rating) => {
	const index = RATINGS.indexOf(selected);
	return {
		positive: RATINGS[index],
		negative: RATINGS.slice(index + 1).join(", "),
	};
};
