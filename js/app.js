// console.log($)



//Game Assets

const gameLogic = {
    randGen: (num)=>{
        return Math.floor(Math.random() * num)
    },
    incrementDay: ()=>{
        day++;
    },
    tipPlayer: (player, tipMoney)=>{
        player.money += tipMoney;
    }
}

const gameAssets = {
    topping: class Topping {
        constructor(name, isMeat) {
            this.name = name;
            this.isMeat = isMeat;
            this.onPlayerPizza = false;
        }
    },
    makeToppingList: ()=>{
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

        toppingsList = [onions, hots, mushrooms, broccoli, pineapple, pepperoni, sausage, ham, bacon, chicken]

        return toppingsList
    },
    makeCustomerToppings: ()=>{
        const toppingsList = gameAssets.makeToppingList()
        const favToppingsSet = new Set()
        while (favToppingsSet.size < 4) {
            favToppingsSet.add(toppingsList[gameLogic.randGen(toppingsList.length)])
        }
        const favToppingsList = Array.from(favToppingsSet)
        return favToppingsList;
    },  
    customer: class Customer {
        constructor(name) {
            this.name = name;
            this.favToppings = gameAssets.makeCustomerToppings()
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
}

gameAssets.makeToppingList()

let day = 0;

const ruthie = new gameAssets.customer('Ruthie')
const kathleen = new gameAssets.customer('Kathleen')
const chris = new gameAssets.customer('Chris')
const greg = new gameAssets.customer('Greg')
const margaret = new gameAssets.customer('Margaret')
const michelle = new gameAssets.customer('Michelle')

const player1 = new gameAssets.player('Player 1')
const player2 = new gameAssets.player('Player 2')

console.log(ruthie)
console.log(greg)
console.log(toppingsList)
console.log(player1)


$( ()=>{
    

    
});