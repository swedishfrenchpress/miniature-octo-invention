import { spawn } from "node:child_process";
import { mkdir, rm } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { chromium } from "playwright";

function getArg(name, fallback) {
  const index = process.argv.indexOf(name);
  if (index === -1) return fallback;
  const value = process.argv[index + 1];
  if (!value || value.startsWith("--")) return fallback;
  return value;
}

function getNumberArg(name, fallback) {
  const value = getArg(name, undefined);
  if (value == null) return fallback;
  const num = Number(value);
  return Number.isFinite(num) ? num : fallback;
}

function run(cmd, args, opts = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(cmd, args, { stdio: "inherit", ...opts });
    child.on("error", reject);
    child.on("close", (code) => {
      if (code === 0) resolve();
      else reject(new Error(`${cmd} exited with code ${code}`));
    });
  });
}

function padFrame(index) {
  return String(index).padStart(6, "0");
}

async function main() {
  const url = getArg("--url", "http://localhost:3000/export/offline");
  const outDir = getArg("--outDir", path.join(process.cwd(), "public", "exports"));
  const outBase = getArg("--outBase", "works-offline");

  const width = getNumberArg("--width", 900);
  const height = getNumberArg("--height", 506); // ~16:9 at 900w

  const durationSeconds = getNumberArg("--duration", 6);
  const fps = getNumberArg("--fps", 30);
  const gifFps = getNumberArg("--gifFps", 18);
  const gifWidth = getNumberArg("--gifWidth", 720);

  const tmpDir = path.join(process.cwd(), ".tmp", "exports", `works-offline-${Date.now()}`);
  const framesDir = path.join(tmpDir, "frames");

  await mkdir(framesDir, { recursive: true });
  await mkdir(outDir, { recursive: true });

  const browser = await chromium.launch({ headless: true });
  try {
    const context = await browser.newContext({
      viewport: { width, height },
      deviceScaleFactor: 2,
      reducedMotion: "no-preference",
    });

    const page = await context.newPage();
    await page.goto(url, { waitUntil: "networkidle" });
    await page.waitForTimeout(500);

    const frameCount = Math.max(1, Math.round(durationSeconds * fps));
    const frameDelayMs = 1000 / fps;

    for (let i = 0; i < frameCount; i += 1) {
      const framePath = path.join(framesDir, `frame${padFrame(i)}.png`);
      await page.screenshot({ path: framePath, type: "png" });
      await page.waitForTimeout(frameDelayMs);
    }

    await context.close();
  } finally {
    await browser.close();
  }

  const inputPattern = path.join(framesDir, "frame%06d.png");
  const outMp4 = path.join(outDir, `${outBase}.mp4`);
  const outGif = path.join(outDir, `${outBase}.gif`);

  // MP4 export (H.264, broadly compatible).
  await run("ffmpeg", [
    "-y",
    "-framerate",
    String(fps),
    "-i",
    inputPattern,
    "-c:v",
    "libx264",
    "-pix_fmt",
    "yuv420p",
    "-vf",
    "scale=trunc(iw/2)*2:trunc(ih/2)*2",
    outMp4,
  ]);

  // GIF export (palettegen/paletteuse for decent quality + filesize).
  await run("ffmpeg", [
    "-y",
    "-framerate",
    String(gifFps),
    "-i",
    inputPattern,
    "-vf",
    `fps=${gifFps},scale=${gifWidth}:-1:flags=lanczos,split[s0][s1];[s0]palettegen[p];[s1][p]paletteuse=dither=bayer`,
    outGif,
  ]);

  // Clean up temporary frames.
  await rm(tmpDir, { recursive: true, force: true });

  // eslint-disable-next-line no-console
  console.log(`Wrote:\n- ${outMp4}\n- ${outGif}`);
}

main().catch((err) => {
  // eslint-disable-next-line no-console
  console.error(err);
  process.exitCode = 1;
});

