# Calculator

A clean, iOS-inspired calculator built with plain HTML, CSS, and JavaScript — no frameworks or dependencies.

## Features

- Basic arithmetic operations: addition, subtraction, multiplication, division
- Live expression display above the result (e.g. shows `12 +` while entering the next number)
- Smart Clear button: shows **AC** (all clear) when the display is at rest, and **C** once you've started an entry
- Sign toggle (`+/-`) and percentage (`%`) buttons
- Active operator is highlighted while selected
- Automatically switches to a smaller font size for long results, and to exponential notation for very large numbers
- Full keyboard support:
  - Number keys and `.` for input
  - `+`, `-`, `*`, `/` for operators
  - `Enter` or `=` to evaluate
  - `Backspace` to delete the last digit
  - `Escape` to clear

## Tech Stack

- HTML5
- CSS3 (CSS Grid for the button layout)
- Vanilla JavaScript (no dependencies)

## How to Run

No installation needed — it's a static site.

1. Download all three files (`index.html`, `style.css`, `script.js`) into the same folder.
2. Open `index.html` directly in any web browser, **or**
3. For local-server behavior (optional):
   - **VS Code**: install the "Live Server" extension, right-click `index.html`, and select "Open with Live Server".
   - **Python**: run `python -m http.server` in the project folder, then visit `http://localhost:8000`.

## Customizing

- **Colors** — button and background colors are set directly in `style.css` under `.btn-digit`, `.btn-action`, `.btn-operator`, and `body`.
- **Size** — the calculator's width is controlled by `.calculator { width: 320px; }` in `style.css`.
- **Decimal precision** — results are rounded to 10 decimal places before display; adjust `toFixed(10)` in `script.js` to change this.

## Project Structure

```
├── index.html   # Markup and structure
├── style.css    # Styling and layout
└── script.js    # Calculator logic and keyboard support
```
