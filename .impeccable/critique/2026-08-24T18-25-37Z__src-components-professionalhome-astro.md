---
target: professional home -> work -> case study (audit + critique)
total_score: 22
max_score: 40
na_heuristics: 
p0_count: 1
p1_count: 5
timestamp: 2026-08-24T18-25-37Z
slug: src-components-professionalhome-astro
---
Method: dual-agent (A: design review, isolated · B: detector + browser evidence, isolated).
Target: professional home -> work index -> case study. Mode: Experience surface with Persuade intent.

## Design Health Score - 22/40 (Acceptable)

| # | Heuristic | Score | Key issue |
|---|---|---|---|
| 1 | Visibility of System Status | 2 | Case-study TOC lists 7 entries for a 12-section document, no scroll-spy; aria-current missing on 8 pages |
| 2 | Match System / Real World | 3 | Recruiter-checklist snapshot is excellent; undercut by unglossed Recall@3 / MRR@3 on the home |
| 3 | User Control and Freedom | 2 | Primary nav vanishes <=980px on Work/case pages; 4 pages have no language switcher; no custom 404 |
| 4 | Consistency and Standards | 2 | .primary-action means two different things; three URL shapes for Spanish |
| 5 | Error Prevention | 2 | mailto: is the only contact path; address never rendered as copyable text |
| 6 | Recognition Rather Than Recall | 3 | Snapshot panel and per-card role/proof/stack mean nothing must be memorized |
| 7 | Flexibility and Efficiency | 3 | Real skimmer and deep-reader paths; role-targeted PDF variant never advertised from the home |
| 8 | Aesthetic and Minimalist Design | 1 | ~10:1 type range with vacant 13-20px register; "1,000+ documents" appears 3x on one page |
| 9 | Error Recovery | 1 | No custom 404 anywhere under src/pages/ |
| 10 | Help and Documentation | 3 | The site documents its own claims - disclosure boundary, audit basis. Set at 8px |

## Audit Health Score - 13/20 (Acceptable)

| # | Dimension | Score | Key finding |
|---|---|---|---|
| 1 | Accessibility | 3 | Excellent foundation; verified AA failures at 5 call sites on the primary path |
| 2 | Performance | 3 | Zero JS, zero images, 28KB CSS. Render-blocking fonts; 57% dead CSS on home bundle |
| 3 | Theming | 2 | Sophisticated dual-theme tokens with 4 values that break on theme flip; prefers-color-scheme ignored |
| 4 | Responsive Design | 2 | No overflow at 390px, dense breakpoints - but primary nav disappears on the mobile journey |
| 5 | Implementation Integrity | 3 | Coherent and product-specific at the data layer; two-tier maturity gradient in presentation |

P0: 1 · P1: 5 · P2: 4 · P3: 4

## Implementation Integrity Verdict - Pass, with drift

CLI detector: exit 0, zero findings across 55 .astro files. Control test (planted bounce cubic-bezier -> exit 2)
proves the clean result is genuine. No DESIGN.md, no rule ignores, nothing suppressed.

Integrity rests on src/content/. EvidenceEntry types every claim as measured|implemented|target and
individual|team with source and publicDisclosure. publicMetric() in work.ts THROWS AT BUILD TIME if a case
study cites a claim not in the ledger with public disclosure. retiredClaims freezes removed boasts with
reasons. No unrelated product could use this unchanged.

Drift is at the presentation layer and is a MATURITY GRADIENT, not scattered defects. Newer surfaces
(home, work, about, cv) are token-clean. Older article surfaces lag on every axis simultaneously: no
language switcher, no aria-current, no new-tab announcement, ~250 hard-coded color literals, most of the
sub-12px type.

## Design Specificity Verdict

Split: the content model is more specific than almost any developer portfolio; the composition is
category-interchangeable - and the generic layer actively suppresses the specific one.

Interchangeable: Manrope + DM Mono, off-white/near-black editorial palette, 9px uppercase mono eyebrows,
"01 / SELECTED WORK" indices, hero-plus-right-rail-index. Every section h2 fills the identical slot -
line one, <br>, <em>line two</em> - four times. Interaction vocabulary: header height on scroll,
underline recolor, opacity .9.

The design throws away the best field in its own data model. The home renders value+label only; source,
kind, and attribution never appear on the home and surface on case studies at 8px.

Deterministic scan: CLI clean. In-page detector reported ~451 findings across 5 pages, dominated by
undersized-ui-text (79 on /en/, 82 case study, 49 about, 34 cv). Corroborates the static count of 301
sub-12px CSS declarations - two methods, same conclusion. Root font-size is exactly 16px, so these are
true CSS pixels.

