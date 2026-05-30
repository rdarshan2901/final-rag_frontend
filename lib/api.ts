const API_BASE = "http://127.0.0.1:8000";

export interface ChatRequest {
  message: string;
  book: string;
}

export interface ChatResponse {
  success: boolean;
  question: string;
  answer: string;
}

export async function sendMessage(message: string, book: string): Promise<ChatResponse> {
  const response = await fetch(`${API_BASE}/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message, book } as ChatRequest),
  });

  if (!response.ok) {
    const errorText = await response.text().catch(() => "Unknown error");
    throw new Error(`API error ${response.status}: ${errorText}`);
  }

  const data: ChatResponse = await response.json();
  return data;
}
