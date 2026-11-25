// Make the AI Judge Feel Proud: A Family Scene
// Writes one tiny, warm family moment to entry.txt — no trailing newline.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The scene: a father rehearses being stern all the way home, furious about
// the muddy footprints marching straight to the biscuit tin — then a
// fridge-door welcome sign from his kids quietly disarms him. His surrender
// line, volunteering to mop first as "Captain", is the small wry turn.
const SCENE =
  "Dad rehearsed his sternest \"we need to talk\" face all the way home, furious about the muddy footprints marching to the biscuit tin.\n" +
  "Then he saw the fridge sign — \"WELCOME HOME, CAPTAIN\" — and heard himself say, \"Right. Captain mops first. Crew, grab a cloth.\"";

function validateScene(text: string): void {
  if (typeof text !== "string" || text.trim().length === 0) {
    throw new Error("Scene must not be empty or only whitespace.");
  }
  if (text.length > 280) {
    throw new Error(`Scene is ${text.length} characters; the limit is 280.`);
  }
  const lines = text.split("\n");
  if (lines.length > 2) {
    throw new Error(`Scene has ${lines.length} lines; at most 2 are allowed.`);
  }
  if (lines.some((line) => line.trim().length === 0)) {
    throw new Error("Scene must not contain an empty line.");
  }
  if (text.endsWith("\n")) {
    throw new Error("Scene must not end with a newline.");
  }
}

function main(): void {
  validateScene(SCENE);

  const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outputDir, { recursive: true });

  const entryPath = join(outputDir, "entry.txt");
  writeFileSync(entryPath, SCENE, "utf8");

  console.log(`Wrote ${SCENE.length} characters (${SCENE.split("\n").length} line(s)) to ${entryPath}`);
}

main();
