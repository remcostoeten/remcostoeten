import { type SiteCopy } from "../shared/content.js";
import { makeTermsView } from "../views/terms-view.js";

export function showTerms(copy: SiteCopy): HTMLElement {
  document.title = copy.nav.terms;
  return makeTermsView(copy.terms);
}
