<p align="center"><a href="https://hyfine.github.io/embodied-world-models-atlas/"><img src="assets/atlas-mark.svg" width="72" height="72" alt="Field Atlas compass"></a></p>

<h1 align="center">Embodied AI × World Models Atlas</h1>
<p align="center"><strong>World models predict what a push might do. Policies choose the push.</strong></p>
<p align="center"><strong>English</strong> · <a href="README.zh-CN.md">简体中文</a></p>

[![Predict three possible futures, choose a push, then compare the measured endpoint (4) with the predicted one (7).](assets/readme-push.svg)](https://hyfine.github.io/embodied-world-models-atlas/#cup-lab)

The cup was predicted to reach **7**, but stopped at **4**. The next decision starts at 4. This toy example is the thread through the atlas: **what is predicted, who acts, and what evidence comes back?**

**[Start with the reading guide →](https://hyfine.github.io/embodied-world-models-atlas/research.html#contract)** Identify the inputs and outputs, [compare what actually runs](https://hyfine.github.io/embodied-world-models-atlas/research.html#coupling), then [design a test that could disprove the claim](https://hyfine.github.io/embodied-world-models-atlas/research.html#claim-test). Use the map and source index when you need a specific method or edition.

**[Explore the decision routes ↗](https://hyfine.github.io/embodied-world-models-atlas/#family-tree)**　·　[Compare nine survey perspectives](https://hyfine.github.io/embodied-world-models-atlas/perspectives.html)　·　[Trace a system](https://hyfine.github.io/embodied-world-models-atlas/#system-studio)

### Research desk · expanded edition

[Taxonomy audit: nine local survey editions](docs/taxonomy-review.md) · [What each direction’s exemplars actually represent](https://hyfine.github.io/embodied-world-models-atlas/runtime.html). The workbook codes mix mechanisms, domains and resources; they are navigation aids, not competing model classes.

| Choose a question | Where to go |
|---|---|
| What changes between predicting the next frame, planning and producing an action? | [Cross-family synthesis](https://hyfine.github.io/embodied-world-models-atlas/research.html) |
| What actually runs in each of the 15 workbook categories? | [Choose a system on the homepage](https://hyfine.github.io/embodied-world-models-atlas/#system-studio) or [browse all schematics](https://hyfine.github.io/embodied-world-models-atlas/runtime.html). Trace signals between modules, distinguish internal updates from measured feedback, then check the cited paper. |
| What was examined for a particular paper, model or repository? | [Search the 320 main + 70 supplementary rows by source and reading depth](https://hyfine.github.io/embodied-world-models-atlas/evidence.html) |
| Which PDF edition was used or collected? | [Versioned local-library catalog](https://hyfine.github.io/embodied-world-models-atlas/shelf.html) · [close reading of the supplied WAM survey](docs/wam-survey-deep-dive.md) |

The 38 leaves below form the **introductory map**, not the denominator of the larger bibliography. A row, a verified artifact, a PDF on disk and a cover-to-cover reading are four different things.

[![Four decision routes above two support layers for infrastructure and surveys](assets/growth-tree.en.svg)](https://hyfine.github.io/embodied-world-models-atlas/#family-tree)

**Read the canopy as four questions**, not four disjoint model classes: what predicts, what plans, what acts, and what couples futures to actions? Infrastructure and surveys sit below, not beside controllers. Each work has one address on the map; its evidence card can show several roles. No branch asserts technical descent.

**See the field before reading the papers:** [replay the timeline](https://hyfine.github.io/embodied-world-models-atlas/#trajectory) · [compare family swimlanes](https://hyfine.github.io/embodied-world-models-atlas/#swimlanes) · [open the family tree](https://hyfine.github.io/embodied-world-models-atlas/#family-tree). Then follow one [architecture plate](https://hyfine.github.io/embodied-world-models-atlas/#architectures) to a [paper-to-code deep dive](docs/deep-dives.en.md).

| Time | Route | What to take away |
|---|---|---|
| **3 minutes** | [Try the tabletop experiment](https://hyfine.github.io/embodied-world-models-atlas/#cup-lab) | Choose wait, gentle push or hard push; see why a predictor is not a policy |
| **15 minutes** | [Read the two histories and family tree](docs/guide.en.md) | Identify inputs, outputs and failure conditions for PlaNet, Diffusion Policy, V-JEPA 2-AC and DreamZero |
| **30 minutes** | [Explore the research library](https://hyfine.github.io/embodied-world-models-atlas/#library) → [request an experimental receipt](docs/outlook.en.md) | Trace papers to code and weights; separate visual fidelity, partial progress and physical success |

### One table, four approaches

[![Top lane: a policy maps an observation to an action. Bottom lane: a planner compares three predicted endpoints and picks the push closest to goal 8. Both observe again after acting.](assets/decision-loop.svg)](https://hyfine.github.io/embodied-world-models-atlas/#decision-loop)

Follow the bright paths from left to right. The top lane emits a push; the bottom lane first compares waiting, a gentle push and a hard push. **7 is a prediction; 4 is what the robot actually observes.** These are teaching values, not benchmark data. [Replay the decision ↗](https://hyfine.github.io/embodied-world-models-atlas/#decision-loop)

| At the cup | Reading family | Start with |
|---|---|---|
| **Try several pushes in imagination before choosing** | M · Model-based decisions. Separate decision-time search from training-time imagination | [PlaNet](CATALOG.md#planet) · [DreamerV3](CATALOG.md#dreamerv3) |
| **Predict future observations or sufficient features** | F · Ask whether predictions change *correctly* when actions change | [Visual Foresight](CATALOG.md#foresight) · [V-JEPA 2-AC](CATALOG.md#vjepa2) |
| **Learn actions directly from demonstrations** | P · Skills, action tokens and continuous chunks. A policy need not predict a future scene | [Diffusion Policy](CATALOG.md#diffusion-policy) · [OpenVLA](CATALOG.md#openvla) · [π0](CATALOG.md#pi0) |
| **Couple a visual future to executable actions** | J · Joint generation and a separately trained inverse-dynamics interface are different designs | [DreamZero](CATALOG.md#dreamzero) · [GE-Act 2.0](CATALOG.md#geact) |

E covers environments, data and evaluation; S covers other surveys. Navigation, quadruped locomotion and visuotactile grasping offer counterexamples to equating embodied AI with tabletop manipulation.

### Our current call

**Before asking “does this video look real?”, swap the proposed action and ask whether the predicted consequence changes correctly.** [DreamTrue](CATALOG.md#dreamtrue) studies action following; [SIMPLER](CATALOG.md#simpler) tests simulation against physical policy rankings. The first check does not replace the second. [Four falsifiable calls →](docs/outlook.en.md)

### Coverage and reuse

**2026-11-23 edition**: 38 curated records spanning 1991–2026, 25 distinct code links and 6 Hugging Face model cards. Dataset cards are separate. This is a cross-platform selection, **not an exhaustive index or an independent replication**.

- One [machine-readable TSV](data/works.tsv) drives the [bilingual catalog](CATALOG.md) and both static pages.
- [Inclusion rules and version distinctions](EVIDENCE.md) · [Contribute](CONTRIBUTING.md) · [Cite](CITATION.cff) · [License](LICENSE).
- No model download needed. Open `index.html` locally for the offline explorer. Rebuild with `node scripts/build.mjs` and validate with `node scripts/build.mjs --check`.
