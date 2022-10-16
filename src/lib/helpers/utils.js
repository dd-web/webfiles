export function catchError(err) {
	if (error instanceof Error) {
		console.log(error.message, error);
	} else {
		console.log('unknown error type', error);
	}
}
