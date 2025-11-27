// worker.js

const CHAT_HISTORY = new Map(); // session_id -> messages array

addEventListener("fetch", event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const url = new URL(request.url)

  if (request.method === "POST" && url.pathname === "/chat") {
    try {
      const data = await request.json()
      const { message, session_id } = data

      if (!session_id || !message) {
        return jsonResponse({ reply: "Invalid request" }, 400)
      }

      // Initialize session history
      if (!CHAT_HISTORY.has(session_id)) {
        CHAT_HISTORY.set(session_id, [])
      }

      const history = CHAT_HISTORY.get(session_id)
      history.push({ role: "user", content: message })

      // Simple funny reply logic (Kachra style)
      const reply = generateKachraReply(message)

      history.push({ role: "bot", content: reply })

      return jsonResponse({ reply })
    } catch (err) {
      return jsonResponse({ reply: "Error parsing request" }, 400)
    }
  }

  if (request.method === "POST" && url.pathname === "/chat/reset") {
    try {
      const data = await request.json()
      const { session_id } = data

      if (!session_id) return jsonResponse({ reply: "Missing session_id" }, 400)

      CHAT_HISTORY.delete(session_id)
      return jsonResponse({ reply: "Chat reset successfully!" })
    } catch (err) {
      return jsonResponse({ reply: "Error parsing request" }, 400)
    }
  }

  return jsonResponse({ reply: "Invalid endpoint" }, 404)
}

// Helper: send JSON response
function jsonResponse(obj, status = 200) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { "Content-Type": "application/json" }
  })
}

// Kachra-style funny reply generator
function generateKachraReply(msg) {
  const responses = [
    "Arre chomu, tu kya bol raha hai 😂",
    "Pagal hai kya? 😎",
    "Bhondu saala, mast question poocha 😂",
    "Kya scene hai yaar? 😏",
    "Tu toh total tapori nikla 😆"
  ]
  return responses[Math.floor(Math.random() * responses.length)]
}
