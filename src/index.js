import Phaser, { UP } from 'phaser';
import PlayScene from './scenes/Play';
import PreloadScene from './scenes/Preload';

const HEIGHT = 600;
const WIDTH = 1280;

const SHARED_CONFIG = {
  height: HEIGHT,
  width: WIDTH,
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
    //  debug: true,
    }
  },
  scene: initScenes()
}


new Phaser.Game(config);