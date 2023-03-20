import { onAnimationFrame, polys, random } from "../testCode.js";


let shapes = "";

for (const poly of polys) {
    const svgPoints = poly.points.join(" ");
    shapes += `<polygon fill="${poly.hexColor}" points="${svgPoints}"/>`;
}

const svg = document.getElementById("svg");
svg.setAttribute("width", innerWidth);
svg.setAttribute("height", innerHeight);

const container = svg.getElementById("container");
container.setAttribute("transform", `translate(${innerWidth / 2}, ${innerHeight / 2})`);
container.innerHTML = shapes;

const elements = Array.from(container.children);

onAnimationFrame(polys => {
    for (let i = 0; i < elements.length; ++i) {
        const svgPoints = polys[i].points.join(" ");
        elements[i].setAttribute("points", svgPoints);
    }
});
