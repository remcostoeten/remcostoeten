import {} from "../shared/content.js";
import { makeTermsView } from "../views/terms-view.js";
export function showTerms(copy) {
    document.title = copy.nav.terms;
    return makeTermsView(copy.terms);
}
//# sourceMappingURL=terms-page.js.map