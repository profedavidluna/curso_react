const baseUrl = "/vanlife"

export async function getVans(name) {
  const url = name ? `${baseUrl}/api/vans/${name}` : `${baseUrl}/api/vans`
  const res = await fetch(url)
  if (!res.ok) {
    throw {
      message: "Failed to fetch vans",
      statusText: res.statusText,
      status: res.status,
    }
  }
  const data = await res.json()
  return data.vans
}

export async function getHostVans(name) {
  const url = name
    ? `${baseUrl}/api/host/host-vans/${name}`
    : `${baseUrl}/api/host/host-vans`
  const res = await fetch(url)
  if (!res.ok) {
    throw {
      message: "Failed to fetch vans",
      statusText: res.statusText,
      status: res.status,
    }
  }
  const data = await res.json()
  return data.vans
}

export async function loginUser(creds) {
  const res = await fetch(`${baseUrl}/api/login`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(creds),
  })

  if (!res.ok) {
    const errorData = await res.json()
    throw {
      message: errorData.message,
      statusText: res.statusText,
      status: res.status,
    }
  }

  const data = await res.json()
  return data
}
