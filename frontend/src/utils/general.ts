interface CustomObject {
	[key: string]: any
}

export function setValue(object: CustomObject, path: Array<string | number>, value: any) {
	let current = object

	for (let i = 0; i < path.length; i++) {
		const key = path[i]

		if (
			current[key] === undefined ||
			typeof current[key] !== "object" ||
			current[key] === null
		) {
			current[key] = {}
		}

		current = current[key]
	}

	if (Array.isArray(current[path[path.length - 1]])) {
		current[path[path.length - 1]].push(value)
	} else {
		current[path[path.length - 1]] = value
	}
}

export function getNestedValue(object: CustomObject, startingPoint: string | number = 0): any {
	let current = object
	let value = null

	if (typeof object[startingPoint] == "object") {
		current = current[startingPoint]
		value = getNestedValue(current)
	} else {
		value = object[startingPoint]
	}

	return value
}