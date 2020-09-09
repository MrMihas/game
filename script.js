
	const score    = document.querySelector(".score"),
      start    = document.querySelector('.start'),
	  gameArea = document.querySelector('.gamearea'),
	  car      = document.createElement("div");
	  car.classList.add('car');



const keys = {
	ArrowUp:    false,
	ArrowDown:  false,
	ArrowRight: false,
	ArrowLeft:  false
}

const setting = {
	start: false,
	score: 0,
	speed: 3
}

const startGame = () => {
	start.classList.add('hide');
	setting.start = true;
	requestAnimationFrame(playGame);
	gameArea.append(car);
}

const  playGame = function(){
	if (setting.start === true) {
		requestAnimationFrame(playGame);
	}
}

function startRun(event){
	if (event.key !== "F5" && event.key !== "F12") {
		event.preventDefault();
		keys[event.key]=true;
	}
}

function stopRun(event) {
	event.preventDefault();
	keys[event.key]=false;
}




start.addEventListener('click', startGame);
document.addEventListener('keydown', startRun);
document.addEventListener('keyup', stopRun);
