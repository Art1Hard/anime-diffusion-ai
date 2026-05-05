export const ROUTES = {
	IMAGE_VIEWER: "/image-viewer",
	SETTINGS: "/settings",
	HOME: "/",
} as const;

export type Routes = (typeof ROUTES)[keyof typeof ROUTES];
