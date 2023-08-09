import { Configuration, OpenAIApi } from "openai";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;
const MODEL_NAME = "gpt-3.5-turbo";

const configuration = new Configuration({
  apiKey: process.env.OPEN_API_KEY,
  organization: process.env.OPEN_API_ORG ?? undefined,
});

const openai = new OpenAIApi(configuration);

app.use(helmet());
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use((req, res, next) => {
  const { code } = req.body;
  if (!code) {
    return res.status(400).send({ error: "Código é necessário." });
  }
  next();
});

const generateOpenAIResponse = async (systemMessage: string, code: string) => {
  return await openai.createChatCompletion({
    messages: [
      {
        role: "system",
        content: systemMessage,
      },
      {
        role: "user",
        content: code,
      },
    ],
    model: MODEL_NAME,
    max_tokens: 1000,
  });
};

app.post("/analyze-bugs", async (req, res) => {
  try {
    const systemMessage =
      "Analise o seguinte código em busca de possíveis bugs ou anti-padrões.";
    const response = await generateOpenAIResponse(systemMessage, req.body.code);
    res.send({ analyze: response.data.choices[0].message?.content });
  } catch (error: any) {
    console.error(error);
    res.status(500).send({ error: "Erro interno do servidor." });
  }
});

app.post("/generate-doc", async (req, res) => {
  try {
    const systemMessage =
      "Você é um assistente de documentação de código. Analise o código a seguir e gere uma documentação em formato Markdown.";
    const response = await generateOpenAIResponse(systemMessage, req.body.code);
    res.send({ markdownContent: response.data.choices[0].message?.content });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Erro interno do servidor." });
  }
});

app.post("/refactor-code", async (req, res) => {
  try {
    const systemMessage =
      "Você é um assistente de refatoração de código. Analise o código a seguir e sugira melhorias ou refatorações.";
    const response = await generateOpenAIResponse(systemMessage, req.body.code);
    res.send({ refactoredCode: response.data.choices[0].message?.content });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Erro interno do servidor." });
  }
});

app.post("/generate-tests", async (req, res) => {
  try {
    const systemMessage = `
        Você é um assistente de geração de testes. 
        Crie e implemente os testes baseado no código compartilhado com você. 
        Ponto importante, se o código for TS/JS utilize Jest, caso for qualquer outra linguagem, utilize a biblioteca mais famosa.
        `;
    const response = await generateOpenAIResponse(systemMessage, req.body.code);
    res.send({ test: response.data.choices[0].message?.content });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Erro interno do servidor." });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
