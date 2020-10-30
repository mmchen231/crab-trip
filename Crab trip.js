let  myweather;
let g = 255;
let b = 0;
let mycrab = [];
let mymist = [];
let cleared = false;
let crabdisplay = true;
let newposition = false;
let snowflake = [];
let background_snow = [];
let xoff_noise = 0;
let yoff_noise = 0;
let buildcounter = 0;
let stopshake = false;
let buildtrig1,buildtrig2,buildtrig3,buildtrig4 = false;
let iteration = 0;
let yoff = 0;
let timeOfLastSwitch = 0;
let switchInterval = 100;
let sunlight_inner = [];
let sunlight_outer = [];
let sunlight_array = [];
let Clouds = [];
let timer = 0;
let drawcrab = true;
let count = 0;
let createnew_crab = true;
let arrived = false;
let c = 29;
let r =22;
let H = 0;
let myraindrop = [];



function preload(){
	snowflake1 = loadImage('/05-data/flake2.png');
	snowflake2 = loadImage('/05-data/flake4.png');
	snowflake3 = loadImage('/05-data/flake6.png');
	snowman = loadImage('/05-data/snowman.png');
	snowmanbody = loadImage('/05-data/body.png');
	snowball = loadImage('/05-data/snowball.png')
}

function drawbeach(){
	noStroke();
	fill(250,240,180);
 	beginShape();
  	vertex(0,600);
  	for(x = 0;x<width;x++){
  		yoff = yoff + 0.00001;
  		let ypos = noise(yoff)*100;
  		vertex(x,200+ypos);
  	}
  	vertex(960,600);
  	endShape();
}

function setup(){
	 createCanvas(960,600);
	 background(201,241,245,200);
  
  //crab
	   for (let i=0; i<16;i++){
	  		mycrab[i] = new crab(int(random(50,860)),int(random(400,550)), int(random(20,50)),int(random(20,50)),
	  		color(int(random(90,255)),int(random(90,255)),int(random(90,255))),
			color(int(random(110,240)),int(random(110,240)),int(random(110,240))),0);
		}

	//mist
		for(let i=0;i<100;i++){
			mymist[i] = new mist();
		}

	// rain
	
	 for (let i = 0; i < 300; i++) {
	 	myraindrop[i] = new raindrop();
	 }
      //umbrella
        //raincrab
        raincrab = new crab (480, 560,70, 60,[232, 223,29],[22,212,220],0);
  
  //umbrella
   		myumbrella = new umbrella(480,470);
  

	//mistcrab
	
		/*mistcrab = new crab (250, 550,70, 60,[232, 223, c],[r,212 ,220 ],H);
		
		c = map (mouseY, 0, 960, 255,0);
		r = map (mouseX, 0, 960, 255,0);
		
		H = map (mouseX, 0, 960, 255,0);
		*/
		



		//snowflake
		snowflake_sample = [snowflake1,snowflake2,snowflake3];
		for(let i=0;i<30;i++){
			let j = int(random(0,3));
			snowflake[i] = new snow(snowflake_sample[j]);
		}

		//backgroundsnow
		for(let i=0;i<100;i++){
			background_snow[i] = new backgroundsnow();
		}

	//snoecrab
		snowcrab = new crab (480, 560,70, 60,[232, 223,29],[22,212,220],0);

		//beach
		drawbeach();

	//cloud
	Clouds.push(new cloud());

	/*
	for (i = 0; i < 21; i++) {
    	r1 = 100;
    	r2 = 180;
    
    	let x1 = (r1)*cos((i+20)*2*PI/40);
    	let y1 = (r1)*sin((i+20)*2*PI/40);
    	let x2 = (r2)*cos((i+20)*2*PI/40);
    	let y2 = (r2)*sin((i+20)*2*PI/40);
    	sunlight_inner[i] = [x1,y1];
    	sunlight_outer[i] = [x2,y2];
	}
	//sunlight
	for(i = 0; i < sunlight_inner.length;i+=2){
		sunlight_array[i] = new sunlight(i,sunlight_inner,sunlight_outer);
	}
	*/

	  
//use input/button function
	  input = createInput();
	  input.position(20, 45);

	  button = createButton('Go');
	  button.position(input.x + input.width, 45);
	  button.mousePressed(greet);
	  
	  greeting = createElement('h2', 'Hermit Crab, where you want to go?');
	  greeting.position(20, 5);
	  greeting.style('font-size','15px');
	  greeting.style('color','#191919');
}     

