import {} from "./content.js";
import { make, text } from "./dom.js";
export function makeHeader(nav, lang, page, locale, onLang) {
    const header = make("header");
    header.className = "site-header";
    const row = make("div");
    row.className = "header-row";
    const brand = makeBrand();
    const navList = makeNav(nav, page);
    const actions = makeActions(lang, locale, onLang);
    row.appendChild(brand);
    row.appendChild(navList);
    row.appendChild(actions);
    header.appendChild(row);
    return header;
}
export function makeBreadcrumbs(crumbs, page) {
    const nav = make("nav");
    nav.className = "breadcrumb";
    nav.setAttribute("aria-label", "Breadcrumb");
    const homeLink = makeCrumbLink(crumbs.home, "/");
    nav.appendChild(homeLink);
    const chevron = text("span", "›");
    chevron.className = "chevron";
    nav.appendChild(chevron);
    const current = text("span", page === "terms" ? crumbs.terms : crumbs.privacy);
    current.setAttribute("aria-current", "page");
    nav.appendChild(current);
    return nav;
}
export function makeFooter(label) {
    const footer = make("footer");
    footer.className = "footer";
    footer.textContent = label;
    return footer;
}
function makeBrand() {
    const link = make("a");
    link.className = "brand";
    link.href = "/";
    link.setAttribute("aria-label", "Home");
    const mark = make("span");
    mark.className = "pill";
    mark.textContent = "MIT";
    link.appendChild(mark);
    const name = text("span", "Policy");
    link.appendChild(name);
    return link;
}
function makeNav(nav, page) {
    const wrap = make("nav");
    wrap.className = "nav";
    wrap.setAttribute("aria-label", "Primary");
    wrap.appendChild(makeNavLink(nav.home, "/", page === "home"));
    wrap.appendChild(makeNavLink(nav.terms, "/terms/", page === "terms"));
    wrap.appendChild(makeNavLink(nav.privacy, "/privacy/", page === "privacy"));
    return wrap;
}
function makeNavLink(label, href, active) {
    const link = document.createElement("a");
    link.href = href;
    link.textContent = label;
    if (active) {
        link.setAttribute("aria-current", "page");
    }
    return link;
}
function makeActions(lang, locale, onLang) {
    const wrap = make("div");
    wrap.className = "action-row";
    const toggle = make("button");
    toggle.className = "lang-toggle";
    toggle.type = "button";
    toggle.setAttribute("aria-pressed", locale === "nl" ? "true" : "false");
    toggle.setAttribute("aria-label", `Switch language to ${lang.alt}`);
    toggle.textContent = lang.alt;
    function handleToggle() {
        const next = locale === "en" ? "nl" : "en";
        onLang(next);
    }
    toggle.addEventListener("click", handleToggle);
    wrap.appendChild(toggle);
    return wrap;
}
function makeCrumbLink(label, href) {
    const link = document.createElement("a");
    link.href = href;
    link.textContent = label;
    return link;
}
//# sourceMappingURL=layout.js.map