type Tag = keyof HTMLElementTagNameMap;
export declare function make<K extends Tag>(tag: K): HTMLElementTagNameMap[K];
export declare function text<K extends Tag>(tag: K, value: string): HTMLElementTagNameMap[K];
export declare function clear(node: HTMLElement): void;
export declare function setLang(code: string): void;
export declare function list(items: string[]): HTMLUListElement;
export {};
//# sourceMappingURL=dom.d.ts.map