class Stats{
    constructor(){
        this.WEIGHT_PER_OX = 20;
        this.WEIGHT_PER_PERSON = 2;
        this.FOOD_WEIGHT = 0.6;
        this.FIREPOWER_WEIGHT = 5;
        this.GAME_SPEED = 800;
        this.DAY_PER_STEP = 0.2;
        this.FOOD_PER_PERSON = 0.02;
        this.FULL_SPEED = 5;
        this.SLOW_SPEED = 3;
        this.FINAL_DISTANCE = 1000;
        this.EVENT_PROBABILITY = 0.15;
        this.ENEMY_FIREPOWER_AVG = 5;
        this.ENEMY_GOLD_AVG = 50;
    }
}
let stats= new Stats()
console.log(stats)
console.log(Object.entries(stats))

// for(let prop of Object.entries(stats)){
//     console.log(prop[1])
// }
