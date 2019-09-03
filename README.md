# POC - CLOS19

This POC was about proposing to Moet Hennesy a tool to personnalize products from their e-commerce website.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites & installing

In this project, you will find files called userscripts. They work on a plug-in called Tampermonkey if you are using Google Chrome or Greasemonkey if you are using Mozilla Firefox.

```
For Google Chrome:
https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo?hl=fr

For Mozilla Firefox:
https://addons.mozilla.org/fr/firefox/addon/greasemonkey/
```

### Working on the plug-in interface

Once you installed the plug-in, go to the dashboard of the plug-in, and you should see something like the picture below:

![Example](https://hostpic.xyz/files/15671640243935213622.png)

By clicking on the "[+]" icon, you can create your own userscript or copy one of the userscript of this repository.
```
Here is a tutorial if you want to create your own userscript: 
https://simply-how.com/enhance-and-fine-tune-any-web-page-the-complete-user-scripts-guide
``` 
## Basic concepts for this POC

For this POC, JavaScript is crucial and Canvas is needed to work with the pictures we use.

### Canvas

Canvas is used to draw graphics via scripting (usually with JavaScript). It's only a container for graphics. You must use a script to actually draw the graphics.
Canvas has several methods for drawing paths, boxes, circles, text, and adding images.

```
For more informations about Canvas:
https://www.w3schools.com/graphics/canvas_intro.asp
```

### 3D

> At the beginning, the project was to propose customized products in three dimensions with Three.js.
> It wasn't totally convicing because the render wasn't close to the real product (lack of relief, not the same colors). So for the 3D part, designers are needed.

```
Software used for 3D maker:
https://www.blender.org/

Three.js documentation:
https://threejs.org/docs/index.html#manual/en/introduction/Creating-a-scene
```
If you want to test your script, you will need to test it on a local server.
(You have many ways to run a local server, but in this example, I'l show you with the php command. Just don't forget to be on the right directory.)

```
$ cd POC-CLOS19/3D #Go to the directory which contains the 3D version
$ php -S localhost:8080
> PHP 7.1.23 Development Server started at Fri Aug 30 14:12:08 2019
Listening on http://localhost:8080
Document root is /Users/mickael
Press Ctrl-C to quit.
```
And then you can test your page on `http://localhost:8080`.

## Deployment

The purpose of this project is about to put that tool inside the website, working with SAP Hybris. The userscript way was about to present the POC to Moet Hennessy. The Tampermonkey userscript was just a way to show how it could wok on Clos19's website.

## Authors

* **Mickael Swaminathan** - *AIE Capgemini* - <mickael.k.swaminathan@gmail.com>

## License

This project is the property of Capgemini.
