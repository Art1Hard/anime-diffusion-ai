import { useLoraStore } from "@/store";
import LoraChip from "./LoraChip";
import { ScrollView } from "react-native";
import { useRef, useState } from "react";
import LoraDetailModal from "@/components/lora/active-loras/LoraDetailModal";

const LoraChipList = () => {
	const activeLoras = useLoraStore((s) => s.activeLoras);
	const removeLora = useLoraStore((s) => s.removeLoraByPath);
	const updateLoraWeight = useLoraStore((s) => s.updateLoraWeight);
	const toggleTriggerWord = useLoraStore((s) => s.toggleTriggerWord);

	const [selectedPath, setSelectedPath] = useState<string | null>(null); // ← только path!
	const [modalVisible, setModalVisible] = useState(false);

	// Вот это главное: берём актуальную лору из стора ПРИ КАЖДОМ рендере
	const selectedLora =
		activeLoras.find((a) => a.lora.path === selectedPath) || null;
	const scrollX = useRef(0);
	const scrollViewRef = useRef<ScrollView>(null);

	const openModal = (path: string) => {
		const found = activeLoras.find((a) => a.lora.path === path);
		if (found) {
			setSelectedPath(path);
			setModalVisible(true);
		}
	};

	const closeModal = () => {
		setModalVisible(false);
		setSelectedPath(null);
	};

	return (
		<>
			<ScrollView
				ref={scrollViewRef}
				horizontal
				onScroll={(e) => {
					scrollX.current = e.nativeEvent.contentOffset.x;
				}}
				scrollEventThrottle={16}
				onContentSizeChange={() => {
					scrollViewRef.current?.scrollTo({
						x: scrollX.current,
						animated: false,
					});
				}}
				showsHorizontalScrollIndicator={false}
				contentContainerStyle={{ gap: 8 }}>
				{activeLoras.map(({ lora, weight }) => (
					<LoraChip
						key={lora.path}
						lora={lora}
						weight={weight}
						onOpenDetail={() => openModal(lora.path)}
						onRemove={() => removeLora(lora.path)}
					/>
				))}
			</ScrollView>

			<LoraDetailModal
				visible={modalVisible}
				lora={selectedLora}
				onClose={closeModal}
				onWeightChange={updateLoraWeight}
				onToggleTriggerWord={toggleTriggerWord}
			/>
		</>
	);
};

export default LoraChipList;
