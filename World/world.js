const { generateSurname, generateName } = require('./generateData');

class Catastrophe{
    constructor(){
        this.howMuchwasDead;
    }

    catastropheTanos(humanArr){
        humanArr.forEach((elem)=>{
            if (Math.floor(Math.random() * 2) == 1){ // kill half the world
                let index = humanArr.indexOf(elem); // remove from the list of people
                humanArr.splice(index, 1);
                this.howMuchwasDead++;
            }
        })
        return humanArr;
    }

    catastropheMouse(humanArr, startNumberofHumans){
        humanArr.forEach((elem)=>{
            if (Math.floor(Math.random() * (startNumberofHumans*0.7)) == 0){ // the more people there were at the start, the lower the mortality rate
                let index = humanArr.indexOf(elem); // remove from the list of people
                humanArr.splice(index, 1);
                this.howMuchwasDead++;
            }
        })
        return humanArr;
    }
}


class Humans{

    constructor(name,surname,hairColor,eyesColor,sex){
        this.name = name;
        this.surname = surname;
        if(sex==undefined){
            if(Math.floor(Math.random() * 2) == 1){this.sex="male"} else{this.sex="female"}// random gender
        }else{
            this.sex = sex;// if start gender is defined
        }
        this.age = 0;
        this.weight = Math.floor(Math.random() * 5); // random initial weight
        this.height = Math.floor(Math.random() * 50); // random initial height
        if(hairColor==undefined && eyesColor == undefined){
            let hairColor = Math.floor(Math.random() * 4); // random hair color
            if(hairColor==1){this.hairColor="brown"} if(hairColor==2){this.hairColor="red"}if(hairColor==3){this.hairColor="dark"} if(hairColor==0){this.hairColor="blond"}

            let eyesColor = Math.floor(Math.random() * 4); // random eye color
            if(eyesColor==1){this.eyesColor="green"} if(eyesColor==2){this.eyesColor="blue"}if(eyesColor==3){this.eyesColor="hazel"} if(eyesColor==0){this.eyesColor="brown"}
        }else{
            this.hairColor = hairColor;
            this.eyesColor = eyesColor;
        }

        this.married = false;
    }

    growUp(){
        if(this.sex=="male"){// increase in height and weight
            this.height += Math.floor(Math.random() * 20);
            this.weight += Math.floor(Math.random() * 11);
        }else{
            this.height += Math.floor(Math.random() * 15);
            this.weight += Math.floor(Math.random() * 9);
        }
    }

    giveBirth(hairColor, eyesColor) {
        const child = new Humans(generateName(), generateSurname(), hairColor, eyesColor, undefined);
        return child;
    }

    deleteHuman(humanArr){
        let index = humanArr.indexOf(this); // remove from the list of people
        humanArr.splice(index, 1);

        return humanArr;
    }
}

class World{
    constructor(counterOfHuman){
        this.catastrophe = new Catastrophe()
        this.humanArr = [];
        this.pairArr = [];
        this.timeOfDeath = 65;
        this.startNumberofHumans = counterOfHuman;
        this.year = 0;
        this.howMuchwasBorn = 0;
        this.howMuchwasDead = 0;
        for (let c = 0; c<counterOfHuman; c++){ // create the required number of people at the beginning
            let sex="";
            if(c%2 == 0){sex="male"} else{sex="female"}

            this.humanArr.push(new Humans(generateName(), generateSurname(), undefined, undefined, sex));
        }
    }

