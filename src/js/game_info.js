const paceArray = ["steady", "strenuous", "grueling"];
const rationsArray = ["filling", "meager", "bare bones"];
const healthArray = ["good", "fair", "poor", "very poor", "dying"];

class partyMember {
    constructor(name, isWagonLeader){
        this.name = name;
        this.isWagonLeader = isWagonLeader;
        this.diseases = [];
    }
}

class supplies {
    constructor(money){
        this.money = money;
        this.oxen = 0;
        this.clothSets = 0;
        this.bullets = 0;
        this.wheels = 0;
        this.axles = 0;
        this.tongues = 0;
        this.food = 0;
    }
}

class party {
    constructor(){
        this.partyMembers = [];
        this.supplies = null;
        this.pace = 1; //from 1 to 3
        this.health = 1; //from 1 to 5
        this.rations = 1; //from 1 to 3;
        this.wagonState = "stopped"; //stopped, resting, delayed, moving, tipped, or sank
    }

    //returns the pace in string format;
    get paceString(){
        return paceArray[this.pace -1];
    }

    get rationsString(){
        return rationsArray[this.rations - 1];
    }

    get healthString(){
        return healthArray[this.health - 1];
    }
}
