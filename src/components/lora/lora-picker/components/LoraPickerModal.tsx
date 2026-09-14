import React, { useEffect, useState } from "react";
import {
	ActivityIndicator,
	Pressable,
	StyleSheet,
	Text,
	View,
} from "react-native";
import { useLoraStore } from "@/store/lora.store";
import { IParsedLora } from "@/types/lora";
import LoraCard from "./LoraCard";
import COLORS from "@/constants/colors";
import StyledText from "@/components/ui/StyledText";
import StyledTextInput from "@/components/ui/StyledTextInput";
import CustomBottomSheetModal from "@/components/ui/modals/CustomBottomSheetModal";
import { BottomSheetFlatList } from "@gorhom/bottom-sheet";

type Props = {
	visible: boolean;
	onClose: () => void;
};

const LoraPickerModal = ({ visible, onClose }: Props) => {
	const loras = useLoraStore((s) => s.loras);
	const isLoading = useLoraStore((s) => s.isLoading);
	const error = useLoraStore((s) => s.error);

	const fetchLoras = useLoraStore((s) => s.fetchLoras);
	const refreshLoras = useLoraStore((s) => s.refreshLoras);
	const addLora = useLoraStore((s) => s.addLora);

	const [search, setSearch] = useState("");

	useEffect(() => {
		if (visible) fetchLoras();
	}, [visible]);

	const filtered = loras.filter((l) =>
		(l.alias || l.name).toLowerCase().includes(search.toLowerCase()),
	);

	const handleSelect = (lora: IParsedLora) => {
		addLora(lora, {});
		setSearch("");
		onClose();
	};

	const handleClose = () => {
		setSearch("");
		onClose();
	};

	return (
		<CustomBottomSheetModal
			scrollable
			snapPoints={["60%", "80%"]}
			visible={visible}
			onClose={handleClose}>
			<View style={styles.container}>
				<View style={styles.header}>
					<StyledText variant="base" style={styles.title}>
						Choosing LoRA
					</StyledText>
					<Pressable onPress={refreshLoras}>
						<StyledText variant="micro" style={styles.refresh}>
							Refresh
						</StyledText>
					</Pressable>
				</View>

				<View style={styles.controlsRow}>
					<StyledTextInput
						placeholder="Search..."
						value={search}
						onChangeText={setSearch}
						style={styles.search}
					/>
				</View>

				{isLoading && (
					<ActivityIndicator
						style={styles.loader}
						size={30}
						color={COLORS.primary}
					/>
				)}
				{error && <Text style={styles.error}>{error}</Text>}
			</View>

			<BottomSheetFlatList
				data={filtered}
				style={styles.list}
				keyExtractor={(item) => item.path}
				renderItem={({ item }) => (
					<LoraCard lora={item} onPress={handleSelect} />
				)}
				ListEmptyComponent={
					!isLoading && !error ? (
						<Text style={styles.empty}>Loras not found</Text>
					) : null
				}
				contentContainerStyle={styles.contentContainer}
			/>
		</CustomBottomSheetModal>
	);
};

export default LoraPickerModal;

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 16,
		paddingTop: 16,
	},
	contentContainer: {
		paddingHorizontal: 16,
		paddingBottom: 20,
		gap: 8,
	},
	header: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 12,
	},
	loader: {
		marginTop: 40,
	},
	title: { fontWeight: "700" },
	refresh: { color: COLORS.primary },
	controlsRow: { flexDirection: "row", gap: 8, marginBottom: 12 },
	search: {
		flex: 1,
		paddingHorizontal: 12,
		paddingVertical: 8,
	},
	list: {
		flex: 1,
	},
	error: { color: "#ff6b6b", textAlign: "center", marginTop: 20 },
	empty: { color: "#666", textAlign: "center", marginTop: 20 },
});
