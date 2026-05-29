export interface IModelPreset {
	name: string;
	description: string;
	path: string;
	hash: string;
	params: IModelParams;
}

export interface IModelParams {
	basePrompt: string;
	baseNegativePrompt: string;
	steps: number;
	cfgScale: number;
	clipSkip?: number;
	width: number;
	height: number;
	samplerName: string;
	enableHr?: boolean;
	hrAdditionalModules?: [];
	seed?: number;
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
	seed?: number;
	overrideSettings: { sdModelCheckpoint: string };
}

export interface ITxt2ImgResponse {
	images: string[];
	parameters: ITxt2ImgPayload;
	info: string;
}

export interface IProgressResponse {
	progress: number;
	currentImage: string | null;
	etaRelative: number;
	state: {
		jobCount: number;
		jobNo: number;
		samplingStep: number;
		samplingSteps: number;
	};
	textInfo?: string;
}

export interface IImageInfo {
	seed: number;
	allSeeds?: number[];
	subseed?: number;
	allSubseeds?: number[];
	generationInfo?: string;
	version?: string;
}
