import { cp, mkdir, rm } from "node:fs/promises";
import { existsSync } from "node:fs";

await rm("dist", { recursive: true, force: true });
await mkdir("dist/assets", { recursive: true });

if (existsSync("public")) {
  await cp("public", "dist", { recursive: true });
}
