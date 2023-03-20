import * as PIXI from "./pixi.js";
import { onAnimationFrame, polys } from "../testCode.js";

const app = new PIXI.Application({ width: innerWidth, height: innerHeight, antialias: true });
document.body.appendChild(app.view);


const g = new PIXI.Graphics();
g.position.x = innerWidth / 2;
g.position.y = innerHeight / 2;

for (const poly of polys) {
    g.beginFill(poly.color);
    g.drawPolygon(...poly.points.flat());
    g.endFill();
}

app.stage.addChild(g);


onAnimationFrame(polys => {
    g.clear();
    for (const poly of polys) {
        g.beginFill(poly.color);
        g.drawPolygon(...poly.points.flat());
        g.endFill();
    }
});

