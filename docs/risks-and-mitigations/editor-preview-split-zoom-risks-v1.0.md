# Overview

This file outlines the MVP risks of implementing zoom functionality across a split-screen editor and preview environment.

# MVP Scope

This file outlines the MVP risks of implementing zoom functionality across a split-screen editor and preview environment.

# Editor + Preview Split Zoom – Risks & Mitigations

## Overview
This refers to the dynamic resizing of the editor and preview panels, including a draggable handle to shift widths.

## Key Risks

| Risk ID | Risk Description | Likelihood | Impact | Priority | Notes |
|---------|------------------|------------|--------|----------|-------|
| R1 | Content overlaps or layout breaks at extreme sizes. | Medium | Medium | Medium |  |
| R2 | Confusion over which panel controls the output. | Low | Medium | Low |  |

## Mitigations

| Risk ID | Mitigation Strategy | Owner | Status | Notes |
|---------|----------------------|--------|--------|-------|
| R1 | Set min/max widths and responsive scaling for both panels. | Frontend | Planned |  |
| R2 | Clearly label each panel and use visual cues like separators. | Design | Complete |  |
