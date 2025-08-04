import type { GeneralProps } from "../types/interfaces"

export default function Continue(props: GeneralProps) {
	if (!props.show) {
		return
	}

	return (
		<div>
			<button>Continue previous match</button>
			<button>Start a new one</button>
		</div>
	)
}