import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import COLORS from "@/constants/colors";
import { View } from "react-native";
import { TAB_SIZES } from "@/constants/sizes";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function TabsLayout() {
	const insets = useSafeAreaInsets();

	return (
		<Tabs
			screenOptions={{
				headerShown: false,
				tabBarActiveTintColor: COLORS.primary,
				tabBarInactiveTintColor: "#888",
				tabBarStyle: {
					backgroundColor: "transparent",
					borderTopWidth: 0,
					paddingTop: 1,
					paddingBottom: insets.bottom,
					height: TAB_SIZES.height + insets.bottom,
					position: "absolute",
				},

				tabBarBackground: () => (
					<View
						style={{
							flex: 1,
							borderTopWidth: 1,
							borderTopColor: COLORS.border,
							backgroundColor: COLORS.surface,
						}}
					/>
				),
			}}>
			<Tabs.Screen
				name="index"
				options={{
					title: "Generate",
					tabBarIcon: ({ color, size }) => (
						<Ionicons name="sparkles-outline" size={size} color={color} />
					),
				}}
			/>

			<Tabs.Screen
				name="gallery"
				options={{
					title: "Gallery",
					tabBarIcon: ({ color, size }) => (
						<Ionicons name="images-outline" size={size} color={color} />
					),
					tabBarLabelPosition: "below-icon",
				}}
			/>
		</Tabs>
	);
}
