// Select the canvas and buttons
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
const fullscreenButton = document.getElementById('fullscreenButton');

// Load the image onto the canvas
const image = new Image();
image.src = 'template.png';  // Replace with your image URL or path

// Store the original image dimensions
let originalWidth, originalHeight;

image.onload = function() {
  originalWidth = image.width;
  originalHeight = image.height;
  drawImage(); // Draw the image once it's loaded
};

// Function to draw the image and text
function drawImage() {
  const aspectRatio = originalWidth / originalHeight;

  // Calculate the dimensions to maintain the aspect ratio
  const canvasWidth = canvas.width;
  const canvasHeight = canvas.width / aspectRatio;

  // Adjust canvas height if the calculated height exceeds the initial height
  if (canvasHeight > canvas.height) {
    const canvasHeightAdjusted = canvas.height;
    const canvasWidthAdjusted = canvas.height * aspectRatio;
    ctx.drawImage(image, 0, 0, canvasWidthAdjusted, canvasHeightAdjusted);
  } else {
    ctx.drawImage(image, 0, 0, canvasWidth, canvasHeight);
  }

  // Add the text over the image
  ctx.font = 'bold 17pt Trebuchet MS';
  ctx.fillStyle = 'black';
  ctx.fillText(getRandomFourDigitNumber(), 180, 1050);  // Adjust position as needed
  ctx.font = 'bold 18pt Trebuchet MS';
  ctx.fillText(getFormattedDate(), 25, 1160);
}

// Fullscreen functionality
fullscreenButton.addEventListener('click', function() {
  if (canvas.requestFullscreen) {
    canvas.requestFullscreen();
  } else if (canvas.mozRequestFullScreen) { // Firefox
    canvas.mozRequestFullScreen();
  } else if (canvas.webkitRequestFullscreen) { // Chrome, Safari, and Opera
    canvas.webkitRequestFullscreen();
  } else if (canvas.msRequestFullscreen) { // IE/Edge
    canvas.msRequestFullscreen();
  }
  
  // Adjust the canvas size to maintain the aspect ratio in full screen
  resizeCanvas();
});

// Function to resize the canvas while maintaining the aspect ratio
function resizeCanvas() {
  const aspectRatio = originalWidth / originalHeight;

  // Get the new width and height
  const newWidth = window.innerWidth;
  const newHeight = window.innerHeight;

  // Calculate the new dimensions
  if (newWidth / aspectRatio <= newHeight) {
    canvas.width = newWidth;
    canvas.height = newWidth / aspectRatio;
  } else {
    canvas.height = newHeight;
    canvas.width = newHeight * aspectRatio;
  }

  drawImage(); // Redraw the image after resizing
}

// Function to get formatted date
function getFormattedDate() {
  const date = new Date();
  const monthNames = [
    "January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December"
  ];

  const month = monthNames[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();
  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, '0');

  const ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12;

  return `${month}, ${day}, ${year}, ${hours}:${minutes}${ampm}`;
}

// Function to get a random four-digit number
function getRandomFourDigitNumber() {
  return Math.floor(1000 + Math.random() * 9000);
}

// Redraw the image when the window is resized
window.addEventListener('resize', resizeCanvas);
