import React, { Component } from "react";
import THREE from "../components/threejs";
import { TweenMax } from "gsap/all";

export default class Model extends Component {
  setupScene = () => {
    //RENDERER
    const renderer = new THREE.WebGLRenderer({
      canvas: document.querySelector("canvas"),
      antialias: true,
      alpha: true
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    //SCENE
    let scene = new THREE.Scene();
    //CAMERA
    let camera = new THREE.PerspectiveCamera(
      80,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );
    // LIGHTS
    let ambientLight = new THREE.AmbientLight(0x404040);
    let pointLight = new THREE.PointLight(0xffffff, 1, 100);
    pointLight.position.set(0, 40, 25);
    pointLight.lookAt(0, 0, 0);
    let rectLight = new THREE.RectAreaLight(0xffffff, 5, 15, 20);
    rectLight.position.set(0, 0, 25);
    rectLight.lookAt(0, 0, 0);
    scene.add(rectLight);
    scene.add(ambientLight);
    scene.add(pointLight);
    scene.add(camera);

    this.scene = scene;
    this.camera = camera;
    this.renderer = renderer;
    camera.position.z = 9;
    // this.start();
  };
  loadFrame = () => {
    const material = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      metalness: 0.8,
      roughness: 0.18
    });

    const gltfLoader = new THREE.GLTFLoader();
    gltfLoader.load(require(`../assets/frame.gltf`), gltf => {
      const root = gltf.scene;
      root.traverse(node => {
        if (!node.isMesh) return;
        node.material = material;
      });
      root.rotation.y = Math.PI / 2;
      root.position.y = -6;
      this.scene.add(root);
      this.root = root;
    });
  };
  audioAnalyser = () => {
    const listener = new THREE.AudioListener();
    const audio = new THREE.Audio(listener);
    const audioLoader = new THREE.AudioLoader();
    audioLoader.load(require(`../../server/uploads/${this.props.auidoName}`), buffer => {
      audio.setBuffer(buffer);
      audio.setLoop(false);
      audio.setVolume(0.5);
      audio.play();
    });
    this.audio = audio;
    let analyser = new THREE.AudioAnalyser(audio, 4096);
    this.analyser = analyser;
  };
  acousticCubes = () => {
    const geometry = new THREE.BoxBufferGeometry(0.25, 0.25, 5);
    const group = new THREE.Group();
    const row = 22;
    const column = 22;
    for (let i = -column + 2; i < column - 2; i++) {
      for (let j = -row + 2; j < row - 2; j++) {
        let material = new THREE.MeshPhysicalMaterial({
          color: 0xffffff,
          metalness: 0.2,
          roughness: 0.18
        });
        let cube = new THREE.Mesh(geometry, material);
        cube.position.set(i / 4, j / 4, 0);
        group.add(cube);
      }
    }
    group.position.set(0.15, 0.15, -1.5);
    this.scene.add(group);
    this.group = group;
  };
  acousticPulse = () => {
    const arrayPulse = [];
    let x = -20;
    let i = 0;
    this.data.forEach(y => {
      if (i % 2 === 0) {
        arrayPulse.push(new THREE.Vector3(x, y * 0.02, 5));
      } else {
        arrayPulse.push(new THREE.Vector3(x, -y * 0.02, 5));
      }
      x = x + 0.02;
      i++;
    });
    let curve = new THREE.CatmullRomCurve3(arrayPulse);
    const points = curve.getPoints(this.data.length / 3);
    const pulse = new THREE.BufferGeometry().setFromPoints(points);
    const pMaterial = new THREE.LineBasicMaterial({ color: 0xff0000 });
    const curveObject = new THREE.Line(pulse, pMaterial);
    this.scene.add(curveObject);
    this.curveObject = curveObject;
  };

  audioVisualizer = () => {
    let data = this.analyser.getFrequencyData();
    let average = this.analyser.getAverageFrequency();
    let i = 0;
    this.group.children.forEach(cube => {
      cube.position.z = data[i] * average * 0.0002;
      if (data[i] < 0.008) {
        cube.material.color.setHSL(1, 1, 1);
      } else {
        cube.material.color.setHSL(
          0,
          0,
          1 -
            ((data[i] * average * 0.0004 * i) / this.group.children.length) *
              0.15
        );
      }
      i++;
    });
    this.data = data;
    this.average = average;
  };
  start = () => {
    if (!this.frameId) {
      this.frameId = requestAnimationFrame(this.animate);
    }
  };
  renderScene = () => {
    this.renderer.render(this.scene, this.camera);
  };
  animate = () => {
    this.audioVisualizer();
    this.acousticPulse();
    this.curveObject.verticesNeedUpdate = true;
    this.frameId = requestAnimationFrame(this.animate);
    this.renderScene();
    this.scene.remove(this.curveObject);
  };
  stop = () => {
    cancelAnimationFrame(this.frameId);
  };
  componentDidMount() {
    this.setupScene();
    this.loadFrame();
    this.acousticCubes();
  }
  handleStart = () => {
    this.audioAnalyser();
    this.start();
  };
  handlePause = () => {
    this.audio.pause();
    this.rotateFrame();
  };
  handleResume = () => {
    this.audio.play();
    this.rotateFrame();
  };
  rotateFrame = () => {
    TweenMax.to(this.root.rotation, 1.2, { y: Math.PI + Math.PI / 2 });
    this.root.rotation.y = Math.PI / 2;
  };
  render() {
    return (
      <div>
        <button onClick={this.handleStart}>Start</button>
        <button onClick={this.handlePause}>Pasue</button>
        <button onClick={this.handleResume}>Resume</button>
        <canvas />
        <canvas />
      </div>
    );
  }
}
