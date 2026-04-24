import { NextResponse } from 'next/server';

type ModelProvider = "groq" | "together" | "openrouter" | "ollama";

interface ModelConfig {
  id: string;
  provider: ModelProvider;
}

const MODELS: ModelConfig[] = [
  // Groq Models
  { id: "llama-3.1-8b-instant", provider: "groq" },
  { id: "llama-3.3-70b-versatile", provider: "groq" },
  { id: "openai/gpt-oss-120b", provider: "groq" },
  { id: "openai/gpt-oss-20b", provider: "groq" },
  { id: "qwen/qwen3-32b", provider: "groq" },
  { id: "meta-llama/llama-prompt-guard-2-86m", provider: "groq" },
  { id: "meta-llama/llama-prompt-guard-2-22m", provider: "groq" },
  { id: "meta-llama/llama-4-scout-17b-16e-instruct", provider: "groq" },
  
  // Together AI Models
  { id: "meta-llama/Llama-3-70b-chat-hf", provider: "together" },
  { id: "meta-llama/Llama-3-8b-chat-hf", provider: "together" },
  { id: "mistralai/Mixtral-8x7B-Instruct-v0.1", provider: "together" },
  { id: "google/gemma-2-27b-it", provider: "together" },
  { id: "databricks/dbrx-instruct", provider: "together" },

  // OpenRouter Models
  { id: "inclusionai/ling-2.6-1t:free", provider: "openrouter" },
  { id: "tencent/hy3-preview:free", provider: "openrouter" },
  { id: "google/gemma-4-26b-a4b-it:free", provider: "openrouter" },
  { id: "nvidia/nemotron-3-super-120b-a12b:free", provider: "openrouter" },
  { id: "minimax/minimax-m2.5:free", provider: "openrouter" },
  { id: "liquid/lfm-2.5-1.2b-thinking:free", provider: "openrouter" },
  { id: "liquid/lfm-2.5-1.2b-instruct:free", provider: "openrouter" },
  { id: "qwen/qwen3-next-80b-a3b-instruct:free", provider: "openrouter" },
  { id: "z-ai/glm-4.5-air:free", provider: "openrouter" },
  { id: "qwen/qwen3-coder:free", provider: "openrouter" },
  { id: "google/gemma-3n-e2b-it:free", provider: "openrouter" },
  { id: "google/gemma-3n-e4b-it:free", provider: "openrouter" },
  { id: "google/gemma-3-4b-it:free", provider: "openrouter" },

  // Ollama (Local) Models
  { id: "llama3", provider: "ollama" },
  { id: "mistral", provider: "ollama" },
  { id: "gemma2", provider: "ollama" }
];

export async function POST(req: Request) {
  if (!process.env.GROQ_API_KEY && !process.env.TOGETHER_API_KEY && !process.env.OPENROUTER_API_KEY && process.env.OLLAMA_ENABLED !== "true") {
    return NextResponse.json({ error: "Missing APIs. Ensure GROQ_API_KEY, TOGETHER_API_KEY, OPENROUTER_API_KEY, or OLLAMA_ENABLED=true are set." }, { status: 500 });
  }
  
  try {
    const { prompt } = await req.json();
    if (!prompt) {
      return NextResponse.json({ error: "Missing prompt" }, { status: 400 });
    }

    // Filter models based on available API keys
    const availableModels = MODELS.filter(m => {
      if (m.provider === 'groq' && !process.env.GROQ_API_KEY) return false;
      if (m.provider === 'together' && !process.env.TOGETHER_API_KEY) return false;
      if (m.provider === 'openrouter' && !process.env.OPENROUTER_API_KEY) return false;
      if (m.provider === 'ollama' && process.env.OLLAMA_ENABLED !== "true") return false;
      return true;
    });

    if (availableModels.length < 2) {
      return NextResponse.json({ error: "Not enough models available. Check API keys." }, { status: 500 });
    }

    // Pick 2 random unique models
    const shuffled = [...availableModels].sort(() => 0.5 - Math.random());
    const modelA = shuffled[0];
    const modelB = shuffled[1];

    const fetchCompletion = async (modelConfig: ModelConfig) => {
      let endpoint = "";
      let apiKey: string | undefined = "";

      switch (modelConfig.provider) {
        case 'groq':
          endpoint = "https://api.groq.com/openai/v1/chat/completions";
          apiKey = process.env.GROQ_API_KEY;
          break;
        case 'together':
          endpoint = "https://api.together.xyz/v1/chat/completions";
          apiKey = process.env.TOGETHER_API_KEY;
          break;
        case 'openrouter':
          endpoint = "https://openrouter.ai/api/v1/chat/completions";
          apiKey = process.env.OPENROUTER_API_KEY;
          break;
        case 'ollama':
          // Ollama natively supports the OpenAI Chat Completions API format on /v1/chat/completions
          endpoint = process.env.OLLAMA_URL || "http://localhost:11434/v1/chat/completions";
          apiKey = "ollama"; // Token not required, but avoids empty header issues
          break;
      }

      const headers: Record<string, string> = {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      };

      if (modelConfig.provider === 'openrouter') {
        headers["HTTP-Referer"] = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
        headers["X-Title"] = "Parallax AI";
      }

      const res = await fetch(endpoint, {
        method: "POST",
        headers,
        body: JSON.stringify({
          model: modelConfig.id,
          messages: [{ role: "user", content: prompt }],
          max_tokens: 800,
          temperature: 0.7,
        })
      });
      
      if (!res.ok) {
        const errorData = await res.text();
        console.error(`${modelConfig.provider} API error for model ${modelConfig.id}:`, errorData);
        throw new Error(`${modelConfig.provider} API error for model ${modelConfig.id}: ${errorData}`);
      }
      
      const data = await res.json();
      return data.choices?.[0]?.message?.content || "Error generating response.";
    };

    const resA = await fetchCompletion(modelA).catch(e => e.message);
    const resB = await fetchCompletion(modelB).catch(e => e.message);

    const cleanModelName = (id: string) => {
      // Remove namespaces like 'meta-llama/', 'google/', etc.
      const withoutNamespace = id.includes('/') ? id.split('/').pop() || id : id;
      // Remove suffixes like ':free'
      return withoutNamespace.replace(':free', '');
    };

    return NextResponse.json({
      modelA: { name: cleanModelName(modelA.id), response: resA },
      modelB: { name: cleanModelName(modelB.id), response: resB }
    });
  } catch (err: any) {
    console.error("API Battle Error:", err);
    return NextResponse.json({ error: err.message || "Failed to fetch from models" }, { status: 500 });
  }
}
