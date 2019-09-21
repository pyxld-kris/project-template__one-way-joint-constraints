import Phaser from "phaser";

export default class Appendage extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, attachedTo, offsetX, offsetY, size, tint) {
    super(
      scene,
      attachedTo.x + offsetX,
      attachedTo.y + offsetY,
      scene.generateSquareSprite(size)
    );
    this.scene = scene;

    this.attachedTo = attachedTo;
    this.offsetX = offsetX;
    this.offsetY = offsetY;

    if (tint != undefined) this.setTint(tint);

    // Add to rendering engine
    scene.add.existing(this);
    // Add to physics engine
    scene.physics.add.existing(this);

    this.setCollideWorldBounds(true)
      .setDrag(1, 1)
      .setMaxVelocity(400, 400)
      .setBounce(0.5, 0.5);

    // Hook into the scenes update event
    scene.events.on("update", this.update, this);
  }

  update() {
    // Calcuate the position we WANT to be in
    let targetX = this.attachedTo.x + this.offsetX;
    let targetY = this.attachedTo.y + this.offsetY;

    // Start moving towards our desired position
    this.constrainedMoveTo(targetX, targetY);
  }

  constrainedMoveTo(xPos, yPos) {
    this.setVelocity((xPos - this.x) * 30, (yPos - this.y) * 20);
  }

  destroy() {
    super.destroy();
  }
}
