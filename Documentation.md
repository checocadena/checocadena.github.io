# FORMS

## Introduction
- **Brief Description**: FORMS Is an interactive audiovisual simulation. It uses Tone.js and Three.js respectively.

[Link](https://checocadena.github.io/Final.html)

## Usage

### Basic Usage
- Click to generate a random shape. It will generate a sphere, a cube, or a tetrahedron (also known as a pyramid) 
- The shape will then bounce around the inside of a cube. It will change color when it collidies with either the bounds or another shape, and it will also play a note
- Click and drag to move the camera around
- Scroll to zoom in and out
- Press the top left corner button for fullscreen

### Advanced Features
- Each shape has a different sound. When a sphere collides, its sound will be a sine wave. When a cube collides, it will be a square wave. For a tetrahedron, it will be a triangle wave. 
- The notes that it will play are quantized to a major pentatonic scale
- Each note is filtered through a low-pass and sent to reverb, chorus, and delay before being output.
- The orbital camera, which is an add-on for three.js

## Code 

### Setup

```jsx
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0">
  <title>FORMS</title>
  <style>
    body { margin: 0; }
    button#fullscreenButton {
      padding: 10px 20px;
      border: none;
      background-color: #000000;
      color: white;
      border-radius: 5px;
      cursor: pointer;
      transition: background-color 0.3s, transform 0.3s;
      position: absolute;
      top: 10px;
      left: 10px;
      z-index: 1;
    }
    button#fullscreenButton:hover {
      background-color: #232f3d;
      transform: scale(1.05);
    }
  </style>
</head>
<body>
  <button id="fullscreenButton">Fullscreen</button>
  <script src="https://cdn.jsdelivr.net/npm/tone@14.8.1/build/Tone.min.js"></script>
  <script type="importmap">
    {
      "imports": {
        "three": "https://unpkg.com/three@0.159.0/build/three.module.js",
        "three/addons/": "https://unpkg.com/three@0.159.0/examples/jsm/"
      }
    }
  </script>
  ```
- This was reaaally hard to set up at first because I couldn't get the CDN to work to I just ended up downloading the entire three.js website and mishmashing different examples to get stuff to work. Obviously I couldn't push for a while because it was just too many files
```jsx

  <script type="module">
    import * as THREE from 'three';
    import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

    let camera, scene, renderer;
    let audioContext;
    let shapes = [];
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    const boundarySize = 10;
    const majorPentatonicScale = [261.63, 293.66, 329.63, 349.23, 392.00, 523.25, 587.33, 659.26, 698.46, 783.99];
    const filter = new Tone.Filter(200, 'lowpass').toDestination();
    const reverb = new Tone.Reverb({ decay: 20, wet: 1 }).connect(filter);
    const chorus = new Tone.Chorus(4, 2.5, 0.5).connect(filter);
    const delay = new Tone.FeedbackDelay("8n", 0.5).connect(filter);

```
- Also really struggled with ES6 modules and the import statement for a while. Getting the orbit controls inside was a nightmare. One bug to note here is that I couldn't get the raycaster to change the color of the shapes as was initially planned. Here you can see the size of the boundary cube, an array of herz values for the major pentatonic scale, and the four audio effects that all notes go through
```jsx
    function initAudioContext() {
      Tone.start();
    }
    document.addEventListener('click', initAudioContext);
    function manageAudioContext() {
      if (!audioContext) {
        try {
          audioContext = new (window.AudioContext || window.webkitAudioContext)();
        } catch (e) {
          console.error('Web Audio API is not supported in this browser', e);
          return;
        }
      }
      if (audioContext.state === 'suspended') {
        audioContext.resume();
      }
    }
```
- One of the most annoying things is that message saying that user response is needed to start the audio context. Which I understand. But it's still annoying for me in this specific instance
```jsx
    function playShapeNote(shape) {
      const note = majorPentatonicScale[Math.floor(Math.random() * majorPentatonicScale.length)];
      const oscillatorType = shape.geometry instanceof THREE.TetrahedronGeometry ? 'triangle' :
                             shape.geometry instanceof THREE.BoxGeometry ? 'square' : 'sine';
      const oscillator = new Tone.Oscillator(note, oscillatorType);
      oscillator.connect(reverb).connect(chorus).connect(delay).connect(filter).toDestination();
      oscillator.start();
      const fadeOutTime = 1;
      oscillator.volume.exponentialRampToValueAtTime(-Infinity, `+${fadeOutTime}`);
      oscillator.stop(`+${fadeOutTime + 0.01}`);
      setTimeout(() => {
        oscillator.disconnect();
      }, (fadeOutTime + 0.01) * 1000);
    }
```
- Randomly gets a value from the scale array, checks the shape to see what wave the oscillator will be, creates oscillator, sends it to the effects, starts the note, and fades out the volume so as to avoid crackling. Disconnects the oscillator after it plays for memory perservation
```jsx
    function createShape() {
      if (shapes.length >= 20) return;
      const shapeType = Math.floor(Math.random() * 3);
      let geometry;
      switch (shapeType) {
        case 0: geometry = new THREE.SphereGeometry(0.5, 32, 32); break;
        case 1: geometry = new THREE.TetrahedronGeometry(0.5, 0); break;
        case 2: geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5); break;
      }
      const material = new THREE.MeshBasicMaterial({ color: Math.random() * 0xffffff, wireframe: true });
      const shape = new THREE.Mesh(geometry, material);
      shape.position.x = (Math.random() - 0.5) * boundarySize;
      shape.position.y = (Math.random() - 0.5) * boundarySize;
      shape.position.z = (Math.random() - 0.5) * boundarySize;
      shape.velocity = new THREE.Vector3((Math.random() - 0.5) * 0.05, (Math.random() - 0.5) * 0.05, (Math.random() - 0.5) * 0.05);
      scene.add(shape);
      shapes.push(shape);
    }
```
- There can only be a max of 20 shapes for lag issues. If there's less than that, it chooses a random shape, a random color, random x, y, and z coordinates, random velocity for each direction and pushes it
```jsx
    function createStars() {
      const starsGeometry = new THREE.BufferGeometry();
      const starsMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 0.1 });
      const starVertices = [];
      for (let i = 0; i < 1000; i++) {
        const x = (Math.random() - 0.5) * 200;
        const y = (Math.random() - 0.5) * 200;
        const z = (Math.random() - 0.5) * 200;
        starVertices.push(x, y, z);
      }
      starsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
      const stars = new THREE.Points(starsGeometry, starsMaterial);
      scene.add(stars);
    }
```
- I think this is the part that really took it to the next level. Thanks to Ian for the idea. Adding the stars is possible thanks to points in three.js. Random for each coordinate,set them as position and then just add. Kinda simple for the effect it has on the entire piece, but I did have to wrap my head around the buffer attribute, sp Ilooked at the examples. Reaaaaaally cool.
```jsx
    document.getElementById('fullscreenButton').addEventListener('mouseover', function() {
  const randomColor = '#' + Math.floor(Math.random()*16777215).toString(16);
  this.style.backgroundColor = randomColor;
    });

    document.getElementById('fullscreenButton').addEventListener('mouseout', function() {
  this.style.backgroundColor = '#000000'; 
});
```
- At the very end I thought it would be a very nice touch if the button also randomly changed color like the shapes, and it took little longer than expected. A shape does spawn if you click, however.
```jsx
    function init() {
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      camera.position.z = 15;

      renderer = new THREE.WebGLRenderer();
      renderer.setSize(window.innerWidth, window.innerHeight);
      document.body.appendChild(renderer.domElement);

      const boundaryGeometry = new THREE.BoxGeometry(boundarySize, boundarySize, boundarySize);
      const edges = new THREE.EdgesGeometry(boundaryGeometry);
      const lineMaterial = new THREE.LineBasicMaterial({ color: 0xffffff });
      const boundaryCube = new THREE.LineSegments(edges, lineMaterial);
      scene.add(boundaryCube);

      createStars();

      const controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.25;
      controls.screenSpacePanning = false;
      controls.maxPolarAngle = Math.PI / 2;

      document.addEventListener('click', () => {
        manageAudioContext();
        createShape();
      });
      window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      });

      const fullscreenButton = document.getElementById('fullscreenButton');
      fullscreenButton.addEventListener('click', () => {
        if (!document.fullscreenElement) {
          document.body.requestFullscreen();
        } else {
          document.exitFullscreen();
        }
      });

      function animate() {
        requestAnimationFrame(animate);

        shapes.forEach(shape => {
          shape.position.add(shape.velocity);

          ['x', 'y', 'z'].forEach(axis => {
            if (shape.position[axis] < -boundarySize / 2 || shape.position[axis] > boundarySize / 2) {
              shape.velocity[axis] *= -1;
              shape.material.color.setHex(Math.random() * 0xffffff);
              playShapeNote(shape);
            }
          });
        });

        controls.update();
        renderer.render(scene, camera);
      }

      animate();
    }

    init();
  </script>
</body>
</html>
```
- rest of code that runs constantly. Used edges geomtry instead of wireframe for the container cube. 

## Authors and Acknowledgment

### Authors
- Me! Checo Cadena 

### Acknowledgments
- Many thanks to Yotam Mann (yotam@tonejs.org) for Tone.js https://tonejs.github.io/ 
- The whole team at Three.js (https://threejs.org)