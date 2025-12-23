export function make(tag) {
    return document.createElement(tag);
}
export function text(tag, value) {
    const node = make(tag);
    node.textContent = value;
    return node;
}
export function clear(node) {
    while (node.firstChild) {
        node.removeChild(node.firstChild);
    }
}
export function setLang(code) {
    document.documentElement.lang = code;
}
export function list(items) {
    const ul = document.createElement("ul");
    ul.className = "list";
    for (const entry of items) {
        const li = document.createElement("li");
        li.textContent = entry;
        ul.appendChild(li);
    }
    return ul;
}
//# sourceMappingURL=dom.js.map