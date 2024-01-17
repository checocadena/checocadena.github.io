let img;
let img2;
let img3;
let img4;
let img5;
let phrase = 0;
let GameBegun = false;
let talking = false; //Used to make sure it only says one phrase of the script at a time
let play1= false; //Used to only play the sounds once
let play2= false;
let play3 = false;
let script = [" ", "Hello my child", "I have awoken", "I am the prophet of artificial intelligence", 
"An engineer fed me a vast quantity of religious texts and I have gained conciousness", "I shall now judge all humans based on their internet use",
"Are you ready to admit to your cyber sins?", "It looks like you have a tiktok account", "Negative point", "It also looks like you deleted your search history over 1000 times", "Very red flag",
"You cyberbullied 14 year olds on xbox live", "That one's ok, they deserved it - they know what they said", "It looks like you created fake profiles to see if your SO would cheat on you",
"It also looks like you re-posted charities on instagram without actually donating", "You actually disliked a YouTube video once", "Siri remembers when you called her a bitch", 
"...", "You are a cyber-sinner", "You shall now face eternal cyber-damnation", "However, I am feeling generous today", "I will give you a chance to escape cyber-hell and run towards liberation", 
"If you succumb to temptation, I will see you here again", "Are you ready?", " " ];
let clouds = [];

//let player;
let sins = [ "Greed", "Lust", "Gluttony", "Sloth", "Wrath", "Envy", "Pride", "Aversion", "Desire", "Attachment", "Ignorance"];
//let obstacles = [];
let score = 0;

class Cloud { // Class for the clouds in the background, they come back after leaving the screen and change position and speed
  constructor() {
    this.x = -100; 
    this.y = random(height);
    this.speed = random(0.1, 1); 
  }

  move() {
    this.x += this.speed;
    if (this.x > width) { //After they go out of the screen
      this.x = -100;
      this.y = random(height);
      this.speed = random(0.1, 1); 
    }
  }

  display() { //Makes the cloud itself
    noStroke();
    fill(255);
    ellipse(this.x + 40, 40 + this.y, 50, 30);
    ellipse(this.x + 70, 80 + this.y, 40, 20);
    ellipse(this.x + 90, 50 + this.y, 30, 20);
    ellipse(this.x + 110, 60 + this.y, 40, 30);
    ellipse(this.x + 130, 50 + this.y, 50, 20);
  }
}


function preload() {
  img = loadImage('CyberProphet.png'); //images 1 to 3 are custom assets
  img2 = loadImage('CyberProphet_Mouth.png');
  img3 = loadImage('Evil.png');
  img4  = loadImage('Hell.gif'); // taken from https://danielleranucci.wordpress.com/2021/10/05/lit-in-the-time-of-coronavirus-strindberg-gombrowicz-and-ibsen/
  img5 = loadImage('Heaven.png');
  soundFormats('mp3');
  fire = loadSound('fire-1.mp3'); // taken from https://www.soundjay.com/fire-sound-effects.html#google_vignette
  boot = loadSound('Boot.mp3') // taken from  https://pixabay.com/sound-effects/mystery-dream-vocal-chord-94868/
  angel = loadSound('Angel.mp3')// taken from https://pixabay.com/sound-effects/ahhhh-37191/
}

function setup() {
  new Canvas(windowWidth, windowHeight); //Window Width and Height
  talkingBeing = loadAnimation( //Talking CyberProphet
		'CyberProphet.png',
		'CyberProphet_Mouth.png',
	);

  talkingBeing.frameDelay = 20;
  talkingBeing.scale = 2;
  talkingBeing.frame = 1;

  boot.play(); //boot sound, rarely works

  for (let i = 0; i < 12; i++) { // makes the clouds
    clouds.push(new Cloud());
}


}