False positives excluded: numbered-section-labels reports el=body (one decision counted N times);
gpt-thin-border-wide-shadow is button.theme-toggle counted 5x; an initial 16-element overflow reading was
the detector's own overlay nodes, re-measured clean.

Overlays: injection succeeded on all 5 pages; NO overlay currently visible (live server stopped, tabs closed).

## Overall Impression

A careful site with a genuinely original idea at its center, wearing a template. The evidence ledger is the
most credible thing on this portfolio, and the design gives it 8px. Meanwhile four accent tokens fail WCAG
in the default theme on the page the nav points to. Biggest opportunity: make the provenance the design.

## What's Working

1. The evidence ledger is architecture, not copy. Build-time enforcement plus committed retracted claims.
2. Accessibility fundamentals unusually well built. Every text/background pair clears 5.19:1, most far
   higher (dark --muted 9.04, primary CTA 15.85/17.24). Skip link, <main>, theme toggle on 100% of 28
   pages. Clean heading outlines on 26/26 content pages. :focus-visible with per-surface focus tokens;
   outline declared nowhere else in src/, so the zero-specificity :where() rule cannot be overridden.
3. Working-memory discipline. Every group <=4 items; every depth restates its own context.

## Priority Issues

### [P0] The conversion moment has no primary action, and the strongest button points away from contact
Four .contact-links pills carry identical weight. Boundary measures 1.04:1 (surface on --paper-2, dark)
and 1.52:1 (border) against the 3:1 WCAG 1.4.11 requires. On the case study priority inverts:
.primary-action = "Open resume", .quiet-action = "Contact me". In the hero the only solid button is #work,
a scroll anchor.
CORRECTION to design review: .contact-links a DOES set min-height:44px (portfolio.css:677). Tap target is
fine; visual weight and boundary contrast are not.
Fix: promote "Send an email" to .primary-action, demote the rest, add --line-strong at >=3:1, swap the
case-study pair, render the address as visible selectable text with a response-time expectation.
Command: /impeccable bolder

### [P1] Work-index number badges fail WCAG AA in the default theme - all four accents
work.css:22 hardcodes color:#101310 on background:var(--card-accent), which flips per theme.
  coral #263b67 -> 1.70:1  (with var(--ink): 9.68)
  lime  #354326 -> 1.77:1  (9.30)
  blue  #203c4c -> 1.61:1  (10.17)
  violet #3b3048 -> 1.52:1 (10.83)