function greet() {
	cleared = false;
	buildcounter = 0;
	buildtrig1,buildtrig2,buildtrig3,buildtrig4 = false;
  	const zip = input.value();
  	greeting.html('you are in ' + zip);

  	let url =
  	'http://api.openweathermap.org/data/2.5/weather?zip='+zip +'&appid=14926d49beb9177ea27488f46f78c3bf';


    httpGet(url,'json',myCallback);
       
}


function draw(){

  //crab display
  if(crabdisplay == true){
  	background(201,241,245,200);
  	drawbeach();
  	for (let i=0; i < mycrab.length;i++){
  		mycrab[i].display();
  		mycrab[i].move();
 	}
 	/*mistcrab = new crab (250, 550,70, 60,[232, 223, c],[r,212 ,220 ],H);
		
		c = map (mouseY, 0, 960, 255,0);
		r = map (mouseX, 0, 960, 255,0);
        H = map (mouseX, 0, 960, 255,0);
       */
        

  }

  cloudday(myweather);
  mistday(myweather);
  clearday(myweather);
  snowday(myweather);
  rainday(myweather);

} 

function cloudday(weather){
	if(weather == "Clouds"){
  		crabdisplay = false;
  	if(cleared == false){
  		clear();
  		cleared = true;
  	}
  	background(201,241,245,200);
  	  timer ++;
  	if (timer > random(100, 450)){
    	Clouds.push(new cloud());
    	timer = 0;
 	}
 	//console.log(Clouds);
  	for(i = 0;i<Clouds.length;i++){
  		Clouds[i].display();
  		Clouds[i].move();
  		if(Clouds[i].nolife == true){
  			Clouds.shift();
  		}
  	}

  	//jump
  	if(Clouds.length > 2){
  		let crabpos1 = Clouds[count].xyvalue();
  		let crabpos2 = Clouds[count+1].xyvalue();
  		//console.log(Clouds[count+1].xyvalue());
  		if(createnew_crab == true){
  			
  			cloudcrab = new cloud_crab(crabpos1[0]-50,crabpos1[1]-50,70, 60,[232, 223,29],[22,212,220],0,arrived);
  			createnew_crab = false;
  		}
  		cloudcrab.display();
  		cloudcrab.jump(crabpos2[0]-50,crabpos2[1]-50);
  		arrived = cloudcrab.arrive();
  		if(arrived == true){
  			count += 1;
  			arrived = false;
  		}
  		if(count > Clouds.length){
  			count -= 1;
  		}
  	}
  }
}

function mistday(weather){
	if(weather == "Mist"|| weather == "Fog"|| weather == "Haze"){
  	crabdisplay = false;
  	if(cleared == false){
  		clear();
  		cleared = true;
  	}
  	/*for (let i=0; i < mycrab.length;i++){
  		mycrab.display();
  		mycrab[i].move();
  	}*/
  	for(let i = 0;i < mymist.length;i++){
  		mymist[i].draw();
  		mymist[i].changeangle();
  		mymist[i].update();
  	}
// mistcrab.display();


   }
}
function clearday(weather){
	if(weather == "Clear"){
  	crabdisplay = false;
  	if(cleared == false){
  		clear();
  		cleared = true;
  	}
  	//background(255)
  	rectMode(CORNER);
  	noStroke();
  	fill(250,240,180);
  	rect(0,350,960,250);
  	fill(201,241,245,200);
  	rect(0,200,960,150);
  	noStroke();
	fill(250,160,60);
	arc(480, 200, 180, 160, PI, TWO_PI);
	for (i = 0; i < 11; i++) {
    	r1 = 100;
    	r2 = 180;
    
    	let x1 = (r1)*cos((i+10)*2*PI/20);
    	let y1 = (r1)*sin((i+10)*2*PI/20);
    	let x2 = (r2)*cos((i+10)*2*PI/20);
    	let y2 = (r2)*sin((i+10)*2*PI/20);
    	strokeWeight(4);
		stroke(250,160,60);
		line(x1+480,y1+200,x2+480,y2+200);
		}
	snowcrab.display();
	snowcrab.sunglass();
	snowcrab.sunglassmove();
	}
}

