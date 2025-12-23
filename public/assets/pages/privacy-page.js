import {} from "../shared/content.js";
import { makePrivacyView } from "../views/privacy-view.js";
export function showPrivacy(copy) {
    document.title = copy.nav.privacy;
    return makePrivacyView(copy.privacy);
}
//# sourceMappingURL=privacy-page.js.map