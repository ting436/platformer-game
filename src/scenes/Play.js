import Phaser from 'phaser';
import Player from '../entities/Player';
import Enemies from '../groups/Enemies';

class Play extends Phaser.Scene {

    constructor(config) {
        super('PlayScene');
        this.config = config
    }

    create() {
        const map = this.createMap();
        const layers = this.createLayers(map);
        const playerZones = this.getPlayerZones(layers.playerZones);
        const player = this.createPlayer(playerZones.start);
        const enemies = this.createEnemies(layers.enemySpawns);

        this.createEnemyColliders(enemies, {
            colliders: {
                platformsColliders: layers.platformColliders,
                player
            }
        })

        this.createPlayerColliders(player, {
            colliders: {
                platformsColliders: layers.platformColliders
            }
        })

        this.createEndOfLevel(playerZones.end, player);
        this.setupFollowupCameraOn(player);
    }

    createMap() {
        const map = this.make.tilemap({key: 'map'});
        map.addTilesetImage('main_lev_build_1', 'tiles-1');
        return map;
    }

    createLayers(map) {
        const tileset = map.getTileset('main_lev_build_1');
        const platformColliders = map.createStaticLayer('platforms_colliders', tileset);
        const environment = map.createStaticLayer('environment', tileset);
        const platforms = map.createStaticLayer('platforms', tileset);
        const playerZones = map.getObjectLayer('player_zones');
        const enemySpawns = map.getObjectLayer('enemy_spawns');

        platformColliders.setCollisionByProperty({collides: true});
        
        return { environment, platforms, platformColliders, playerZones, enemySpawns };
    }

    createPlayer(start) {
        return new Player(this, start.x, start.y);
    }

    createPlayerColliders(player, { colliders }) {
        player
            .addCollider(colliders.platformsColliders);
    }

    createEnemies(spawnLayer) {
        const enemies = new Enemies(this);
        const enemyTypes = enemies.getTypes();
     
        spawnLayer.objects.forEach(spawnPoint => {
          const enemy = new enemyTypes[spawnPoint.type](this, spawnPoint.x, spawnPoint.y);
          enemies.add(enemy);
        })
     
        return enemies;
      }
     
r
    createEnemyColliders(enemies, { colliders }) {
        enemies
        .addCollider(colliders.platformsColliders)
        .addCollider(colliders.player);
    }
    

    getPlayerZones(playerZonesLayer) {
        const playerZones = playerZonesLayer.objects;
        return {
            start: playerZones.find(zone => zone.name === 'startZone'),
            end: playerZones.find(zone => zone.name === 'endZone')
        }
    }

    setupFollowupCameraOn(player) {
        const { height, width, mapOffset, zoomFactor } = this.config;
        this.physics.world.setBounds(0, 0, width + mapOffset, height + 200);
        this.cameras.main.setBounds(0, 0, width + mapOffset, height).setZoom(zoomFactor);
        this.cameras.main.startFollow(player);
    }

    createEndOfLevel(end, player) {
        const endOfLevel = this.physics.add.sprite(end.x, end.y, 'end')
            .setSize(5, this.config.height)
        
        const eolOverlap = this.physics.add.overlap(player, endOfLevel, () => {
            eolOverlap.active = false;
            console.log('player has won');
        })
    }
}
export default Play;