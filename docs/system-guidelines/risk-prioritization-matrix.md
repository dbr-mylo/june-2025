# Risk Prioritization Matrix (MVP)

**Version:** v1.0  
**Status:** Initial Scoring Draft  
**Last Updated:** July 2025

---

## Overview
This matrix tracks all high-impact risks identified across Mylo’s MVP scope. Each item is scored on likelihood, impact, and urgency to help prioritize mitigation efforts.

---

## Scoring Scale
- **Likelihood:** How likely is the risk to materialize? (1 = rare, 5 = frequent)
- **Impact:** How damaging is it if the risk happens? (1 = low, 5 = severe)
- **Urgency:** How soon must this be addressed? (1 = post-launch, 5 = MVP-blocking)
- **Priority Score:** Likelihood × Impact × Urgency (max = 125)

---

## Risk Matrix

| # | Risk Description                                       | Owner     | Likelihood | Impact | Urgency | Priority | Notes |
|---|---------------------------------------------------------|-----------|------------|--------|---------|----------|-------|
| 1 | Font rendering fails or fallback breaks layout         | ChatGPT   | 4          | 5      | 5       | 100      | Needs real fallback strategy + font loading test cases |
| 2 | Template overrides destroy contributor formatting      | ChatGPT   | 4          | 5      | 4       | 80       | Warning modals + diff markers needed |
| 3 | Save failures silently lose data                       | Lovable   | 3          | 5      | 5       | 75       | Error state now documented in autosave spec |
| 4 | Supabase role not enforced in routing                  | Lovable   | 3          | 4      | 5       | 60       | Role guard now implemented |
| 5 | Tiptap config drift across roles (Editor vs. Template) | ChatGPT   | 3          | 4      | 4       | 48       | Toolbar logic and Preview override rules must align |
| 6 | Contributors confused why formatting disappears        | ChatGPT   | 4          | 3      | 3       | 36       | Needs tooltip: “Styled by template: H2” |
| 7 | Styles or layouts apply inconsistently across templates| ChatGPT   | 3          | 4      | 3       | 36       | Needs validation system before publish |
| 8 | Risk spec files are out-of-sync with code              | You       | 2          | 3      | 3       | 18       | Refresh docs every milestone |
| 9 | Guest mode does not persist template/doc state         | You       | 2          | 2      | 2       | 8        | Supabase or localStorage decision pending |

---

## Recommendations
- **Prioritize all risks with score ≥ 60**
- Assign mitigation tasks with deadlines and acceptance tests
- Include risk tracking in MVP burndown chart

---

## Next Steps
- Assign task IDs in your project tracker
- Create spec links where needed
- Schedule risk review during weekly sync
