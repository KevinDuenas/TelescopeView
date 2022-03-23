var vertexShaderText = [
  "precision mediump float;",
  "",
  "attribute vec2 vertPosition;",
  "attribute vec3 vertColor;",
  "varying vec3 fragColor;",
  "",
  "void main()",
  "{",
  " fragColor = vertColor;",
  " gl_Position = vec4(VertPosition, 0.0, 1.0);",
  "}",
].join("\n");

var fragmentShaderText = [
  "precision mediump float;",
  "",
  "varying vec3 fragColor;",
  "void main()",
  "{",
  "   gl_FragColor = vec4(fragColor, 1.0);",
  "}",
].join("\n");

var InitDemo = function () {
  console.log("Hello world");

  var canvas = document.getElementById("Canvas_demo");
  var gl = canvas.getContext("webgl");

  if (!gl) {
    console.log("WebGL not supported");
    gl = canvas.getContext("experimental-webgl");
  }

  if (!gl) {
    alert("Your browser does not support WebGL");
  }

  gl.clearColor(1.0, 1.0, 1.0, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
};
