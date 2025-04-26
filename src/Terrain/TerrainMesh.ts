import * as THREE from "three";
import {
  seoulMercator,
  createColorScale,
  createHeightScale,
} from "../utils/helper";
import type { PointData } from "../types";
import { Viewport } from "@deck.gl/core";
type Coordinate = [number, number];

export function createTerrainMesh(
  data: PointData[],
  height: number,
  viewport: Viewport
) {
  const geometry = new THREE.BufferGeometry();
  const vertices: number[] = [];
  const colors: number[] = [];

  // create scalers for height and color
  const vals = data.map((d) => d.heightData);
  const vals2 = data.map((d) => d.colorData);
  const maxValue = Math.max(...vals);
  const minValue = Math.min(...vals);
  const maxValue2 = Math.max(...vals2);
  const minValue2 = Math.min(...vals2);
  const heightScale = createHeightScale([minValue, maxValue], height);
  const colorScale = createColorScale([minValue2, maxValue2]);

  data.forEach((d) => {
    const calculatedHeight = heightScale(d.heightData);
    const [x, y, z] = viewport.projectPosition([
      d.longitude,
      d.latitude,
      calculatedHeight,
    ]);
    vertices.push(x, y, z * 30);
    const color = new THREE.Color(colorScale(d.colorData));
    colors.push(color.r, color.g, color.b);
  });

  geometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(vertices, 3)
  );
  geometry.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
  geometry.computeVertexNormals();

  const material = new THREE.MeshStandardMaterial({
    vertexColors: true,
    roughness: 0.7,
    metalness: 0.1,
  });
  return new THREE.Mesh(geometry, material);
}
