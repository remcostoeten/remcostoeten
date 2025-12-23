export type Locale = "en" | "nl";
export type SectionCopy = {
    title: string;
    body: string;
    items?: string[];
};
export type ContactCopy = {
    title: string;
    reach: string;
};
export type PageCopy = {
    title: string;
    intro: string;
    sections: SectionCopy[];
    contact: ContactCopy;
};
export type HomeCopy = {
    title: string;
    intro: string;
    highlights: string[];
};
export type NavCopy = {
    home: string;
    terms: string;
    privacy: string;
};
export type CrumbCopy = {
    home: string;
    terms: string;
    privacy: string;
};
export type LangCopy = {
    label: string;
    alt: string;
};
export type SiteCopy = {
    nav: NavCopy;
    crumbs: CrumbCopy;
    lang: LangCopy;
    home: HomeCopy;
    terms: PageCopy;
    privacy: PageCopy;
    footer: string;
};
export declare const copyData: Record<Locale, SiteCopy>;
//# sourceMappingURL=content.d.ts.map