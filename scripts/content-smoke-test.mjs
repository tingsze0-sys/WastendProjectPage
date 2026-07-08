import { existsSync, readFileSync } from "node:fs";

const source = readFileSync("src/app/pages/wastend.tsx", "utf8");
const navSource = readFileSync("src/app/components/glass-nav.tsx", "utf8");
const appSource = readFileSync("src/app/App.tsx", "utf8");

const translationFiles = [
  "src/locales/en/common.json",
  "src/locales/zh/common.json",
  "src/i18n/index.ts",
];

const required = [
  "useTranslation",
  "ObjectIcon",
  "JURISDICTIONS",
  "sources",
  "details",
  "dialog",
  "jccacImage",
];

const forbidden = [
  "What users get",
  "Visual identity",
  "App home screen",
  "Search",
  "Guide",
  "Saved",
  "The site keeps the budget as a project signal",
  "Group 2, six curators",
  "第二組，六位策展人",
];

const missing = required.filter((text) => !source.includes(text));
const missingFiles = translationFiles.filter((path) => !existsSync(path));
const searchableText = [
  source,
  navSource,
  appSource,
  ...translationFiles.filter((path) => existsSync(path)).map((path) => readFileSync(path, "utf8")),
].join("\n");
const stale = forbidden.filter((text) => searchableText.includes(text));
const navMissing = ["Sze Wa Ting", "LanguageToggle"].filter((text) => !navSource.includes(text));
const navStale = ["Group 2", "Rules for Sorting, Rules for Living"].filter((text) =>
  navSource.includes(text),
);
const appMissing = ["I18nextProvider", "i18n"].filter((text) => !appSource.includes(text));

let missingTranslations = [];
if (!missingFiles.length) {
  const en = JSON.parse(readFileSync("src/locales/en/common.json", "utf8"));
  const zh = JSON.parse(readFileSync("src/locales/zh/common.json", "utf8"));
  const requiredKeys = [
    "nav.language",
    "hero.title",
    "comparison.title",
    "venue.title",
    "artworks.dialog.close",
  ];

  const hasKey = (object, key) =>
    key.split(".").reduce((current, part) => current?.[part], object) !== undefined;

  missingTranslations = requiredKeys.flatMap((key) => {
    const missing = [];
    if (!hasKey(en, key)) missing.push(`en:${key}`);
    if (!hasKey(zh, key)) missing.push(`zh:${key}`);
    return missing;
  });
}

if (
  missing.length ||
  stale.length ||
  missingFiles.length ||
  navMissing.length ||
  navStale.length ||
  appMissing.length ||
  missingTranslations.length
) {
  console.error("Content smoke test failed.");
  if (missing.length) console.error("Missing:", missing.join(", "));
  if (missingFiles.length) console.error("Missing files:", missingFiles.join(", "));
  if (navMissing.length) console.error("Missing nav content:", navMissing.join(", "));
  if (navStale.length) console.error("Stale nav content:", navStale.join(", "));
  if (appMissing.length) console.error("Missing i18n app wiring:", appMissing.join(", "));
  if (missingTranslations.length) console.error("Missing translations:", missingTranslations.join(", "));
  if (stale.length) console.error("Stale app-design copy:", stale.join(", "));
  process.exit(1);
}

console.log("Content smoke test passed.");
