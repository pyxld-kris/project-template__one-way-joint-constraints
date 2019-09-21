import Phaser from "phaser";

import Body from "./classes/Body.js";
import Appendage from "./classes/Appendage.js";

class PlayScene extends Phaser.Scene {
  constructor() {
    super("PlayScene");
  }

  preload() {}

  create() {
    const camera = this.cameras.main;
    const cursors = this.input.keyboard.createCursorKeys();
    camera.setBounds(0, 0, this.game.config.width, this.game.config.height);

    // Let's construct our player's skeleton!
    this.body = new Body(this, 100, 225, 35, 50, 0x666666);
    this.neck = new Appendage(this, this.body, 0, -25, 20, 0x666666);
    this.head = new Appendage(this, this.neck, 0, -15, 25, 0x777777);
    this.leftArmUpper = new Appendage(this, this.body, -20, -12, 15, 0x666666);
    this.rightArmUpper = new Appendage(this, this.body, 20, -12, 15, 0x666666);
    this.leftArmLower = new Appendage(
      this,
      this.leftArmUpper,
      -10,
      10,
      15,
      0x777777
    );
    this.rightArmLower = new Appendage(
      this,
      this.rightArmUpper,
      10,
      10,
      15,
      0x777777
    );

    this.leftLegUpper = new Appendage(this, this.body, -15, 20, 20, 0x666666);
    this.rightLegUpper = new Appendage(this, this.body, 15, 20, 20, 0x666666);
    this.leftLegLower = new Appendage(
      this,
      this.leftLegUpper,
      -2,
      20,
      20,
      0x666666
    );
    this.rightLegLower = new Appendage(
      this,
      this.rightLegUpper,
      2,
      20,
      20,
      0x666666
    );

    // Create feet
    this.leftFoot = new Appendage(this, this.leftLegLower, 0, 15, 25, 0x888888);
    this.rightFoot = new Appendage(
      this,
      this.rightLegLower,
      0,
      15,
      25,
      0x888888
    );

    // Create hands
    this.leftHand = new Appendage(
      this,
      this.leftArmLower,
      -5,
      10,
      20,
      0x8f8f8f
    );
    this.rightHand = new Appendage(
      this,
      this.rightArmLower,
      5,
      10,
      20,
      0x8f8f8f
    );
  }

  update(time, delta) {}

  /* <Begin> helper functions added by Kris */
  //
  //

  generateRectangleSprite(width, height) {
    // Returns key of generated sprite object
    let spriteKey = "rectangle-sprite-" + width + "x" + height;

    var graphics = this.add
      .graphics()
      .fillStyle(0xffffff)
      .fillRect(0, 0, width, height)
      .generateTexture(spriteKey, width, height);
    graphics.destroy();

    return spriteKey;
  }
  generateSquareSprite(width) {
    // Returns key of generated sprite object
    return this.generateRectangleSprite(width, width);
  }

  addPhysicalRectangle(x, y, width, height, color, alphaIThinkMaybe) {
    // TODO: alphaIThinkMaybe name change
    let rect = this.add.rectangle(x, y, width, height, color, alphaIThinkMaybe);
    rect = this.physics.add.existing(rect, true);

    return rect;
  }

  /* </End> Helper functions added by kris */
}

const config = {
  type: Phaser.AUTO,
  width: 500,
  height: 300,
  parent: "game-container",
  pixelArt: true,
  zoom: 0.75,
  backgroundColor: "#000000",
  scene: PlayScene,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { x: 0, y: 200 }
    }
  }
};

const game = new Phaser.Game(config);
let controls;
