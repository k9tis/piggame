document.getElementsByTagName('body')[0].insertAdjacentHTML('beforeEnd' ,'<div id="helloText"> Нажмите ENTER, чтобы начать игру</div>');
var helloText = document.getElementById('helloText');
helloText.style.display = 'block';
helloText.style.textAlign = "center";
helloText.style.fontSize = 72+ "pt";

document.getElementsByTagName('body')[0].insertAdjacentHTML('beforeEnd' ,'<div id="scoreObj"></div>');
var scoreObj= document.getElementById('scoreObj');
scoreObj.style.textAlign = "center";
scoreObj.style.fontSize = 72+ "pt";
scoreObj.style.display = 'none';

document.getElementsByTagName('body')[0].insertAdjacentHTML('beforeEnd' ,'<img src="img/orange.png" id="orange">') ;
var orange = document.getElementById('orange');
orange.style.position = 'fixed';
orange.style.display = 'none';

document.getElementsByTagName('body')[0].insertAdjacentHTML('beforeEnd' ,'<img src="img/pig.png" id="pig">') ;
var pig= document.getElementById('pig');
pig.style.position = 'fixed';
pig.style.display = 'none';

document.getElementsByTagName('body')[0].insertAdjacentHTML('beforeEnd' , '<div id="timerObj"></div>') ;
var timerObj= document.getElementById('timerObj');
timerObj.style.textAlign = "center";
timerObj.style.fontSize = 72+ "pt";
timerObj.style.display = 'none';
var timer=15;
var intervalid;
var enterListener = function(event){startGame(event)};
var mouseListener = function(event){mouseMoveFunc(event)};

function startGame(event){
	if (event.keyCode ==13){
		score = 0;
		setScore(0);

		helloText.style.display ='none';
		scoreObj.style.display = 'block';
		orange.style.display = 'block';
		pig.style.display = 'block';

		document.removeEventListener('keyup',enterListener);
		document.addEventListener("mousemove",mouseListener);
		spawnOrange();
		timerObj.style.display = 'block';
		timer = 15;
		setTimer(timer);
		intervalID = setInterval(function(){cntdwn();}, 1000);			
	}
}

function setTimer(timeToSet){
	console.log(timer);
	timerObj.innerHTML = "Time:" + timeToSet;
}

function mouseMoveFunc(event){
   	pig.style.left = event.clientX - 64 + 'px';
   	pig.style.top = event.clientY - 64 + 'px';
	checkCollision();
}

function spawnOrange(){
	 orange.style.left=Math.random()*(window.innerWidth-128) + 'px';
	 orange.style.top=Math.random()*(window.innerHeight-128) + 'px';
}

function checkCollision() {
	if (Math.sqrt(Math.pow(pig.offsetLeft - orange.offsetLeft,2)+ Math.pow(pig.offsetTop - orange.offsetTop,2)) <128)
	{
		spawnOrange();
		score+=5;
		setScore(score);
	}
}

function setScore(scoreToSet){
	scoreObj.innerHTML = "Очки: " + scoreToSet;
}
function cntdwn(){
	timer-=1;
	setTimer(timer);
	if (timer==0) {
		//Включаем таймер
		clearInterval(intervalID);
		//Убираем кправление по мышке.
		document.removeEventListener('mousemove',mouseListener);
		//Выводим результат в блок helloText
		helloText.innerHTML = "Game over. Score:"+ score+ ". <br> Enter.";
		helloText.style.display ='block';
		scoreObj.style.display = 'block';
		pig.style.display = 'block';
		orange.style.display = 'block';
		document.addEventListener("keydown",enterListener);
	}
}

document.addEventListener("keyup",enterListener);
//document.addEventListener("mousemove" , mouseListener);
//B startGame
