import GenerationScreen from "@/components/pages/GenerationScreen";
import Header from "./src/components/Header";
import COLORS from "./src/shared/styles/colors";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";

export default function App() {
	return (
		<SafeAreaView
			edges={["bottom"]}
			style={{ backgroundColor: COLORS.background, flex: 1 }}>
			<StatusBar style="light" />
			<Header title="Anime Diffusion" />

			<GenerationScreen />
		</SafeAreaView>
	);
}
