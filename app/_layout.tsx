import Header from "@/components/Header";
import { Stack } from "expo-router";
import { SystemBars } from "react-native-edge-to-edge";
import Providers from "@/components/Providers";

export default function RootLayout() {
	return (
		<Providers>
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

				<Stack.Screen
					name="image-viewer-gallery"
					options={{
						presentation: "fullScreenModal",
						headerShown: false,
						animation: "fade",
					}}
				/>
			</Stack>
		</Providers>
	);
}
