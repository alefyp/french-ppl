let mic;
let img, img2, img3, img4;
let currentImage;
let prevVolume = 0;

function preload() {
  img = loadImage('https://raw.githubusercontent.com/alefyp/french-ppl/82e647885f985c334827f4ea3180c5f2094cc43f/anxiete_sociale_1.jpeg');
  img2 = loadImage('https://raw.githubusercontent.com/alefyp/french-ppl/main/anxiete_sociale_2.jpeg');
  img3 = loadImage('https://raw.githubusercontent.com/alefyp/french-ppl/main/anxiete_sociale_3.jpeg');
  img4 = loadImage('https://raw.githubusercontent.com/alefyp/french-ppl/main/anxiete_sociale_4.jpeg');
}

function setup() {
  createCanvas(1400, 1000);
  mic = new p5.AudioIn();
  mic.start();
  currentImage = img; // Start with the first image
}

function highPass(input, alpha, prevOutput) {
  return input - alpha * (input - prevOutput);
}

// If you want the lowPass stuff, uncomment this and erase the another one
/** function lowPass(input, alpha, prevOutput) {
  return alpha * input + (1 - alpha) * prevOutput;
} **/

function draw() {
  let volume = mic.getLevel();
  // volume = lowPass(volume, 0.1, prevVolume);
  volume = highPass(volume, 0.1, prevVolume); // Adjust alpha value as needed
  prevVolume = volume; // Remember the previous volume for the next iteration

  if (volume < 0.1) {
    currentImage = img;      // Adjust threshold as needed
  } else if (volume < 0.2) { // Adjust threshold as needed
    currentImage = img2;
  } else if (volume < 0.3) { // Adjust threshold as needed
    currentImage = img3;
  } else {
    currentImage = img4;
  }

  image(currentImage, 0, 0);
  textSize(50);
  text(volume, 50, 50);
}
