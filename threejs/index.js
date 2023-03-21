import * as THREE from './three.js';
import { onAnimationFrame, polys } from "../testCode.js";


{
    const shape = new THREE.Shape();

    shape.moveTo(0, 0);
    shape.lineTo(1, 1);
    shape.lineTo(0, 1);
    shape.lineTo(0.5, 0.8);

    const geometry = new THREE.ShapeGeometry(shape);

    console.log(geometry.attributes)


    geometry.dispose();
}


const scene = new THREE.Scene();
const camera = new THREE.OrthographicCamera(
    innerWidth / -2, innerWidth / 2,
    innerHeight / 2, innerHeight / -2,
    0.1, 1000);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setClearColor(0xffffff);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const threePolys = new Array(polys.length);

for (let i = 0; i < polys.length; ++i) {
    const poly = polys[i];

    const shape = new THREE.Shape();

    shape.moveTo(...poly.points[0]);
    for (let i = 1; i < poly.points.length; ++i) {
        shape.lineTo(...poly.points[i]);
    }

    const geometry = new THREE.ShapeGeometry(shape);
    const material = new THREE.MeshBasicMaterial({ color: polys[i].color });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    threePolys[i] = {
        mesh,
    };
}

camera.position.z = 5;

onAnimationFrame(polys => {
    for (let i = 0; i < polys.length; ++i) {
        const poly = polys[i].points;
        const vertices = threePolys[i].mesh.geometry.attributes.position.array;

        for (let i = 0; i < vertices.length; i += 3) {
            const n = poly.length - i / 3 - 1;
            vertices[i] = poly[n][0];
            vertices[i + 1] = poly[n][1];
        }
        threePolys[i].mesh.geometry.attributes.position.needsUpdate = true;
    }

    renderer.render(scene, camera);
});
