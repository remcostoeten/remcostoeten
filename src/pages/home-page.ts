import { type SiteCopy } from "../shared/content.js";
import { makeHomeView } from "../views/home-view.js";

export function showHome(copy: SiteCopy): HTMLElement {
  document.title = copy.nav.home;
  return makeHomeView(copy.home);
}
