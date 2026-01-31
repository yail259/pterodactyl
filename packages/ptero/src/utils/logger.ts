import { bold, cyan, green, red, yellow } from 'colorette';

export const log = {
	info: (msg: string) => console.log(cyan(msg)),
	success: (msg: string) => console.log(green(msg)),
	warn: (msg: string) => console.log(yellow(msg)),
	error: (msg: string) => console.error(red(msg)),
	title: (msg: string) => console.log(bold(msg))
};
