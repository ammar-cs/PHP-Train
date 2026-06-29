# PHP Training Camp

A local training tool for **Pharaoh Phone** roofing sales agents. Browse and study real (anonymized) cold-call recordings alongside transcripts and coaching notes.

---

## Running Locally

```bash
npm install
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173) in your browser.

---

## Project Structure

```
/public/audio/          ← drop .mpeg / .mp3 audio files here
/src/data/cases.json    ← all 23 case records (edit to add/update cases)
/src/components/        ← UI components (FilterBar, CaseCard, AudioPlayer, etc.)
/src/pages/             ← Home (browse grid) and CaseDetailPage (single case)
```

---

## Adding or Editing a Case

### 1. Drop the audio file

Copy the `.mpeg` (or `.mp3`) recording into:

```
/public/audio/Your File Name.mpeg
```

### 2. Edit `src/data/cases.json`

Add a new object to the JSON array (or update an existing one):

```json
{
  "id":             "agent-number-homeowner",
  "agentName":      "Sam",
  "homeownerName":  "Matab",
  "company":        "iShield",
  "location":       "123 Oak St, Westside",
  "audioFile":      "Sam 1 - Matab.mpeg",
  "caseTitle":      "Sam & Matab — Short Descriptive Title",
  "keyTakeaway":    "1–3 sentence coaching note visible on the detail page.",
  "objectionTags":  ["insurance-objection", "skeptical-homeowner"],
  "transcript":     "Sam: Hi is this Matab?\nMatab: Yes...\n[full transcript]"
}
```

The `audioFile` value must **exactly match** the filename (including spaces and extension) in `/public/audio/`.

### Available Objection Tags

| Tag | Label |
|-----|-------|
| `insurance-objection` | Insurance Objection |
| `scheduling-conflict` | Scheduling Conflict |
| `already-inspected` | Already Inspected |
| `gate-access` | Gate Access |
| `wrong-address` | Wrong Address |
| `skeptical-homeowner` | Skeptical Homeowner |
| `second-opinion-pitch` | Second Opinion Pitch |

### Transcript formatting

Use `Speaker Name: dialogue` lines for automatic speaker highlighting:

```
Sam: Hi, is this Randy?
Randy: Yeah, who is this?
Sam: Hey Randy, this is Sam with Solid Front...
```

---

## Tech Stack

- **React 18** + **Vite 5**
- **Tailwind CSS v4**
- **React Router v6** (client-side routing, no backend)
- All data is local — no API calls, no auth, no database
