import * as THREE from "three";
import { createTerrainMesh } from "../TerrainMesh";
import type { PointData } from "../../types";
import { Layer, LayerContext, UpdateParameters } from "@deck.gl/core";

type Props = {
  data: PointData[];
};

export default class ThreeTerrainLayer extends Layer<Props> {
  static layerName = "ThreeTerrainLayer";
  static defaultProps = {
    data: { type: "array", value: [] },
  };

  declare state: {
    renderer: THREE.WebGLRenderer;
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    mesh?: THREE.Mesh;
  };

  initializeState(context: LayerContext) {
    const { device } = context as LayerContext;
    const gl = (device as any).gl as WebGL2RenderingContext;
    const canvas = gl.canvas as HTMLCanvasElement;
    const renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer({
      canvas: gl.canvas,
      context: gl,
      antialias: true,
      alpha: true,
    });
    renderer.autoClear = false;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      canvas.clientWidth / canvas.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 5, 10);

    // set light
    scene.add(new THREE.AmbientLight(0xffffff, 0.6));
    const dir = new THREE.DirectionalLight(0xffffff, 0.8);
    dir.position.set(1, 3, 2);
    scene.add(dir);

    // save state
    this.setState({ renderer, scene, camera });
  }

  updateState({
    props,
    changeFlags,
    context,
  }: UpdateParameters<this> & { context: LayerContext }) {
    if (changeFlags.dataChanged) {
      const { scene, mesh: oldMesh } = this.state;
      if (oldMesh) {
        scene.remove(oldMesh);
        oldMesh.geometry.dispose();
        if (Array.isArray(oldMesh.material)) {
          oldMesh.material.forEach((m) => m.dispose());
        } else {
          oldMesh.material.dispose();
        }
      }
      const { viewport } = context;
      const newMesh = createTerrainMesh(props.data, viewport);

      this.state.scene.add(newMesh);
      this.setState({ mesh: newMesh });

      newMesh.geometry.computeBoundingBox();
      const box = newMesh.geometry.boundingBox!;
      const center = box.getCenter(new THREE.Vector3());
      const size = box.getSize(new THREE.Vector3());

      this.state.camera.position.set(
        center.x,
        center.y + size.y * 1.5,
        center.z + size.z * 2
      );
      this.state.camera.lookAt(center);
    }
  }

  draw({ context }: { context: LayerContext }) {
    const { gl, viewport } = context;
    const { renderer, scene, camera } = this.state;
    // Sync camera with deck.gl viewport
    camera.projectionMatrix.fromArray(viewport.projectionMatrix);
    camera.matrixAutoUpdate = false;
    camera.matrix.fromArray(viewport.viewMatrix).invert();

    // Render
    renderer.state.reset();
    renderer.render(scene, camera);

    // Restore deck.gl GL state
    gl.disable(gl.SCISSOR_TEST);
  }

  finalizeState() {
    const { scene, mesh, renderer } = this.state;
    if (mesh) {
      scene.remove(mesh);
      mesh.geometry.dispose();
      if (Array.isArray(mesh.material)) {
        mesh.material.forEach((m) => m.dispose());
      } else {
        mesh.material.dispose();
      }
    }
    renderer.dispose();
  }
}
