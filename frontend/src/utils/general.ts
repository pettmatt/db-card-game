interface CustomObject {
	[key: string]: any
}

export function setValue(object: CustomObject, path: string[], value: any) {
	let current = object

	for (let i = 0; i < path.length; i++) {
		const key = path[i]

		if (
			current[key] === undefined ||
			typeof current[key] !== 'object' ||
			current[key] === null
		) {
			current[key] = {}
		}

		current = current[key]
	}

	current[path[path.length - 1]] = value
}