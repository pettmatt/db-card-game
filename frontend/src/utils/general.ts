export function setValue(object: any, path: Array<string | number>, value: any) {
	let modifiedNode = value
	let key = path[0]
	let restOfPath = path.slice(1)

	if (restOfPath.length > 0) {
		modifiedNode = setValue(object[key], restOfPath, value)
	}

	object[key] = modifiedNode
	return object
}

export function getValue(object: object, path: string[]) {
		let current: any = object

		for(let i = 0; i < path.length; i++) {
			let key = path[i]
			current = current[key]
		}

		return current
}

export function getNestedValue(object: object, startingPoint: string | number = 0): any {
	let current: any = object

	if (typeof current[startingPoint] == "object") {
		current = getNestedValue(current[startingPoint])
	} else {
		current = current[startingPoint]
	}

	return current
}