import { useGalleryStore } from "@/store";
import { useCallback, useEffect } from "react";
import { BackHandler } from "react-native";

const useSectionHeader = () => {
	const selectedImageIds = useGalleryStore((s) => s.selectedImageIds);
	const enabledSelectionMode = useGalleryStore((s) => s.enabledSelectionMode);

	const removeImages = useGalleryStore((s) => s.removeImages);
	const saveImages = useGalleryStore((s) => s.saveImages);

	const disableSelectionMode = useGalleryStore((s) => s.disableSelectionMode);

	const handleDelete = useCallback(() => {
		removeImages(selectedImageIds);
		disableSelectionMode();
	}, [selectedImageIds, removeImages, disableSelectionMode]);

	const handleSave = useCallback(() => {
		saveImages(selectedImageIds);
		disableSelectionMode();
	}, [selectedImageIds, saveImages, disableSelectionMode]);

	const handleCancel = useCallback(
		() => disableSelectionMode(),
		[disableSelectionMode],
	);

	// ─── Перехват Android кнопки "Назад" ───
	useEffect(() => {
		if (!enabledSelectionMode) return;

		const backHandler = BackHandler.addEventListener(
			"hardwareBackPress",
			() => {
				disableSelectionMode();
				return true; // перехватили — не уходим назад
			},
		);

		return () => backHandler.remove();
	}, [enabledSelectionMode, disableSelectionMode]);

	return {
		enabledSelectionMode,
		selectedImageIds,
		handleCancel,
		handleSave,
		handleDelete,
	};
};

export default useSectionHeader;
