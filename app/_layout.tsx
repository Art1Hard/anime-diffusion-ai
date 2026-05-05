import Header from "@/components/Header";
import COLORS from "@/constants/colors";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import * as NavigationBar from "expo-navigation-bar";

export default function RootLayout() {
	useEffect(() => {
		NavigationBar.setPositionAsync("absolute");
		NavigationBar.setBackgroundColorAsync("transparent");
	}, []);

	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<StatusBar style="light" />

			<View style={{ flex: 1, backgroundColor: COLORS.background }}>
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
							presentation: "transparentModal",
							headerShown: false,
							animation: "fade",
						}}
					/>
				</Stack>
			</View>
		</GestureHandlerRootView>
	);
}
