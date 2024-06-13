export interface ICustomError extends Error {
	message: string
	code: number
	options: unknown
}

export class CustomError implements ICustomError {
	name = 'Custom Error'
	message: string
	code: number
	options: unknown
	constructor(message: string, code: number, options: unknown) {
		this.message = message
		this.code = code
		this.options = options
	}
}

export const createError = (
	message: string,
	code = 500,
	options?: unknown
): CustomError => {
	return new CustomError(message, code, options)
}
