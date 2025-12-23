import {} from "../shared/content.js";
import { makeHomeView } from "../views/home-view.js";
export function showHome(copy) {
    document.title = copy.nav.home;
    return makeHomeView(copy.home);
}
//# sourceMappingURL=home-page.js.map