import React, { useEffect, useRef } from 'react';
import { Engine, Scene, FreeCamera, Vector3, HemisphericLight, MeshBuilder, Color3, Mesh, StandardMaterial, VertexData } from 'babylonjs';
import { mathmesh } from "mathmesh";

const BabylonScene: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const engine = new Engine(canvasRef.current, true);
      const scene = new Scene(engine);

      let verts = mathmesh("\\int_{a}^{b}x^2 \\,dx");
      let customMesh = new Mesh("mymathmesh", scene);
      let vertexData = new VertexData();
      
      vertexData.positions = verts.positions;
      vertexData.indices = verts.indices;
      vertexData.applyToMesh(customMesh);
      
      let fontmaterial = new StandardMaterial("mathmeshMat", scene);
      fontmaterial.backFaceCulling = false;
      fontmaterial.emissiveColor = new Color3(0, 1, 0);
      customMesh.material = fontmaterial;

      const camera = new FreeCamera('camera', new Vector3(0, 5, -10), scene);
      camera.setTarget(Vector3.Zero());

      new HemisphericLight('light', new Vector3(0, 1, 0), scene);

      const box = MeshBuilder.CreateBox('box', { size: 2 }, scene);
      box.position.x = -2;
      box.position.z = -1;

      engine.runRenderLoop(() => {
        scene.render();
      });
    }
  }, []);

  return <canvas ref={canvasRef} style={{ width: '100%', height: '100%' }} />;
};

export default BabylonScene;