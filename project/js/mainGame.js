
const config = {
    type: Phaser.AUTO,
    width: 800,     // Sets the width and height
    height: 600,    //
    // This sets up the physics engine for the game as well as set the gravity
    physics: {
        default: 'arcade',  // Gives the default physics of arcade
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    // This sets up the scene, which can be changed based on actions and progress
    // The scenes are function based and always have a preload, create, and update
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};
// initializes the game with the configurations in the config object
const game = new Phaser.Game(config);

// variables that willl be used in the game, usually will have physics applied to them
var player;     // The glpayer that will be controlled through keyboard events
var platforms;
var cursors;    // sets up the keyboard input that will have events to control the player
var stars;      // Declaration of the stars that will render on the screen
var score = 0;  // the score variable that will be used to track the score
var scoreText;  // This will be the text that will be used dependednt on the score
var bombs;      // Declaration fo the bombs variables for this game
var gameOver = false;       // initialize the gameOver variable as false to track if the plaer had lost
function preload ()
{
    this.load.image('sky', 'assets/sky.png');   //  This loads the image so it is available to be used in the follwing frames
    this.load.image('ground', 'assets/platform.png');   // Tells the rest of the objecct what kind of pciture to usef or te ground
    this.load.image('star', 'assets/star.png');     // what kind of picture for the star
    this.load.image('bomb', 'assets/bomb.png');     // What kind of picture for the bom
    this.load.spritesheet('dude',                   // This loads the main character from the spritesheet
        'assets/dude.png',
        { frameWidth: 32, frameHeight: 48 }         // determines the width and the hieight
    );
}

function create ()
{
    this.add.image(400, 300, 'sky') // This sets the image to the total screen size so it acts as a background picture


    platforms = this.physics.add.staticGroup(); // Loads the physics engine and adds them to the static group the arent affected by physics and dont move. Think of the ground and most standing platforms. Set scale(2) gives it a width of twice tha actual viewable / playable area

    platforms.create(400, 568, 'ground').setScale(2).refreshBody(); // refresh body tells this object to refesh wth screen changes this block will be set to the bottom and will be static

    platforms.create(600, 400, 'ground');
    platforms.create(50, 250, 'ground');
    platforms.create(750, 220, 'ground');





    // --- Player section ---//

    player = this.physics.add.sprite(100, 450, 'dude');     // Loads the sprite onto the game

    player.setBounce(0.2);  // adds the bouncing physics to the player, when it lands it will get a bounce
    player.setCollideWorldBounds(true);     // this keeps the player inside of the game board

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

    // --- END Player section ---//



    // --- Bind the curser variable to the keyboard inputs---//
    cursors = this.input.keyboard.createCursorKeys();



    // ---  Stars section---//
    stars = this.physics.add.group({
        key: 'star',    // Gets the icon for making stars
        repeat: 11,     // This repeats it 11 times after the first, making a total of 12
        setXY:      //  This sets the starting position of the stars
            { x: 12,        // The first start off at 12,0 (all starts have a starting Y of 0)
            y: 0,
            stepX: 70       // This adds 70 to each successive star being created (pushes them over 70)
        }
    });

    // Iterates over all of the created stars and assigns them a random landing bounce between 0.4 and 0.8
    stars.children.iterate(function (child) {

        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));

    });
    // --- End stars section ---//


    // --- Score text section --- //

    scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });

    // --- End Score text section --- //


    // --- Bombs Section --- //


    bombs = this.physics.add.group();   // this adds the bombs as a group


    // ---  Collision section ---//

    this.physics.add.collider(player, platforms); // This makes sure that the player the platoform objects cant fall through eachother
    this.physics.add.collider(stars, platforms); // This makes sure that the stars and the platform cant go through eachother

    this.physics.add.overlap(player, stars, collectStar, null, this);   // The overlap makes it so that when the player and any of the stars share the same space, the collectStar function will run


    this.physics.add.collider(bombs, platforms);    // Makes sure that the boms dont go through the platforms

    this.physics.add.collider(player, bombs, hitBomb, null, this);  //  when the player hits the bomsb, trigger the hitbimb function to update the game state

    // --- END  Collision section ---//


}
// --- Update  handles ui events that are subject to change, such as when a character jumps or interacts with another enemy ---//
function update ()
{

    if (gameOver)
    {
        return;
    }

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

// --- Function to take the player object and any star object and  once they overlap, take the start off the screen by disabling its display---//
function collectStar (player, star)
{
    star.disableBody(true, true);
    // -- Score section -- //
    score += 10;
    scoreText.setText('Score: ' + score); // updates the score on the board with the new score
    // -- End Score section --- //

    if (stars.countActive(true) === 0)  // countActive counts how many starts are still on the screen("alive")
    {
        stars.children.iterate(function (child) {

            child.enableBody(true, child.x, 0, true, true);

        });

        var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

        var bomb = bombs.create(x, 16, 'bomb');
        bomb.setBounce(1);
        bomb.setCollideWorldBounds(true);
        bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
        bomb.allowGravity = false;

    }
}


// -- Function that handles what happens when the player hits one of the bomb objects could be improved later for scoreing and lives -- //
function hitBomb (player, bomb)
{
    this.physics.pause();       // Stops everything in the game from moving

    player.setTint(0xff0000);  // converts the players tint to red

    player.anims.play('turn');  // This turns the character around for the effect of losing animation

    gameOver = true;        // effectively stops the game
}
