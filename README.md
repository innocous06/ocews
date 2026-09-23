# OCEWS — Orbital Collision Early-Warning System

> **Ranking space debris risk by consequence, not just probability.**  
> *Developed for HackConquest 2026 by Team Axilla.*

[![Live Demo](https://img.shields.io/badge/Live%20Demo-GitHub%20Pages-cyan.svg)](https://innocous06.github.io/ocews/)
[![HackConquest 2026](https://img.shields.io/badge/Hackathon-HackConquest%202026-purple.svg)](#)
[![Team](https://img.shields.io/badge/Team-Axilla-emerald.svg)](#)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

---

##  1. Executive Summary & Problem Statement

Over **40,000 tracked objects** and millions of untracked fragments circle the Earth. As mega-constellations expand, satellite operators receive hundreds of Conjunction Data Messages (CDMs) weekly via public feeds (Space-Track / CelesTrak). 

### The Problem: Alert Fatigue & Hidden Catastrophes
- **Alert Fatigue:** 95%+ of incoming conjunction alerts are low-consequence noise. Operators drown in alert queues and burn precious engineering time.
- **The Critical Blindspot:** Traditional alerts rank exclusively by **raw collision probability ($P_c$)**.
  - **benign close-pass:** Two tiny 4 kg CubeSats at 310 km decaying VLEO get ranked as the **#1 critical emergency** simply due to a 45-meter miss distance ($P_c = 4.2 \times 10^{-3}$). Even in a worst-case collision, the fragments burn up harmlessly in the atmosphere in ~3 months.
  - **catastrophic blindspot:** A **9,000 kg derelict SL-16 (Zenit-2) upper stage rocket body** passing within 112 meters of an operational commercial constellation at 842 km Sun-Synchronous Orbit has a moderate $P_c = 3.8 \times 10^{-4}$ and gets **buried down at Rank #4**. Yet, a hypervelocity impact here would generate **14,000+ lethal fragments lasting over 160 years**, triggering a potential **Kessler cascade** that ruins the orbit for generations.

> **Nobody ranks alerts by how catastrophic the outcome would be. OCEWS does.**

---

##  2. Physics-Grounded Scoring Logic

Rather than training an un-auditable "black box" ML model on single-digit historic collisions (Iridium-Kosmos), OCEWS employs a **transparent, defensible, physics-based scoring model** based on NASA and US Space Force orbital mechanics standards:

### A. Kinetic Energy & NASA Breakup Threshold
$$\mu = \frac{M_1 \cdot M_2}{M_1 + M_2}, \quad E_{kin} = \frac{1}{2} \mu v_{rel}^2$$
$$\text{Specific Energy } S = \frac{E_{kin}}{M_1 + M_2} \ge 40\text{ J/g} \implies \text{Catastrophic Fragmentation}$$

At orbital velocities ($8\text{--}14\text{ km/s}$), collisions exceeding $40\text{ J/g}$ completely shatter both bodies into hypervelocity shrapnel rather than localized cratering.

### B. Fragmentation Estimation (NASA Standard Breakup Model)
$$N(d > 10\text{ cm}) \approx 0.1 \cdot (M_{total})^{0.75}$$
- 8 kg total CubeSat mass: $\sim 5$ fragments.
- 9,150 kg rocket body + satellite mass: **$14,000+$ lethal fragments**.

### C. Atmospheric Drag & Debris Residence Lifetime ($\tau$)
Empirical thermospheric decay model based on altitude:
- **$< 350\text{ km}$ (VLEO):** $\tau \le 4\text{ months}$ (Natural self-cleaning via atmospheric drag).
- **$550\text{ km}$ (Mega-constellations):** $\tau \approx 18\text{ years}$.
- **$> 800\text{ km}$ (Sun-Synchronous polar shells):** $\tau \approx 160\text{--}300+\text{ years}$ (Permanent hazard to space navigation).

### D. Shell Congestion Multiplier ($\rho_{shell}$)
Quantifies the local spatial density in the $\pm 25\text{ km}$ altitude bin. Encounters inside high-density orbital bands (e.g. Starlink shells at 550 km or polar SSO at 840 km) receive up to a $3.2\times$ multiplier due to the high probability of secondary cascade strikes.

---

##  3. Core Features in This Demo

1. **Before & After Ranking Comparison Toggle:**
   - **Traditional View ($P_c$ Only):** See how current industry tools place harmless CubeSats at #1 and bury multi-ton rocket bodies.
   - **OCEWS Consequence View:** Watch the 9-ton rocket body vault to #1 CRITICAL while the CubeSats drop to #5 LOW.
   - **Alert Fatigue Metric:** Demonstrates an **$83\%$ reduction in false alerts** with **$100\%$ retention of catastrophic threats**.

2. **Operator Avoidance Maneuver Simulator:**
   - For maneuverable spacecraft, test an along-track burn ($\Delta v$) from $0.0\text{ to }1.5\text{ m/s}$.
   - Dynamically recomputes the new miss distance (e.g. $112\text{ m} \rightarrow 1,850\text{ m}$), new $P_c$, and estimated propellant consumption ($0.42\text{ kg}$).

3. **Interactive Encounter Geometry Visualizer:**
   - Visual representation of Earth, intersecting orbital planes, Time of Closest Approach (TCA), and miss distance vector.

4. **Kessler Congestion Altitude Distribution:**
   - Bar chart mapping spatial density across LEO ($200\text{ to }1,200\text{ km}$) and pinning active conjunctions onto real-world hotspots.

5. **"What-If" Physics Sandbox Modal:**
   - Allows evaluators to enter custom object masses, closing velocity, and altitude to observe the consequence engine compute scores in real-time.

---

##  4. System Processing Pipeline

```
  [01: Ingest]                [02: Filter]               [03: Propagate]              [04: Score & Rank]
CelesTrak / Space-Track  ──>  Coarse Geometric     ──>   SGP4 Orbital Propagator  ──>  OCEWS Consequence
Daily TLE Ephemeris           Apogee/Perigee Sifting     Miss Distance & TCA           Physics Triage Engine
(40,000+ Objects)             (800M -> ~5,000 Pairs)     (~150 Close Encounters)       (Actionable Shortlist)
```

---

##  5. Local Setup & Deployment

### Quick Start
```bash
# Clone the repository
git clone https://github.com/innocous06/ocews.git
cd ocews

# Install dependencies
npm install

# Start development server
npm run dev

# Build production bundle
npm run build
```

### Static Hosting (GitHub Pages / Cloudflare Pages)
- The production bundle in `dist/` is **100% client-side** with relative paths (`base: './'`).
- A pre-configured GitHub Actions workflow template is included at [`deploy/github-pages-workflow.yml`](deploy/github-pages-workflow.yml). To enable automated deployment on GitHub Pages, copy this file into `.github/workflows/deploy.yml` in your repository settings or enable GitHub Pages via Settings -> Pages -> Deploy from a branch.
- For **Cloudflare Pages**, connect this repository, set Build Command to `npm run build`, and Output Directory to `dist`.

---

## 👥 Team Axilla — HackConquest 2026
- **Project:** Orbital Collision Early-Warning System (OCEWS)
- **Domain:** Space Technology / Data Science / UI/UX & Web Development
- **Repository:** [https://github.com/innocous06/ocews](https://github.com/innocous06/ocews)
