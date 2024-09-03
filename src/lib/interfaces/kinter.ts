export enum Sex {
	female,
	male
}

export enum Action {
	skip,
	like,
	superLike
}

export interface Kinter {
	id: string;
	displayName: string;
	images: string[];
	biography: string;
	sex: Sex;
}
