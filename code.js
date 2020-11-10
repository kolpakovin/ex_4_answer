class AnimalFarm {
    constructor(farmIdentifier) {
        this.farm = farmIdentifier; // In case we want to make more farms in the future
        this.removedAnimals = [];  // Here I'll store all removed animal
    }
    
    add(animals) {
        animals.forEach(animal => {
            let createdAnimal;
            switch (animal.type) {
                case "elephant":
                    createdAnimal = new Elephant(animal.weight);
                    break;
                case "rabbit":
                    createdAnimal = new Rabbit(animal.speed);
                    break;
                case "penguin":
                    createdAnimal = new Penguin(animal.swimmingSpeed);
                    break;
                default:
                    console.error("We don't support the creation of this animal");
                    return;
            };
            this.farm.appendChild(createdAnimal.element);
        });
    };

    removeAnimalOnClick(event) {
        const parentNodeId = event.currentTarget.parentNode.id;
        const animals = Array.from(animalFarm.farm.children);
        const index = animals.indexOf(event.currentTarget);
        // I want to know index of the removed element because the animals order is important 
        // for me and I'll use it when I'll return all removed animals
        if(index === -1) {
            console.error("Can't remove the right animal")
        };
        switch(parentNodeId) {
            case "Animals_div":
                animalFarm.removedAnimals.push({index: index, element: event.currentTarget});
                animalFarm.farm.removeChild(event.currentTarget);
                break;
            default:
                console.error("No such farm exists");
                return;
        };
    };

    returnDeletedAnimals() {
        for(let i = this.removedAnimals.length - 1; i >= 0; i--){ // Here I use the index to return the animal to its place
            this.farm.insertBefore(this.removedAnimals[i].element, aList.children[this.removedAnimals[i].index]);
        }
        this.removedAnimals = [];
    };
    
    leaveOnlyPenguin() {
        const animals = Array.from(aList.children)
        animals.forEach(animal => {
            if (animal.attributes[0].value === 'rabbit' || animal.attributes[0].value === 'elephant') {
                this.removeAnimal(animal);
            };
        });
    };
    
    removeAnimal(animal) {
        const animals = Array.from(this.farm.children)
        const index = animals.indexOf(animal)
        this.removedAnimals.push({index: index, element: animal})
        this.farm.removeChild(animal);
    };
};

let aList = document.getElementById("Animals_div"); 
const animalFarm = new AnimalFarm(aList);

class Animal {
    constructor(specialProperty) {
        this.specialProperty = specialProperty;
    };

    createElement() {
        this.element = document.createElement("div");
        this.element.setAttribute("type", this.type); 
        let atext = document.createElement("p");
        atext.innerHTML = this.note;
        let aImage = document.createElement("img");
        aImage.src = this.image;
        this.element.appendChild(aImage);
        this.element.appendChild(atext);
        this.element.addEventListener('click', animalFarm.removeAnimalOnClick);
        return this.element;
    };
};

class Penguin extends Animal {
    constructor(specialProperty) {
        super(specialProperty);
        this.type = "penguin";
        this.note = "The Penguin Swimming Speed is:" + this.specialProperty + "km/h";
        this.image = "./images/img03.jpg";
        this.createElement();
    };
};

class Rabbit extends Animal {
    constructor(specialProperty) {
        super(specialProperty);
        this.type = "rabbit";
        this.note = "The Rabbit Speed is:" + this.specialProperty + "km/h";
        this.image = "./images/img02.jpg";
        this.createElement();
    };
};

class Elephant extends Animal{
    constructor(specialProperty) {
        super(specialProperty);
        this.type = "elephant";
        this.note = "The Elephant Weight is:" + this.specialProperty + "kg";
        this.image = "./images/img01.jpg";
        this.createElement();
    };
};


let aAnimal1 = new Elephant(780);
let aAnimal2 = new Elephant(650);
let aAnimal3 = new Elephant(300);
let aAnimal4 = new Elephant(500);

aList.appendChild(aAnimal1.element);
aList.appendChild(aAnimal2.element);
aList.appendChild(aAnimal3.element);
aList.appendChild(aAnimal4.element);

let aData = [{ "type": "elephant", "weight": 660 }, { "type": "rabbit", "speed": 44 }, { "type": "penguin", "swimmingSpeed": 750 }, { "type": "elephant", "weight": 600 }, { "type": "penguin", "swimmingSpeed": 60 }];

animalFarm.add(aData);