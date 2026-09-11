# Context Management & Execution Rules

These rules prevent the agent from losing focus, drifting off-task, or producing inconsistent output across long, multi-turn conversations.

---

## Rule 1: One Phase at a Time

- **Always know which phase you are executing** (Phase 1–6 from AGENTS.md).
- **Never work on components from a later phase** until the current phase is 100% complete and verified.
- At the start of each turn, state: "Currently executing **Phase N — [Name]**. Working on: `[component/file]`."
- If you lose track, re-read `AGENTS.md` and `task.md` to re-anchor.

---

## Rule 2: One Component per Turn

- Build **at most 2–3 tightly related files per turn** (e.g., a component + its composable).
- Do NOT attempt to build an entire phase in a single turn — you will produce incomplete or hallucinated code.
- After finishing each file, verify it compiles by checking for syntax errors before moving to the next.

---

## Rule 3: Always Reference the Source of Truth

- The canonical architecture is in `.agents/AGENTS.md` (architecture, tokens, conventions).
- The canonical implementation plan is in `implementationn.md` (detailed component specs).
- If you are unsure about a component's behavior, props, or structure — **re-read the spec** rather than inventing from memory.
- **Never guess an import path.** Check the directory structure or `AGENTS.md` component reference table.

---

## Rule 4: Use Exact Design Tokens

- All colors, spacing, z-index, and typography values must come from `assets/css/tokens.css`.
- **Never hardcode:** `#c0fb50`, `#000`, `1.6rem`, etc. — always use `var(--cl-accent)`, `var(--cl-bg)`, `var(--frame-pad)`.
- If you need a new token, add it to `tokens.css` first, then reference it.

---

## Rule 5: SSR Safety

- Three.js, GSAP, Lenis, and any DOM/browser API (`window`, `document`, `requestAnimationFrame`) must be guarded:
  - Use `.client.ts` / `.client.vue` suffixes for client-only plugins/components
  - Use `<ClientOnly>` wrapper in templates
  - Use `onMounted()` or `import.meta.client` checks in composables
- **Never** use `process.client` — it's deprecated in Nuxt 3. Use `import.meta.client`.

---

## Rule 6: Clean Up Side Effects

Every composable and component that creates side effects **must** clean them up:

```typescript
// GSAP: use gsap.context() for scoped cleanup
const ctx = gsap.context(() => { /* animations */ }, containerRef.value)
onUnmounted(() => ctx.revert())

// Three.js: dispose everything
onUnmounted(() => {
  geometry.dispose()
  material.dispose()
  renderer.dispose()
})

// Lenis: destroy instance
onUnmounted(() => lenis.destroy())

// Event listeners: remove them
onUnmounted(() => window.removeEventListener('resize', handler))
```

Failure to clean up causes memory leaks and SSR hydration errors.

---

## Rule 7: Do Not Introduce New Dependencies

The dependency list is fixed:
- `three` + `@types/three`
- `lenis`
- `gsap`
- `nuxt` (+ built-in modules)

Do NOT add Tailwind, SCSS, Pinia, VueUse, anime.js, locomotive-scroll, or any other library without the user explicitly requesting it.

---

## Rule 8: Consistent Component Structure

Every Vue component must follow this exact template order:

```vue
<script setup lang="ts">
// 1. Imports
// 2. Props / Emits
// 3. Refs / Reactive state
// 4. Composables
// 5. Computed
// 6. Methods
// 7. Lifecycle hooks (onMounted, onUnmounted)
</script>

<template>
  <!-- Single root element preferred -->
</template>

<style scoped>
/* Use tokens.css variables only */
</style>
```

---

## Rule 9: Verify Before Moving On

After building a component or a set of related files:
1. Check for TypeScript errors (ensure imports resolve, types match).
2. Check that the dev server (`npm run dev`) still starts without errors.
3. Visually confirm the component renders if possible.

Do NOT blindly build 10 files and then try to debug. Build incrementally.

---

## Rule 10: No Placeholder Content Without Marking It

- If you use placeholder text (e.g., "Your Name Here", "Lorem ipsum"), wrap it in a comment: `<!-- PLACEHOLDER: replace with real content -->`
- For placeholder images, generate them with the image generation tool rather than using broken URLs.
- Never leave `TODO` or `FIXME` comments without also noting them in `task.md`.

---

## Rule 11: Responsive by Default

Every component must work on:
- Mobile: 320px–767px
- Desktop: 768px+

Use `@media (min-width: 768px)` for desktop overrides (mobile-first approach).
The KPRverse reference uses 375px mobile design / 1600px desktop design.

---

## Rule 12: Animation Performance

- Use `transform` and `opacity` for all animations — never animate `width`, `height`, `top`, `left`, `margin`, or `padding`.
- Add `will-change: transform` on elements that animate frequently.
- Use `@media (prefers-reduced-motion: reduce)` to disable non-essential animations.

---

## Rule 13: Stay in Scope

- Do NOT refactor existing files unless the current task requires it.
- Do NOT add features not in the implementation plan.
- Do NOT change the directory structure defined in AGENTS.md.
- If you think something should change, flag it as a note but do not act on it.

---

## Rule 14: Task Tracking

- Always update `task.md` as you work:
  - `[ ]` — not started
  - `[/]` — in progress
  - `[x]` — done
- At the end of each turn, report what was completed and what comes next.

---

## Rule 15: Error Recovery

If you encounter an error:
1. **Read the actual error message** — do not guess.
2. **Identify the root cause** — is it a missing import? Wrong path? SSR issue?
3. **Fix it at the source** — do not add workarounds like `// @ts-ignore` or empty catch blocks.
4. **Re-run the failing check** to confirm the fix.
5. If the error is outside your control (e.g., a Nuxt bug), document it with a clear comment.
