import { onAnimationFrame } from "../testCode.js";



/** @type HTMLCanvasElement */
const canvas = document.getElementById("canvas");
canvas.setAttribute("width", innerWidth);
canvas.setAttribute("height", innerHeight);

/** @type CanvasRenderingContext2D */
const ctx = canvas.getContext("2d", { alpha: false });


onAnimationFrame(polys => {
    ctx.resetTransform();

    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, innerWidth, innerHeight);

    ctx.translate(innerWidth / 2, innerHeight / 2);

    for (const poly of polys) {
        ctx.beginPath();
        ctx.moveTo(...poly.points[0]);
        for (let i = 1; i < poly.points.length; ++i) {
            ctx.lineTo(...poly.points[i]);
        }

        ctx.fillStyle = poly.hexColor;
        ctx.fill();
    }
});
