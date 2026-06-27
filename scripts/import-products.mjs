import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const sourcePath = path.join(root, "content", "products.csv");
const outputPath = path.join(root, "content", "products.json");

function parseCsv(text) {
  const rows = [];
  let row = [];
  let cell = "";
  let inQuotes = false;

  for (let index = 0; index < text.length; index += 1) {
    const char = text[index];
    const next = text[index + 1];

    if (char === "\"" && inQuotes && next === "\"") {
      cell += "\"";
      index += 1;
      continue;
    }

    if (char === "\"") {
      inQuotes = !inQuotes;
      continue;
    }

    if (char === "," && !inQuotes) {
      row.push(cell.trim());
      cell = "";
      continue;
    }

    if ((char === "\n" || char === "\r") && !inQuotes) {
      if (char === "\r" && next === "\n") {
        index += 1;
      }
      row.push(cell.trim());
      if (row.some(Boolean)) {
        rows.push(row);
      }
      row = [];
      cell = "";
      continue;
    }

    cell += char;
  }

  row.push(cell.trim());
  if (row.some(Boolean)) {
    rows.push(row);
  }

  return rows;
}

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function parseSpecs(value) {
  if (!value) {
    return [];
  }

  return value
    .split("|")
    .map((item) => item.trim())
    .filter(Boolean)
    .map((item) => {
      const [name, ...rest] = item.split("=");
      return [name.trim(), rest.join("=").trim()].filter(Boolean);
    })
    .filter((item) => item.length === 2);
}

function parseList(value) {
  if (!value) {
    return [];
  }

  return value
    .split("|")
    .map((item) => item.trim())
    .filter(Boolean);
}

const csv = await readFile(sourcePath, "utf8");
const rows = parseCsv(csv.replace(/^\uFEFF/, ""));
const [headers, ...records] = rows;

if (!headers?.length) {
  throw new Error("Missing CSV header row.");
}

const products = records
  .map((record) =>
    Object.fromEntries(headers.map((header, index) => [header, record[index] || ""]))
  )
  .filter((product) => product.title)
  .map((product) => {
    const slug = product.slug || slugify(product.title);
    return {
      slug,
      href: `/products/${slug}`,
      title: product.title,
      category: product.category || "X WINCH",
      eyebrow: product.eyebrow || "Professional Stage Lighting",
      image: product.image || "/assets/products/product-placeholder.jpg",
      gallery: parseList(product.gallery),
      summary: product.summary || "",
      applications: product.applications || "",
      specs: parseSpecs(product.specs),
      features: parseList(product.features)
    };
  });

await writeFile(outputPath, `${JSON.stringify(products, null, 2)}\n`);
console.log(`Imported ${products.length} products to ${path.relative(root, outputPath)}`);
