class Penguin {
    constructor(swimmingSpeed) {
        this.swimmingSpeed = swimmingSpeed;
        this.createElement();
    }

    createElement() {
        this.element = document.createElement("div");
        this.element.setAttribute("type", "penguin");
        let atext = document.createElement("p");
        atext.innerHTML = "The Penguin Swimming Speed is:" + this.swimmingSpeed + "km/h";
        let aImage = document.createElement("img");
        aImage.src = "./images/img03.jpg";
        this.element.appendChild(aImage);
        this.element.appendChild(atext);
        return this.element;
    }
}

class Rabbit {
    constructor(speed) {
        this.speed = speed;
        this.createElement();
    }

    createElement() {
        this.element = document.createElement("div");
        this.element.setAttribute("type", "rabbit")
        let atext = document.createElement("p");
        atext.innerHTML = "The Rabbit Speed is:" + this.speed + "km/h";
        let aImage = document.createElement("img");
        aImage.src = "./images/img02.jpg";
        this.element.appendChild(aImage);
        this.element.appendChild(atext);
        return this.element;
    }
}

class Elephant {
    constructor(pWeight) {
        this.weight = pWeight;
        this.createElement();
    }

    createElement() {
        this.element = document.createElement("div");
        this.element.setAttribute("type", "elephant")
        let atext = document.createElement("p");
        atext.innerHTML = "The Elephant Weight is:" + this.weight + "kg";
        let aImage = document.createElement("img");
        aImage.src = "./images/img01.jpg";
        this.element.appendChild(aImage);
        this.element.appendChild(atext);
        return this.element;
    }
}

class CreateAnimals {
    constructor(animalsArray) {
        this.animals = animalsArray;
        this.createAnimals();
    }

    createAnimals() {
        // Here I'm looping through the animals array and create animals based on animal type
        this.animals.forEach(animal => {
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
            }
        })
    }
}

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

new CreateAnimals(aData);

let removedAnimals = []; // Here I'll store all removed animals

function removeAnimalOnClick(event) {
    const animals = Array.from(document.getElementById('Animals_div').children)
    const index = animalss.indexOf(event.currentTarget);
    if(index === -1) {
        console.log("Can't remove the right animal")
    }
    // I want to know index of the removed element because the animals order is important 
    // for me and I'll use it when I'll return all removed animals
    removedAnimals.unshift({index: index, element: event.currentTarget});
    aList.removeChild(event.currentTarget);
}
const animals = Array.from(document.getElementById('Animals_div').children)
animals.forEach(function (check) {
    check.addEventListener('click', removeAnimalOnClick);
})

function animalsGoBack() {
    removedAnimals.forEach(animal => { // below i use the index to return the animal to its place
        aList.insertBefore(animal.element, aList.children[animal.index])
    })
    removedAnimals = [];
}

function leaveOnlyPenguin() {
    const animals = Array.from(document.getElementById('Animals_div').children)
    animals.forEach(animal => {
        if(animal.attributes[0].value === 'rabbit' || animal.attributes[0].value === 'elephant') {
            removeAnimal(animal);
        }
    })
}

function removeAnimal(animal) {
    const animals = Array.from(document.getElementById('Animals_div').children)
    const index = animals.indexOf(animal)
    removedAnimals.unshift({index: index, element: animal})
    aList.removeChild(animal);
}