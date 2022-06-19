const canvas = document.getElementById('matrix');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext('2d');

const bp = document.getElementById('bluepill');
const rp = document.getElementById('redpill');
var bw = 100;
var bh = 100;
var rw = 100;
var rh = 100;

const katakana = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン';
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

setInterval(draw, 40);
setTimeout(fadePills, 2000);

function fadePills() {
	ctx.drawImage(bp, canvas.width / 4, (canvas.height / 2) - bh, bw, bh);
	ctx.drawImage(rp, (canvas.width / 3) * 2, (canvas.height / 2) - rh, rw, rh);
	setInterval(printPills, 10);
}

function printPills() {
	ctx.drawImage(bp, canvas.width / 4, (canvas.height / 2) - bh, bw, bh);
	ctx.drawImage(rp, (canvas.width / 3) * 2, (canvas.height / 2) - rh, rw, rh);
}