export interface IModelPreset {
	name: string;
	path: string;
	params: IModelParams;
}

export interface IModelParams {
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

export interface ITxt2ImgPayload extends Omit<
	IModelParams,
	"basePrompt" | "baseNegativePrompt"
> {
	prompt: string;
	negativePrompt: string;
	overrideSettings: { sdModelCheckpoint: string };
}

export interface ITxt2ImgResponse {
	images: string[];
	parameters: ITxt2ImgPayload;
	info: string;
}
