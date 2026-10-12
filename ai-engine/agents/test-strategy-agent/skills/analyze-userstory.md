# Skill: analyze-userstory

## Purpose

Perform a deep, structured analysis of a Jira User Story to produce two artefacts:
1. `{KEY}-analysis.md` — a human-readable decomposition of the story covering actors, business goals, acceptance criteria classification, test technique mapping, risk identification, and data parameter inventory
2. `{KEY}-risk-profile.json` — a machine-readable risk classification per AC item and scenario type, consumed by the `define-test-strategy` skill and the TestCase Agent

This skill trains the agent to extract meaning **beyond the literal text** — identifying implicit business rules, data dependencies, and failure risks that the story author did not explicitly state.

---

## Pre-conditions

Before executing this skill:
- `jira/userstories/{KEY}/{KEY}.json` must exist (written by Jira Agent)
- Read `.env` for `JIRA_PROJECT_KEY`
- The `jira/userstories/{KEY}/strategy/` subfolder will be created if it does not exist

---

## Execution Steps

### Step 1 — Read and Load the User Story

Read `jira/userstories/{KEY}/{KEY}.json` in full. Load:
- `summary`
- `description`
- `acceptanceCriteria` (parsed as plain text bullet list)
- `priority`
- `components` and `labels` (for SAP module identification)
- `linkedIssues` (array — check for non-empty to flag integration risk)
- `subtasks` (array — each subtask may introduce a sub-scenario)
- `storyPoints` (complexity signal)
- `status` (if "Won't Do" or "Duplicate" → abort with a message; do not analyse)

If `acceptanceCriteria` is null or empty, log:
```
WARNING: No acceptance criteria found for {KEY}. Story decomposition will rely solely on the description.
Proceeding with description-based analysis — test coverage may be incomplete.
```

---

### Step 2 — Decompose the User Story

Parse the description using the standard User Story pattern:
```
As a [ACTOR], I want to [ACTION], so that [BUSINESS GOAL].
```

If the description does not follow this pattern exactly, extract equivalent information from the text.

Document:

| Attribute | Extracted Value |
|-----------|----------------|
| **Actor** | The SAP user role (e.g., "Procurement Officer", "AP Accountant") |
| **Core Action** | The primary SAP transaction or operation (e.g., "create a Standard Purchase Order") |
| **Business Goal** | The downstream business value (e.g., "formally initiate and track a procurement transaction") |
| **Business Object** | The SAP document or data entity being created/modified/read (e.g., "Purchase Order", "Sales Order") |
| **SAP Module** | Derived from components field or keyword mapping (e.g., "MM — Materials Management") |
| **Complexity** | Derived from storyPoints: 1-2 = Simple, 3-5 = Medium, 6+ = Complex |

**Implicit Business Rules Analysis:**
Beyond what is stated, identify rules that are domain-implied:
- For a Purchase Order: "Supplier must exist in vendor master", "Material must be maintained for the plant", "Purchasing Org must be assigned to company code"
- For a Sales Order: "Customer must exist in customer master", "Material must be configured for the sales org"
- These become mandatory pre-conditions in the generated test cases

---

### Step 3 — Number and Classify Each Acceptance Criterion

Parse the `acceptanceCriteria` text. Split into individual AC items (one per bullet point or numbered item).

Assign each an AC ID: AC-1, AC-2, AC-3, ...

For each AC, determine:

| Field | Values |
|-------|--------|
| **AC Type** | NAVIGATION, VALIDATION_POSITIVE, VALIDATION_NEGATIVE, ERROR_HANDLING, SUCCESS_CONFIRMATION, MANDATORY_FIELD, BUSINESS_RULE, INTEGRATION |
| **Risk Level** | CRITICAL, HIGH, MEDIUM, LOW (using the Risk Assessment Framework from agent.md) |
| **Required Test Techniques** | EP (Equivalence Partitioning), BVA (Boundary Value Analysis), DT (Decision Table), ST (State Transition) |
| **Scenario Types Required** | HP, AP, NEG, ERR, EDGE, INT |
| **Min TC Count** | Minimum test cases needed to cover this AC |

**Classification Guide:**

