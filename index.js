/*

TODO
----

1) Add functionality for fading in the images.
2) Add automatic resizing of elements when window is resized.

*/

const canvas = document.getElementById('matrix');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext('2d');

var bp = document.getElementById('bluepill');
var bp2 = document.getElementById('bluepill2');
var rp = document.getElementById('redpill');
var rp2 = document.getElementById('redpill2');

var redLink = "main.htm";
var blueLink = "https://www.google.com";
var redText = "Stay in Wonderland";
var blueText = "The story ends...";
var inLinkRed = false;
var inLinkBlue = false;

var scaling = .375;
var pw = 381 * scaling;
var ph = 311 * scaling;
var pxr = canvas.width / 5;
var pxb = (canvas.width / 3) * 2;
var py = (canvas.height / 2) - (ph / 1.5);

const katakana = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユ'
					+ 'ュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン';
const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const nums = '0123456789';

const alphabet = katakana + latin + nums;

const fontSize = 16;
const columns = canvas.width/fontSize;

const rainDrops = [];

for( let x = 0; x < columns; x++ ) {
	rainDrops[x] = 1;
}

const draw = () => {
	ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	
	ctx.fillStyle = '#0F0';
	ctx.font = fontSize + 'px monospace';

	for(let i = 0; i < rainDrops.length; i++)
	{
		const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
		ctx.fillText(text, i*fontSize, rainDrops[i]*fontSize);
		
		if(rainDrops[i]*fontSize > canvas.height && Math.random() > 0.975){
			rainDrops[i] = 0;
        }
		rainDrops[i]++;
	}
};

setInterval(draw, 50);
setTimeout(fadePills, 3000);

function fadePills() {
	ctx.drawImage(rp, pxr, py, pw, ph);
	ctx.drawImage(bp, pxb, py, pw, ph);
	setInterval(printPills, 10);
}

function printPills() {
	ctx.drawImage(rp, pxr, py, pw, ph);
	ctx.drawImage(bp, pxb, py, pw, ph);
	setTimeout(drawLinks, 1000);
}

function drawLinks() {
    //draw the links
    ctx.font = 'bold 28px courier';
    ctx.shadowColor = "#00A7AF";
	ctx.shadowBlur = 2;
	ctx.lineWidth = 4;
	ctx.fillStyle = "#FFFFFF";

    ctx.strokeText(redText, pxr - 60, (py + ph + 30));
    ctx.strokeText(blueText, pxb - 60, (py + ph + 30));

	ctx.shadowBlur = 0;

    ctx.fillText(redText, pxr - 60, (py + ph + 30));
    ctx.fillText(blueText, pxb - 60, (py + ph + 30));

    redLinkWidth = ctx.measureText(redText).width;
    blueLinkWidth = ctx.measureText(blueText).width;

    //add mouse listeners
    canvas.addEventListener("mousemove", on_mousemove, false);
    canvas.addEventListener("click", on_click, false);
}

//check if the mouse is over the link and change cursor style
function on_mousemove (ev) {
	var x, y;

	// Get the mouse position relative to the canvas element.
	if (ev.layerX || ev.layerX == 0) { //for firefox
		x = ev.layerX;
		y = ev.layerY;
	}
	x -= canvas.offsetLeft;
	y -= canvas.offsetTop;

	//is the mouse over the link?
	if(x >= (pxr - 60) && x <= (pxr + redLinkWidth - 60) && y <= (py + ph + 35) && y >= py){
		document.body.style.cursor = "pointer";
		rp = document.getElementById('redpill2');
		inLinkBlue = false;
		inLinkRed = true;
	}
	else if(x >= (pxb - 60) && x <= (pxb + blueLinkWidth - 60) && y <= (py + ph + 35) && y >= py) {
		document.body.style.cursor = "pointer";
		bp = document.getElementById('bluepill2');
		inLinkBlue = true;
		inLinkRed = false;
	}
	else{
		document.body.style.cursor = "";
		bp = document.getElementById('bluepill');
		rp = document.getElementById('redpill');
		inLinkRed = false;
		inLinkBlue = false;
	}
}

//if the link has been clicked, go to link
function on_click(e) {
	if (inLinkRed)  {
		window.location = redLink;
	}
	else if (inLinkBlue)  {
		window.location = blueLink;
	}
}
