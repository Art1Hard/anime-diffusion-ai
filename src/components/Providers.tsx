import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { BottomSheetModalProviderProps } from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheetModalProvider/types";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const Providers = (props: BottomSheetModalProviderProps) => {
	return (
		<GestureHandlerRootView>
			<BottomSheetModalProvider {...props} />
		</GestureHandlerRootView>
	);
};

export default Providers;
