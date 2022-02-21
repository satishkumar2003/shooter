var health = 100;
var difficulty = 1;

function enemiesAlive() {
    var alive = document.querySelectorAll(".enemy:not(.dead)");
    return alive;
}

function shoot(enemy){
    enemy.classList.add("dead");
    if(!enemiesAlive().length){
        var endScreen = document.querySelector(".gameframe");
        endScreen.classList.add("gamewon")
    }
}

function enemyShoots(){
    health = health-20;
    var healthbar = document.querySelector("#healthbar");
    healthbar.style.width = health*0.6+"%";
    if(health<1){
        var endScreen = document.querySelector(".gameframe");
        endScreen.classList.add("gamelost");
    }
}

function enemyReady(enemy){
    console.log("Making enemy ready");
    if(health>1 && !enemy.classList.contains("dead") && !enemy.classList.contains("shooting")){
        enemy.classList.add("shooting");
        setTimeout(enemyShoots(),200/difficulty);
        setTimeout(()=>{
            if(enemy.classList.contains("dead")){
                enemy.classList.remove("shooting");
                enemy.classList.remove("visible");
            }
        },200);
    }
}

function showEnemy() {
    var numChosenAlive  = Math.floor(Math.random() * enemiesAlive().length);
    var enemy = enemiesAlive()[numChosenAlive];
    enemy.classList.add("visible");
    var interval = Math.random()*2000/difficulty+1000;
    setTimeout(()=>{
        enemyReady(enemy);
        showEnemy();
    },interval);
}
