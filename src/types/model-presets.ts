export interface IModelPreset {
	name: string;
	type: "SD" | "XL" | "ANIMA";
	description: string;
	path: string;
	hash: string;
	params: IModelParams;
}

export interface IImageItem {
	id: number;
	uri: string;
	prompt: string | null;
	negativePrompt: string | null;
	seed: number | null;
	createdAt: number;
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
	scheduler?: string;
	enableHr?: boolean;
	hrAdditionalModules?: string[];
	seed?: number;
	hrUpscaler: string;
	hrScale: number;
	hrSecondPassSteps: number;
	denoisingStrength: number;
	overrideSettings?: {
		sdModelCheckpoint?: string;
		forgeAdditionalModules?: string[];
	};
}

export interface ITxt2ImgPayload extends Omit<
	IModelParams,
	"basePrompt" | "baseNegativePrompt"
> {
	prompt: string;
	negativePrompt: string;
	seed?: number;
	alwaysonScripts?: Record<string, any>;
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
