import type { GeneralProps } from "../types/interfaces"

export default function Back(props: GeneralProps) {
	if (!props.show) {
		return
	}

	function backClick() {
		props.progress()
	}

	return (
		<div>
			<button onClick={backClick}>Back</button>
		</div>
	)
}