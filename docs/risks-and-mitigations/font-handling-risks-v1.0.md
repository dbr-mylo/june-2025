# Overview

This file outlines MVP risks related to font management, font loading, fallback behavior, and contributor access to approved fonts.

# MVP Scope

This file outlines MVP risks related to font management, font loading, fallback behavior, and contributor access to approved fonts.

# Font Handling – Risks & Mitigations

## Overview
This feature allows Template Editors to manage fonts via upload or URL and associate them with templates. Contributors rely on available fonts without full control.

## Key Risks

| Risk ID | Risk Description | Likelihood | Impact | Priority | Notes |
|---------|------------------|------------|--------|----------|-------|
| R1 | Missing font file or inaccessible URL results in fallback rendering. | High | High | High |  |
| R2 | Licensing or unauthorized font usage. | Low | High | Medium | Teams might accidentally violate font licensing terms. |

## Mitigations

| Risk ID | Mitigation Strategy | Owner | Status | Notes |
|---------|----------------------|--------|--------|-------|
| R1 | Add fallback fonts and detect broken URLs at the time of template creation. | Dev Team | Planned |  |
| R2 | Require license metadata entry for uploads and display license warnings. | Product | Planned |  |
