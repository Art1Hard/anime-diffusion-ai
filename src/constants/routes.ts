export const ROUTES = {
	IMAGE_VIEWER: "/image-viewer",
	IMAGE_VIEWER_GALLERY: "/image-viewer-gallery",
	SETTINGS: "/settings",
	HOME: "/",
} as const;

export type Routes = (typeof ROUTES)[keyof typeof ROUTES];
