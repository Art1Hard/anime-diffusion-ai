export interface ILoraItem {
	name: string;
	alias: string;
	path: string;
	metadata: Record<string, any> | null;
}

export interface IParsedLora {
	name: string;
	alias: string;
	path: string;
	triggerWords: string[];
	defaultWeight: number;
	baseModel: string | null;
	description: string | null;
	previewCandidates: string[];
	raw: ILoraItem;
}
