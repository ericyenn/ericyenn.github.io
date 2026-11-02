import { styles } from "./styles.js";
type PageId = "home" | "blog" | "projects";
interface Link { label: string; href: string }
interface Paragraph { segments: (string | Link)[] }
interface Page { title: string; heading: string; paragraphs: Paragraph[] }
const pages: Record<PageId, Page> = {
 home: {title:"Eric",heading:"Hi! I'm Eric",paragraphs:[
  {segments:["Junior @ ",{label:"Cornell",href:"https://www.cornell.edu/"}," studying CS & ECE. Currently researching efficient ML at ",{label:"Relax ML Lab",href:"https://relax-ml.cs.cornell.edu/"}," under ",{label:"Chris De Sa",href:"https://www.cs.cornell.edu/~cdesa/"},"."]},
  {segments:["Last summer, I was an intern at ",{label:"Amazon Web Services",href:"https://aws.amazon.com/"}," where I worked on the ",{label:"Billing & Cost Management",href:"https://aws.amazon.com/aws-cost-management/"}," Team."]},
  {segments:["Feel free to reach out if you have any questions!"]}
 ]},
 blog: {title:"Blog — Eric",heading:"Blog",paragraphs:[{segments:["coming soon!!"]}]},
 projects: {title:"Projects — Eric",heading:"Projects",paragraphs:[{segments:["No projects listed yet."]}]}
};
const contacts: Link[] = [
 {label:"GitHub",href:"https://github.com/ericyenn"},
 {label:"X",href:"https://x.com/topographey"},
 {label:"ecy29@cornell.edu",href:"mailto:ecy29@cornell.edu"}
];
function element<K extends keyof HTMLElementTagNameMap>(tag: K, text?: string): HTMLElementTagNameMap[K] {
 const node = document.createElement(tag);
 if (text !== undefined) node.textContent = text;
 return node;
}
function link(item: Link): HTMLAnchorElement {
 const node = element("a",item.label);
 node.href = item.href;
 return node;
}
export function getPage(hash: string): PageId {
 const id = hash.replace(/^#\/?/,"");
 return id === "blog" || id === "projects" ? id : "home";
}
export function render(): void {
 const id = getPage(window.location.hash);
 const page = pages[id];
 document.title = page.title;
 const layout = element("div"); layout.className = "page";
 const header = element("header");
 const nav = element("nav"); nav.setAttribute("aria-label","Main navigation");
 const items: {id: PageId;label: string}[] = id === "home" ? [] : [{id:"home",label:"Home"}];
 items.push({id:"blog",label:"Blog"},{id:"projects",label:"Projects"});
 for (const item of items) {
  const node = link({label:item.label,href:item.id === "home" ? "#home" : "#"+item.id});
  if (item.id === id) node.setAttribute("aria-current","page");
  nav.append(node);
 }
 header.append(nav);
 const main = element("main"); main.id = "main";
 main.append(element("h1",page.heading));
 for (const paragraph of page.paragraphs) {
  const p = element("p");
  for (const segment of paragraph.segments) p.append(typeof segment === "string" ? document.createTextNode(segment) : link(segment));
  main.append(p);
 }
 const footer = element("footer"); footer.setAttribute("aria-label","Contact");
 for (const item of contacts) footer.append(link(item));
 layout.append(header,main,footer);
 document.body.replaceChildren(layout);
}
const style = element("style", styles); document.head.append(style);
window.addEventListener("hashchange",()=>{render();window.scrollTo(0,0);});
render();