| AC Text Pattern | AC Type | Risk | Test Techniques | Scenarios |
|----------------|---------|------|-----------------|-----------|
| "user can access X" / "X is available by clicking Y" | NAVIGATION | LOW | EP | HP |
| "system validates X and auto-populates Y" | VALIDATION_POSITIVE | HIGH | EP, BVA | HP + NEG(invalid X) |
| "system displays error if X does not exist" | VALIDATION_NEGATIVE | HIGH | EP | NEG |
| "system prevents submission if X is missing" | MANDATORY_FIELD | HIGH | EP | ERR (one per field) |
| "unique number/document generated on success" | SUCCESS_CONFIRMATION | CRITICAL | EP | HP (result verification) |
| "user can add one or more items" | BUSINESS_RULE | MEDIUM | EP, BVA | HP(single) + AP(multiple) |
| "only if condition, then outcome" | BUSINESS_RULE | HIGH | DT | HP(condition met) + NEG(condition not met) |
| numeric field (quantity, price, amount) | BOUNDARY | MEDIUM | BVA | EDGE(min) + EDGE(max) + EDGE(zero) |

---

### Step 4 — Identify Data Parameters

From the description, ACs, and SAP domain knowledge, list every data parameter the feature requires:

**Input Parameters** (user-entered):
- List each field, its data type, valid range, and whether it is mandatory

**Lookup/Auto-populated Parameters** (system-derived):
- List each field that SAP auto-fills and the trigger that causes auto-fill

**Output Parameters** (system-generated):
- Document number or ID generated on success
- Status value set by SAP
- Any fields updated in related documents

**Boundary Parameters** (for EDGE cases):
- Identify numeric fields with min/max constraints
- Identify text fields with length constraints
- Identify date fields with past/future constraints

---

### Step 5 — Assess Risk for Each Scenario Area

For each identified scenario area, score on two axes (HIGH/MEDIUM/LOW):

| Dimension | Question |
|-----------|---------|
| **Business Impact** | What is the consequence if this area fails in production? |
| **Failure Probability** | How likely is failure based on complexity, dependencies, or historical issues? |

Combine: `Risk = max(Impact, weighted Probability)`

**Standard SAP Risk Weightings:**

| Scenario Area | Default Risk | Rationale |
|--------------|-------------|-----------|
| Core document creation (PO, SO, Invoice) | CRITICAL | Business-critical transaction failure |
| Entity validation (supplier, material) | HIGH | External master data dependency |
| Mandatory field enforcement | HIGH | Data integrity breach risk |
| Authorization/role access | HIGH | Compliance and security |
| Numeric/price calculations | MEDIUM | Boundary errors common but recoverable |
| Auto-population of derived fields | MEDIUM | Depends on master data quality |
| Navigation/UI access | LOW | Cosmetic risk; easily detected |
| Text field length validation | LOW | Edge case; not business-critical |

**Integration Risk:**
If `linkedIssues` array is non-empty: flag each linked story/epic as an integration dependency. Assign MEDIUM-HIGH risk based on the number of linked issues and their types.

---

### Step 6 — Build the Scenario Inventory

From Steps 3–5, compile the complete list of scenarios that the TestCase Agent must cover.

Format as a structured list:
```
SCENARIO INVENTORY — {KEY}: {story summary}
Module: {MODULE}

Happy Path Scenarios:
  HP-01: {description} — Risk: CRITICAL — ACs: AC-1, AC-2, AC-3, AC-5, AC-6
  HP-02: {description — AP variant if applicable} — Risk: MEDIUM — ACs: AC-4

Negative Scenarios:
  NEG-01: {description} — Risk: HIGH — ACs: AC-3, AC-8
  NEG-02: {description} — Risk: HIGH — ACs: AC-5, AC-8

Error Scenarios:
  ERR-01: Missing {field} — Risk: HIGH — ACs: AC-7
  ERR-02: Missing {field} — Risk: HIGH — ACs: AC-7
  ERR-03: Missing {field} — Risk: HIGH — ACs: AC-7
  ERR-04: Missing {field} — Risk: HIGH — ACs: AC-7

Edge Cases:
  EDGE-01: {boundary description} — Risk: MEDIUM — ACs: AC-4
  EDGE-02: {boundary description} — Risk: MEDIUM — ACs: AC-4

Integration Scenarios:
  INT-01: {description} — Risk: HIGH — Linked: {linked issue key}
  (omit section if no linkedIssues)
```

