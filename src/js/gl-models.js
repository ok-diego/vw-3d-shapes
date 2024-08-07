import * as THREE from "three";

import Animations from "./animation";

export default class GLModels {
  constructor(gl_app, objs) {
    this.app = gl_app;
    this.objs = objs;
    this.models = [];

    // console.log(this.app, this.objs);

    // now we add our models
    this.objs.forEach((obj, index) => {
      // console.log(obj);
      // we create our custom model that will receive 'scene'
      // this is also called a mesh - the combination of a geometry and a material
      const model = obj.model.scene;
      // console.log(obj);

      // now we can scale and display them
      model.scale.setScalar(0.7);

      if (obj.name == "shape1") {
        this.shape1 = model;
      }
      if (obj.name == "shape2") {
        this.shape2 = model;
      }
      if (obj.name == "shape3") {
        this.shape3 = model;
      }
      if (obj.name == "shape4") {
        this.shape4 = model;
      }

      // add mesh
      this.app.scene.add(model);

      // we set a condition to only render the first shape
      // if (index == 0) {
      //   this.app.scene.add(model);
      // }
      // everytime the loop is at shape1 we skip the rest 
      if (obj.name == "shape1") return;
      // if not at shape1
      model.position.y = -3.5
    });

    this.models = [this.shape1, this.shape2, this.shape3, this.shape4];

    // we create an animation object
    // this.animations = new Animations(this.app, this.models);
    new Animations(this.app, this.models);

    // console.log(this.models);
  }
}
