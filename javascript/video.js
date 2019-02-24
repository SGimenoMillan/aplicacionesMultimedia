var video = document.getElementById("vid");
var fillBar = document.getElementById("fill");
var currentTime = document.getElementById("currentTime");
var volumeSlider = document.getElementById("volume");

var progress= document.getElementById("seek-bar");
var fill= document.getElementById("fill");


function play(){
	if(video.paused){
		video.play();
		$("#playButton").attr("src","assets/Pause.png");
		
	}else{
		video.pause();
		$("#playButton").attr("src","assets/Play.png");
	}
}

video.addEventListener('timeupdate',function(){
	var position= video.currentTime/video.duration;
	fillBar.style.width= position*100 + '%';
	
	convertTime(Math.round(video.currentTime));
	
	//Cuando acaba el video , cambia el icono a play
	if(video.ended){
		$("#playButton").attr("src","assets/Play.png");
	}	
	}
);

//Con estas dos funciones pasamos de numero decimal a Int
function convertTime(seconds){
	var min= Math.floor(seconds/60);
	var sec=seconds%60;
	
	min=(min<10) ? "0" + min:min;
	sec=(sec<10) ? "0" + sec:sec;
	currentTime.textContent= min + ":" + sec;
	
	totalTime(Math.round(video.duration));
	
}

function totalTime(seconds){
	var min= Math.floor(seconds/60);
	var sec=seconds%60;
	
	min=(min<10) ? "0" + min:min;
	sec=(sec<10) ? "0" + sec:sec;
	currentTime.textContent += " / "+ min + ":" + sec;
}


function cambiarVolumen(){
	video.volume= volume.value;
	
	if(volume.value==0){
		$("#speaker").attr("src","assets/Mute.png");
	}else{
		$("#speaker").attr("src","assets/Speaker.png");
	}	
}

function avanzarAClick(e){
	var scrubTime = (e.offsetX/progress.offsetWidth)*video.duration;
	video.currentTime=scrubTime;
	console.log(e);
}
progress.addEventListener("click", avanzarAClick);
	