function rainday(weather){
	if(weather == "Rain" || weather == "Drizzle"){
		crabdisplay = false;
		if (cleared == false){
   			clear();
   			cleared = true;
   		}
 	background(90,90,90);
 	for (let i = 0; i < 300; i++) {
   		myraindrop[i].display();
   		myraindrop[i].move(mouseX,mouseY);
    }
  	raincrab.display();
  	raincrab.rain();
  	myumbrella.display();
  	myumbrella.move(mouseX,mouseY);
	}
}
	
		 
	
		

function snowday(weather){
	if(weather == "Snow"){
  	crabdisplay = false;
  	if(cleared == false){
  		clear();
  		cleared = true;
  	}
  	background(90,90,90);
  	snowcrab.display();
  	if(stopshake == false){
  		snowcrab.shake();
  	}
  	for(let i=0;i<30;i++){
		snowflake[i].display();
		snowflake[i].move();
		if(snowflake[i].isHit() == true){
			buildcounter += 1;
		}
	}
	for(let i=0;i<100;i++){
		background_snow[i].display();
		background_snow[i].move();
	}
	imageMode(CENTER);
	buildstatus(buildcounter);
	console.log(buildcounter);
	if(buildtrig1 == true){
		noStroke();
   		fill(255);
   		ellipse(510,560,120,100);
	}
	if(buildtrig2 == true){
		image(snowball,510,510,250,200);
	}
	if(buildtrig3 == true){
		image(snowmanbody,510,340,300,220);
	}
	if(buildtrig4 == true){
   		image(snowman,500,230,130,130);
	}
  }
}

function buildstatus(counter){
	if(counter == 40){
		buildtrig1 = true;
		stopshake = true;
	}
	if(counter == 90){
		buildtrig2 = true;
	}
	if(counter == 150){
		buildtrig3 = true;
	}
	if(counter == 210){
		buildtrig4 = true;
	}
}


function myCallback(result){

  console.log(result);
	console.log(typeof result);
	myweather=result.weather[0].main;
	console.log(myweather);
}


class crab {
  constructor(tempX, tempY, temph, templ, color,tempc,tc) {
  
    this.x = tempX;
    //this.prex = tempX;
    this.y = tempY;
    this.c = color;
    this.l = templ;
    this.h = temph;
    this.strokeWeight = 4;
    this.strokec = tempc;
    this.speed = int(random(1,3));
    this.tc = tc 


    //mist
    this.yoff = -1;
    this.counter = 0;
    this.earse = true;

    this.sunglassx = 0;
    this.speed_sun = 4;

    this.rainspeed = 5;
  }
  
