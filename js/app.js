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
    },
    comparePizzas: (customer, player) => {

        //making and sorting two lists based on the names of the customer toppings and player toppings
        const customerToppingObjArr = Array.from(Object.values(customer.favToppings))
        const customerToppingList = [];
        for (let i = 0; i < 4; i++) {
            customerToppingList.push(customerToppingObjArr[i].name)
        }
        

        const playerConstructedObjArr = Array.from(Object.values(player.constructedPizza))
        const playerConstructedList = [];
        for (let i = 0; i < 4; i++) {
            playerConstructedList.push(playerConstructedObjArr[i].name)
        }
    
        console.log(customerToppingList, playerConstructedList)

        //making the difference lists and evaluating them

        const $whatCustomerWanted = $(customerToppingList).not(playerConstructedList)
        const $whatPlayerMade = $(playerConstructedList).not(customerToppingList)


        console.log($whatCustomerWanted)
        console.log($whatPlayerMade)
        
        if ($whatCustomerWanted.length > 2) {
            console.log('You really screwed up my order. I want a refund!')
            gameLogic.tipPlayer(player, -15)
        } else if ($whatCustomerWanted.length === 2) {
            console.log(`You're not great at this. I wanted ${$whatCustomerWanted[0]} and ${$whatCustomerWanted[1]}, but you gave me ${$whatPlayerMade[0]} and ${$whatPlayerMade[1]} instead.`)
        } else if ($whatCustomerWanted.length === 1) {
            console.log(`It's not perfect, but you did ok. I wanted ${$whatCustomerWanted[0]}, but you gave me ${$whatPlayerMade[0]} instead.`)
                gameLogic.tipPlayer(player, 2)
        } else {
            console.log("Nice job... the perfect pizza!")
                gameLogic.tipPlayer(player, 5)
        }
        
        console.log('Player money :', player.money)
        console.log($whatCustomerWanted, $whatPlayerMade)
    },
    checkAutoLoss: ()=>{
        if (player1.money < 0 && player2.money < 0){
            console.log('You two are a disgrace! Even my cat makes better pizzas than you. Both of you, vamoose!')
            setTimeout(()=>{window.alert('Yikes! You both lost. Better luck next time.')}, 3000)
        } else if (player1.money < 0 || player2.money < 0){
            if (player1.money < 0) {
                console.log(`${player1.name}, you're outta here! You're costing me way too much money! ${player2.name}, you're hired!`)
                setTimeout(()=>{window.alert(`Great job, ${player2.name}! Enjoy your win with a delicious pizza.`)}, 3000)
            } else {
                console.log(`${player2.name}, get lost! You're makin' me go into debt. ${player1.name}, you're hired!`)
                setTimeout(()=>{window.alert(`Congrats, ${player1.name}! You're the pizza champ.`)}, 3000)
            }
        }
        
    }
}

const gameAssets = {
    topping: class Topping {
        constructor(name, isMeat) {
            this.name = name;
            this.isMeat = isMeat;
            // this.onPlayerPizza = false;
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
            this.isVegetarian = false;
            //for now, hardcoded. Veggie mode is a stretch
            this.favToppings = gameAssets.makeCustomerToppings()
        }
        sayHello() {
            console.log(`Hello, I\'m ${this.name}`);
        }
    },
    player: class Player {
        constructor(name) {
            this.name = name;
            this.money = 0;
            this.constructedPizza = [];
            this.autoLoss = false
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
player1.constructedPizza.push(toppingsList[gameLogic.randGen(toppingsList.length)])
player1.constructedPizza.push(toppingsList[gameLogic.randGen(toppingsList.length)])
player1.constructedPizza.push(toppingsList[gameLogic.randGen(toppingsList.length)])
player1.constructedPizza.push(toppingsList[gameLogic.randGen(toppingsList.length)])
const player2 = new gameAssets.player('Player 2')

console.log(ruthie)
console.log(greg)
console.log(toppingsList)
console.log(player1)


$( ()=>{
    

    
});