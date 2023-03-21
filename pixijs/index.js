import * as PIXI from "./pixi.js";
import { onAnimationFrame, polys } from "../testCode.js";

const app = new PIXI.Application({
    width: innerWidth,
    height: innerHeight,
    antialias: true,
    backgroundColor: 0xffffff,
});

app.stage.transform.position.x = innerWidth / 2;
app.stage.transform.position.y = innerHeight / 2;
document.body.appendChild(app.view);

const meshes = [];

for (const poly of polys) {
    const vertices = poly.points.flat();
    const indices = PIXI.utils.earcut(vertices);
    const mesh = new PIXI.SimpleMesh(
        PIXI.Texture.WHITE,
        vertices,
        undefined,
        indices,
        PIXI.DRAW_MODES.TRIANGLES
    );
    mesh.tint = poly.color;
    app.stage.addChild(mesh);
    meshes.push(mesh);
}

onAnimationFrame(polys => {
    for (let i = 0; i < polys.length; ++i) {
        const mesh = meshes[i];
        const points = polys[i].points;
        for (let n = 0; n < points.length; ++n) {
            mesh.verticesBuffer.data[n*2] = points[n][0];
            mesh.verticesBuffer.data[n*2 + 1] = points[n][1];
        }

        mesh.verticesBuffer.update();
        // mesh.indices = PIXI.utils.earcut(vertices); // There's no need to recalculate indices
    }
});
