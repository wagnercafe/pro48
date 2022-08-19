var bg,bgImg;
var player, shooterImg, shooter_shooting;
var zombie,zombieGroup
var zombieImage
var balasGroups
var vidas=3 
var gameState  ='jogar'  
var perdeumusic
var munisao=70
var score=0
function preload(){
  bgImg=loadImage("assets/bg.jpeg")
  shooterImg=loadImage("assets/shooter_2.png")
  shooter_shooting=loadImage("assets/shooter_3.png")
  zombieImage=loadImage("assets/zombie.png")
  perdeumusic=loadSound("assets/lose.mp3")
}

function setup() {

  
  createCanvas(windowWidth,windowHeight);
zombieGroup=new Group ()
balasGroups=new Group ()

  //adicionando a imagem de fundo
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
  bg.addImage(bgImg)

  //criando o sprite do jogador
  player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
player.addImage(shooterImg)
player.scale=0.3
}

function draw() {
  background(0); 
if (gameState=='jogar'){
 //movendo o jogador para cima e para baixo e tornando o jogo compatível com dispositivos móveis usando toques
  if(keyDown("UP_ARROW")||touches.length>0){
    player.y = player.y-30
  }
  if(keyDown("DOWN_ARROW")||touches.length>0){
    player.y = player.y+ 30
  }

  //solte balas e mude a imagem do atirador para a posição de tiro quando a tecla de espaço for pressionada
  if(keyWentDown("space")){
    player.addImage(shooter_shooting)
     var bala=createSprite(displayWidth-1150,player.y-30,20,10)
     bala.velocityX=20
     munisao = munisao-1
     balasGroups.add(bala)
  }
  //o jogador volta à imagem original quando pararmos de pressionar a barra de espaço
  if(keyWentUp("space")){
    player.addImage(shooterImg)
     
  }
player.overlap(zombieGroup,function(collector,collected){
  collected.remove()
  vidas=vidas-1
})
balasGroups.overlap(zombieGroup,function(collector,collected){
  collected.remove()
  collector.remove()
  score=score+5
})
spawnZombie()

if(vidas==0){ gameState='perdeu';perdeumusic.play()}
}
if(munisao==0){gameState='perdeu';perdeumusic.play()}
if (score==100){gameState='ganhou'}
  drawSprites();
  textSize(20)
  fill("white")
  text("vidas "+vidas,  1000,50)
  text("munisao "+munisao,  1000,80)
  text("score "+score,  1000,110)
if(gameState=='perdeu'){
  textSize(100)
  fill('red') 
  zombieGroup.destroyEach()
  text('you die',400,400)
}else if(gameState=='ganhou'){
  textSize(100)
  fill('green') 
  zombieGroup.destroyEach()
  text('you victory ',400,400)
}
}
function spawnZombie() {
  //escreva o código aqui para gerar as nuvens
  if (frameCount % 50 === 0) {
    zombie = createSprite(600,100,40,10);
    zombie.y = Math.round(random(100,500));
    zombie.x = Math.round(random(500,1100));

    zombie.addImage(zombieImage);
    zombie.scale = 0.15;
    zombie.velocityX = -3;
    
     //atribuir tempo de vida à variável
     zombie.lifetime = 400;
  
    
    
    
    //adicionando nuvem ao grupo
   zombieGroup.add(zombie);
    }
}