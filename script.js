const MAX_ENEMY = 7;


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
};

const setting = {
	start: false,
	score: 0,
	speed: 5,
	traffic:3
};

function gerQuantituElements(heightElement){
	return document.documentElement.clientHeight / heightElement + 1;
}

const startGame = () => {
	start.classList.add('hide');
	for(let i = 0; i < gerQuantituElements(100); i++){
		const line = document.createElement('div');
		line.classList.add('line');
		line.style.top= (i*100) + "px";
		line.y = i * 100;
		gameArea.appendChild(line);
	}

for (let i = 0; i < gerQuantituElements(100 * setting.traffic); i++) {
	const enemy = document.createElement('div');
	const randomEnemy = Math.floor(Math.random() * MAX_ENEMY) + 1;
	enemy.classList.add('enemy');
	enemy.y = -100 * setting.traffic *( i + 1);
	enemy.style.top = Math.floor(Math.random() * gameArea.offsetHeight) + 'px';
	enemy.style.left =Math.floor(Math.random() * (gameArea.offsetWidth - 50)) + 'px';
	enemy.style.background = `transparent url(cars/enemy${randomEnemy}.png) center / cover no-repeat`;
	gameArea.appendChild(enemy);

	
}

	setting.start = true;
	gameArea.append(car);
	setting.x = car.offsetLeft;
	setting.y = car.offsetTop;
	requestAnimationFrame(playGame);
}

const  playGame = function(){
	
	if (setting.start === true) {
		
		if(keys.ArrowLeft && setting.x >0){
			setting.x -= setting.speed;
		}

		if(keys.ArrowRight && setting.x < gameArea.offsetWidth){
			setting.x += setting.speed;
		}

		if(keys.ArrowUp && setting.y > 0){
			setting.y -= setting.speed;
		}
		if(keys.ArrowDown && setting.y < (gameArea.offsetHeight - car.offsetHeight)) {
			setting.y += setting.speed;
		}
		moveRoad();
		moveEnemy();
		car.style.left = setting.x + "px";
		car.style.top = setting.y + "px";

		requestAnimationFrame(playGame);
	}
}

function startRun(event){
		if(keys.hasOwnProperty(event.key)){
		event.preventDefault();
			keys[event.key]=true;
		}
		
	
}

function stopRun(event) {
	if(keys.hasOwnProperty(event.key)){
		event.preventDefault();
		keys[event.key]=false;
	}
}


function moveRoad(){
	let lines = document.querySelectorAll('.line');
	lines.forEach(function(item){
		item.y += setting.speed; 
		item.style.top = item.y + 'px';
		if(item.y >= document.documentElement.clientHeight){
			item.y = -100;
		}
	});
}

function moveEnemy(){
	let enemys = document.querySelectorAll('.enemy');
	enemys.forEach(item =>{
			item.y += setting.speed / 2;
			item.style.top = item.y + 'px';
			if(item.y >= document.documentElement.clientHeight){
				item.y = -100 * setting.traffic;
				item.style.left =Math.floor(Math.random() * (gameArea.offsetWidth - 50)) + 'px';
				item.style.top =Math.floor(Math.random() * (gameArea.offsetHeight)) + 'px';

			}
	})
}

start.addEventListener('click', startGame);
document.addEventListener('keydown', startRun);
document.addEventListener('keyup', stopRun);
