// RED PRINTS
// 5th November, 2022
// Samuel Mui Shen Ern

// This generative data visualization art piece displays the number of journalist deaths worldwide from 1995 to 2021.
// Here, a mangled, interconnected jumble of humanitarian crises and conspiracies are slowly covered (instead of clarified) with bloodied fingerprint smears as the years progress. 
// Each smear corresponds in size and length to the number of journalists killed that year.
// As the sketch progresses, the smears serve to obscure and erase the ugly truth instead of serving to clarify them.
// Statistics taken from https://www.statista.com/statistics/266229/number-of-journalists-killed-since-1995/

// create array for JSON data
let myData = []; 

// create array of words associated with humanitarian issues
let myFacts = ["fast fashion", "black maria", "corruption", 
               "cronyism", "altantuyah", "#klusterMenteri", 
               "kleptocracy", "rohingya", "refugees",
               "embezzlement", "1MDB", "refugees",
               "displacement", "rexKL", "ughyurs",
               "drug trafficking", "human trafficking", "sex trafficking",
               "child marriage", "imperialism", "torture",
               "genocide", "poor labour conditions", "alt right",
               "lynching", "war", "USA intervention",
               "sexual abuse", "cover ups", "QANON",
               "war rape", "diamond mines", "economic crises",
               "racial discrimination", "neo nazis", "police brutality",
               "affirmative action", "corporate misconduct", "apocalypse",
               "erasure", "neoliberalism", "famine",
               "anglocentrism", "profit", "climate change",
               "centering of whiteness", "hate crimes", "hunger",
               "power", "oil", "nationhood", "reeducation camps",
               "theft", "wage gap", "inhumane working conditions"
              ]

// create array for brushstroke classes
let myBrush = [];

// create variables for timer
let yearClock, counter;


function preload() { // input data into myData array
  loadJSON('data.json', function(data) {
    myData = data;
  });
}

function setup() {
  createCanvas(600, 600);
  background(255);
  angleMode(RADIANS);
  rectMode(CENTER);
  textAlign(CENTER);

  yearClock = 0;
  counter = 0;

  // create rectangular frame 
  push();
  for (let w = width/10; w <= width - width/10; w += 3) {
    let opacity = random(100, 255);
    stroke(0, opacity);
    fill(0, opacity);
    circle(w, height/10, random(1, 5));
    circle(w, height-height/10, random(1, 5));
  }

  for (let h = height/10; h <= height - height/10; h += 3) {
    let opacity = random(100, 255);
    stroke(0, opacity);
    fill(0, opacity);
    circle(width/10, h, random(1, 5));
    circle(width- width/10, h, random(1, 5));
  }
  pop();

  // create messy pattern of words from the myFacts array
  for (let y = 0; y <= 500; y++) {
    push();
      translate(width/2, height/2);
      let xRandom = random(25, 250);
      let word = random(myFacts);
      rotate(random(0,100));

      push();
      translate(xRandom, 0);
        rotate(random(0,100));
        strokeWeight(0.3);
        textSize(10);
        text(word, 0, 0);
      pop();
    pop();
  }

  // create brush objects from statistics data and input into myBrush array. One brush object is created for every year.
  for (let i = 0; i < myData.length; i++) {
    let b = new brush(myData[i][1]);
    myBrush.push(b);
  }
}


function draw() {

  // draw and animate first brush in array
  myBrush[0].display();
  myBrush[0].move();

  // this timer initiates the next brush in the array once the last brush has finished animating
  // it does this by completely removing the current brush from the array
  // and "forcing" the above functions to draw and animate the next brush
  if (counter >= 150) {
    myBrush.splice(0, 1);
    yearClock++;
    counter = 0;
  }

  // Draw textbox and text for the years and number of journalists killed
  fill(0);
  rect(width/2 ,height - height/12, 150, 60);

  textSize(15);
  stroke(255);
  fill(255);
  textSize(20);
  text(myData[yearClock][0], width/2, height - height/11.5);

  textSize(15);
  text(myData[yearClock][1] + " killed", width/2, height - height/19);
}


class brush {
  constructor(deaths) {

    this.count = deaths*2; // the size and speed of a brush is determined by the number of deaths in that particular year

    this.xStart = random(width/10, width - width/10);
    this.yStart = random(height/10, height - height/10);

    this.size = 75;

   this.rotate = random(PI/16, PI/2 - PI/16);

    this.x = 0;
    this.y = 0;
    
    this.drift = 0;
    this.alpha = 25;
  }

  display() {
      
      push();
        translate(this.xStart, this.yStart);

        // this sets the direction of the brush animation so that 
        // it will always be drawn to the center of the sketch
        if (this.xStart >= width/2 && this.yStart >= height/2) {
          rotate(-this.rotate);
        } else if (this.xStart < width/2 && this.yStart >= height/2) {
          rotate(this.rotate);
        } else if (this.xStart < width/2 && this.yStart < height/2) {
          rotate(this.rotate*3)
        } else {
          rotate(-this.rotate*3)
        }

        // draws the brush
          push();
            translate(this.x, this.y);
            strokeWeight(0.5);
           stroke(this.drift, 0, 0, this.alpha);
           noFill();
           for (let i = 0; i < 36; i+=2) {
            ellipse(0, 0, this.size/2 - i*1.5, this.size - i);
           }
          pop();
      pop();
    
  }

  move() {
    this.y = lerp(this.y, -this.count*2, 0.005); // animate the brush moving

    this.size = lerp (this.size, 200, 0.001); // increase the size of the brush as it animates

    this.drift = lerp(this.drift, 255, 0.01); // increase the redness of the brush as it animates
    this.alpha = lerp(this.alpha, 0, 0.005); // increase the opacity of the brush as it animates
    this.rotate += random(-0.01, 0.01); // turn the brush as it animates

    // start the timer once the brush is almost done animating
    if (this.y <= -this.count*1.5) {
      counter++;
    }
  }
}