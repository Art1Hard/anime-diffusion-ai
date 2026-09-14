import COLORS from "@/constants/colors";
import {
	BottomSheetBackdrop,
	BottomSheetModal,
	BottomSheetView,
	useBottomSheetTimingConfigs,
} from "@gorhom/bottom-sheet";
import { ReactNode, useEffect, useRef } from "react";
import { BackHandler, StyleSheet, View } from "react-native";
import { Easing } from "react-native-reanimated";

interface CustomBottomSheetModalProps {
	visible: boolean;
	onClose: () => void;
	snapPoints?: string[];
	enableDynamicSizing?: boolean;
	scrollable?: boolean;
	children: ReactNode;
}

const CustomBottomSheetModal = ({
	visible,
	onClose,
	snapPoints = ["60%"],
	enableDynamicSizing = false,
	scrollable = false,
	children,
}: CustomBottomSheetModalProps) => {
	const sheetRef = useRef<BottomSheetModal>(null);

	const animationConfigs = useBottomSheetTimingConfigs({
		duration: 150,
		easing: Easing.out(Easing.ease),
	});

	useEffect(() => {
		if (visible) {
			sheetRef.current?.present();
		} else {
			sheetRef.current?.dismiss();
		}
	}, [visible]);

	useEffect(() => {
		if (!visible) return;

		const subscription = BackHandler.addEventListener(
			"hardwareBackPress",
			() => {
				sheetRef.current?.dismiss();
				return true;
			},
		);

		return () => subscription.remove();
	}, [visible]);

	return (
		<BottomSheetModal
			ref={sheetRef}
			snapPoints={snapPoints}
			enablePanDownToClose
			enableDynamicSizing={enableDynamicSizing}
			onDismiss={onClose}
			backgroundStyle={styles.sheetBackground}
			handleIndicatorStyle={styles.handleIndicator}
			animationConfigs={animationConfigs}
			backdropComponent={(props) => (
				<BottomSheetBackdrop
					{...props}
					appearsOnIndex={0}
					disappearsOnIndex={-1}
					pressBehavior="close"
				/>
			)}>
			{scrollable ? (
				children
			) : (
				<BottomSheetView style={styles.sheet}>{children}</BottomSheetView>
			)}
		</BottomSheetModal>
	);
};

export default CustomBottomSheetModal;

const styles = StyleSheet.create({
	sheetBackground: {
		backgroundColor: COLORS.surface,
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
	},

	handleIndicator: {
		backgroundColor: COLORS.textMuted,
		marginTop: 10,
		width: 40,
		height: 4,
	},

	sheet: {
		flex: 1,
		backgroundColor: COLORS.surface,
		padding: 16,
	},
});
