import * as THREE from "three";

export default class Ambient {
  constructor(gl_app, envMapTexture) {
    this.app = gl_app;
    this.envMapTexture = envMapTexture;

    // console.log(this.app);
    // console.log(this.envMapTexture);

    this.setLight();
    this.setEnvMap();
  }

  // now we set up our ambient light to see our models
  setLight() {
    this.ambientLight = new THREE.AmbientLight("#ffffff", 0.5);
    this.app.scene.add(this.ambientLight);
  }

  // now we set up our environtment map texture
  setEnvMap() {
    // we create and object and parameters
    this.environtmentMap = {};
    this.environtmentMap.intensity = 7;
    this.environtmentMap.texture = this.envMapTexture;
    this.app.scene.environtment = this.environtmentMap.texture;

    this.environtmentMap.updateMaterials = () => {
      this.app.scene.traverse((child) => {
        if (
          child instanceof THREE.Mesh &&
          child.material instanceof THREE.MeshStandardMaterial
        ) {
          child.material.envMap = this.environtmentMap.texture;
          child.material.envMapIntensity = this.environtmentMap.intensity;
          child.material.needsUpdate = true;
        }
      });
    };

    this.environtmentMap.updateMaterials();
  }
}
