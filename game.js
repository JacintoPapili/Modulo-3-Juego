var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 600 },
            debug: false
        }
    },
    scene: [Scene1, Scene2 ]
};

var game = new Phaser.Game(config);

var score;
var gameOver;

var player;
var stars;
var stars1;
var bombs;
var C4;
var platforms;
var cursors;
var scoreText;
var textreset;
