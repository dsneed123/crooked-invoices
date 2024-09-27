// Select the canvas and buttons
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
const generateButton = document.getElementById('generate-btn');
const downloadButton = document.getElementById('download-btn');

// Load the image onto the canvas
const image = new Image();
image.src = 'template.png';  // Replace with your image URL or path
image.onload = function() {
  console.log('Image loaded');
  ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
};
function getFormattedDate() {
  const date = new Date();

  const monthNames = [
    "January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December"
  ];

  const month = monthNames[date.getMonth()];  // Get the month name
  const day = date.getDate();                 // Get the day
  const year = date.getFullYear();            // Get the year
  let hours = date.getHours();                // Get the hour (24-hour format)
  const minutes = date.getMinutes().toString().padStart(2, '0');  // Get the minutes and pad with 0 if necessary

  // Determine AM or PM
  const ampm = hours >= 12 ? 'pm' : 'am';
  
  // Convert hours to 12-hour format
  hours = hours % 12;
  hours = hours ? hours : 12;  // If hour equals 0, change to 12
  
  // Return the formatted date string
  return `${month}, ${day}, ${year}, ${hours}:${minutes}${ampm}`;
}
function getRandomFourDigitNumber() {
  return Math.floor(1000 + Math.random() * 9000);  // Generates a number between 1000 and 9999
}

// Add text to the image when the button is clicked
generateButton.addEventListener('click', function() {
  

  // Clear the canvas and redraw the image
  ctx.clearRect(0, 0, canvas.width, canvas.height);  // Clear the canvas
  ctx.drawImage(image, 0, 0, canvas.width, canvas.height);  // Redraw the image

  // Add the text over the image
  ctx.font = 'bold 17pt Trebuchet MS';
  ctx.fillStyle = 'black';
  ctx.fillText(getRandomFourDigitNumber(), 180, 1050);  // Adjust position as needed
  ctx.font = 'bold 18pt Trebuchet MS';
  ctx.fillText(getFormattedDate(), 25, 1160);

});

// Download the edited image
downloadButton.addEventListener('click', function() {
  const link = document.createElement('a');
  link.download = 'edited-image.png';
  link.href = canvas.toDataURL();  // Convert canvas to data URL (image)
  link.click();  // Trigger the download
});

