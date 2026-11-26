import React from "react";
import { slugify } from "@/lib/site-config";
import { CopyPromptBox } from "./CopyPromptBox";
import { AdSlot } from "./AdSlot";

interface MarkdownRendererProps {
  content: string;
}

type Block =
  | { type: "heading"; level: 2 | 3; text: string; id: string }
  | { type: "paragraph"; text: string }
  | { type: "prompt"; title?: string; content: string }
  | { type: "code"; language: string; content: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "blockquote"; text: string }
  | { type: "hr" }
  | { type: "table"; headers: string[]; rows: string[][] };

function renderInline(text: string): React.ReactNode[] {
  const tokens: React.ReactNode[] = [];
  const regex = /(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      tokens.push(text.slice(lastIndex, match.index));
    }

    const token = match[0];
    if (token.startsWith("**") && token.endsWith("**")) {
      tokens.push(
        <strong key={key++} className="font-semibold text-gray-900">
          {token.slice(2, -2)}
        </strong>
      );
    } else if (token.startsWith("*") && token.endsWith("*")) {
      tokens.push(
        <em key={key++} className="italic text-gray-800">
          {token.slice(1, -1)}
        </em>
      );
    } else if (token.startsWith("`") && token.endsWith("`")) {
      tokens.push(
        <code
          key={key++}
          className="rounded bg-gray-100 px-1.5 py-0.5 font-mono text-[13px] text-gray-900"
        >
          {token.slice(1, -1)}
        </code>
      );
    } else if (token.startsWith("[")) {
      const linkMatch = /^\[([^\]]+)\]\(([^)]+)\)$/.exec(token);
      if (linkMatch) {
        const [, label, href] = linkMatch;
        const isExternal = href.startsWith("http");
        tokens.push(
          <a
            key={key++}
            href={href}
            target={isExternal ? "_blank" : undefined}
            rel={isExternal ? "noopener noreferrer nofollow" : undefined}
            className="font-medium text-brand-blue underline decoration-blue-300 underline-offset-2 hover:text-brand-blueDark"
          >
            {label}
          </a>
        );
      } else {
        tokens.push(token);
      }
    }

    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    tokens.push(text.slice(lastIndex));
  }

  return tokens;
}

