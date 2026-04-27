import {
	SafeAreaView,
	SafeAreaViewProps,
} from "react-native-safe-area-context";
import styles from "./styles";
import StyledText from "../ui/StyledText";
import { Animated, Pressable, View } from "react-native";
import useGlowBadge from "./useGlowBadge";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import COLORS from "@/shared/styles/colors";

interface HeaderProps extends Omit<SafeAreaViewProps, "children"> {
	title: string;
	showBack?: boolean;
}

const Header = ({ title, showBack, style, ...props }: HeaderProps) => {
	const glow = useGlowBadge();
	const router = useRouter();

	return (
		<SafeAreaView edges={["top"]} style={[styles.root, style]} {...props}>
			<View style={styles.wrapper}>
				{showBack && (
					<Pressable style={styles.backBtn} onPress={() => router.back()}>
						<Ionicons
							name="arrow-back"
							size={25}
							color={COLORS.textSecondary}
						/>
					</Pressable>
				)}

				<StyledText variant="title" style={styles.title}>
					{title}
				</StyledText>

				{!showBack && (
					<>
						<Animated.Text style={[styles.aiBadge, { opacity: glow }]}>
							AI
						</Animated.Text>

						<Pressable
							style={styles.settingsBtn}
							onPress={() => router.push("/settings")}>
							<Ionicons
								name="settings-outline"
								size={25}
								color={COLORS.textSecondary}
							/>
						</Pressable>
					</>
				)}
			</View>
		</SafeAreaView>
	);
};

export default Header;
