var game = new Phaser.Game(constants.gameWidth, constants.gameHeight, Phaser.AUTO, '', { preload: preload, create: create, update: update });
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
    game.load.image('tree', 'assets/tree1.png');

    game.load.image('rosy', 'assets/rosy-standing.png');
    game.load.image('queen', 'assets/queen.png');
    game.load.audio('soundtrack', 'assets/Felipe_Sarro_-_15_-_Bach_Cello_Suite_1_BWV_1007_Prelude_Siloti_transcription.mp3');
    game.load.audio('glass', 'assets/glass.m4a');
}

function create() {
    game.physics.startSystem(Phaser.Physics.ARCADE);

    // a bigger world
    game.world.setBounds(0, 0, constants.worldWidth, constants.worldHeight);

    var sky = game.add.sprite(0, 0, 'sky');
    sky.fixedToCamera = true;

    music = game.add.audio('soundtrack');
    music.play();

    glass = game.add.audio('glass');

    platforms = game.add.group();
    platforms.enableBody = true;

    //  Scale it to fit the width of the game
    // (the original sprite is 400x32 in size)
    // ground.scale.setTo(2, 2);
    groundHeight = constants.gameHeight - game.cache.getImage("ground").height; 
    plantHeight = constants.gameHeight - game.cache.getImage("ground").height + 30; 
    
    // offset of 30 so that it falls into the grass.
    game.add.image(0, plantHeight - game.cache.getImage("castle").height, 'castle');

    trees = game.add.group();

    fruits = game.add.group();
    fruits.enableBody = true;

    treeHeight = plantHeight - game.cache.getImage("tree").height
    for (var i = 0; i < 3; i++) {
       if (i == 0) {
          fruits.create(625+(i*300), treeHeight+20, 'fruit');
          fruits.create(650+(i*300), treeHeight+30, 'fruit');
       }
       fruits.create(600+(i*300), treeHeight+65, 'fruit');
       fruits.create(750+(i*300), treeHeight+85, 'fruit');
       fruits.create(700+(i*300), treeHeight+85, 'fruit');
       fruits.create(750+(i*300), treeHeight+65, 'fruit');
       trees.create(600+(i*300), treeHeight, 'tree');
    }

    npcs = game.add.group();
    npcs.enableBody = true;
    var queen = npcs.create(game.cache.getImage("castle").width + 10, groundHeight - game.cache.getImage("queen").height + 5, 'queen');
    queen.body.immovable = true;

    // draw the ground last.
    for (var i = 0; i < 5; i++) {
        var ground = platforms.create(i * game.cache.getImage("ground").width, groundHeight, 'ground');
        ground.body.immovable = true;
    }

    // The player and its settings
    // 600?
    player = game.add.sprite(trees.children[0].x - game.cache.getImage("rosy").width - 30, 0, 'rosy');

    //  We need to enable physics on the player
    game.physics.arcade.enable(player);
    // how fast does she fall to the ground & bounce.
    player.body.bounce.y = 0.2;
    player.body.gravity.y = 300;
    player.body.collideWorldBounds = true;

    //  Our two animations, walking left and right.
    // player.animations.add('left', [0, 1, 2, 3], 10, true);
    // player.animations.add('right', [5, 6, 7, 8], 10, true);
    scoreText = game.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
    scoreText.fixedToCamera = true;

    //  Our controls.
    cursors = game.input.keyboard.createCursorKeys();
}
