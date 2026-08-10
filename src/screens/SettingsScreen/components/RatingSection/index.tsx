import { Switch, Text, View } from "react-native";
import SettingSection from "../ui/SettingSection";
import COLORS from "@/constants/colors";
import { useGenerationSettingsStore } from "@/store";
import styles from "./styles";
import { Rating } from "@/utils/rating";
import ToggleCard from "../ui/ToggleCard";

const ratingCards: { title: string; desc: string; value: Rating }[] = [
	{
		title: "Sensitive",
		desc: "Suggestive content with mild erotic themes",
		value: "sensitive",
	},
	{
		title: "NSFW",
		desc: "Adult content with nudity or sexual themes",
		value: "nsfw",
	},
	{
		title: "Explicit",
		desc: "Unrestricted explicit adult content",
		value: "explicit",
	},
];

const RatingSection = () => {
	const rating = useGenerationSettingsStore((gs) => gs.rating);
	const setRating = useGenerationSettingsStore((gs) => gs.setRating);

	return (
		<SettingSection iconName="flame-outline" title="Generation Rating">
			<View style={styles.container}>
				{ratingCards.map((card) => (
					<ToggleCard
						title={card.title}
						desc={card.desc}
						switchValue={rating === card.value}
						switchOnValueChange={(value) => {
							setRating(value ? card.value : "general");
						}}
						key={card.value}
					/>
				))}
			</View>
		</SettingSection>
	);
};

export default RatingSection;
