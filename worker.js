addEventListener("fetch", (event) => {
  event.respondWith(handleRequest(event.request));
});

const KACHRA_RESPONSES = [
  "Arre hi hi! Kya scene hai mere dost? 😎",
  "Bas yaar, zinda hoon... chai thodi kam padi hai ☕😂",
  "Tu gandu hai, saale ⚡🤣",
  "Sunny? Badhiya aadmi hai yaar! Bilkul solid banda 😎💪",
  "Bhai, yeh kaam full tapori style me karte hai 😏"
];

async function handleRequest(request) {
  if (request.method === "POST") {
    try {
      const data = await request.json();
      const msg = data.message?.toLowerCase() || "";

      let reply = "Arre bhai, kya bolta? 🤔";

      // Sunny ka special response
      if (msg.includes("sunny")) {
        reply = "Sunny? Badhiya aadmi hai yaar! Bilkul solid banda 😎💪";
      } else {
        // Random Kachra style reply
        reply = KACHRA_RESPONSES[Math.floor(Math.random() * KACHRA_RESPONSES.length)];
      }

      return new Response(JSON.stringify({ reply }), {
        headers: { "Content-Type": "application/json" },
      });
    } catch (err) {
      return new Response(JSON.stringify({ reply: "Kya bakchodi hai yaar? 😅" }), {
        headers: { "Content-Type": "application/json" },
      });
    }
  }

  return new Response("Send a POST with JSON { message }", {
    headers: { "Content-Type": "application/json" },
  });
}
