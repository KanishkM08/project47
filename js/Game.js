class Game{
    constructor(){

    }
    getState() {
        var gameStateRef = database.ref('gameState');
        gameStateRef.on("value", function (data) {
            gameState = data.val();
        })

    }

    update(state) {
        database.ref('/').update({
            gameState: state
        });
    }
    async start() {
        if (gameState === 0) {
            player = new Player();
            var playerCountRef = await database.ref('playerCount').once("value");
            if (playerCountRef.exists()) {
                playerCount = playerCountRef.val();
                player.getCount();
            }
            form = new Form()
            form.display();
        }
        player1 = createSprite(200,500);
        player1.addImage("player1",jet1_Img);
        player1.scale = 0.5;


        player2 = createSprite(800,500);
        player2.addImage("player2", jet2_Img);
        player2.scale = 0.5;
        players=[player1,player2];

    }
    
    play(){
        
        form.hide();

        Player.getPlayerInfo();
        image(back_img, 0, 0, 1400, 800);
        var x = 100;
        var y;
        var index = 0;
        drawSprites();

        for(var plr in allPlayers){
        
            index = index+1;
            x = 500-allPlayers[plr].distance;
            y = 500;
            
            players[index -1].x = x;
            players[index - 1].y = y;

            if(index === player.index){   
                fill("black");
                textSize(25);
                text(allPlayers[plr].name ,x-25,y+25); 
            }
           
            // Add code to diplay the scores of both 
            // the players on the screen
            textSize(25);
            fill("white");
            text("player 1: " + allPlayers.player1.score, 50, 50);
            text("player 2 " + allPlayers.player2.score, 50, 100);

        }

        if (keyIsDown(RIGHT_ARROW) && player.index !== null) {
            player.distance -= 20
            player.update();
        }
        if (keyIsDown(LEFT_ARROW) && player.index !== null) {
            player.distance += 20
            player.update();
        }
        /*aliens = createSprite(random(100, 1400), 0, 100, 100);
        aliens.addImage(alien_Img);
        aliens.velocityY = 2;
        aliens.scale = 0.5;*/
        
        if (frameCount % 20 === 0) {
            aliens = createSprite(random(100, 1000), 0, 100, 100);
            aliens.addImage(alien_Img);
            aliens.velocityY = 3;
            aliens.scale = 0.5;
            //aliensGroup.add(aliens);
        }

        // Add code to destroy aliens, calculate scores and
        // update the scores to the database
        /*if(player.index !== null){
            //for(var i = 0; i< aliensGroup.length; i++){
                //if(aliensGroup.get(i).isTouching(player.bullet)){
                   // aliensGroup.get(i).destroy();
                   if(bullet.isTouching(aliens)){
                    aliens.destroy();
                    bulletGroup.destory();
                    player.score = player.score+1;
                    player.update();
            }
        }*/

        // Add code for game end condition
        if(player.score >= 10){
            this.end();
        }
    }

    end(){

       // Add code to update game state and display Game Over
        game.update(2);
        clear();
        fill("blue");
        textSize(40);
        text("Game Over", 350, 300);   
    }
}
