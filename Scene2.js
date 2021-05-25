class Scene2 extends Phaser.Scene {
    constructor() {
      super('juego');
    }

    create ()
    {
        //  fondo
        this.add.image(400, 300, 'sky');

       //grupo de plataformas
        platforms = this.physics.add.staticGroup();

       
        platforms.create(400, 568, 'ground').setScale(3).refreshBody();

        //  plataformas
        platforms.create(600, 450, 'ground');
        platforms.create(140, 390, 'ground');
        platforms.create(750, 250, 'ground');
        platforms.create(350, 300, 'ground1');
        platforms.create(80, 230, 'ground1');
        platforms.create(380, 170, 'ground1');
        //platforms.create(700, 90, 'ground1');
       // platforms.create(200, 80, "ground1")

        // config personaje
        player = this.physics.add.sprite(100, 450, 'dude');

        //  fisicas del player
        player.setBounce(0.2);
        player.setCollideWorldBounds(true);
        

        //  eventos
        if (cursors =! undefined){
            cursors = this.input.keyboard.createCursorKeys();
        }
            

        //  estrellas
        stars = this.physics.add.group({
            key: 'star',
            repeat: 11,
            setXY: { x: 12, y: 0, stepX: 200 }
        });

        stars.children.iterate(function (child) {
            var x= Phaser.Math.Between(0,800)
            var y= Phaser.Math.Between(0,600)
          
            child.setBounceY(x)
            child.setBounce(y);
            child.setCollideWorldBounds(true)
            child.setVelocity(Phaser.Math.Between(-600, 600), 20);
            child.allowGravity = false;
            child.setBounce(1)

        });
        stars1 = this.physics.add.group({
            key: 'star1',
            repeat: 4,
            setXY: { x: 30, y: 6, stepX: 300 }
        });
        stars1.children.iterate(function (child) {
            var x= Phaser.Math.Between(0,800)
            var y= Phaser.Math.Between(0,600)
          
            child.setBounceY(x)
            child.setBounce(y)
            child.setCollideWorldBounds(true)
            child.setVelocity(Phaser.Math.Between(-600, 600), 20);
            child.allowGravity = false;
            child.setBounce(1)
        });        

        //bombas
        bombs = this.physics.add.group();
        C4= this.physics.add.group();

        //texto de puntaje
        scoreText = this.add.text(300, 5, 'Score: 0', { fontFamily: 'Comic Sans',fontSize: '24px', fill: '#EBED24' });


        //colisiones
        this.physics.add.collider(player, platforms);
        this.physics.add.collider(stars, platforms);
        this.physics.add.collider(stars1, platforms);
        this.physics.add.collider(bombs, platforms);
        this.physics.add.collider(C4, platforms);
        this.physics.add.collider(stars1,  stars1);
        this.physics.add.collider(stars1,  stars);
        this.physics.add.collider(stars,  stars);

        //agarrar estrellas
        this.physics.add.overlap(player, stars, this.collectStar, null, this);
        this.physics.add.overlap(player, stars1, this.collectStar1, null, this);

        //colision con las bombas
        this.physics.add.collider(player, bombs, this.hitBomb, null, this);
        this.physics.add.collider(player,C4, this.hitC4, null, this);

        
        score = 0;
        gameOver = false;

        
        


    }

    update ()
    {
        if (gameOver)
        {       
            return
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

        if (cursors.up.isDown && player.body.touching.down){
            player.setVelocityY(-330);
        }
    }

    collectStar (player, star)
    {
        star.disableBody(true, true);

        //  puntaje
        score += 10;
        scoreText.setText('Score: ' + score);

        if (stars.countActive(true) === 0)
        {
            // generacion de estrellas
            stars.children.iterate(function (child) {

                child.enableBody(true, child.x, 0, true, true);

            });

            var x
            if (player.x < 400){
                Phaser.Math.Between(400, 800)
            }
            else {
                Phaser.Math.Between(0, 400)  
            }

            var bomb = bombs.create(x, 16, 'bomb');
            bomb.setBounce(1);
            bomb.setCollideWorldBounds(true);
            bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
            bomb.allowGravity = false;
            
             
            
          
        }
    }

      collectStar1(player, star1) {
            
            
        star1.disableBody(true, true);

    
     score += 15;
     scoreText.setText('Score: ' + score);
   
    if (stars1.countActive(true) === 0 ) {
        
        stars1.children.iterate(function (child) {

            child.enableBody(true, child.x, 0, true, true);

             });


                 
             var x= Phaser.Math.Between(0,800)
             var y= Phaser.Math.Between(0,600)
             var c4 = C4.create(x, y, 'c4');
             c4.setBounce(0.1);
             c4.setCollideWorldBounds(true);
             //bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
             c4.allowGravity = true;
             
          }
    }

   
    
    hitBomb (player, bomb)
    {
        this.gameOver()
    }

    hitC4(player, c4)
    {
        this.gameOver()
    }
    gameOver() {        
        gameOver = true;
        this.physics.pause();

        player.setTint(0xff0000);

        player.anims.play('turn');        

        var gameOverButton = this.add.text(700, 500, 'Game Over', { fontFamily: 'Arial', fontSize: 70, color: '#ff0000' })
        .setInteractive()
        .on('pointerdown', () => this.scene.start('juego'));
        Phaser.Display.Align.In.Center(gameOverButton, this.add.zone(400, 300, 800, 600));
        textreset = this.add.text(400,400, "click to reset", { fontFamily: 'Arial', fontSize: 30, color: '#ff0000'});
    }
    
    



}