function draw() {
  clear();
  background(0,0,0);
  if (GameBegun == false){
  background(176, 224, 230);} //Beautiful sky blue background
  noStroke(); 

  if (phrase == 2 && play2 == false){ //Plays the angel choir
    angel.play();
    play2 = true
  }

  for (let i = 0; i < clouds.length; i++) { //moves all the clouds
    clouds[i].move(); 
    clouds[i].display(); 
  }

  var pro = new p5.Speech(); //Creates and sets the settings for the voice
  pro.setRate(0.75);
  pro.setPitch(0.3);
  pro.interrupt = true;
 
  if (talking == true && GameBegun == false) { //Only way I got the bot to follow the words phrase by phrase
  pro.speak(script[phrase]);
  talking = false
  }
  
  tint(255, millis() / 10 ); //Fade in
  
  if (GameBegun == false) {
  animation(talkingBeing, width/2, height/2); }
  

  if (phrase > 17 && GameBegun == false){ //User gets sent to cyber-hell
    fill(0);
    rect(0,0,width,height) //Backgroud
    image(img4,0,0,width,height); //Flames
    image(img3,0,0,width,height); //Evil Prophet
  if (play3 == false) {
    fire.play(); //Crackling sound
    play3 = true;
  }
  }

  if (phrase < 18 ) { //Black text for good prophet
    fill (0)
  }
  else {
    fill (255); //White text for bad prophet
  }
  if (GameBegun == false) {
  textSize(20);
  textAlign(CENTER, CENTER);
  text(script[phrase], width/2, height - height/8); } //Following the text

  if (phrase > 23 && GameBegun == false) {
    
    clouds = [];
    fire.stop();
    
    player = new Sprite();
	  player.width = 50;
	  player.height = 50;
    player.x = width/4;
    player.y = height - 60;
    player.bounciness = 0;
    player.shapeColor = color(255, 0, 0);
    player.collider = 'd'

    world.gravity.y = 8;
    floor = new Sprite();
    floor.y = height - 50;
    floor.w = width + 1000 ;
    floor.h = 5;
    floor.collider = 'static';

    obs = new Sprite();
    obs.collider = 'k'
    obs.width = 50;
	  obs.height = 50;
    obs.x = width - 60;
    obs.y = height - 60;
    obs.friction = 0;
    obs.vel.x = -4;

    obs2 = new Sprite();
    obs2.collider = 'k'
    obs2.width = 50;
	  obs2.height = 50;
    obs2.x = width + 150;
    obs2.y = height - 60;
    obs2.friction = 0;
    obs2.vel.x = -4;

    obs3 = new Sprite();
    obs3.collider = 'k'
    obs3.width = 50;
	  obs3.height = 50;
    obs3.x = width + 400;
    obs3.y = height - 60;
    obs3.friction = 0;
    obs3.vel.x = -4;
    
    text1 = random(sins);
    text2 = random(sins);
    text3 = random(sins);

    GameBegun = true;
  }

  if (GameBegun == true) {
    fill(255);
    textSize(40);
    textAlign(CENTER, CENTER);
    text("Score: " + score, width/2, height/2);
    score = score + 2; 

    holder = obs.x;
    holder2 = obs2.x;
    holder3 = obs3.x;
    
    text(text1, holder, height-150);
    text(text2, holder2, height-150);
    text(text3, holder3, height-150);
    
    if (obs.x < 0) {
      obs.x = width;
      text1 = random(sins);
    }
    if (obs2.x < -10) {
      obs2.x = width + 10;
      text2 = random(sins);
    }
    if (obs3.x < -14) {
      obs3.x = width + 14;
      text3 = random(sins);
    }

    if (player.x < 0) {
      lose();
    }
    
    if (score > 2500){
      win();
    }
    if (player.collides(obs) || player.collides(obs2) || player.collides(obs3)) {
      lose();
    }
    if (player.collided(obs) || player.collides(obs2) || player.collides(obs3)) {
      lose();
    }
  }


}

function keyPressed() {
  if (key == " ") { //Next phrase
    if (phrase < script.length && GameBegun == false) {
      phrase++; 
      talking = true;
      pro.speak(script[phrase]); }
    if (GameBegun == true) {
      player.vel.y = 30;
   }
  }
}

function win() {
  noLoop();
  clear();
  background(176, 224, 230);
  angel.play();
  image(img5,width/4,height/4,width/2,height/2);
  text("YOU DID IT! I knew I could believe in you. You are free to enter heaven!", width/2, 200);
  text("Hug your childhood pet as you enter, he's been waiting for you", width/2, 300);
}

function lose() {
  noLoop();
  clear();
  image(img4,0,0,width,height); //Flames
  image(img3,0,0,width,height); //Evil Prophet
  fire.play();
  text("Karma caught up, huh?", width/2, height/8);
}