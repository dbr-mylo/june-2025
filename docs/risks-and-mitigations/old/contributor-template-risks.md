# Contributor Template Behavior – Risks & Mitigations

See `contributor-template-behavior-spec.md` for usage behavior and toolbar details.

## Risk 1: Visual Inconsistency (No Template)
- **Issue**: Documents may appear unbranded or inconsistent
- **Mitigation**:
  - Default to templates for shared/team docs
  - Admin controls to enforce template usage

## Risk 2: Export Confusion
- **Issue**: Contributor expects editor formatting in output, but Preview defines style
- **Mitigation**:
  - Clear messaging: “Your output reflects the selected template”
  - Add toggle to view output formatting live

## Risk 3: Style Override Conflict
- **Issue**: Contributor applies formatting that is overridden by template
- **Mitigation**:
  - Keep editor formatting tools visible
  - Explain that styles are overridden in Preview view
