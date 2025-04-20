import * as THREE from "three";
import * as d3 from "d3";

type Coordinate = [number, number];
type PointData = {
  value: number;
  longitude: number;
  latitude: number;
};

export default class Terrain {
  private scene: THREE.Scene;
  private camera: THREE.OrthographicCamera;
  private renderer: THREE.WebGLRenderer;
  private D3Projection: d3.GeoProjection;
  private data: PointData[];
  private maxValue: number;
  private minValue: number;

  constructor(private container: Element, data: PointData[]) {
    // data: [value, lat, long]
    this.data = data;
    this.maxValue = Math.max(...data.map((d) => d["value"]));
    this.minValue = Math.min(...data.map((d) => d["value"]));

    // Initialize the scene, camera, and renderer
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

    this.camera.position.set(2, 3, 2);
    this.camera.lookAt(0, 0, 0);

    // Set up the D3 projection
    this.D3Projection = d3
      .geoMercator()
      .center([126.978, 37.5665])
      .scale(50000);
  }

  render(): void {
    const terrainMesh = this.createTerrain();
    this.scene.add(terrainMesh);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    this.scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(1, 3, 2);
    this.scene.add(directionalLight);

    this.renderer.render(this.scene, this.camera);
  }

  private createTerrain(): THREE.Mesh {
    const geometry = new THREE.BufferGeometry();
    const vertices: number[] = [];

    for (let i = 0; i < this.data.length; i += 3) {
      const triangle = this.data.slice(i, i + 3);
      triangle.forEach(({ value, latitude, longitude }) => {
        const [x, y] = this.D3Projection([longitude, latitude]) as Coordinate;
        const normalizedX = (x / 900) * 6 - 3;
        const normalizedZ = (y / 600) * 4 - 2;
        const normalizedY =
          (value - this.minValue) / (this.maxValue - this.minValue) - 0.5;
        vertices.push(normalizedX, normalizedY, normalizedZ);
      });
    }
    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(vertices, 3)
    );
    geometry.computeVertexNormals();

    const material = new THREE.MeshStandardMaterial({
      color: 0xcccccc,
      wireframe: false,
    });
    return new THREE.Mesh(geometry, material);
  }

  private createHeatmap(): void {}

  private colorScale(value: number): string {
    const color = d3
      .scaleSequential(d3.interpolateYlOrRd)
      .domain([this.minValue, this.maxValue])(value);
    return color;
  }
}
