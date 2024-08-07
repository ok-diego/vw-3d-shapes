import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

export default class GLApp {
  constructor() {
    /*----------------------------------------------*/
    //   Renderer                                   */
    /*----------------------------------------------*/
    this.canvas = document.querySelector("canvas#sketch");
    this.pixelRatio = Math.min(window.devicePixelRatio, 2);
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      alias: true,
      alpha: true,
    });
    this.renderer.setClearColor(0x000000, 0);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(this.pixelRatio);

    /*----------------------------------------------*/
    //   Scene & Camera                             */
    /*----------------------------------------------*/
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      35,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    this.camera.position.z = 6;

    /*----------------------------------------------*/
    //   Mesh                                       */
    /*----------------------------------------------*/
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    this.cube = new THREE.Mesh(geometry, material);
    // this.scene.add(this.cube);

    /*----------------------------------------------*/
    //   OrbitControl                              */
    /*----------------------------------------------*/
    this.controls = new OrbitControls(this.camera, this.canvas);
    this.controls.enableDamping = true;

    /*----------------------------------------------*/
    //   Loop                                       */
    /*----------------------------------------------*/
    let that = this;
    function animate() {
      requestAnimationFrame(animate);
      that.cube.rotation.x += 0.005;
      that.cube.rotation.y += 0.01;
      that.renderer.render(that.scene, that.camera);
      that.controls.update();
    }
    animate();

    /*----------------------------------------------*/
    //   Resize                                     */
    /*----------------------------------------------*/
    function onResize() {
      that.camera.aspect = window.innerWidth / window.innerHeight;
      that.camera.updateProjectionMatrix();

      that.pixelRatio = Math.min(window.devicePixelRatio, 2);
      that.renderer.setSize(window.innerWidth, window.innerHeight);
      that.renderer.setPixelRatio(that.pixelRatio);
    }
    window.addEventListener("resize", onResize, false);
  }
}
