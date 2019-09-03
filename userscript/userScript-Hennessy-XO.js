/*
 * Userscript for Clos19's Hennessy XO Bottle
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
 *     Created at     : 2019-08-29 14:33:28 
 *     Last modified  : 2019-08-20 12:48:31 
 *     Copyright (c) Capgemini 2019 All rights reserved
 */

// ==UserScript==
// @name         Hennessy XO
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Add customisation on image
// @author       You
// @match        https://www.clos19.com/en-us/hennessy-engravable-xo-p-100711
// @match        https://www.clos19.com/en-gb/hennessy-xo-bottle-p-100109
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
	replaceDuplicateCanvas,
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
	elem.setAttribute("height", "620");
	elem.setAttribute("width", "350");
	// We catch the div we want to clean up by mentionning his id, or classes
	var parentElem = document.getElementsByClassName("columns small-12 large-6 image-container")[0];
	console.log(parentElem);
	// Remove all previous images
	parentElem.innerHTML = '';
	// Add new customizable image
	parentElem.appendChild(elem);
	init();
}

/*
	This function does the text centering and the newline if needed.
*/
function wrapText(text) {
	var table = [];
	table = text.split(" ");
	var taille = 0;
	var ok = false;

	if (text.length > 10 && table.length > 1) {
		var phrases = ["", ""];
		var j = 0;

		for (j = 0; j < table.length; j++) {
			if (ok != true) {
				if (taille + table[j].length > text.length / 2) {
					ok = true;
				}
				if (Math.abs(taille + table[j].length - text.length / 2) < Math.abs(taille - text.length / 2)) {
					phrases[0] += table[j];
					phrases[0] += " ";
					taille += table[j].length + 1;
				} else {
					phrases[1] += table[j];
					phrases[1] += " ";
				}
			} else {
				phrases[1] += table[j];
				phrases[1] += " ";
			}
		}
	} else {
		var phrases = [text];
	}
	return phrases;
}

/*
  This function takes values from the input by his id .customisation-image.
  The image is stated in this function. And every time, we change the value of the input,
  it calls the update function. 
 */
function init() {
	var elem = document.getElementById('elem');
	var circle_canvas = document.createElement("canvas");
	var context = circle_canvas.getContext("2d");
	var img = new Image();
	img.src = "https://hostpic.xyz/files/15651854053630121625.png";
	context.drawImage(img, 0, 0, 350, 620);
	circle_canvas.width = 350;
	circle_canvas.height = 620;
	// Choose the font color (HEX)
	context.fillStyle = "#f3f3F375";
	context.textAlign = 'center';
	var UserInput = document.getElementById("customisation-message");
	UserInput.oninput = function() {
		// Call the wrapText function to decide if the text should be in two lines
		var text = wrapText(UserInput.value);
		context.clearRect(0, 0, 350, 620);
		context.drawImage(img, 0, 0, 350, 620);
		// Setting the size of the text which depends on its length
		if (text.length > 1) {
			context.font = "20px DM Serif Display";
			context.fillText(text[0], 173, 370);
			context.fillText(text[1], 173, 390);
		} else if (text.length == 1 && text[0].length < 15) {
			context.font = "30px DM Serif Display";
			context.fillText(text, 172, 380);
		} else {
			context.font = "20px DM Serif Display";
			context.fillText(text, 172, 380);
		}
	}
	// Attribute the canvas to the div we created
	elem.appendChild(circle_canvas);
}

/*
	Fonts used for the box and imported from Google Fonts via WebFont.
	Import the link:
	https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js
	to use WebFont.
 */
WebFont.load({
	google: {
		families: ['DM Serif Display']
	},
	active: function() {
		init();
	}
});
