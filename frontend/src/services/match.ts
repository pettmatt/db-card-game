import { cfetch } from "./requests"
const base = import.meta.env.VITE_BACKEND_URL


export async function createNewMatch() {
	return await cfetch(`${base}/match`, { method: "POST" })
}