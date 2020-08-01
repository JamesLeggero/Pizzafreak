console.log($)

// $( ()=>{


// });


const gameAssets = {   
    customer: class Customer {
        constructor(name) {
            this.name = name;
            this.favToppings = [];
            this.isVegetarian = false;
            //for now, hardcoded. Veggie mode is a stretch
        }
        sayHello() {
            console.log(`Hello, I\'m ${this.name}`);
        }

    },
    player: class Player {
        constructor(name) {
            this.name = name;
            this.money = 0;
            this.constructedPizza = []
        }
    },
    topping: class Topping {
        constructor(name, isMeat) {
            this.name = name;
            this.isMeat = isMeat;
            this.onPlayerPizza = false;
        }
    },
}
const ruthie = new gameAssets.customer('Ruthie')
const kathleen = new gameAssets.customer('Kathleen')
const chris = new gameAssets.customer('Chris')
const greg = new gameAssets.customer('Greg')
const margaret = new gameAssets.customer('Margaret')
const michelle = new gameAssets.customer('Michelle')

const player1 = new gameAssets.player('Player 1')
const player2 = new gameAssets.player('Player 2')

const onions = new gameAssets.topping('onions', false);
const hots = new gameAssets.topping('hot peppers', false);
const mushrooms = new gameAssets.topping('mushrooms', false);
const broccoli = new gameAssets.topping('broccoli', false);
const pineapple = new gameAssets.topping('pineapples', false);
const pepperoni = new gameAssets.topping('pepperoni', true);
const sausage = new gameAssets.topping('sausage', true);
const ham = new gameAssets.topping('ham', true);
const bacon = new gameAssets.topping('bacon', true);
const chicken = new gameAssets.topping('chicken', true);

const toppingsList = [onions, hots, mushrooms, broccoli, pineapple, pepperoni, sausage, ham, bacon, chicken]


console.log(ruthie.sayHello())

