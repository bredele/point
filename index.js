
/**
 * Vertex shader program.
 * @type {String}
 */

var vshader = 
  'void main() {\n' +
  '  gl_Position = vec4(0.0, 0.0, 0.0, 1.0);\n' +
  '  gl_PointSize = 10.0;\n' +
  '}\n';


/**
 * Fragment shader program.
 * @type {String}
 */

var fshader =
  'void main() {\n' +
  '  gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);\n'
  '}\n';


/**
 * Expose 'Point'
 */

module.exports = Point;


/**
 * Point constructor.
 * @api public
 */

function Point() {
  
}


/**
 * Set context.
 *
 * @param {WebGLContext} gl
 * @return {this}
 * @api private
 */

Point.prototype.context = function(gl) {
	this.gl = gl;
	shaders(gl);
	return this;
};


/**
 * Draw point.
 *
 * @return {this}
 * @api private
 */

Point.prototype.draw = function() {
	// note: should we pass the context as first argument?
  this.gl.drawArrays(gl.POINTS, 0, 1);
  return this;
};


/**
 * Initialize shaders.
 *
 * @param {WebGLConttext} gl
 * @api private
 */

function shaders(gl) {
	var program = createProgram(gl, vshader, fshader);
	gl.useProgram(program);
	gl.program = program;
	return true;
}


/**
 * Create the linked program object
 * 
 * @param {WebGLConttext} gl
 * @param {String} vshader
 * @param {String} fshader
 * @api private
 */

function createProgram(gl, vshader, fshader) {
  var vertexShader = loadShader(gl, gl.VERTEX_SHADER, vshader);
  var fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fshader);
  var program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  return program;
}


/**
 * Create a shader object
 * 
 * @param {WebGLConttext} gl
 * @param {String} type
 * @param {String} source
 * @api private
 */

function loadShader(gl, type, source) {
  var shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  return shader;
}
