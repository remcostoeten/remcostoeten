type Tag = keyof HTMLElementTagNameMap;

export function make<K extends Tag>(tag: K): HTMLElementTagNameMap[K] {
  return document.createElement(tag);
}

export function text<K extends Tag>(tag: K, value: string): HTMLElementTagNameMap[K] {
  const node = make(tag);
  node.textContent = value;
  return node;
}

export function clear(node: HTMLElement): void {
  while (node.firstChild) {
    node.removeChild(node.firstChild);
  }
}

export function setLang(code: string): void {
  document.documentElement.lang = code;
}

export function list(items: string[]): HTMLUListElement {
  const ul = document.createElement("ul");
  ul.className = "list";
  for (const entry of items) {
    const li = document.createElement("li");
    li.textContent = entry;
    ul.appendChild(li);
  }
  return ul;
}
