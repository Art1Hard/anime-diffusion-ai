import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import COLORS from "@/shared/styles/colors";

export default function TabsLayout() {
	return (
		<Tabs
			screenOptions={{
				headerShown: false,
				tabBarActiveTintColor: COLORS.primary,
				tabBarInactiveTintColor: "#888",
				tabBarStyle: {
					backgroundColor: COLORS.surface,
					borderTopColor: COLORS.border,
					borderTopWidth: 1,
				},
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
