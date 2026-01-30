const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
const API_TOKEN = import.meta.env.VITE_API_TOKEN

export async function fetchTasks() {
  const res = await fetch(`${API_BASE_URL}/tasks`, {
    headers: {
      "X-API-TOKEN": API_TOKEN
    }
  })

  if (!res.ok) {
    throw new Error("Error fetching tasks")
  }

  return res.json()
}

export async function createTask(description) {
  const res = await fetch(`${API_BASE_URL}/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-API-TOKEN": API_TOKEN
    },
    body: JSON.stringify({
      task: { description }
    })
  })

  const json = await res.json()

  if (!res.ok) {
    throw json
  }

  return json
}
