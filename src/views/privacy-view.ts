import { type PageCopy } from "../shared/content.js";
import { make, text } from "../shared/dom.js";

export function makePrivacyView(copy: PageCopy): HTMLElement {
  const wrap = make("div");
  wrap.className = "container";

  const heroCard = make("section");
  heroCard.className = "card hero";
  heroCard.appendChild(text("h1", copy.title));
  heroCard.appendChild(text("p", copy.intro));
  wrap.appendChild(heroCard);

  for (const section of copy.sections) {
    const card = make("section");
    card.className = "card section";
    card.appendChild(text("h2", section.title));
    card.appendChild(text("p", section.body));
    wrap.appendChild(card);
  }

  const contactCard = make("section");
  contactCard.className = "card section";
  contactCard.appendChild(text("h2", copy.contact.title));
  contactCard.appendChild(text("p", copy.contact.reach));
  wrap.appendChild(contactCard);

  return wrap;
}
