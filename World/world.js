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
        for (let c = 0; c<counterOfHuman; c++){ //создать нужное количество людей в начале !!!!!!!!!!!!!!!!!!!!!
            this.makeHuman();
        }
    }

    makeHuman(){
        let sex = Math.floor(Math.random() * 2); //рандом пол
        if(sex == 1){sex="male"} else{sex="female"}

        let hairColor = Math.floor(Math.random() * 3); //рандом цвет волос
        if(hairColor==1){hairColor="brown"} if(hairColor==2){hairColor="red"} else{hairColor="blond"}

        let eyesColor = Math.floor(Math.random() * 3); //рандом цвет глаз
        if(eyesColor==1){eyesColor="green"} if(eyesColor==2){eyesColor="blue"} else{eyesColor="brown"}

        let height = Math.floor(Math.random() * 50); //рандом начальный рост
        let weight = Math.floor(Math.random() * 5); //рандом начальный вес
        this.humanArr.push(new Humans(generateName(), generateSurname(), sex, hairColor, eyesColor, height, weight));
    }

    life() {
        let year = 0;
        let tempSexforPair = "";
        let tempPair = [];//нужно для добавления людей в пары
        const lifeInterval = setInterval(() => {
            if (year >= 80) {
                console.log(this.humanArr);
                clearInterval(lifeInterval);
            } else {
                this.humanArr.forEach((human) => {
                    human.age++;//взросление
                    if(human.age<18){
                        if(human.sex=="male"){//прибавление роста и веса
                            human.height += Math.floor(Math.random() * 20);
                            human.weight += Math.floor(Math.random() * 11);
                        }else{
                            human.height += Math.floor(Math.random() * 15);
                            human.weight += Math.floor(Math.random() * 9);
                        }
                    }
                    if(human.age>18 && human.age<60){
                        if(human.married == false){ //женидьба
                            if(tempSexforPair != human.sex && tempSexforPair.length>0){
                                tempPair.push(human)
                                this.pairArr.push(tempPair)
                                tempPair = [];
                                tempSexforPair = "";
                                human.married = true;
                            }
                            if(tempSexforPair == ""){
                                tempPair.push(human)
                                tempSexforPair = human.sex;
                                human.married = true;
                            }
                        }
                        if(this.pairArr.length != 0){//рождение
                            for (let c = 0; c<=this.pairArr.length/2; c++){
                                if(Math.floor(Math.random() * 25) == 0){
                                   this.makeHuman();
                                }
                            }
                        }
                    }
                    if (human.age>65){ //человек умер
                        if(Math.random() < (human.age-65)/100){ //с каждым годом шанс смерти увеличивается
                            let index = this.humanArr.indexOf(human); //убрать из списка людей
                            this.humanArr.splice(index, 1);
                            
                            if(human.married == true){
                            index = this.pairArr.indexOf(human);//убрать из списка браков
                            this.pairArr.splice(index, 1);
                            }
                            console.log(`Man dead at ${year} year`);
                        }
                    }
                });
                //console.log(this.humanArr);
                year++;
            }
        }, 10); // 1 секунда
    }
}

let world = new World(2);
world.life();