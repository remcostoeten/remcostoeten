import { type CrumbCopy, type LangCopy, type Locale, type NavCopy } from "./content.js";
export type PageKey = "home" | "terms" | "privacy";
type LangChange = (next: Locale) => void;
export declare function makeHeader(nav: NavCopy, lang: LangCopy, page: PageKey, locale: Locale, onLang: LangChange): HTMLElement;
export declare function makeBreadcrumbs(crumbs: CrumbCopy, page: PageKey): HTMLElement;
export declare function makeFooter(label: string): HTMLElement;
export {};
//# sourceMappingURL=layout.d.ts.map