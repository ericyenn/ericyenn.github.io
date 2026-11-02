type PageFile = "index.html" | "blog.html" | "projects.html";
interface Page { file: PageFile; title: string; body: string }
interface Link { label: string; href: string }
const pages: Page[] = [
  {
    "file": "index.html",
    "title": "Eric",
    "body": "<h1>Hi! I'm Eric</h1><p>Junior @ <a href=\"https://www.cornell.edu/\">Cornell</a> studying CS &amp; ECE. Currently researching efficient ML at <a href=\"https://relax-ml.cs.cornell.edu/\">Relax ML Lab</a> under <a href=\"https://www.cs.cornell.edu/~cdesa/\">Chris De Sa</a>.</p><p>Last summer, I was an intern at <a href=\"https://aws.amazon.com/\">Amazon Web Services</a> where I worked on the <a href=\"https://aws.amazon.com/aws-cost-management/\">Billing &amp; Cost Management</a> Team.</p><p>Feel free to reach out if you have any questions!</p>"
  },
  {
    "file": "blog.html",
    "title": "Blog \u2014 Eric",
    "body": "<h1>Blog</h1><p>No posts yet.</p>"
  },
  {
    "file": "projects.html",
    "title": "Projects \u2014 Eric",
    "body": "<h1>Projects</h1><p>No projects listed yet.</p>"
  }
];
const navigation: Link[] = [{label:"Blog",href:"blog.html"},{label:"Projects",href:"projects.html"}];
const contacts: Link[] = [{label:"GitHub",href:"https://github.com/ericyenn"},{label:"X",href:"https://x.com/topographey"},{label:"ecy29@cornell.edu",href:"mailto:ecy29@cornell.edu"}];
function link(item: Link, current?: PageFile): string {
  return `<a href="${item.href}"${item.href === current ? ' aria-current="page"' : ''}>${item.label}</a>`;
}
function render(page: Page): string {
  const links = page.file === "index.html" ? navigation : [{label:"Home",href:"index.html"},...navigation];
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="description" content="Eric — Cornell CS &amp; ECE student researching efficient ML at Relax ML Lab.">
<meta name="theme-color" content="#f9f6ef">
<title>${page.title}</title>
<link rel="preload" href="assets/geist-sans.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="style.css">
</head>
<body><div class="page">
<header><nav aria-label="Main navigation">${links.map(item => link(item,page.file)).join("")}</nav></header>
<main>${page.body}</main>
<footer aria-label="Contact">${contacts.map(item => link(item)).join("")}</footer>
</div></body>
</html>
`;
}
export const output: Record<string,string> = Object.fromEntries(pages.map(page => [page.file,render(page)]));
