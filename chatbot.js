const apiKey = "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";
const engine = "text-davinci-002";
const prompt = "What is the capital of France?";

const inputField = document.getElementById("chatbot-input");
const messagesContainer = document.getElementById("chatbot-messages");
const form = document.getElementById("chatbot-form");

form.addEventListener("submit", async event => {
    event.preventDefault();
    const input = inputField.value;
    inputField.value = "";

    try {
        const response = await generateAnswer(input);
        const message = document.createElement("div");
        message.innerText = response;
        messagesContainer.appendChild(message);
    } catch (error) {
        console.error(error);
    }
});

async function generateAnswer(prompt) {
    const response = await fetch(`https://api.openai.com/v1/engines/${engine}/completions`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${apiKey}`
        },
        body: JSON.
stringify({
            prompt: prompt,
            max_tokens: 1024,
            n: 1,
            stop: null,
            temperature: 0.5
        })
    });
    const json = await response.json();
    return json.choices[0].text;
}
