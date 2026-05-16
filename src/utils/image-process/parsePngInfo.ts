const parsePngInfo = (base64: string) => {
	const binary = atob(base64);
	const bytes = new Uint8Array(binary.length);
	for (let i = 0; i < binary.length; i++) {
		bytes[i] = binary.charCodeAt(i);
	}

	let offset = 8;
	while (offset < bytes.length - 12) {
		const length =
			(bytes[offset] << 24) |
			(bytes[offset + 1] << 16) |
			(bytes[offset + 2] << 8) |
			bytes[offset + 3];
		offset += 4;
		const type = String.fromCharCode(
			bytes[offset],
			bytes[offset + 1],
			bytes[offset + 2],
			bytes[offset + 3],
		);
		offset += 4;

		if (type === "tEXt") {
			const chunk = new TextDecoder().decode(
				bytes.slice(offset, offset + length),
			);
			const nullIndex = chunk.indexOf("\0");
			const key = chunk.slice(0, nullIndex);
			const value = chunk.slice(nullIndex + 1);

			if (key === "parameters") {
				const lines = value.split("\n");

				// Первая строка — промпт
				const prompt = lines[0].trim();

				// Негатив
				const negLine = lines.find((l) => l.startsWith("Negative prompt:"));
				const negativePrompt = negLine
					? negLine.replace("Negative prompt:", "").trim()
					: "";

				// Последняя строка — параметры вида "Steps: 24, Sampler: Euler a, Model: ..."
				const paramsLine = lines[lines.length - 1];
				const parseParam = (key: string) => {
					const match = paramsLine.match(new RegExp(`${key}: ([^,]+)`));
					return match ? match[1].trim() : "";
				};

				return {
					prompt,
					negativePrompt,
					model: parseParam("Model"),
					modelHash: parseParam("Model hash"),
					seed: parseParam("Seed"),
					steps: parseParam("Steps"),
					sampler: parseParam("Sampler"),
					cfgScale: parseParam("CFG scale"),
					size: parseParam("Size"),
				};
			}
		}

		offset += length + 4;
	}

	return null;
};

export default parsePngInfo;