  display(){
  	  
	push();
    fill(this.c);
    strokeWeight(this.strokeWeight);
    stroke(this.tc);

    triangle(this.x, this.y, this.x + (0.5 * this.l), this.y-this.h, this.x + this.l, this.y);
    pop();

    
    push();
    stroke (this.strokec);

    line (this.x + (1/8 * this.l), this.y, this.x -(1/4 * this.l), this.y + (1/4 * this.h));
    line (this.x - (1/4 * this.l), this.y + (1/4 * this.h), this.x + (1/8 * this.l), this.y + (1/2 * this.h));
    line (this.x + (1/4 * this.l), this.y, this.x -(1/8 * this.l), this.y + (1/4 * this.h));
    line (this.x - (1/8 * this.l), this.y + (1/4 * this.h), this.x + (1/4 * this.l), this.y + (1/2 * this.h));

    line (this.x + (7/8 * this.l), this.y, this.x +(5/4 * this.l), this.y + (1/4 * this.h));
    line (this.x + (5/4 * this.l), this.y + (1/4 * this.h), this.x + (7/8 * this.l), this.y + (1/2 * this.h));
    line (this.x + (3/4 * this.l), this.y, this.x +(9/8 * this.l), this.y + (1/4 * this.h));
    line (this.x + (9/8 * this.l), this.y + (1/4 * this.h), this.x + (3/4 * this.l), this.y + (1/2 * this.h));

    pop();

    fill (255);
    noStroke();
    circle(this.x + (1/3 * this.l), this.y, 1/5 * this.l);
    circle(this.x + (2/3 * this.l), this.y, 1/5 * this.l);

    fill (0);
    noStroke();
    circle(this.x + (1/3 * this.l), this.y, 1/8 * this.l);
    circle(this.x + (2/3 * this.l), this.y, 1/8 * this.l);
   }

   move(){
   	this.x -= this.speed;
   	cleared = false;
   	if (this.x + this.l< 0){
      this.x = 960;
    }
   }

   shake(){
   	this.x += random(-1,1);
   }

   	sunglass(){
	   	rectMode(CENTER);
	   	stroke(255);
	   	fill(0);
	   	rect(this.sunglassx+(1/3 * this.l),this.y,1/4 * this.l);
	   	rect(this.sunglassx+(2/3 * this.l),this.y,1/4 * this.l);
   }
   sunglassmove(){
	   	this.sunglassx = this.sunglassx + this.speed_sun;
	   	if(this.sunglassx == this.x){
	   		this.speed_sun = 0
	   
	   	}
	}
   rain(){
    if(this.x < 100){
      this.rainspeed = 5;
    }
    if(this.x > 800){
      this.rainspeed = -5;
    }
    if(this.x == int(random(200,700))){
       this.rainspeed = -this.rainspeed;
    }
    this.x += this.rainspeed;
  }
}	



class raindrop{
 constructor(){

  this.x = random (0,960);
  this.y = random (0,600);
  this.length = 15;
  this.r = 3
  
  this. speed = 6;

 }

 display(){
  noStroke();
    fill(180,60);
    ellipse(this.x, this.y, this.r, this.length);
    
    }
//nextxy is Mouse X and Y, when raindrop near the umbrella, make raindrop out of the frame and can drop again
 move(nextx,nexty){
      this.y += this. speed;
      if (this.y > 600) {
        this.y = random(-100,-10);
      }
      if(this.y > nexty && (this.x < nextx + 50 && this.x > nextx - 50)){
        
        this.y = random(-100,-10);
      }
  }
}




class  mist{
	constructor(){
		this.x = random(width);
		this.y = random(height);
		this.angle = random(TWO_PI);
		let rn = random(100,255);
		this.clr = color(rn,rn,rn,5);
	}

	draw(){
		let px = this.x;
		let py = this.y;
		let r = 50;
		let u = random(0.425, 1);

		fill(this.clr);
		noStroke();
		beginShape();
		for (let i= 0; i < TWO_PI; i += PI / 180) {
			vertex(px, py);
			px = this.x + r * cos(this.angle + i) * u;
			py = this.y + r * sin(this.angle + i) * u;
			r += sin(i * random(0.25, 2));
		}
		endShape();
	}

	changeangle(){
		if (this.x < 0 || this.x > width || this.y < 0 || this.y > height) {
			this.angle += HALF_PI;
		}
	}

	update(){
		this.x += 2 * cos(this.angle);
		this.y += 2 * sin(this.angle);
		this.angle += random(-0.15, 0.15);
	}
}

