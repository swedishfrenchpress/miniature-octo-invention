# Stress-test content

Worst-case content for checking that the site holds up when the real content
changes: a long release title, a wallet with a long name, a screenshot taken on
a different phone, a step added before its picture exists.

## How to use it

Run `npm run dev` and open any page. A small grey switch sits at the bottom of
the window:

| State | What it shows |
| --- | --- |
| Demo data | The real site. |
| Worst case | Awkward but believable content everywhere (see `fixtures.tsx`), and a fourth page link in the nav. |
| Empty | Wallet groups with no wallets, an FAQ with no questions, guides with no steps. |
| One | One release, one wallet per group, one question, one step per guide. |
| Many | 60 releases, 24 wallets per group, 24 questions, 12 steps per guide. |
| German | The site's headings, labels and buttons in German, the way a browser's translator would show them (`german.ts`). |

The choice is kept in a cookie, so it holds from page to page and across reloads.
Switch back to Demo data when you are done.

## Rules

- **Development only.** `breakData()` returns nothing in a production build, the
  switch is never imported there, and every page stays static.
- **Every value is plausible.** Real wallet names, a real kind of typo, an image
  the site already has used the wrong way. Nothing random, nothing absurdly long.
- **It changes content, never components.** The fixtures go in through the same
  doors the real content does: the release list, the wallet groups, the FAQ
  list, the guide steps, the nav links.
- **Keep it.** When a component changes, flip through the states again. This is
  the regression test.
