import { copyData } from "./shared/content.js";
import { clear, make, setLang } from "./shared/dom.js";
import { makeBreadcrumbs, makeFooter, makeHeader } from "./shared/layout.js";
import { showHome } from "./pages/home-page.js";
import { showPrivacy } from "./pages/privacy-page.js";
import { showTerms } from "./pages/terms-page.js";
const storeKey = "site-locale";
let locale = getLocale();
const page = getPage();
let headerNode = null;
let lastScroll = 0;
function boot() {
    const root = document.getElementById("app");
    if (!root) {
        return;
    }
    render(root, locale);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
}
function render(root, code) {
    locale = code;
    setLang(locale);
    saveLocale(locale);
    const copy = copyData[locale];
    setMeta(copy);
    clear(root);
    const header = makeHeader(copy.nav, copy.lang, page, locale, changeLocale(root));
    headerNode = header;
    root.appendChild(header);
    if (page !== "home") {
        root.appendChild(makeBreadcrumbs(copy.crumbs, page));
    }
    const main = make("main");
    main.appendChild(renderPage(copy));
    root.appendChild(main);
    root.appendChild(makeFooter(copy.footer));
    lastScroll = window.scrollY;
    updateHeaderState();
}
function changeLocale(root) {
    return function onLang(next) {
        if (next !== locale) {
            render(root, next);
        }
    };
}
function renderPage(copy) {
    if (page === "terms") {
        return showTerms(copy);
    }
    if (page === "privacy") {
        return showPrivacy(copy);
    }
    return showHome(copy);
}
function getPage() {
    const attr = document.body.getAttribute("data-page");
    if (attr === "terms") {
        return "terms";
    }
    if (attr === "privacy") {
        return "privacy";
    }
    return "home";
}
function getLocale() {
    const stored = localStorage.getItem(storeKey);
    if (stored === "en" || stored === "nl") {
        return stored;
    }
    return "en";
}
function saveLocale(code) {
    localStorage.setItem(storeKey, code);
}
function onScroll() {
    updateHeaderState();
}
function onResize() {
    updateHeaderState();
}
function setMeta(copy) {
    const meta = document.querySelector('meta[name="description"]');
    if (!meta) {
        return;
    }
    const metaNode = meta;
    const text = page === "terms"
        ? copy.terms.intro
        : page === "privacy"
            ? copy.privacy.intro
            : copy.home.intro;
    metaNode.setAttribute("content", text);
}
function updateHeaderState() {
    if (!headerNode) {
        return;
    }
    const current = window.scrollY;
    const mobile = window.innerWidth <= 768;
    if (mobile && current > lastScroll + 4) {
        headerNode.classList.add("is-hidden");
    }
    else {
        headerNode.classList.remove("is-hidden");
    }
    if (current > 8) {
        headerNode.classList.add("is-elevated");
    }
    else {
        headerNode.classList.remove("is-elevated");
    }
    lastScroll = current;
}
document.addEventListener("DOMContentLoaded", boot);
//# sourceMappingURL=main.js.map