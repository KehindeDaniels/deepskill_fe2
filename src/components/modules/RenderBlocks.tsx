"use client";

import { JSX } from "react";

interface Block {
  type: string;
  level?: number;
  children?: Array<{ text: string; type: string }>;
}

interface RenderBlocksProps {
  blocks: Block[];
}

export default function RenderBlocks({ blocks }: RenderBlocksProps) {
  if (!blocks || !Array.isArray(blocks) || blocks.length === 0) {
    return (
      <p className="text-gray-600 dark:text-gray-400">
        No description available.
      </p>
    );
  }

  return (
    <div className="prose prose-lg dark:prose-invert max-w-none">
      {blocks.map((block: Block, index: number) => {
        switch (block.type) {
          case "heading":
            const HeadingTag = `h${block.level}` as keyof JSX.IntrinsicElements;
            return (
              <HeadingTag
                key={index}
                className={`font-bold mt-6 mb-3 ${
                  block.level === 1
                    ? "text-3xl"
                    : block.level === 2
                    ? "text-2xl"
                    : "text-xl"
                }`}
              >
                {block.children?.[0]?.text || ""}
              </HeadingTag>
            );
          case "paragraph":
            return (
              <p key={index} className="mb-4 text-gray-700 dark:text-gray-300">
                {block.children?.[0]?.text || ""}
              </p>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}
