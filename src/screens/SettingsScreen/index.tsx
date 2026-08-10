import { ScrollView } from "react-native";
import styles from "./styles";
import ModelSelection from "./components/ModelSection";
import RatingSection from "./components/RatingSection";
import AdvancedSection from "./components/AdvancedSection";
import ScreenContainer from "@/components/ui/ScreenContainer";
import OrientationSection from "./components/OrientationSection";

const SettingsScreen = () => {
	return (
		<ScrollView style={styles.root} showsVerticalScrollIndicator={false}>
			<ScreenContainer style={styles.container} edges={["bottom"]}>
				<ModelSelection />
				<RatingSection />
				<AdvancedSection />
				<OrientationSection />
			</ScreenContainer>
		</ScrollView>
	);
};

export default SettingsScreen;