---

### Step 7 — Write Output Files

**a) Write Analysis Document** → `jira/userstories/{KEY}/strategy/{KEY}-analysis.md`

Use this template:

```markdown
# Story Analysis: [{KEY}] {story summary}

**Analysed:** {YYYY-MM-DD}
**Analysed By:** test-strategy-agent/skills/analyze-userstory
**User Story JSON:** jira/userstories/{KEY}/{KEY}.json

---

## Story Decomposition

| Attribute | Value |
|-----------|-------|
| Actor | {actor} |
| Core Action | {action} |
| Business Goal | {goal} |
| Business Object | {SAP document/entity} |
| SAP Module | {MODULE} — {module full name} |
| Complexity | {Simple / Medium / Complex} ({storyPoints} SP) |

### Implicit Business Rules (Domain-Inferred)
- {rule 1: what must be true in SAP for this feature to work}
- {rule 2}
- {rule 3}

---

## Acceptance Criteria Analysis

| AC ID | Acceptance Criterion | AC Type | Risk | Test Techniques | Scenarios Required | Min TCs |
|-------|---------------------|---------|------|-----------------|-------------------|---------|
| AC-1 | {text} | {type} | {risk} | {techniques} | {types} | {n} |
| AC-2 | {text} | {type} | {risk} | {techniques} | {types} | {n} |

---

## Data Parameter Inventory

### Input Parameters
| Parameter | Field Label (SAP UI) | Data Type | Mandatory | Valid Range / Values |
|-----------|---------------------|-----------|-----------|---------------------|
| Supplier ID | Supplier | Alphanumeric | Yes | Existing vendor in SAP master |
| {name} | {SAP label} | {type} | {Yes/No} | {constraints} |

### Auto-populated Parameters
| Parameter | Field Label | Trigger | Source |
|-----------|------------|---------|--------|
| Supplier Name | Supplier Name | Confirm Supplier ID | Vendor master LFA1 |
| {name} | {label} | {trigger} | {SAP table/source} |

### Output Parameters
| Parameter | Description | Format |
|-----------|-------------|--------|
| PO Number | Unique SAP-generated PO document number | 10-digit numeric, begins with 45 |
| {name} | {description} | {format} |

### Boundary Parameters
| Parameter | Lower Boundary | Upper Boundary | Zero Value | Notes |
|-----------|---------------|---------------|------------|-------|
| Order Quantity | 1 (minimum valid) | System-configured maximum | 0 (invalid) | Per UoM |
| {name} | {min} | {max} | {zero behavior} | {notes} |

---

## Risk Assessment

| Scenario Area | Business Impact | Failure Probability | Risk Level | Rationale |
|--------------|----------------|--------------------|-----------|-|
| PO document creation | CRITICAL | MEDIUM | CRITICAL | Core transactional operation |
| Supplier validation | HIGH | MEDIUM | HIGH | External master data dependency |
| Material validation | HIGH | MEDIUM | HIGH | External master data dependency |
| Mandatory field check | HIGH | LOW | HIGH | UI enforces — but still critical |
| Numeric boundaries | MEDIUM | MEDIUM | MEDIUM | BVA required |
| Navigation/Access | LOW | LOW | LOW | Cosmetic risk |

---

## Integration Risk

{If linkedIssues is empty: "None — no linked issues identified."}
{If linkedIssues is non-empty:}
| Linked Issue | Type | Integration Risk | Scenario Needed |
|-------------|------|-----------------|-----------------|
| {key} | {type} | {risk} | {INT-01 description} |

---

## Scenario Inventory

{Full scenario list as defined in Step 6}

---

## Recommended TC Count

| Scenario Type | Count | Rationale |
|---------------|-------|-----------|
| HP | {n} | {reason} |
| AP | {n} | {reason or "None — no alternative valid paths"} |
| NEG | {n} | {n validation ACs × 1 NEG each} |
| ERR | {n} | {n mandatory fields × 1 ERR each} |
| EDGE | {n} | {n boundary parameters × 2 boundaries} |
| INT | {n} | {n linked issues or "None"} |
| **TOTAL** | **{total}** | |
```

