var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });
var player;
var platforms;
var cursors;
var score = 0;
var scoreText;

function preload() {
    game.load.image('sky', 'assets/sky.png');
    game.load.image('ground', 'assets/grass.png');
    game.load.image('castle', 'assets/castle.png');
    game.load.image('fruit', 'assets/fruit.png');
    game.load.image('rosy', 'assets/rosy-standing.png');
    game.load.audio('soundtrack', 'assets/Felipe_Sarro_-_15_-_Bach_Cello_Suite_1_BWV_1007_Prelude_Siloti_transcription.mp3');
}

function create() {
    game.physics.startSystem(Phaser.Physics.ARCADE);

    // a bigger world
    game.world.setBounds(0, 0, 2000, 2000);

    var sky = game.add.sprite(0, 0, 'sky');
    sky.fixedToCamera = true;


    music = game.add.audio('soundtrack');
    music.play();

    platforms = game.add.group();
    platforms.enableBody = true;
    var ground = platforms.create(0, 550, 'ground');
    //  Scale it to fit the width of the game
    // (the original sprite is 400x32 in size)
    // ground.scale.setTo(2, 2);
    ground.body.immovable = true;

    var castle = platforms.create(0, 100, 'castle');
    castle.body.immovable = true;

    //  Now let's create two ledges
    var ledge = platforms.create(400, 330, 'ground');
    ledge.body.immovable = true;

    // ledge = platforms.create(-150, 250, 'ground');
    // ledge.body.immovable = true;

    // The player and its settings
    player = game.add.sprite(428, 128, 'rosy');

    //  We need to enable physics on the player
    game.physics.arcade.enable(player);
    player.body.bounce.y = 0.2;
    player.body.gravity.y = 300;
    player.body.collideWorldBounds = true;

    //  Our two animations, walking left and right.
    // player.animations.add('left', [0, 1, 2, 3], 10, true);
    // player.animations.add('right', [5, 6, 7, 8], 10, true);
    scoreText = game.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });

    //  Our controls.
    cursors = game.input.keyboard.createCursorKeys();

    fruits = game.add.group();
    fruits.enableBody = true;
    for (var i = 0; i < 12; i++)
    {
        var fruit = fruits.create(i * 70, 0, 'fruit');
        fruit.body.gravity.y = 3;
        fruit.body.bounce.y = 1 + Math.random() * 0.2;
    }    
}
