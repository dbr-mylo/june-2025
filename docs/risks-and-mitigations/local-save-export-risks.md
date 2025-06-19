# Local Save & Export – Risks & Mitigations

## Overview
Allows documents to be saved as `.mylo` files and exported as PDFs, bypassing cloud dependency.

## Key Risks

| Risk ID | Risk Description | Likelihood | Impact | Priority | Notes |
|---------|------------------|------------|--------|----------|-------|
| R1 | File corruption or save failure on certain browsers or platforms. | Medium | High | High |  |
| R2 | Users misinterpret the difference between Save and Export. | Medium | Medium | Medium |  |

## Mitigations

| Risk ID | Mitigation Strategy | Owner | Status | Notes |
|---------|----------------------|--------|--------|-------|
| R1 | Implement save confirmation and retry fallback. | Dev Team | Planned |  |
| R2 | Clear labeling and tooltips to differentiate Save (native) vs. Export (PDF). | Design | Planned |  |
