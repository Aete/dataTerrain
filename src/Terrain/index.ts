import * as THREE from "three";

export default class Terrain {
  private scene: THREE.Scene;
  private camera: THREE.OrthographicCamera;
  private renderer: THREE.WebGLRenderer;

  constructor(private container: Element) {
    this.scene = new THREE.Scene();
    const aspect = 900 / 600;
    const frustumSize = 2;
    this.camera = new THREE.OrthographicCamera(
      (frustumSize * aspect) / -2,
      (frustumSize * aspect) / 2,
      frustumSize / 2,
      frustumSize / -2,
      0.1,
      1000
    );
    this.renderer = new THREE.WebGLRenderer();

    this.renderer.setSize(900, 600);
    this.container.appendChild(this.renderer.domElement);

    this.camera.position.set(1, 1.5, 1);
    this.camera.lookAt(0, 0, 0);
  }

  render(): void {
    const createWireSquare = (y: number) => {
      const geometry = new THREE.BufferGeometry();
      const size = 0.3;
      const vertices = new Float32Array([
        -size,
        0,
        -size,
        size,
        0,
        -size,
        size,
        0,
        size,
        -size,
        0,
        size,
        -size,
        0,
        -size,
      ]);
      geometry.setAttribute("position", new THREE.BufferAttribute(vertices, 3));
      const material = new THREE.LineBasicMaterial({ color: 0x969696 });
      const square = new THREE.Line(geometry, material);
      square.position.y = y;
      return square;
    };

    for (let i = -1; i < 2; i++) {
      const square = createWireSquare(i / 2);
      this.scene.add(square);
    }

    const animate = () => {
      requestAnimationFrame(animate);
      this.renderer.render(this.scene, this.camera);
    };
    animate();
  }
}