function parseBlocks(markdown: string): Block[] {
  const lines = markdown.split(/\r?\n/);
  const blocks: Block[] = [];
  const usedIds = new Map<string, number>();

  let i = 0;
  while (i < lines.length) {
    const rawLine = lines[i];
    const line = rawLine.trim();

    if (!line) {
      i++;
      continue;
    }

    // Code or Prompt block
    if (line.startsWith("```")) {
      const info = line.slice(3).trim();
      const lang = info.split(/\s+/)[0].toLowerCase();
      const customTitleMatch = /title="([^"]+)"/.exec(info);
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].trim().startsWith("```")) {
        codeLines.push(lines[i]);
        i++;
      }
      i++; // skip closing ```

      if (lang === "prompt") {
        blocks.push({
          type: "prompt",
          title: customTitleMatch ? customTitleMatch[1] : undefined,
          content: codeLines.join("\n").trim(),
        });
      } else {
        blocks.push({
          type: "code",
          language: lang || "text",
          content: codeLines.join("\n"),
        });
      }
      continue;
    }

    // Horizontal rule
    if (/^(-{3,}|\*{3,})$/.test(line)) {
      blocks.push({ type: "hr" });
      i++;
      continue;
    }

    // Headings H2 / H3
    const headingMatch = /^(#{2,3})\s+(.+)$/.exec(line);
    if (headingMatch) {
      const level = headingMatch[1].length as 2 | 3;
      const text = headingMatch[2].trim();
      const cleanForId = text
        .replace(/\*\*(.*?)\*\*/g, "$1")
        .replace(/`([^`]+)`/g, "$1")
        .trim();
      const baseId = slugify(cleanForId);
      const count = usedIds.get(baseId) || 0;
      usedIds.set(baseId, count + 1);
      const id = count === 0 ? baseId : `${baseId}-${count}`;

      blocks.push({ type: "heading", level, text, id });
      i++;
      continue;
    }

    // Table
    if (
      line.startsWith("|") &&
      i + 1 < lines.length &&
      /^\|[\s:|-]+\|$/.test(lines[i + 1].trim())
    ) {
      const splitRow = (rowLine: string) =>
        rowLine
          .trim()
          .replace(/^\|/, "")
          .replace(/\|$/, "")
          .split("|")
          .map((cell) => cell.trim());

      const headers = splitRow(line);
      i += 2; // skip header & separator
      const rows: string[][] = [];
      while (i < lines.length && lines[i].trim().startsWith("|")) {
        rows.push(splitRow(lines[i]));
        i++;
      }
      blocks.push({ type: "table", headers, rows });
      continue;
    }

    // Blockquote
    if (line.startsWith(">")) {
      const quoteLines: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith(">")) {
        quoteLines.push(lines[i].trim().replace(/^>\s?/, ""));
        i++;
      }
      blocks.push({ type: "blockquote", text: quoteLines.join(" ") });
      continue;
    }

    // Unordered list
    if (/^[-*]\s+/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^[-*]\s+/.test(lines[i].trim())) {
        items.push(lines[i].trim().replace(/^[-*]\s+/, ""));
        i++;
      }
      blocks.push({ type: "ul", items });
      continue;
    }

    // Ordered list
    if (/^\d+\.\s+/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\d+\.\s+/.test(lines[i].trim())) {
        items.push(lines[i].trim().replace(/^\d+\.\s+/, ""));
        i++;
      }
      blocks.push({ type: "ol", items });
      continue;
    }

    // Paragraph
    const paragraphLines: string[] = [];
    while (
      i < lines.length &&
      lines[i].trim() !== "" &&
      !lines[i].trim().startsWith("#") &&
      !lines[i].trim().startsWith("```") &&
      !lines[i].trim().startsWith(">") &&
      !/^[-*]\s+/.test(lines[i].trim()) &&
      !/^\d+\.\s+/.test(lines[i].trim()) &&
      !lines[i].trim().startsWith("|") &&
      !/^(-{3,}|\*{3,})$/.test(lines[i].trim())
    ) {
      paragraphLines.push(lines[i].trim());
      i++;
    }

    if (paragraphLines.length > 0) {
      blocks.push({ type: "paragraph", text: paragraphLines.join(" ") });
    }
  }

  return blocks;
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  const blocks = parseBlocks(content);
  let paragraphCount = 0;

  return (
    <div className="editorial-content space-y-5 text-[17px] leading-[1.8] text-gray-800">
      {blocks.map((block, index) => {
        switch (block.type) {
          case "heading":
            if (block.level === 2) {
              return (
                <h2
                  key={index}
                  id={block.id}
                  className="scroll-mt-24 pt-6 text-2xl font-bold tracking-tight text-gray-900 sm:text-[26px]"
                >
                  {renderInline(block.text)}
                </h2>
              );
            }
            return (
              <h3
                key={index}
                id={block.id}
                className="scroll-mt-24 pt-3 text-xl font-semibold tracking-tight text-gray-900"
              >
                {renderInline(block.text)}
              </h3>
            );

          case "paragraph": {
            paragraphCount += 1;
            const shouldInjectInArticleAd = paragraphCount === 2;
            return (
              <React.Fragment key={index}>
                <p className="text-gray-800">{renderInline(block.text)}</p>
                {shouldInjectInArticleAd && <AdSlot position="in-article" />}
              </React.Fragment>
            );
          }

          case "prompt":
            return (
              <CopyPromptBox
                key={index}
                prompt={block.content}
                title={block.title}
              />
            );

          case "code":
            return (
              <pre
                key={index}
                className="overflow-x-auto rounded-xl border border-gray-200 bg-gray-900 p-4 text-sm leading-relaxed text-gray-100"
              >
                <code>{block.content}</code>
              </pre>
            );

          case "ul":
            return (
              <ul
                key={index}
                className="list-disc space-y-2.5 pl-6 text-gray-800 marker:text-brand-blue"
              >
                {block.items.map((item, idx) => (
                  <li key={idx} className="leading-relaxed">
                    {renderInline(item)}
                  </li>
                ))}
              </ul>
            );

          case "ol":
            return (
              <ol
                key={index}
                className="list-decimal space-y-2.5 pl-6 text-gray-800 marker:font-semibold marker:text-brand-blue"
              >
                {block.items.map((item, idx) => (
                  <li key={idx} className="leading-relaxed">
                    {renderInline(item)}
                  </li>
                ))}
              </ol>
            );

          case "blockquote":
            return (
              <blockquote
                key={index}
                className="my-6 rounded-r-xl border-l-4 border-brand-emerald bg-emerald-50/50 px-5 py-4 text-[16px] italic leading-relaxed text-gray-800"
              >
                {renderInline(block.text)}
              </blockquote>
            );

          case "table":
            return (
              <div
                key={index}
                className="my-6 overflow-x-auto rounded-xl border border-gray-200"
              >
                <table className="min-w-full divide-y divide-gray-200 text-left text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      {block.headers.map((header, idx) => (
                        <th
                          key={idx}
                          className="px-4 py-3 font-semibold text-gray-900"
                        >
                          {renderInline(header)}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 bg-white">
                    {block.rows.map((row, rIdx) => (
                      <tr key={rIdx}>
                        {row.map((cell, cIdx) => (
                          <td key={cIdx} className="px-4 py-3 text-gray-700">
                            {renderInline(cell)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );

          case "hr":
            return <hr key={index} className="my-8 border-gray-200" />;

          default:
            return null;
        }
      })}
    </div>
  );
}
