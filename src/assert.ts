function assert(arg: any, message?: string): asserts arg {
	if (!arg) {
		throw new Error(message ? `Assertion failed: "${ message }"` : `Assertion failed`)
	}
}

export default assert
