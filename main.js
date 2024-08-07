// _____ import style
import "./src/css/style.css";

// _____ import scripts
import GLApp from "./src/js/gl-app";
import GLLoader from "./src/js/gl-loader";

// _____ instance scripts
const gl_app = new GLApp();
const gl_loader = new GLLoader(gl_app);
