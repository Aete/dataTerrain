import * as THREE from "three";
import * as d3 from "d3";
import seoulBoundary from "../utils/data/seoul_simplified.json";

type Coordinate = [number, number];

export default class Terrain {
  private scene: THREE.Scene;
  private camera: THREE.OrthographicCamera;
  private renderer: THREE.WebGLRenderer;
  private D3Projection: d3.GeoProjection;
  private boundary: Coordinate[];

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

    this.D3Projection = d3
      .geoMercator()
      .center([126.978, 37.5665])
      .scale(50000);

    this.boundary = this.getCoordinates(
      seoulBoundary.features[0].geometry.coordinates[0][0] as Coordinate[]
    );
  }

  render(): void {
    const createBoundaryLine = (boundary: Coordinate[]) => {
      const geometry = new THREE.BufferGeometry();
      const vertices = new Float32Array(
        boundary.flatMap(([x, y]) => [x, 0, y]) // Flatten [x, y] into [x, 0, y]
      );
      geometry.setAttribute("position", new THREE.BufferAttribute(vertices, 3));
      const material = new THREE.LineBasicMaterial({ color: 0x969696 });
      return new THREE.LineLoop(geometry, material);
    };

    const boundary = createBoundaryLine(this.boundary);
    this.scene.add(boundary);

    const animate = () => {
      requestAnimationFrame(animate);
      this.renderer.render(this.scene, this.camera);
    };
    animate();
  }

  private getCoordinates(geometry: Coordinate[]): Coordinate[] {
    const coordinates = geometry.map((coord: Coordinate): Coordinate => {
      const [x, y] = this.D3Projection(coord) as Coordinate;
      const normalizedX = (x / 900) * 3 - 1.5;
      const normalizedY = (y / 600) * 2 - 1;
      return [normalizedX, normalizedY];
    });
    return coordinates;
  }
}
