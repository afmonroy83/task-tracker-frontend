const BASE_URL = import.meta.env.VITE_API_BASE_URL
const TOKEN = import.meta.env.VITE_API_TOKEN

const headers = {
  "Content-Type": "application/json",
  "X-API-TOKEN": TOKEN
}

export async function getTasks() {
  const res = await fetch(`${BASE_URL}/tasks`, { headers })
  if (!res.ok) throw new Error("Fetch failed")
  return res.json()
}

export async function createTask(description) {
  const res = await fetch(`${BASE_URL}/tasks`, {
    method: "POST",
    headers,
    body: JSON.stringify({ task: { description } })
  })

  const json = await res.json()
  if (!res.ok) throw json
  return json
}
