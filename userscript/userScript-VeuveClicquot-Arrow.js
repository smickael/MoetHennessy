/*
 * Userscript for Clos19's Veuve Clicquot Arrow Box
 * @author Mickaël SWAMINATHAN <mickael.swaminathan@capgemini.com>
 *                                               
 *                         ``                      
 *                      `.://:-.`                  
 *                   `.://///////:-`               
 *                `.:///////////////:-`            
 *             `-://///////////////////:.          
 *          `-://////////////////////////:.        
 *        .:///////////////////////////////:`      
 *     `-://////////////////////////////////:`     
 *    .://////////////////////////////////////`    
 *   :////////////////////////////////++++++//:`   
 *  ://////////////////////////////+oooooooooo+-   
 * .//////////////////////////////ooooooooooooo+   
 * -////////////////////////////+ooooooooooooooo`  
 * -///////////////////////////+oooooooooooooooo   
 * .//////////////////////////ooooooooooooooooo-   
 *  -////////////////////////ooooooooooooooooo-    
 *   -/////////////////////+ooo::oooooooooo+:`     
 *    `:////////////////:-+ooooo. .-:::::-`        
 *      `-://////////:-``/ooooooo/-`               
 *          `......`  .:oooooooooooo/-             
 *                 -/oooooooooo+/:.                
 *                   `......`                      
 *
 *     Created at     : 2019-08-29 14:32:56 
 *     Last modified  : 2019-08-30 10:53:40
 *     Copyright (c) Capgemini 2019 All rights reserved
 */

// ==UserScript==
// @name         Veuve Cliquot Arrow
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Add customisation on image
// @author       You
// @match        https://www.clos19.com/en-us/veuve-clicquot-yellow-label-brut-personalized-city-arrow-p-100722
// @match        https://www.clos19.com/en-us/veuve-clicquot-yellow-label-brut-personalised-city-arrow-p-100722
// @match        https://www.clos19.com/en-gb/veuve-clicquot-yellow-label-brut-personalised-city-arrow-p-100722
// @match        https://www.clos19.com/en-gb/veuve-clicquot-yellow-label-brut-personalized-city-arrow-p-100722
// @grant        none
// @require      http://code.jquery.com/jquery-3.4.1.js
// @require      https://gist.githubusercontent.com/spawnrider/b12014d4013d3f372986bd684e42cc33/raw/e3376b14d244960a3a639b45e82d8d89638c74a7/WaitForKeyElements.js
// @require      https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js
// ==/UserScript==

/* 
  Specific function used with TamperMonkey/GreaseMonkey. 
  Call function when a div (with his id) doesn't appear right away. 
  waitForKeyElements(".id_of_the_div", function to call when .id_of_the_div appears);
 */
waitForKeyElements(
	".reveal-overlay",
	replaceDuplicateCanvas
);

/*
  This function consists of replacing the content of a div by ours.
  In this function, we just << clean >> the div to fill it later.
 */
function replaceDuplicateCanvas() {
	// First, we create a div
	var elem = document.createElement("div");
	// Then we set div's id and dimensions
	elem.setAttribute("id", "elem");
	elem.setAttribute("height", "700");
	elem.setAttribute("width", "550");
	// We catch the div we want to clean up by mentionning his id, or classes
	var parentElem = document.getElementsByClassName("columns small-12 large-6 image-container")[0];
	// Remove all previous images
	parentElem.innerHTML = '';
	// Add new customizable image
	parentElem.appendChild(elem);
	init();
}

/*
   We create text variables as global variables.
   Text is for the main text, text2 is for the small text.
 */
var text = "",
    text2 = "";

/*
  This function is called by init() function.
  It resizes the text everytime we add a character.
  Actually, we can use the line below:
  var textSizePx = 60 - context.measureText(text).width / 20;
  Because this only line resizes the text automatically, 
  instead of make a multiple if statements but in this function it didn't worked.
 */
function update(canvas, img) {
	// Set variables
	var context = canvas.getContext("2d");
	var textSizePx;
	var departurePointY;
	var departurePointX;
	// If statements to resize the text with changing the starting point coordinates
	// in order to center the main text
	if (text.length > 7 && text.length < 12) {
		textSizePx = 40;
		departurePointX = 37;
		departurePointY = -60;
	} else if (text.length > 11 && text.length < 14) {
		textSizePx = 37;
		departurePointX = 37;
		departurePointY = -50;
	} else if (text.length > 13 && text.length < 16) {
		textSizePx = 35;
		departurePointX = 37;
		departurePointY = -48;
	} else {
		textSizePx = 52;
		departurePointX = 41;
		departurePointY = -71;
	}
	//var textSizePx = 60 - context.measureText(text).width / 20;
	// Setting the font and the size for the main text
	context.font = textSizePx + "px Raleway";
	// Put the image passed in argument
	context.drawImage(img, 0, 0, canvas.width, canvas.height);
	// Save the canvas before doing the rotation
	context.save();
	context.translate(canvas.width / 2, canvas.height / 2);
	context.rotate(270 * Math.PI / 180);
	context.textAlign = "center";
	// Once canvas is rotated, we can fill the space we chose with the text
	// by setting the starting coordinates
	context.fillText(text, departurePointY, departurePointX);
	// Restore() function puts the image at its original state and main text is finally set
	context.restore();

	// For the small text, the process is the same as with the main text,
	// but small text has a fixed size
	context.font = "11.5px Krona One";
	context.save();
	context.translate(canvas.width / 2, canvas.height / 2);
	context.rotate(270 * Math.PI / 180);
	context.textAlign = "left";
	context.fillText(text2, -67, 60);
	context.restore();
}


/*
  This function takes values from inputs by their id .city-text and .distance.
  The image is stated in this function. And every time, we change the value of the input,
  it calls the update function. 
 */
function init() {
	// Those two inputs don't have an id attribute in their tag,
	// so I had to set it by myself for then get the value of those inputs.
	var messageInput = document.querySelector(".city-text");
	messageInput.setAttribute("id", "firstMsg");
	var userInput = document.getElementById("firstMsg");
	var messageInput2 = document.querySelector(".distance");
	messageInput2.setAttribute("id", "secondMsg");
	var userInput2 = document.getElementById("secondMsg");
	// Get the div we created in replaceDuplicateCanvas() with his id
	var elem = document.getElementById("elem");
	// Create the canvas and set his context
	var canvas = document.createElement("canvas");
	var context = canvas.getContext("2d");
	// Create the image variable with his src at the end of the function
	var img = new Image();
	// Execute the function immediately after the image is loaded (onload)
	img.onload = function() {
		canvas.width = img.width / 3;
		canvas.height = img.height / 3;
		// Set the image to the canvas
		context.drawImage(img, 0, 0, canvas.width, canvas.height);
		// Choose the font color (HEX)
		context.fillStyle = "#000000";
		// Attribute the canvas to the div we created
		elem.appendChild(canvas);
		// Execute the function when the value of the input is changed (oninput)
		userInput.oninput = function() {
			// Get the value of the main text
			text = userInput.value;
			// Call update function
			update(canvas, img);
		}
		userInput2.oninput = function() {
			// Get the value of the small text
			text2 = userInput2.value;
			// Call update function
			update(canvas, img);
		}
	};
	img.src = "https://hostpic.xyz/files/15665241631810708325.jpg";
}

/*
  Fonts used for the box and imported from Google Fonts via WebFont.
  Import the link:
  https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js
  to use WebFont.
 */
WebFont.load({
  google: {
    families: ['Raleway:900', 'Krona One']
  },
  active: function() {
    init();
  }
});