Four call sites: work.css lines 22, 38, 133, 134. Dark is the DEFAULT theme. Separately .work-index-cta a
measures 4.28:1 in LIGHT theme (#101310 on #5274d4) at 14px/800 - marginal fail in the opposite direction.
The rest of the codebase uses the correct pattern, color: var(--ink).
Command: /impeccable harden

### [P1] Primary navigation disappears below 980px on Work and case-study pages
portfolio.css:696 sets .portfolio-header > nav { display:none } with no hamburger.
professional-home.css:117 overrides it for .pro-header with a comment reading "The reduced four-item
navigation stays reachable instead of disappearing, because it is the only path to Work, Writing, About,
and the resume." The author diagnosed this exact problem and fixed it for the HOME ONLY. Work and every
case study still inherit the disappearance.
Command: /impeccable adapt

### [P1] The 8-11px tier carries the site's load-bearing content
301 declarations below 12px - 134 at 9px, 55 at 8px, 8 at 7px. Not fine print: .work-role (9px, role on
each card), .work-proof (9px), .hero-proof span (9px, labels for the four verified metrics),
.case-metrics small (8px, "Measured result / team result"), .resume-experience li (11px, the resume's
actual bullets). A director reads ~30% at 18px and skips the 9px label - losing "from a team migration".
Command: /impeccable typeset

### [P1] Two font-weight bugs mean the intended type never renders
Layout.astro requests Manrope:wght@400;500;600;700;800 (STATIC instances), but 16 declarations use
450/520/620/630/650/750 including .case-hero h1, .work-index-hero h1, professional home. Fix: wght@400..800.
Separately 31 declarations set --mono at 600/700, but DM Mono ships nothing above 500 and only 400/500 are
requested -> synthetic faux-bold at 7-10px. That one needs the CSS changed, not the request.
Command: /impeccable typeset

### [P2] Four of ten writing links cross languages, onto pages with no way back
The ES home sends 3 of its 5 writing links to lang="en" pages; the EN home sends 1 to a Spanish page.
Three destinations (/system-design/, /system-design/ddia/chapter-01/,
/system-design/concurrencia-vs-paralelismo-python/) have NO language switcher. Root namespace is
mixed-language: /system-design/ is English while its sibling /system-design/elegir-base-de-datos/ is
Spanish, both unprefixed. Six pages carry no hreflang alternates.
Command: /impeccable harden

### [P2] Redundancy inflates the page and /en/work/ duplicates the home
"1,000+ documents" 3x in three phrasings; ~30% 3x; targetRoles twice in full; the four-item competency
list 3x in the first two screens. /en/work/ restates the home's work cards adding only a status badge,
while the home's cards link past the index straight to case studies.
Command: /impeccable distill

### [P2] Render-blocking third-party fonts and 57% dead CSS on the home
Seven font faces load from fonts.googleapis.com as a render-blocking stylesheet - the largest LCP cost on
a site that ships ZERO JavaScript. portfolio.css defines 115 classes of which 65 are unused on /en/
(~13K of the 22.6K bundle). A few (is-scrolled) are JS-applied false positives; the bulk are editorial-only.
OG images are 768K and 764K PNGs.
Command: /impeccable optimize

### [P3] No custom 404, and prefers-color-scheme is ignored
No 404 under src/pages/. Layout.astro forces 'dark' whenever nothing is stored; the palette is authored
light-first (:root is light), so the default experience is the LESS-rehearsed theme - very likely why the
P1 contrast bug shipped. The no-JS path falls back to light while the JS path is dark.
Command: /impeccable harden

## Cognitive Load - 5 of 8 failures (Critical)

Passing: chunking (every group <=4), visual grouping, working memory (strongest dimension).
Failing: single focus (hero fires ~15 units before a scroll), visual hierarchy ("01 / SELECTED WORK" -
pure ornament - carries the same 9px weight as each card's role and proof), one-thing-at-a-time, minimal
choices, progressive disclosure (the case study's SECOND section is "Disclosure boundary / Kept private").
Decision points over 4: desktop header exposes 9 interactive targets; writing section 5; case-study TOC 7
options for a 12-section page; 28 links total on a single-scroll home.

## Persona Red Flags

Casey (distracted mobile): shared case-study link on a phone -> header is a logo and ES/EN, nothing else.
18 of 29 interactive elements on /en/ measure under 44x44 at a true 390px viewport; height is the failing
dimension (nav links 18px tall, two footnote links 13px). .theme-toggle is fixed bottom-right, permanently
occupying the prime thumb zone, while the conversion action does not exist there. mailto: fails silently
on a phone with no configured client and the address appears nowhere as copyable text.

Riley (stress tester) - the persona this site was built for, and mostly wins: finds Failure modes,
Trade-offs, "3 / 5 milestones accepted", ~30% credited to a team. Then flips the theme and finds the
01/02/03 badges at 1.70:1 on the flagship page. Asks where EvidenceEntry.source is - the model records it
for every claim; the page never shows it. Types a stale URL, gets an unbranded host 404.

Dana (engineering director, 90-second skim): 0-15s name/level/specialization good, snapshot panel is her
screening checklist but labels are 9px. 15-35s reads ~30% at 18px, skips the 9px label, LOSES the one line
that would have earned her trust. 35-60s needs "what did he own" - that's .work-role at 9px mono - leaves
with "AI platform" but not "frontend lead". 60-80s notices the same four claims three times, concludes the
page is padded. 80-90s four weightless pills, no visible email, no primary action. The strongest button she
saw was a scroll anchor.

## Minor Observations

- <meta name="viewport"> omits initial-scale=1 (iOS rotation zoom).
- --coral renders light blue, --lime renders pale grey-green. Token names drifted from values - which is
  how the theme-flip bug survived review.
- .contact-rings rendered in ProfessionalHome.astro then hidden by portfolio.css:666. Dead markup.
- renderTheme(... || 'light') contradicts the 'dark' default in the head script. Dead branch.
- .pro-header > nav gets overflow-x:auto at <=980px with no fade affordance; the 4th item may be clipped.
- Footer .brand-monogram lacks the aria-hidden="true" its header counterpart has.
- All-caps content strings ('AT A GLANCE', 'BEST-FIT ROLES') live in data rather than text-transform.
- .case-status (box-shadow 7px 7px 0, border-top 6px) is the one piece of genuine visual authorship on the
  site. It appears exactly once, on a page most visitors never reach.
- All 15 target="_blank" links carry rel="noreferrer", which implies noopener. NOT a finding - cleared.
- Print styles are careful: A4, print-color-adjust: economy, toolbar hidden.

## Questions to Consider

1. The ledger records source for every claim and the page never shows it. What if the proof numbers were
   openable?
2. You are selling streaming AI UX and sub-2s time-to-first-token - why does the site never stream anything?
3. Every h2 is "line one / line two in accent italic", four times. Which one is actually the best line?
4. The site argues "I state ownership exactly," then sets ownership at 9px. What changes if .work-role were
   the largest text on the card instead of the title?
