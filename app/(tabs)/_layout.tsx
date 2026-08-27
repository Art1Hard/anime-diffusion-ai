import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import COLORS from "@/constants/colors";
import { TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useGalleryStore } from "@/store";
import { ROUTES } from "@/constants/routes";

export default function TabsLayout() {
	const insets = useSafeAreaInsets();
	const triggerScrollToTop = useGalleryStore((s) => s.triggerScrollToTop);

	return (
		<Tabs
			screenOptions={{
				headerShown: false,
				tabBarActiveTintColor: COLORS.primary,
				tabBarInactiveTintColor: "#888",
				tabBarStyle: {
					backgroundColor: COLORS.surface,
					borderTopWidth: 1,
					borderColor: COLORS.border,
					marginTop: -1,
					height: 60 + insets.bottom,
				},
				tabBarButton: (props) => {
					const isSelected = props["aria-selected"];
					const isGalleryTab = props.href?.includes(ROUTES.GALLERY);

					return (
						<TouchableOpacity
							onPress={(e) => {
								if (isSelected && isGalleryTab) {
									triggerScrollToTop();
								}

								props.onPress?.(e);
							}}
							activeOpacity={1}
							accessibilityState={props.accessibilityState}
							accessibilityLabel={props.accessibilityLabel}
							style={props.style}>
							{props.children}
						</TouchableOpacity>
					);
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
				}}
			/>
		</Tabs>
	);
}