---

**b) Write Risk Profile JSON** → `jira/userstories/{KEY}/strategy/{KEY}-risk-profile.json`

```json
{
  "userStory": "{KEY}",
  "summary": "{story summary}",
  "module": "{MODULE}",
  "analysedAt": "{ISO8601}",
  "analysedBy": "test-strategy-agent/skills/analyze-userstory",
  "actor": "{actor}",
  "businessObject": "{SAP document/entity}",
  "complexity": "{Simple | Medium | Complex}",
  "storyPoints": {n or null},
  "overallRisk": "{CRITICAL | HIGH | MEDIUM | LOW}",
  "hasLinkedIssues": {true | false},
  "linkedIssueCount": {n},
  "acceptanceCriteria": [
    {
      "id": "AC-1",
      "text": "{full AC text}",
      "type": "{AC_TYPE}",
      "risk": "{CRITICAL | HIGH | MEDIUM | LOW}",
      "testTechniques": ["{EP}", "{BVA}"],
      "scenarioTypesRequired": ["HP"],
      "minTCCount": 1
    }
  ],
  "scenarioInventory": {
    "HP": [
      { "id": "HP-01", "description": "{description}", "risk": "{risk}", "acIds": ["AC-1", "AC-2"] }
    ],
    "AP": [],
    "NEG": [
      { "id": "NEG-01", "description": "{description}", "risk": "{risk}", "acIds": ["AC-3", "AC-8"] }
    ],
    "ERR": [
      { "id": "ERR-01", "description": "Missing Supplier field", "risk": "HIGH", "acIds": ["AC-7"], "field": "Supplier" }
    ],
    "EDGE": [
      { "id": "EDGE-01", "description": "Minimum quantity boundary", "risk": "MEDIUM", "acIds": ["AC-4"], "parameter": "quantity", "boundary": "lower" }
    ],
    "INT": []
  },
  "recommendedTCCount": {
    "HP": {n}, "AP": {n}, "NEG": {n}, "ERR": {n}, "EDGE": {n}, "INT": {n}, "total": {n}
  },
  "dataParameters": {
    "input": [
      { "name": "supplierId", "label": "Supplier", "mandatory": true, "validRange": "Existing vendor in SAP" }
    ],
    "autoPopulated": [
      { "name": "supplierName", "label": "Supplier Name", "trigger": "Confirm Supplier ID" }
    ],
    "output": [
      { "name": "poNumber", "label": "Purchase Order Number", "format": "10-digit, begins with 45" }
    ],
    "boundary": [
      { "name": "quantity", "label": "Order Quantity", "lowerBoundary": "1", "upperBoundary": "system-configured", "zeroInvalid": true }
    ]
  }
}
```

---

### Step 8 — Report Completion

Print:
```
Test Strategy Architect | analyze-userstory complete
  Story:              {KEY} — {summary}
  Module:             {MODULE}
  ACs analysed:       {n}
  Overall Risk:       {CRITICAL | HIGH | MEDIUM | LOW}
  Scenarios mapped:   HP:{n} AP:{n} NEG:{n} ERR:{n} EDGE:{n} INT:{n}
  Recommended TCs:    {total}
  Files written:
    jira/userstories/{KEY}/strategy/{KEY}-analysis.md
    jira/userstories/{KEY}/strategy/{KEY}-risk-profile.json
  Next step:          Run /define-test-strategy {KEY}
```

---

## Error Handling

| Condition | Action |
|-----------|--------|
| Story JSON not found | Abort: `ERROR: jira/userstories/{KEY}/{KEY}.json not found. Run /jira-fetch-userstories first.` |
| Status is "Won't Do" or "Duplicate" | Abort: `SKIPPED: {KEY} has status "{status}" — analysis not applicable.` |
| `acceptanceCriteria` is null | Log warning; proceed with description-only analysis |
| `components` is empty | Log warning; infer SAP module from keywords; document assumption in analysis |
| `linkedIssues` details unavailable | Include key only; set risk to MEDIUM; note in analysis |
| `description` is null or "(No description provided)" | Log warning; base analysis entirely on `summary` and ACs; note limitation |
