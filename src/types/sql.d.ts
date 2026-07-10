// src/types/sql.d.ts (или любое место, которое подхватывается tsconfig)
declare module "*.sql" {
	const content: string;
	export default content;
}
