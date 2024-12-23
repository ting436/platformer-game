import Phaser from 'phaser';
import initAnimations from './playerAnims';
import collidable from '../mixins/collidable';

class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'player');

        scene.add.existing(this);
        scene.physics.add.existing(this);

        Object.assign(this, collidable);

        this.init();
        this.initEvents();
    }

    init() {
        this.gravity = 500;
        this.playerSpeed = 200;
        this.jumpCount = 0;
        this.consecutiveJumps = 1;
        this.cursors = this.scene.input.keyboard.createCursorKeys();

        this.body.setSize(20, 36);
        this.body.setGravityY(this.gravity);
        this.setCollideWorldBounds(true);
        this.setOrigin(0.5, 1);

        initAnimations(this.scene.anims);
    }

    initEvents() {
        this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this)
    }

    update() {
        const { left, right, space, up } = this.cursors;
        const isSpaceJustDown = Phaser.Input.Keyboard.JustDown(space);
        const isUpJustDown = Phaser.Input.Keyboard.JustDown(up);   
        const onFloor = this.body.onFloor();

        if (left.isDown) {
            this.setVelocityX(-this.playerSpeed);
            this.setFlipX(true)
        } else if (right.isDown) {
            this.setVelocityX(this.playerSpeed);
            this.setFlipX(false)
        } else {
            this.setVelocityX(0);
        }

        if ((isSpaceJustDown || isUpJustDown) && (onFloor || this.jumpCount < this.consecutiveJumps)) {
            this.setVelocityY(-this.playerSpeed * 1.5);
            this.jumpCount++;
        }

        if (onFloor) {
            this.jumpCount = 0;
        }

        onFloor ?
            this.body.velocity.x !== 0 ?
                this.play('run', true) : this.play('idle', true) :
            this.play('jump', true)
    }
}

export default Player;