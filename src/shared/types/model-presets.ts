export interface IModel {
	name: string;
	path: string;
	params: IModelPreset;
}

export interface IModelPreset {
	basePrompt?: string;
	baseNegativePrompt?: string;
	steps: number;
	cfgScale: number;
	clipSkip?: number;
	width: number;
	height: number;
	samplerName: string;
	hrUpscaler: string;
	hrScale: number;
	hrSecondPassSteps: number;
	denoisingStrength: number;
}
