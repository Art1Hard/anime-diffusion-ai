import React, { useEffect, useState } from "react";
import {
	ActivityIndicator,
	FlatList,
	Modal,
	Pressable,
	StyleSheet,
	Text,
	TextInput,
	View,
} from "react-native";
import { useLoraStore } from "@/store/lora.store";
import { useGenerationSettingsStore } from "@/store/generation-settings.store";
import { IParsedLora } from "@/types/lora";
import LoraCard from "./LoraCard";

type Props = {
	visible: boolean;
	onClose: () => void;
};

const LoraPickerModal = ({ visible, onClose }: Props) => {
	const { loras, isLoading, error, fetchLoras, refreshLoras } = useLoraStore();
	const addLoraToPrompt = useGenerationSettingsStore((s) => s.addLoraToPrompt);

	const [search, setSearch] = useState("");
	const [weight, setWeight] = useState("");
	const [weightTouched, setWeightTouched] = useState(false);

	useEffect(() => {
		if (visible) fetchLoras();
	}, [visible]);

	const filtered = loras.filter((l) =>
		(l.alias || l.name).toLowerCase().includes(search.toLowerCase()),
	);

	const handleSelect = (lora: IParsedLora) => {
		const typed = parseFloat(weight.replace(",", "."));
		// если юзер сам не менял вес — берём "preferred weight" из json лоры
		const finalWeight =
			weightTouched && !Number.isNaN(typed) ? typed : lora.defaultWeight;
		addLoraToPrompt(lora, finalWeight);
		onClose();
	};

	const handleClose = () => {
		setSearch("");
		setWeight("");
		setWeightTouched(false);
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
					<Text style={styles.title}>Выбор LoRA</Text>
					<Pressable onPress={refreshLoras}>
						<Text style={styles.refresh}>Обновить</Text>
					</Pressable>
				</View>

				<View style={styles.controlsRow}>
					<TextInput
						placeholder="Поиск..."
						placeholderTextColor="#666"
						value={search}
						onChangeText={setSearch}
						style={styles.search}
					/>

					<TextInput
						placeholder="1.0"
						placeholderTextColor="#666"
						value={weight}
						onChangeText={(v) => {
							setWeight(v);
							setWeightTouched(true);
						}}
						keyboardType="decimal-pad"
						style={styles.weightInput}
					/>
				</View>

				{isLoading && (
					<ActivityIndicator style={{ marginTop: 20 }} color="#fff" />
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
							<Text style={styles.empty}>Лоры не найдены</Text>
						}
						contentContainerStyle={{ paddingBottom: 24 }}
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
		maxHeight: "75%",
		backgroundColor: "#000",
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
		padding: 16,
	},
	handle: {
		width: 40,
		height: 4,
		borderRadius: 2,
		backgroundColor: "#444",
		alignSelf: "center",
		marginBottom: 12,
	},
	header: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 12,
	},
	title: { color: "#fff", fontSize: 16, fontWeight: "700" },
	refresh: { color: "#5ea1ff", fontSize: 13 },
	controlsRow: { flexDirection: "row", gap: 8, marginBottom: 12 },
	search: {
		flex: 1,
		backgroundColor: "#1c1c1e",
		borderRadius: 10,
		paddingHorizontal: 12,
		paddingVertical: 8,
		color: "#fff",
	},
	weightInput: {
		width: 56,
		backgroundColor: "#1c1c1e",
		borderRadius: 10,
		paddingHorizontal: 8,
		paddingVertical: 8,
		color: "#fff",
		textAlign: "center",
	},
	error: { color: "#ff6b6b", textAlign: "center", marginTop: 20 },
	empty: { color: "#666", textAlign: "center", marginTop: 20 },
});
