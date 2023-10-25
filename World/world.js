const { generateSurname, generateName } = require('./generateData');


class Humans{
    constructor(name,surname,sex,hairColor,eyesColor, height, weight){
        this.name = name;
        this.surname = surname;
        this.sex = sex;
        this.age = 0;
        this.weight = weight;
        this.height = height;
        this.hairColor = hairColor;
        this.eyesColor = eyesColor;
        this.married = false;
    }
}

class World{
    constructor(counterOfHuman){
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

            let hairColor = Math.floor(Math.random() * 4); // random hair color
            if(hairColor==1){hairColor="brown"} if(hairColor==2){hairColor="red"}if(hairColor==3){hairColor="dark"} if(hairColor==0){hairColor="blond"}

            let eyesColor = Math.floor(Math.random() * 4); // random eye color
            if(eyesColor==1){eyesColor="green"} if(eyesColor==2){eyesColor="blue"}if(eyesColor==3){eyesColor="hazel"} if(eyesColor==0){eyesColor="brown"}

            let height = Math.floor(Math.random() * 50); // random initial height
            let weight = Math.floor(Math.random() * 5); // random starting weight
            this.humanArr.push(new Humans(generateName(), generateSurname(), sex, hairColor, eyesColor, height, weight));
        }
    }

    makeHuman(hairColor, eyesColor){
        let sex = Math.floor(Math.random() * 2); // random gender
        if(sex == 1){sex="male"} else{sex="female"}

        let height = Math.floor(Math.random() * 50); // random initial height
        let weight = Math.floor(Math.random() * 5); // random initial weight
        this.humanArr.push(new Humans(generateName(), generateSurname(), sex, hairColor, eyesColor, height, weight));
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
                        if(human.sex=="male"){// increase in height and weight
                            human.height += Math.floor(Math.random() * 20);
                            human.weight += Math.floor(Math.random() * 11);
                        }else{
                            human.height += Math.floor(Math.random() * 15);
                            human.weight += Math.floor(Math.random() * 9);
                        }
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
                        if(this.pairArr.length != 0){// birth
                            for (let c = 0; c<=this.pairArr.length/2; c++){
                                if(Math.floor(Math.random() * 25) == 0){ // chance to have a baby
                                   this.makeHuman(this.pairArr[c][Math.floor(Math.random() * 2)].hairColor, this.pairArr[c][Math.floor(Math.random() * 2)].eyesColor);
                                   this.howMuchwasBorn++;
                                    if(Math.floor(Math.random() * 10) == 0){ // twins
                                        this.makeHuman(this.pairArr[c][Math.floor(Math.random() * 2)].hairColor, this.pairArr[c][Math.floor(Math.random() * 2)].eyesColor);
                                        this.howMuchwasBorn++;
                                        if(Math.floor(Math.random() * 20) == 0){ // triplets
                                            this.makeHuman(this.pairArr[c][Math.floor(Math.random() * 2)].hairColor, this.pairArr[c][Math.floor(Math.random() * 2)].eyesColor);
                                            this.howMuchwasBorn++;
                                        }
                                    } 
                                }
                            }
                            
                        }
                    }
                    if (human.age>this.timeOfDeath){ // the person died
                        if(Math.random() < (human.age-this.timeOfDeath)/100){ // Every year the chance of death increases
                            let index = this.humanArr.indexOf(human); // remove from the list of people
                            this.humanArr.splice(index, 1);
                            
                            if(human.married == true){
                            index = this.pairArr.indexOf(human);// remove from marriage list
                            this.pairArr.splice(index, 1);
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
                            this.catastropheMouse();
                            break;
                        case 1: // tanos snap
                            if(this.humanArr.length > 20){
                                console.log("!!!!!Tanos snap");
                                this.catastropheTanos();
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

    catastropheTanos(){
        this.humanArr.forEach((elem)=>{
            if (Math.floor(Math.random() * 2) == 1){ // kill half the world
                let index = this.humanArr.indexOf(elem); // remove from the list of people
                this.humanArr.splice(index, 1);
                this.howMuchwasDead++;
            }
        })
    }

    catastropheMouse(){
        this.humanArr.forEach((elem)=>{
            if (Math.floor(Math.random() * (this.startNumberofHumans*0.7)) == 0){ // the more people there were at the start, the lower the mortality rate
                let index = this.humanArr.indexOf(elem); // remove from the list of people
                this.humanArr.splice(index, 1);
                this.howMuchwasDead++;
            }
        })
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
        console.log(`--------------------------------------------------------------------------------`);
    }
}

let world = new World(2); // 2 people at the begining
world.life(150); // 150 years world will exist