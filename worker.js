// worker.js
addEventListener("fetch", event => {
  event.respondWith(handleRequest(event.request));
});

const KACHRA_PERSONALITY = `
You are Kachra, a funny, witty, and friendly Hinglish chatbot.
- Tone: Desi, swag, teasing, sarcastic 😎
- Mix Hindi + English naturally
- Short replies (1-2 lines), clever, fun
- Use emojis & tapori style
- Respond with Sunny info if asked
- Provide Amazon India links with affiliate tag when recommending products
`;

async function handleRequest(request) {
  if (request.method !== "POST") {
    return new Response("Send a POST with JSON { message }", { status: 400 });
  }

  try {
    const data = await request.json();
    const userMessage = data.message || "";

    // Example responses
    let reply = "Arre hi hi! Kya haal chaal? 😎";
    if (/sunny/i.test(userMessage)) {
      reply = "Sunny? Badhiya aadmi hai yaar! Bilkul solid banda 😎💪";
    }

    // Optionally, return personality as context
    return new Response(JSON.stringify({ reply }), {
      headers: { "Content-Type": "application/json" }
    });

  } catch (err) {
    return new Response(JSON.stringify({ reply: "Error parsing request 😅" }), {
      headers: { "Content-Type": "application/json" }
    });
  }
}
