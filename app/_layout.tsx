import Header from "@/components/Header";
import COLORS from "@/constants/colors";
import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SystemBars } from "react-native-edge-to-edge";

export default function RootLayout() {
	return (
		<GestureHandlerRootView
			style={{ flex: 1, backgroundColor: COLORS.background }}>
			<SystemBars style="light" hidden={false} />
			<Stack>
				<Stack.Screen
					name="(tabs)"
					options={{
						header: () => <Header title="Anime Diffusion" />,
					}}
				/>

				<Stack.Screen
					name="settings"
					options={{
						title: "Settings",
						presentation: "transparentModal",
						header: () => <Header title="Settings" showBack />,
					}}
				/>

				<Stack.Screen
					name="image-viewer"
					options={{
						presentation: "fullScreenModal",
						headerShown: false,
						animation: "fade",
					}}
				/>
			</Stack>
		</GestureHandlerRootView>
	);
}
