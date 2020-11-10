class Animal {
    constructor(specialProperty) {
        this.specialProperty = specialProperty;
    }

    createElement() {
        this.element = document.createElement("div");
        this.element.setAttribute("type", this.type); 
        let atext = document.createElement("p");
        atext.innerHTML = this.note;
        let aImage = document.createElement("img");
        aImage.src = this.image;
        this.element.appendChild(aImage);
        this.element.appendChild(atext);
        this.element.addEventListener('click', AnimalFarm.removeAnimalOnClick);
        return this.element;
    }
}

class Penguin extends Animal {
    constructor(specialProperty) {
        super(specialProperty);
        this.type = "penguin";
        this.note = "The Penguin Swimming Speed is:" + this.specialProperty + "km/h";
        this.image = "./images/img03.jpg";
        this.createElement();
    }
}

class Rabbit extends Animal {
    constructor(specialProperty) {
        super(specialProperty);
        this.type = "rabbit";
        this.note = "The Rabbit Speed is:" + this.specialProperty + "km/h";
        this.image = "./images/img02.jpg";
        this.createElement();
    }
}

class Elephant extends Animal{
    constructor(specialProperty) {
        super(specialProperty);
        this.type = "elephant";
        this.note = "The Elephant Weight is:" + this.specialProperty + "kg";
        this.image = "./images/img01.jpg";
        this.createElement();
    }
}

class AnimalFarm {
    constructor(animals) {
        if(!AnimalFarm.instance) { // I want to be sure that nobody mess with the singleton
            this.animals = animals;
            this.removedAnimals = [];  // Here I'll store all removed animals
            AnimalFarm.instance = this;
        }
        return AnimalFarm.instance;
    }
    
    static create(animals) {
        animals.forEach(animal => {
            switch (animal.type) {
                case "elephant":
                    aList.appendChild(new Elephant(animal.weight).element);
                    break;
                case "rabbit":
                    aList.appendChild(new Rabbit(animal.speed).element);
                    break;
                case "penguin":
                    aList.appendChild(new Penguin(animal.swimmingSpeed).element);
                    break;
                default:
                    console.error("We don't support the creation of this animal")
            };
        });
    };
    static removeAnimalOnClick(event) {
        const animals = Array.from(document.getElementById('Animals_div').children)
        const index = animals.indexOf(event.currentTarget);
        if(index === -1) {
            console.log("Can't remove the right animal")
        }
        // I want to know index of the removed element because the animals order is important 
        // for me and I'll use it when I'll return all removed animals
        animalFarm.removedAnimals.unshift({index: index, element: event.currentTarget});
        aList.removeChild(event.currentTarget);
    }

    returnDeletedAnimals() {
        animalFarm.removedAnimals.forEach(animal => { // below i use the index to return the animal to its place
            aList.insertBefore(animal.element, aList.children[animal.index])
        })
        animalFarm.removedAnimals = [];
    }
    
    leaveOnlyPenguin() {
        const animals = Array.from(this.animals.children)
        animals.forEach(animal => {
            if(animal.attributes[0].value === 'rabbit' || animal.attributes[0].value === 'elephant') {
                AnimalFarm.removeAnimal(animal);
            }
        })
    }
    
    static removeAnimal(animal) {
        const animals = Array.from(document.getElementById('Animals_div').children)
        const index = animals.indexOf(animal)
        animalFarm.removedAnimals.unshift({index: index, element: animal})
        aList.removeChild(animal);
    }
};


let aList = document.getElementById("Animals_div");

let aAnimal1 = new Elephant(780);
let aAnimal2 = new Elephant(650);
let aAnimal3 = new Elephant(300);
let aAnimal4 = new Elephant(500);

aList.appendChild(aAnimal1.element);
aList.appendChild(aAnimal2.element);
aList.appendChild(aAnimal3.element);
aList.appendChild(aAnimal4.element);

let aData = [{ "type": "elephant", "weight": 660 }, { "type": "rabbit", "speed": 44 }, { "type": "penguin", "swimmingSpeed": 750 }, { "type": "elephant", "weight": 600 }, { "type": "penguin", "swimmingSpeed": 60 }];

AnimalFarm.create(aData);
const animalFarm = new AnimalFarm(aList);

