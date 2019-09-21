import Phaser from "phaser";

export default class Body extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, width, height, tint) {
    super(scene, x, y, scene.generateRectangleSprite(width, height));
    this.scene = scene;

    if (tint != undefined) this.setTint(tint);

    // Add to rendering engine
    scene.add.existing(this);
    // Add to physics engine
    scene.physics.add.existing(this);

    this.setCollideWorldBounds(true)
      .setDrag(30, 20)
      .setMaxVelocity(150, 300)
      .setBounce(0.5, 0.1);

    // Track the arrow keys & OPQA
    const {
      LEFT,
      RIGHT,
      UP,
      DOWN,
      Q,
      O,
      P,
      A
    } = Phaser.Input.Keyboard.KeyCodes;
    this.keys = scene.input.keyboard.addKeys({
      left: LEFT,
      right: RIGHT,
      up: UP,
      down: DOWN,
      q: Q,
      o: O,
      p: P,
      a: A
    });

    // Hook into the scenes update event
    scene.events.on("update", this.update, this);
  }

  update() {
    const keys = this.keys;

    if (keys.left.isDown) {
      this.setVelocity(this.body.velocity.x - 20, this.body.velocity.y);
    } else if (keys.right.isDown) {
      this.setVelocity(this.body.velocity.x + 20, this.body.velocity.y);
    }

    if (keys.up.isDown && this.body.blocked.down) {
      this.setVelocity(this.body.velocity.x, -200);
    }
  }

  destroy() {
    super.destroy();
  }
}
