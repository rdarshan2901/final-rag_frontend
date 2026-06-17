const API_BASE =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://rag-project-production-acdd.up.railway.app";

export interface ChatRequest {
  message: string;
  book: string;
  books: string[];
}

export interface ChatResponse {
  success: boolean;
  question: string;
  answer: string;
}

export async function sendMessage(
  message: string,
  books: string[]
): Promise<ChatResponse> {
  try {
    const response = await fetch(`${API_BASE}/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message,
        book: books.join(", "),
        books,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText);
    }

    return await response.json();
  } catch (error) {
    console.error("Backend Error:", error);
    throw new Error("Could not connect to Railway backend.");
  }
}