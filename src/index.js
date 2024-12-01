import Phaser, { UP } from 'phaser';
import PlayScene from './scenes/Play';
import PreloadScene from './scenes/Preload';


const MAP_WIDTH = 1600;

const WIDTH = document.body.offsetWidth;
const HEIGHT = 600;

const SHARED_CONFIG = {
  mapOffset: MAP_WIDTH > WIDTH ? MAP_WIDTH - WIDTH : 0,
  width: WIDTH,
  height: HEIGHT,
  zoomFactor: 1.5
}

const Scenes = [PreloadScene, PlayScene];
const createScene = Scene => new Scene(SHARED_CONFIG)
const initScenes = () => Scenes.map(createScene)

const config = {
  // WebGL (Web Graphics Library) JS Api for rendering 2D and 3D graphics
  type: Phaser.AUTO,
  ...SHARED_CONFIG,
  pixelArt: true,
  physics: {
    // Arcade physics plugin, manages physics simulation
    default: 'arcade',
    arcade: {
      debug: true,
    }
  },
  scene: initScenes()
}


new Phaser.Game(config);