class snow{
	constructor(imageinput){
		this.x = random(0,1200);
		this.y = random(-300,-10);


		xoff_noise = xoff_noise + 0.1;
		let xoff_final = noise(xoff_noise)*-1;
		yoff_noise = yoff_noise + 0.01;
		let yoff_final = noise(yoff_noise)*6;
		this.xoff = xoff_final;
		this.yoff = yoff_final;

		this.w = random(10,40);
		//this.l = random(20,60);

		this.image = imageinput;

		this.hit = false;
	}

	display(){
		image(this.image,this.x,this.y,this.w,this.w);
	}

	move(){
		this.hit = false;
		this.x += this.xoff;
		this.y += this.yoff;
		//make sure when snow out of the frame, it can start over
		if(this.y + this.w > 600){
			this.y = random(-200,-10);
			this.hit = true;
		}
		if(this.x + this.w < 0){
			this.x = random(0,1200);
			this.y = random(-200,-10);
		}
	}

	isHit(){
		return this.hit;
	}
}

class backgroundsnow{
	constructor(){
		this.x = random(0,1200);
		this.y = random(-200,-10);

		xoff_noise = xoff_noise + 0.1;
		let xoff_final1 = noise(xoff_noise)*-1;
		yoff_noise = yoff_noise + 0.01;
		let yoff_final1 = noise(yoff_noise)*2;
		this.xoff_background = xoff_final1;
		this.yoff_background = yoff_final1;
	}

	display(){
		stroke(255);
		strokeWeight(4);
		point(this.x,this.y);
	}

	move(){
		this.x += this.xoff_background;
		this.y += this.yoff_background;
		//make sure when snow out of the frame, it can start over

		if(this.y > 600){
			this.y = random(-200,-10);
		}
		if(this.x < 0){
			this.x = random(0,1200);
			this.y = random(-200,-10);
		}
	}
}

class cloud {
  constructor() {
  	//cloud
  	this.nolife = false;
    this.sidenumber = random(7, 20);
    this.size = 50;
    this.side = [];
    this.x = 1000;
    this.xspeed = 2;
    this.y = random(200, 400);
    for (let i = 0; i < this.sidenumber; i++) {       
    	this.side[i] = [random((this.size / 2) * -1, (this.size / 2)),random((this.size / 4) * -1, (this.size / 4)),this.size * random(0.7, 1)];
      }
  }

  display() {
    noStroke();
    fill(255);
    ellipse(this.x, this.y, this.size);
    for (let i = 0; i < this.side.length; i++) {
    	ellipse(this.x+this.side[i][0],this.y+this.side[i][1],this.side[i][2]);
    }
  }

  move(){
  	this.x -= this.xspeed;
  	//no life is for if cloud disapear in the frame, delete the cloud
  	if(this.x < -100){
      this.nolife = true;
  	}
  }

  nolife(){
  	return this.nolife;
  }

  xyvalue(){
  	return[this.x,this.y];
  }
}

class cloud_crab extends crab{
	constructor(tempX, tempY, temph, templ, color, tempc,tc,arrived){
		super(tempX, tempY, temph, templ, color,tempc,tc);
		this.arrived = arrived;
	}
//nextx and nexty is the x y of cloud, I get this used array, see this in the clouday
	jump(nextx,nexty){
		this.nextx = nextx;
		this.nexty = nexty;
		// make it jump is basically same as make it move, just need to know the speed, the speed can be caculated by 
		// use the value of x and nextx, y and nexty of clouds.
		let xspeed = (this.x - this.nextx)/20;
		let yspeed = (this.y - this.nexty)/20;
		this.x -= xspeed;
		this.y -= yspeed;
		if(this.x == this.nextx && this.y == this.nexty){
			this.arrived = true;
		}
	}

	arrive(){
		return this.arrived;
	}
}

class umbrella{
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 3;
    this.c = color(200, 255, 80);
  }
  display() {
    fill(this.c);

    rect(this.x, this.y - 10, 4, 70);
    fill(0);
    noStroke();
    fill(63, 247, 247);
    arc(this.x, this.y, 90, 30, PI, TWO_PI);
  }
  // nextx, nexty mouseX and Y
  move(nextx,nexty){
    this.x = nextx;
    this.y = nexty;
  }

  }