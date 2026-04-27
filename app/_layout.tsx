import Header from "@/components/Header";
import COLORS from "@/constants/colors";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";

export default function RootLayout() {
	return (
		<>
			<StatusBar style="light" />

			<View style={{ flex: 1, backgroundColor: COLORS.background }}>
				<Stack
					screenOptions={{
						contentStyle: { backgroundColor: COLORS.background },
					}}>
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
				</Stack>
			</View>
		</>
	);
}
