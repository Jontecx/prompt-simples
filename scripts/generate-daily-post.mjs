import fs from "fs";
import path from "path";

const ROOT_DIR = process.cwd();
const PLAN_PATH = path.join(ROOT_DIR, "content", "weekly-plan.json");
const POSTS_DIR = path.join(ROOT_DIR, "content", "posts");
const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://promptsimples.com.br").replace(/\/+$/, "");
const API_KEY = (process.env.GEMINI_API_KEY || "").trim();

if (!API_KEY) {
  console.error("Erro: variável de ambiente GEMINI_API_KEY não configurada.");
  process.exit(1);
}

function slugify(text) {
  return String(text || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

async function callLlm(prompt, expectJson = false) {
  if (API_KEY.startsWith("sk-or-")) {
    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 6000,
        ...(expectJson ? { response_format: { type: "json_object" } } : {}),
      }),
    });

    if (!res.ok) {
      throw new Error(`OpenRouter API falhou (${res.status}): ${await res.text()}`);
    }
    const data = await res.json();
    return data.choices?.[0]?.message?.content || "";
  }

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        ...(expectJson ? { generationConfig: { responseMimeType: "application/json" } } : {}),
      }),
    }
  );

  if (!res.ok) {
    throw new Error(`Gemini API falhou (${res.status}): ${await res.text()}`);
  }
  const data = await res.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text || "";
}

async function createAdHocTopic(directive, existingSlugs) {
  const categories = directive?.priorityCategories?.length
    ? directive.priorityCategories
    : ["Produtividade", "Carreira e Negócios", "Criação de Conteúdo", "Ferramentas de IA"];

  const prompt = `
Você é editor-chefe do portal brasileiro "Prompt Simples".
Crie 1 pauta INÉDITA de artigo prático seguindo o direcionamento semanal abaixo:
- Tema da semana: ${directive?.weekTheme || "Prompts práticos de IA para o dia a dia"}
- Público: ${directive?.targetAudience || "Iniciantes, empreendedores e profissionais brasileiros"}
- Categorias permitidas: ${categories.join(", ")}
- Slugs já existentes (NÃO repita estes temas): ${existingSlugs.join(", ")}

Retorne estritamente JSON:
{
  "title": "Título claro e atrativo para SEO em PT-BR",
  "category": "Uma das categorias permitidas exatamente igual",
  "angle": "Resumo do ângulo prático",
  "promptFocus": "Quais prompts copiáveis serão entregues"
}
`;

  const raw = await callLlm(prompt, true);
  const parsed = JSON.parse(raw.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim());
  const today = new Date().toISOString().split("T")[0];
  const title = parsed.title || `Guia Prático de IA — ${today}`;
  return {
    id: `auto-${Date.now()}`,
    dayOfWeek: "Automático",
    scheduledDate: today,
    slot: new Date().getUTCHours() < 16 ? "09:00" : "18:00",
    title,
    slug: slugify(title),
    category: categories.includes(parsed.category) ? parsed.category : categories[0],
    angle: parsed.angle || "Aplicação prática imediata",
    promptFocus: parsed.promptFocus || "Prompts prontos para copiar com 1 clique",
    status: "pending",
  };
}

async function main() {
  if (!fs.existsSync(POSTS_DIR)) {
    fs.mkdirSync(POSTS_DIR, { recursive: true });
  }

  let plan = {
    weeklyDirective: {
      weekTheme: "Prompts práticos de IA para produtividade, vendas e negócios no Brasil",
      targetAudience: "Empreendedores e profissionais brasileiros",
      toneGuidelines: "Português do Brasil natural, direto e sem clichês",
      priorityCategories: ["Produtividade", "Carreira e Negócios", "Criação de Conteúdo", "Ferramentas de IA"],
    },
    queue: [],
  };

  if (fs.existsSync(PLAN_PATH)) {
    plan = JSON.parse(fs.readFileSync(PLAN_PATH, "utf8"));
  }

  const existingSlugs = fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"))
    .map((f) => f.replace(/\.(mdx|md)$/, ""));

  let targetTopic = (plan.queue || []).find(
    (item) => item.status === "pending" && !existingSlugs.includes(slugify(item.slug || item.title))
  );

  if (!targetTopic) {
    console.log("Fila semanal sem pautas pendentes inéditas. Gerando pauta automática a partir da diretriz da semana...");
    targetTopic = await createAdHocTopic(plan.weeklyDirective, existingSlugs);
    plan.queue = plan.queue || [];
    plan.queue.push(targetTopic);
  }

  const finalSlug = slugify(targetTopic.slug || targetTopic.title);
  const todayIso = new Date().toISOString().split("T")[0];

  const mdxPrompt = `
Atue como Jonatas Alcântara, fundador e editor do portal brasileiro "Prompt Simples".
Escreva um artigo completo, original e altamente prático em Português do Brasil (mínimo de 950 palavras) no formato MDX.

Título: "${targetTopic.title}"
Categoria exata: "${targetTopic.category}"
Ângulo: "${targetTopic.angle}"
Foco dos prompts: "${targetTopic.promptFocus}"
Direcionamento da semana: "${plan.weeklyDirective?.weekTheme || ""}"
Público-alvo: "${plan.weeklyDirective?.targetAudience || "Empreendedores e profissionais brasileiros"}"

REGRAS OBRIGATÓRIAS:
1. Comece EXATAMENTE com este frontmatter YAML válido (mantenha o autor como Jonatas Alcântara):
---
title: "${targetTopic.title.replace(/"/g, "'")}"
description: "Meta descrição persuasiva de 130 a 155 caracteres em PT-BR"
date: "${todayIso}"
updatedAt: "${todayIso}"
category: "${targetTopic.category}"
author:
  name: "Jonatas Alcântara"
  role: "Fundador e Editor do Prompt Simples"
  bio: "Especialista em automação, Inteligência Artificial aplicada e engenharia de prompts traduzindo a IA para o dia a dia de profissionais e empresas no Brasil."
tags:
  - ia pratica
  - prompts
  - ${slugify(targetTopic.category).replace(/-/g, " ")}
featured: false
---

2. Escreva uma introdução de 2 parágrafos claros (o site insere anúncio após o 2º parágrafo).
3. Use subtítulos ## H2 e ### H3, listas acionáveis e exemplos do cotidiano brasileiro.
4. Inclua de 3 a 5 blocos de prompts copiáveis usando EXATAMENTE:
\`\`\`prompt title="Prompt 1: Título Objetivo"
Texto do prompt com campos entre [colchetes]...
\`\`\`
5. Nunca invente nomes de outros autores e evite clichês robóticos.
6. Retorne APENAS o conteúdo MDX (sem envolver o arquivo em \`\`\`markdown).
`;

  console.log(`Gerando artigo: ${targetTopic.title} (${finalSlug})...`);
  const rawMdx = await callLlm(mdxPrompt, false);
  const cleanMdx = rawMdx
    .replace(/^```(?:mdx|markdown)?\n?/i, "")
    .replace(/\n?```$/i, "")
    .trim() + "\n";

  const outPath = path.join(POSTS_DIR, `${finalSlug}.mdx`);
  fs.writeFileSync(outPath, cleanMdx, "utf8");

  targetTopic.status = "published";
  targetTopic.slug = finalSlug;
  targetTopic.publishedAt = new Date().toISOString();
  targetTopic.publishedUrl = `${SITE_URL}/blog/${finalSlug}`;

  fs.writeFileSync(PLAN_PATH, JSON.stringify(plan, null, 2) + "\n", "utf8");
  console.log(`Artigo salvo com sucesso em ${outPath}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
