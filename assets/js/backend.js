var descArr = ["Yes, this is also my APCS final.",
	"Haha, yes. This is my APCS final too.",
	"Tomatoes are high in protein and this is my APCS final as well."];
function metaDesc(desc) {
	console.log(desc)
}
function getRandom(arr) {
	var rand = Math.random();
	return arr[Math.floor(rand * arr.length)];
}
var desc = getRandom(descArr);
metaDesc(desc);

// Toggle Text
// Add onclick="methodName()" to html element attribute to be interacted with.
var mtext1 = document.querySelector("#mText1");
mtext1.object3D.visible = false;
var mtext2 = document.querySelector("#mText2");
mtext2.object3D.visible = false;
var mtext3 = document.querySelector("#mText3");
mtext3.object3D.visible = false;
var mtext4 = document.querySelector("#fText1");
fText1.object3D.visible = false;

var mInteract1 = document.querySelector("#mInteract1");
var mInteract2 = document.querySelector("#mInteract2");
var mInteract3 = document.querySelector("#mInteract3");
var mInteract4 = document.querySelector("#fInteract1");

var vis = false;
var curVis = "";

// Toggle UI text
function toggleVis(text, interact) {
	if (vis && curVis != text) {
		curVis.object3D.visible = false;
		text.object3D.visible = true;
		curVis = text;
	} else if (!vis) {
		resetVis();
		text.object3D.visible = true;
		curVis = text;
		vis = !vis;
	} else if (vis) {
		text.object3D.visible = false;
		curVis = text;
		vis = !vis;
	}
}

function resetVis() {
	mtext1.object3D.visible = false;
	mtext2.object3D.visible = false;
	mtext3.object3D.visible = false;
}

// Toggle audio
var audio1 = new Audio('assets/sounds/Demercurio_Interview.ogg');

var audioInteract1 = document.querySelector("#audioInteract1");

var playing = false;
var curPlay = "";
var curInteract = "";

function toggleAudio(af, interact) {
	if (playing && curPlay != af) {
		curPlay.pause();
		af.play();
		curPlay = af;
		curInteract = interact;
	} else if (!playing) {
		resetAudio();
		af.play();
		curPlay = af;
		curInteract = interact;
		playing = !playing;
	} else if (playing) {
		af.pause();
		curPlay = af;
		curInteract = interact;
		playing = !playing;
	}
}

function resetAudio() {
	audio1.pause();
}