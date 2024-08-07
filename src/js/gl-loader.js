// in order to use three js 3d models we need to use loaders
// we can't import them directly from the api
// this is why we create gl-loader class
// we update the loaders as a custom asset

// we need to import loaders from three js
import * as THREE from "three";

// this loader enables us to import our custom 3d elements
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

// this loader is an encoder that will help us decode since our models are compressed
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";

// import GLModels
import GLModels from "./gl-models";
import Ambient from "./gl-ambient";

// import models from js/models folder
import Shape1 from "../models/shape1.glb";
import Shape2 from "../models/shape2.glb";
import Shape3 from "../models/shape3.glb";
import Shape4 from "../models/shape4.glb";

// import cubeTexture from images folder
import px from "../images/px.jpeg";
import nx from "../images/px.jpeg";
import py from "../images/px.jpeg";
import ny from "../images/px.jpeg";
import pz from "../images/px.jpeg";
import nz from "../images/px.jpeg";

export default class GLLoader {
  constructor(gl_app) {
    this.app = gl_app;

    // comfirm all is imported properly
    // console.log(this.app);
    // console.log(GLTFLoader);
    // console.log(DRACOLoader);

    // we create an object that will be receiving all our parameters
    this.sources = [
      {
        name: "shape1",
        url: Shape1,
        type: "gltf",
      },
      {
        name: "shape2",
        url: Shape2,
        type: "gltf",
      },
      {
        name: "shape3",
        url: Shape3,
        type: "gltf",
      },
      {
        name: "Shape4",
        url: Shape4,
        type: "gltf",
      },
      {
        name: "environmentMapTexture",
        type: "cubeTexture",
        path: [px, nx, py, ny, pz, nz],
      },
    ];

    // we instance params that will help us prepare our loader
    this.to_laod = this.sources.length;
    this.loaded = 0;

    this.instanceLoaders();
    this.loadAssets();
  }

  instanceLoaders() {
    // console.log("instance");

    // we'll be inserting the loaders here
    this.loaders = {};

    this.loaders.dracoLoader = new DRACOLoader();
    // we use a decoder from google
    // https://github.com/google/draco/releases
    this.loaders.dracoLoader.setDecoderPath(
      "https://www.gstatic.com/draco/versioned/decoders/1.5.7/"
    );

    // gftl loader
    this.loaders.gltfLoader = new GLTFLoader();
    // we use the dracoloader for this
    this.loaders.gltfLoader.setDRACOLoader(this.loaders.dracoLoader);

    // our texture loader
    this.loaders.cubeTextureLoader = new THREE.CubeTextureLoader();

    // console.log("this.loaders.dracoLoader");
    // console.log("this.loaders.gltfLoader");
    // console.log("this.loaders.cubeTextureLoader");
  }

  // loading assets functions
  loadAssets() {
    // this array will receive our objects
    this.objs = [];
    // this for all the items
    this.items = [];

    for (const source of this.sources) {
      // console.log(source)
      // we create conditions to be able to see and load the assets with the proper loader
      if (source.type === "gltf") {
        // console.log(source);

        // then we load the gltf loader and load the source url as a parameter
        this.loaders.gltfLoader.load(source.url, (file) => {
          this.objs.push({ name: source.name, model: file });
          this.sourceLoaded(source, file);
        });
      } else if (source.type === "cubeTexture") {
        this.loaders.cubeTextureLoader.load(source.path, (file) => {
          this.sourceLoaded(source, file);
        });
      }
    }
  }

  sourceLoaded(source, file) {
    // console.log(source);
    // console.log(file);

    // we pass the file to the items array
    this.items[source.name] = file;

    // everytime we load something the variable will be increasing
    this.loaded++;

    // we make a condition to check that the number of elements that were imported are the same
    // as the amount of the source elements length
    // if this is true we can trigger any function inside
    if (this.loaded === this.to_laod) {
      // alert('All imported')
      // console.log(this.items);
      this.isReady();
    }
  }

  // wit this function we confirm we'ere ready to load all models and textures / environments
  isReady() {
    // alert('is Ready')
    // now we'll the create the module(class) that will receive our 3d models
    // in the file gl--models.js
    // we could have added this inside main js as well
    const gl_models = new GLModels(this.app, this.objs);

    // now we create our ambien class
    // we also pass the environment map textures
    new Ambient(this.app, this.items.environmentMapTexture);
  }
}
