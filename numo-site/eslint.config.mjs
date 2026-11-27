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
const TINT = "(^|[\\s:])bg-(sunken|mint-soft|gray-)";
const UPPERCASE = "(^|[\\s:!])uppercase(\\s|$)";
const LARGE_HEADING = "\\btext-(hero|display|h2|title)\\b";
const BOLD = "\\bfont-(semibold|bold|extrabold|black)\\b";

const NO_SHADOW =
  "No shadows anywhere on the site (DESIGN.md, the No Shadow Rule). Make the edge with tonal contrast or one hairline, e.g. ring-1 ring-navy/10.";
const NO_BOLD =
  "No bold in running copy (DESIGN.md, the Plain Copy Rule). Write the words plain; an on-screen label keeps the product's own capitalization.";
const NO_ARROW_OR_MIDDOT =
  "No text arrows and no middots in copy or labels (DESIGN.md, the No Arrow and No Middot Rules). Write plain words, or use real layout.";
const NO_CAPITALS =
  "No text set in capitals (DESIGN.md, the No Capitals Rule). Write it in sentence case; only the NUMO wordmark is in capitals.";
const MEDIUM_DISPLAY =
  "Large headings are weight 500 (DESIGN.md, the Medium Display Rule). Drop the bold class; text-h3 is the one SemiBold heading.";
const NO_TINTED_SECTION =
  "Every section's ground is plain white (DESIGN.md, the Own Ground Rule). Separate sections with border-t border-line and the section space; bg-sunken is for stages, pills and hovers.";

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
      // A tint in a <section>'s class, or in any class that also carries section-y
      // (a section built from a <div>, like the privacy text).
      {
        selector: `JSXOpeningElement[name.name="section"] JSXAttribute[name.name="className"] Literal[value=/${TINT}/]`,
        message: NO_TINTED_SECTION,
      },
      {
        selector: `JSXOpeningElement[name.name="section"] JSXAttribute[name.name="className"] TemplateElement[value.raw=/${TINT}/]`,
        message: NO_TINTED_SECTION,
      },
      {
        selector: `Literal[value=/\\bsection-y\\b/][value=/${TINT}/]:not(JSXOpeningElement[name.name="section"] Literal)`,
        message: NO_TINTED_SECTION,
      },
      {
        selector: `TemplateElement[value.raw=/\\bsection-y\\b/][value.raw=/${TINT}/]:not(JSXOpeningElement[name.name="section"] TemplateElement)`,
        message: NO_TINTED_SECTION,
      },
      { selector: `Literal[value=/${UPPERCASE}/]`, message: NO_CAPITALS },
      { selector: `TemplateElement[value.raw=/${UPPERCASE}/]`, message: NO_CAPITALS },
      { selector: `Literal[value=/${LARGE_HEADING}/][value=/${BOLD}/]`, message: MEDIUM_DISPLAY },
      // A template class string is judged whole, so `text-title ${x} font-bold` is caught.
      {
        selector: `TemplateLiteral:has(TemplateElement[value.raw=/${LARGE_HEADING}/]):has(TemplateElement[value.raw=/${BOLD}/])`,
        message: MEDIUM_DISPLAY,
      },
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
