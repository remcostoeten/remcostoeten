import { type HomeCopy } from "../shared/content.js";
import { make, text } from "../shared/dom.js";

export function makeHomeView(copy: HomeCopy): HTMLElement {
  const wrap = make("div");
  wrap.className = "container";

  const heroCard = make("section");
  heroCard.className = "card hero";
  heroCard.appendChild(text("h1", copy.title));

  const intro = text("p", copy.intro);
  heroCard.appendChild(intro);
  wrap.appendChild(heroCard);

  const grid = make("div");
  grid.className = "grid";

  for (const highlight of copy.highlights) {
    const card = make("section");
    card.className = "card section";
    card.appendChild(text("h2", "Highlight"));
    card.appendChild(text("p", highlight));
    grid.appendChild(card);
  }

  wrap.appendChild(grid);
  return wrap;
}
