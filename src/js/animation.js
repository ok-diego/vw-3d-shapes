// in this module we will handle the animation of the models

// we import the gsap library 
// we don't need the three js library here
import { gsap } from "gsap";

export default class Animations {
  constructor(gl_app, models) {
    this.app = gl_app;
    this.models = models;

    // console.log(this.app);
    // console.log(this.models);

    // we setup utilities variables that will help us manipulate our slides
    this.walking_distance = 3.5;
    this.duration = 2.2;
    this.dont_mouse = true;
    this.animating = false

    // manage models
    this.current = 0;
    this.next = this.current + 1;
    this.previous = this.models.length;

    // we create another object to be able to animate the models
    // go back and forth 
    this.DOM = {
        $body: document.querySelector("body"),
        $btn_prev: document.querySelector(".prev"),
        $btn_next: document.querySelector(".next"),  
    }

    this.bindEvents();
  }

  // this function will handle which direction the model will travel
  travelScene(distance) {
    this.animating = true;
    gsap.timeline({ defaults: { duration: this.duration, ease: "power4.InOut" }, 
    // everytime our animation is finished set the variable to false again
    onComplete: () => {
      this.animating = false;
    } })
        
    // entering 
    .to(this.models[this.current].position, { y: 0 })
    .fromTo(this.models[this.current].rotation, { y: Math.PI, x: Math.PI * 0.5 },
      { y: 0, x: 0 }, '<' )    
        
    // leaving
    .to(this.models[this.previous].position, { y: distance }, 0)
    .fromTo(this.models[this.previous].rotation, { y: 0, x: 0}, 
        { y: -Math.PI, x: -Math.PI * 0.5}, '<')

    this.DOM.$body.classList.remove(`theme-${this.previous}`);
    this.DOM.$body.classList.add(`theme-${this.current}`);
  }

  // mouse interaction
  onMouseMove(e) {
    if (!this.dont_mouse) return;
    let x = e.clientX;
    let y = e.clientY

    gsap.to(this.models[this.current].rotation, {
      duration: 3, 
      ease: 'expoOut',
      y: gsap.utils.mapRange(0, window.innerWidth, -0.5, 0.5, x),
      x: gsap.utils.mapRange(0, window.innerHeight, -0.5, 0.5, y),
    })
  
    console.log(gsap.utils.mapRange(0, window.innerWidth, -0.5, 0.5, x));
  }

          
    // we setup a bindevents function to add event listeners to our elements 
  bindEvents() {
    this.DOM.$btn_prev.addEventListener("click", () => {
        // condition to check if the animation is already running then don't run it again
        if (this.animating) return;

        // if the current model is the first one, we add a class to body
        if(this.current == 0) {
            this.DOM.$body.classList.add("is-first"); return;
        }

        // if it's not the first one
        this.DOM.$body.classList.remove("is-first", 'is-last');

        // we set the current model to the previous one
        // this.current = this.previous;
        this.previous = this.current;
        // this.previous = this.current - 1;
        this.current--;
        
        // we call the travelScene function for the models to go to the bottom
        this.travelScene(- this.walking_distance);

        console.log(this.current);
    })

    // Add an event listener to the 'btn_next' button that triggers when it is clicked
    this.DOM.$btn_next.addEventListener("click", () => {
        // condition to check if the animation is already running then don't run it again
        if (this.animating) return;

        // if the current model is the last one, we add a class to body
        if(this.current == this.models.length - 1) {
            this.DOM.$body.classList.add("is-last"); return;
        }

        // if it's not the last one
        this.DOM.$body.classList.remove("is-first", 'is-last');

        // we set the current model to the next one
        this.previous = this.current;
        // this.previous = this.current + 1;
        this.current++;
        
        // we call the travelScene function for the models to go to the top
        this.travelScene(this.walking_distance);

        console.log(this.current);
    })
    // Add an event listener to the document that triggers the onMouseMove function when the mouse is moved
    // The { passive: true } option is used to improve performance by indicating that the event listener will not call preventDefault()
    document.addEventListener('mousemove', (e) => this.onMouseMove(e), { passive: true })
  }
}

