import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

/* Design rules that can be checked by matching code. Each is written out, with
   its reason, in ../DESIGN.md. These make `npm run lint` fail when one is broken,
   so a rule holds even when nobody rereads the document.

   They read class names and page text in .ts and .tsx files. They cannot see a
   shadow written straight into a .css file. */
const SHADOW_CLASS = "(^|[\\s:!])(drop-|inset-|text-)?shadow-";
const ARROW_OR_MIDDOT = "→|->|·|&rarr;|&middot;";

const NO_SHADOW =
  "No shadows anywhere on the site (DESIGN.md, the No Shadow Rule). Make the edge with tonal contrast or one hairline, e.g. ring-1 ring-navy/10.";
const NO_BOLD =
  "No bold in running copy (DESIGN.md, the Plain Copy Rule). Write the words plain; an on-screen label keeps the product's own capitalization.";
const NO_ARROW_OR_MIDDOT =
  "No text arrows and no middots in copy or labels (DESIGN.md, the No Arrow and No Middot Rules). Write plain words, or use real layout.";

const designRules = {
  files: ["src/**/*.{ts,tsx}"],
  rules: {
    "no-restricted-syntax": [
      "error",
      { selector: "JSXOpeningElement[name.name=/^(strong|b)$/]", message: NO_BOLD },
      { selector: `Literal[value=/${SHADOW_CLASS}/]`, message: NO_SHADOW },
      { selector: `TemplateElement[value.raw=/${SHADOW_CLASS}/]`, message: NO_SHADOW },
      { selector: `JSXText[value=/${ARROW_OR_MIDDOT}/]`, message: NO_ARROW_OR_MIDDOT },
      { selector: `Literal[value=/${ARROW_OR_MIDDOT}/]`, message: NO_ARROW_OR_MIDDOT },
      { selector: `TemplateElement[value.raw=/${ARROW_OR_MIDDOT}/]`, message: NO_ARROW_OR_MIDDOT },
    ],
  },
};

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  designRules,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