    life(howYears) {
        let tempSexforPair = "";
        let tempPair = [];// needed to add people to pairs

        const lifeInterval = setInterval(() => {
            if (this.year >= howYears) {
                //console.log(this.humanArr);
                console.log(`At final year live ${this.humanArr.length} people`)
                clearInterval(lifeInterval);
            } else {
                this.year++;
                this.humanArr.forEach((human) => {
                    human.age++;// growing up
                    if(human.age<18){
                        human.growUp();
                    }
                    if(human.age>18 && human.age<60){
                        if(human.married == false){ // женидьба
                            if(tempSexforPair != human.sex && tempSexforPair.length>0){ // if you found a couple
                                tempPair.push(human)
                                this.pairArr.push(tempPair)
                                tempPair = [];
                                tempSexforPair = "";
                                human.married = true;
                            }
                            if(tempSexforPair == ""){ // first person for a couple
                                tempPair.push(human)
                                tempSexforPair = human.sex;
                                human.married = true;
                            }
                        }
                        if (this.pairArr.length != 0) {
                            for (let c = 0; c <= this.pairArr.length / 2; c++) {
                                if (Math.floor(Math.random() * 25) == 0) { // chance to have a baby
                                    const child = this.humanArr[0].giveBirth(this.pairArr[c][Math.floor(Math.random() * 2)].hairColor,
                                    this.pairArr[c][Math.floor(Math.random() * 2)].eyesColor);//generate random hair and color deppends fom parents
                                    this.humanArr.push(child);// add child to population
                                    this.howMuchwasBorn++;// for statistics
                                    if (Math.floor(Math.random() * 10) == 0) { // twins
                                        const child2 = this.humanArr[0].giveBirth(this.pairArr[c][Math.floor(Math.random() * 2)].hairColor, 
                                        this.pairArr[c][Math.floor(Math.random() * 2)].eyesColor);//generate random hair and color deppends fom parents
                                        this.humanArr.push(child2);// add child to population
                                        this.howMuchwasBorn++;// for statistics
                                        if (Math.floor(Math.random() * 20) == 0) { // triplets
                                            const child3 = this.humanArr[0].giveBirth(this.pairArr[c][Math.floor(Math.random() * 2)].hairColor, 
                                            this.pairArr[c][Math.floor(Math.random() * 2)].eyesColor);//generate random hair and color deppends fom parents
                                            this.humanArr.push(child3);// add child to population
                                            this.howMuchwasBorn++;// for statistics
                                        }
                                    }
                                }
                            }
                        }
                    }
                    if (human.age>this.timeOfDeath){ // the person died
                        if(Math.random() < (human.age-this.timeOfDeath)/100){ // Every year the chance of death increases
                            this.humanArr = human.deleteHuman(this.humanArr);
                            
                            if(human.married == true){
                                this.pairArr = human.deleteHuman(this.pairArr);
                            }

                            this.howMuchwasDead++;
                            //console.log(`${human.name} ${human.surname} dead at ${this.year} year it was ${human.age} years old`);
                        }
                    }
                });
                if(this.year%20 == 0 && this.year>50){ // if a year is a multiple of 20 or more than 50, then a catastrophe may occur
                    let catastrophe = Math.floor(Math.random() * 3);
                    switch (catastrophe) {
                        case 0: // peaceful mouse want to play
                            console.log("!!!!!Peaceful mouse want to play");
                            this.humanArr = this.catastrophe.catastropheMouse(this.humanArr, this.startNumberofHumans);
                            this.howMuchwasDead += this.catastrophe.howMuchwasDead;
                            break;
                        case 1: // tanos snap
                            if(this.humanArr.length > 20){
                                console.log("!!!!!Tanos snap");
                                this.humanArr = this.catastrophe.catastropheTanos(this.humanArr);
                                this.howMuchwasDead += this.catastrophe.howMuchwasDead;
                            }else{
                                console.log("!!!!!You are lucky Tanos didn't snap");
                            }
                            break;
                        case 2: // soviet union scientist wants to create reactor... ups something go wrong
                            console.log("!!!!!Soviet union scientist wants to create reactor... ups something go wrong");
                            this.timeOfDeath -= 8;
                            break;
                    }
                }
                if (this.year % 20 === 0) {
                    this.printStatistics()
                }
                
                if(this.humanArr.length <=0){
                    console.log("Your civilization dead");
                    this.year = 100000;
                }
            }
        }, 10);
    }


    printStatistics(){        
        // Statistics
        let totalMen = 0; 
        let totalWomen = 0; 
        let totalAge = 0; 
        let totalMarried = 0; 
        let totalWeight = 0;
        let totalHeight = 0; 

        // Initialize objects to keep track of counts for hair colors and eye colors
        const hairColorCounts = {
            brown: 0,
            red: 0,
            blond: 0
        };

        const eyesColorCounts = {
            green: 0,
            blue: 0,
            brown: 0
        };

        // Iterate through the humanArr array to calculate statistics
        this.humanArr.forEach((human) => {
            if (human.sex === "male") {
                totalMen++; // Increment the count of males
            } else {
                totalWomen++; // Increment the count of females
            }

            totalAge += human.age; // Accumulate the age of each individual

            if (human.married) {
                totalMarried++; // Increment the count of married individuals
            }

            totalWeight += human.weight; // Accumulate the weight of each individual
            totalHeight += human.height; // Accumulate the height of each individual

            // Update the counts for different hair and eye colors
            hairColorCounts[human.hairColor]++;
            eyesColorCounts[human.eyesColor]++;
        });

        // Calculate the average age, weight, and height for the individuals in the array
        const averageAge = totalAge / this.humanArr.length;
        const averageWeight = totalWeight / this.humanArr.length;
        const averageHeight = totalHeight / this.humanArr.length;

        // Find the most popular hair color and eye color by finding the key with the highest count
        const mostPopularHairColor = Object.keys(hairColorCounts).reduce((a, b) => hairColorCounts[a] > hairColorCounts[b] ? a : b);
        const mostPopularEyesColor = Object.keys(eyesColorCounts).reduce((a, b) => eyesColorCounts[a] > eyesColorCounts[b] ? a : b);

        
        console.log(`--------------------------------------------------------------------------------`);
        console.log(`Year: ${this.year}`);
        console.log(`Total Men: ${totalMen}`);
        console.log(`Total Women: ${totalWomen}`);
        console.log(`Average Age: ${averageAge.toFixed(2)}`);
        console.log(`Total Married: ${totalMarried}`);
        console.log(`Average Weight: ${averageWeight.toFixed(2)}`);
        console.log(`Average Height: ${averageHeight.toFixed(2)}`);
        console.log(`Most Popular Hair Color: ${mostPopularHairColor}`);
        console.log(`Most Popular Eyes Color: ${mostPopularEyesColor}`);
        console.log(`Born: ${this.howMuchwasBorn}`);
        console.log(`Dead: ${this.howMuchwasDead}`);
        console.log(`Dead from catastrophe: ${this.catastrophe.howMuchwasDead}`);
        console.log(`--------------------------------------------------------------------------------`);
        this.howMuchwasDead = 0;
        this.howMuchwasBorn = 0;
        this.catastrophe.howMuchwasDead = 0;
        //console.log(this.humanArr);
    }
}

let world = new World(2); // 2 people at the begining
world.life(150); // 150 years world will exist