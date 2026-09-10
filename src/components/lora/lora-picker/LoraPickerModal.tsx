import React, { useEffect, useState } from "react";
import {
	ActivityIndicator,
	FlatList,
	Modal,
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

type Props = {
	visible: boolean;
	onClose: () => void;
};

const LoraPickerModal = ({ visible, onClose }: Props) => {
	const { loras, isLoading, error, fetchLoras, refreshLoras } = useLoraStore();
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
		onClose();
	};

	const handleClose = () => {
		setSearch("");
		onClose();
	};

	return (
		<Modal
			visible={visible}
			animationType="slide"
			transparent
			onRequestClose={handleClose}>
			<Pressable style={styles.backdrop} onPress={handleClose} />

			<View style={styles.sheet}>
				<View style={styles.handle} />

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
						style={{ height: "75%" }}
						size={30}
						color={COLORS.primary}
					/>
				)}
				{error && <Text style={styles.error}>{error}</Text>}

				{!isLoading && !error && (
					<FlatList
						data={filtered}
						keyExtractor={(item) => item.path}
						renderItem={({ item }) => (
							<LoraCard lora={item} onPress={handleSelect} />
						)}
						ListEmptyComponent={
							<Text style={styles.empty}>Loras not found</Text>
						}
						contentContainerStyle={{ gap: 8, paddingBottom: 12 }}
					/>
				)}
			</View>
		</Modal>
	);
};

export default LoraPickerModal;

const styles = StyleSheet.create({
	backdrop: { flex: 1, backgroundColor: "rgba(0,0,0,0.5)" },
	sheet: {
		height: "75%",
		backgroundColor: COLORS.surface,
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
		paddingHorizontal: 16,
		paddingTop: 16,
	},
	handle: {
		width: 40,
		height: 4,
		borderRadius: 2,
		alignSelf: "center",
		marginBottom: 12,
	},
	header: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 12,
	},
	title: { fontWeight: "700" },
	refresh: { color: COLORS.primary },
	controlsRow: { flexDirection: "row", gap: 8, marginBottom: 12 },
	search: {
		flex: 1,
		paddingHorizontal: 12,
		paddingVertical: 8,
	},
	error: { color: "#ff6b6b", textAlign: "center", marginTop: 20 },
	empty: { color: "#666", textAlign: "center", marginTop: 20 },
});
