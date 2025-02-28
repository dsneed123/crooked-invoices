document.addEventListener('click', function() {
  /Mobile/.test(navigator.userAgent) && !location.hash && setTimeout(function () {
    window.scrollTo(0,1)
  }, 1000);
});
document.addEventListener('DOMContentLoaded', function() {
  const venmoMessage = document.querySelector('.venmo-message');
  const venmoAmount = document.querySelector('.venmo-amount');
  const venmoTitle = document.querySelector('.venmo-title strong');
  const iconLetter = document.querySelector('.icon-letter');
  venmoMessage.contentEditable = true;
  venmoAmount.contentEditable = true;
  venmoTitle.contentEditable = true;

  // Set the icon letter to the first letter of the venmo title
  if (venmoTitle && iconLetter) {
    iconLetter.textContent = venmoTitle.textContent.charAt(0);
  }

  // Add double-click event listener to switch between receipts
  document.addEventListener('dblclick', function() {
    if (venmoTitle.textContent === 'Borracho') {
      venmoTitle.textContent = 'Borracho';
      venmoMessage.textContent = '"💸 to Borracho"';
      venmoAmount.textContent = '-$10';
    } else {
      venmoTitle.textContent = 'Borracho';
      venmoMessage.textContent = '"cover"';
      venmoAmount.textContent = '-$10';
    }
    iconLetter.textContent = venmoTitle.textContent.charAt(0);
  });
});
const key = keyGen();

window.onload = function() {
  const bankInfoElement = document.getElementById('bank').querySelector('strong');
  const dateElement = document.getElementById('date').querySelector('strong');
  const transactionId = document.getElementById('transaction-id').querySelector('strong');
  const randomNumber = getRandomFourDigitNumber();
  bankInfoElement.textContent += randomNumber;
  dateElement.textContent += getFormattedDate();
  transactionId.textContent += getRandom16DigitInteger();

  comparePasswords();
}

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

function getRandom16DigitInteger() {
  // Generate a random 16-digit integer as a string
  var randomNum = Math.floor(Math.random() * 9 + 1) + ''; // Start with a non-zero digit
  for (let i = 0; i < 15; i++) {
    randomNum += Math.floor(Math.random() * 10); // Append 15 more random digits
  }
  return randomNum; // Return as a string
}

function getRandomFourDigitNumber() {
  return Math.floor(1000 + Math.random() * 9000);  // Generates a number between 1000 and 9999
}

function getintDate() {
  const date = new Date();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
  const day = String(date.getDate()).padStart(2, '0');
  const year = date.getFullYear();

  return `${month}${day}${year}`;
}

function keyGen(){
  var seed = getintDate();

  // Linear congruential generator (LCG) parameters
  const a = 1664525;
  const c = 1013904223;
  const m = Math.pow(2, 32); // 2^32

  // Update seed
  seed = (a * seed + c) % m;

  // Return a pseudo-random integer within the range [0, m)
  return seed;
}

function comparePasswords() {
  const PwdConatiner = document.querySelector(".Password-container");
  const contentContainer = document.querySelector('.content-container');
  const urlParams = new URLSearchParams(window.location.search);
  const userkey = urlParams.get('key');

  if (userkey == key) {
    console.log("key match");
    contentContainer.style.visibility = 'visible';
    PwdConatiner.remove();
  } else {
    console.log("key mismatch");
  }
}