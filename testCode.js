
export const polys = [];

export function random(from, to) {
    return Math.random() * (to - from) + from;
}

for (let i = 0; i < 3000; ++i) {
    const points = [];

    const x = random(-innerWidth / 2, innerWidth / 2);
    const y = random(-innerHeight / 2, innerHeight / 2);

    for (let a = 0; a < Math.PI * 2; a += .1) {
        points.push([
            x + 30 * Math.cos(a),
            y + 30 * Math.sin(a),
        ]);
    }

    const color = Math.trunc(0xffffff * Math.random());
    const hexColor = "#" + color.toString(16).padStart(6, "0");
    polys.push({ color, hexColor, points });
}

let animationFrameCallback;
export function onAnimationFrame(callback) {
    animationFrameCallback = callback;
}

const display = document.createElement("h1");
document.body.appendChild(display);
display.style.position = "fixed";
display.style.zIndex = 1;
display.style.borderRadius = "5px";
display.style.padding = "10px";
display.style.background = "#fffa";
display.style.top = "40px";
display.style.left = "40px";

let pastTime = 0;

let dtRegister = [];

const frame = () => {
    const now = performance.now() / 1000;

    if (dtRegister.length > 50) dtRegister.shift();
    dtRegister.push(now - pastTime);

    const dtMedian = dtRegister.reduce((a, b) => a + b) / dtRegister.length;
    const dt = Math.round(1000 * dtMedian);
    const fps = Math.round(1 / dtMedian);

    display.innerText = dt + " ms\n" + fps + " fps"
    pastTime = now;


    const framePolys = polys.map(poly => ({
        color: poly.color,
        hexColor: poly.hexColor,
        points: poly.points.map(
            ([x, y]) => [
                Math.round((x + random(-1, 1)) * 10) / 10,
                Math.round((y + random(-1, 1)) * 10) / 10
            ])
    }));

    animationFrameCallback?.(framePolys);

    requestAnimationFrame(frame);
}

frame();

