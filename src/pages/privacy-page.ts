import { type SiteCopy } from "../shared/content.js";
import { makePrivacyView } from "../views/privacy-view.js";

export function showPrivacy(copy: SiteCopy): HTMLElement {
  document.title = copy.nav.privacy;
  return makePrivacyView(copy.privacy);
}
