
const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    // This sets up the physics engine for the game as well as set the gravity
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

const game = new Phaser.Game(config);

var player;
var platforms;
var cursors;

function preload ()
{
    this.load.image('sky', 'assets/sky.png');   //  This loads the image so it is available to be used in the follwing frames
    this.load.image('ground', 'assets/platform.png');
    this.load.image('star', 'assets/star.png');
    this.load.image('bomb', 'assets/bomb.png');
    this.load.spritesheet('dude',
        'assets/dude.png',
        { frameWidth: 32, frameHeight: 48 }
    );
}

function create ()
{
    this.add.image(400, 300, 'sky') // Now that the image is loaded your need to use the create function to add the image
    this.add.image(400, 300, 'star'); // this will put the star on top of the sky image, position matters
    platforms = this.physics.add.staticGroup(); // Loads the physics engine and adds them to the static group the arent affected by physics and dont move. Think of the ground and most standing platforms. Set scale(2) gives it a width of twice tha actual viewable / playable area

    platforms.create(400, 568, 'ground').setScale(2).refreshBody(); // refresh body tells this object to refesh wth screen changes

    platforms.create(600, 400, 'ground');
    platforms.create(50, 250, 'ground');
    platforms.create(750, 220, 'ground');

    // --- Player section ---//

    player = this.physics.add.sprite(100, 450, 'dude');

    player.setBounce(0.2);
    player.setCollideWorldBounds(true);

    // --- Keyboard movement events---//


    // --- CHARACTER TURNS LEFT ---//
    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });


    // --- HANDLING THE RATE AT WHICH THE CHARACTER TURNS ---//
    this.anims.create({
        key: 'turn',
        frames: [ { key: 'dude', frame: 4 } ],
        frameRate: 20
    });
    // --- CHARACTER TURNS LEFT ---//
    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
    });

    // --- END Keyboard movement events---//
    // --- Bind the curser variable to the keyboard inputs---//
    cursors = this.input.keyboard.createCursorKeys();
    // --- Player and platform collision section ---//

    this.physics.add.collider(player, platforms); // This makes sure that the player the platoform objects cant fall through eachother

    // --- END Player and platform collision section ---//

// --- END Player section ---//
}
// --- Update  handles ui events that are subject to change, such as when a character jumps or interacts with another enemy ---//
function update ()
{
    if (cursors.left.isDown)
    {
        player.setVelocityX(-160);

        player.anims.play('left', true);
    }
    else if (cursors.right.isDown)
    {
        player.setVelocityX(160);

        player.anims.play('right', true);
    }
    else
    {
        player.setVelocityX(0);

        player.anims.play('turn');
    }

    if (cursors.up.isDown && player.body.touching.down)
    {
        player.setVelocityY(-330);
    }
}