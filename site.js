import { styles } from "./styles.js";
const pages = {
    home: { title: "Eric", heading: "Hi! I'm Eric", paragraphs: [
            { segments: ["Junior @ ", { label: "Cornell", href: "https://www.cornell.edu/" }, " studying CS & ECE. Currently researching efficient ML at ", { label: "Relax ML Lab", href: "https://relax-ml.cs.cornell.edu/" }, " under ", { label: "Chris De Sa", href: "https://www.cs.cornell.edu/~cdesa/" }, "."] },
            { segments: ["Last summer, I was an intern at ", { label: "Amazon Web Services", href: "https://aws.amazon.com/" }, " where I worked on the ", { label: "Billing & Cost Management", href: "https://aws.amazon.com/aws-cost-management/" }, " Team."] },
            { segments: ["Feel free to reach out if you have any questions!"] }
        ] },
    blog: { title: "Blog — Eric", heading: "Blog", paragraphs: [{ segments: ["coming soon!!"] }] },
    projects: { title: "Projects — Eric", heading: "Projects", paragraphs: [], projects: [
            { name: "bedtime-LM", href: "https://github.com/Justee21/bedtime-LM", description: "A transformer language model built from scratch in PyTorch with Justin Roberts, trained on TinyStories to generate short stories.", details: "PyTorch · Transformers · Mixture of experts" }
        ] }
};
const contacts = [
    { label: "GitHub", href: "https://github.com/ericyenn" },
    { label: "X", href: "https://x.com/topographey" },
    { label: "ecy29@cornell.edu", href: "mailto:ecy29@cornell.edu" }
];
function element(tag, text) {
    const node = document.createElement(tag);
    if (text !== undefined)
        node.textContent = text;
    return node;
}
function link(item) {
    const node = element("a", item.label);
    node.href = item.href;
    return node;
}
export function getPage(pathname) {
    const id = pathname.replace(/\/index\.html$/, "").replace(/^\/+|\/+$/g, "");
    return id === "blog" || id === "projects" ? id : "home";
}
export function render() {
    const id = getPage(window.location.pathname);
    const page = pages[id];
    document.title = page.title;
    const layout = element("div");
    layout.className = "page";
    const header = element("header");
    const nav = element("nav");
    nav.setAttribute("aria-label", "Main navigation");
    const items = id === "home" ? [] : [{ id: "home", label: "home" }];
    items.push({ id: "blog", label: "blog" }, { id: "projects", label: "projects" });
    for (const item of items) {
        const node = link({ label: item.label, href: item.id === "home" ? "/" : "/" + item.id + "/" });
        if (item.id === id)
            node.setAttribute("aria-current", "page");
        nav.append(node);
    }
    header.append(nav);
    const main = element("main");
    main.id = "main";
    main.append(element("h1", page.heading));
    for (const paragraph of page.paragraphs) {
        const p = element("p");
        for (const segment of paragraph.segments)
            p.append(typeof segment === "string" ? document.createTextNode(segment) : link(segment));
        main.append(p);
    }
    if (page.projects) {
        const list = element("ol");
        list.className = "project-list";
        for (const project of page.projects) {
            const item = element("li");
            item.className = "project";
            const title = element("h2");
            title.append(link({ label: project.name, href: project.href }));
            const description = element("p", project.description);
            const details = element("p", project.details);
            details.className = "project-details";
            item.append(title, description, details);
            list.append(item);
        }
        main.append(list);
    }
    const footer = element("footer");
    footer.setAttribute("aria-label", "Contact");
    for (const item of contacts)
        footer.append(link(item));
    layout.append(header, main, footer);
    document.body.replaceChildren(layout);
}
const style = element("style", styles);
document.head.append(style);
// Keep previously shared hash links working while canonical links use directories.
const legacyPage = window.location.hash.replace(/^#\/?/, "");
if (legacyPage === "blog" || legacyPage === "projects") {
    window.location.replace("/" + legacyPage + "/");
}
render();
