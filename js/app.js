// console.log($)


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
    playerMakesPizza: (player)=>{
        player.constructedPizza = []
        // gameAssets.makeToppingList()
        for (let i = 0; i < toppingsList.length; i++) {
            toppingsList[i].onPlayerPizza = false;
        }
        while (player.constructedPizza.length < 4) {
            if (player.constructedPizza.length === 0) {
                window.alert("Let's put on some toppings!")
            }
            let randomTopping = gameLogic.randGen(toppingsList.length);
            randomTopping++;
            let input = window.prompt(`What would you like to put on the pizza? Type: 1 for ${toppingsList[0].name}, 2 for ${toppingsList[1].name}, 3 for ${toppingsList[2].name}, 4 for ${toppingsList[3].name}, 5 for ${toppingsList[4].name}, 6 for ${toppingsList[5].name}, 7 for ${toppingsList[6].name}, 8 for ${toppingsList[7].name}, 9 for ${toppingsList[8].name}, or 10 for ${toppingsList[9].name}.`, randomTopping)
            input--;
            if (toppingsList[input].onPlayerPizza === true) {
                window.alert(`Whoops, there's already ${toppingsList[input].name} on your pizza.`)
            } else {
                toppingsList[input].onPlayerPizza = true;
                player.constructedPizza.push(toppingsList[input])
            }
            if (player.constructedPizza.length === 1) {
                window.alert(`Your pizza currently has ${player.constructedPizza[0].name} on it.`)
            } else if (player.constructedPizza.length === 2) {
                window.alert(`Your pizza currently has ${player.constructedPizza[0].name} and ${player.constructedPizza[1].name} on it.`)
            } else if (player.constructedPizza.length === 3) {
                window.alert(`Your pizza currently has ${player.constructedPizza[0].name}, ${player.constructedPizza[1].name}, and ${player.constructedPizza[2].name} on it.`)
            } else {
                window.alert(`Your pizza currently has ${player.constructedPizza[0].name}, ${player.constructedPizza[1].name}, ${player.constructedPizza[2].name},and ${player.constructedPizza[3].name} on it.`)
            }
        }
        window.alert('Ok! Time to see how you did!')
    },
    askForPizza: (customer, player)=>{
        if (day === 0) {
            console.log(`Hi ${player.name}! My name is ${customer.name}. Can you please make me a pizza with ${customer.favToppings[0].name}, ${customer.favToppings[1].name}, ${customer.favToppings[2].name}, and ${customer.favToppings[3].name}? Thanks!`)
        } else {
            console.log(`Hey ${player.name}, it's me, ${customer.name}! Just the usual, please.`)
        }
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
    
        // console.log(customerToppingList, playerConstructedList)

        //making the difference lists and evaluating them

        const $whatCustomerWanted = $(customerToppingList).not(playerConstructedList)
        const $whatPlayerMade = $(playerConstructedList).not(customerToppingList)


        // console.log($whatCustomerWanted)
        // console.log($whatPlayerMade)
        
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
        if(player.money < 0) {
            player.autoLoss = true
        }
        
        // console.log('Player money :', player.money)
        // console.log($whatCustomerWanted, $whatPlayerMade)
    },
    checkAutoLoss: ()=>{
        if (player1.money < 0 && player2.money < 0){
            console.log('You two are a disgrace! Even my cat makes better pizzas than you. Both of you, vamoose!')
            setTimeout(()=>{window.alert('Yikes! You both lost. Better luck next time.')}, 3000);
            return 1
        } else if (player1.money < 0 || player2.money < 0){
            if (player1.money < 0) {
                console.log(`${player1.name}, you're outta here! You're costing me way too much money! ${player2.name}, you're hired!`)
                setTimeout(()=>{window.alert(`Great job, ${player2.name}! Enjoy your win with a delicious pizza.`)}, 3000);
                return 1
            } else {
                console.log(`${player2.name}, get lost! You're makin' me go into debt. ${player1.name}, you're hired!`)
                setTimeout(()=>{window.alert(`Congrats, ${player1.name}! You're the pizza champ.`)}, 3000);
                return 1
            }
        }
        
    },
    checkWinner: ()=>{
        if (player1.money === player2.money) {
            console.log('You two are equally good... for a coupla punks. Aw, what the heck... you\'re both hired!')
        } else if (player1.money > player2.money) {
            console.log(`${player1.name}, I think we can all see you're top pizzamaker. ${player2.name}, scram!`)
        } else {
            console.log(`${player2.name}, the pizza whisperer. Come back new week!`)
        }
        return;
    },
    runDayLoop: ()=>{
        if (day === 0) {
            for (let i = 0; i < 3; i++) {
                gameLogic.askForPizza(fullCustomerList[i], player1)
            }
            for (let i = 3; i < 6; i++) {
                gameLogic.askForPizza(fullCustomerList[i], player2)
            }
            day++;
        } else {
            window.alert(`It's Day ${day}. Let's make some freakin' pizza!!`)
            const todaysCustomerP1 = fullCustomerList[gameLogic.randGen(fullCustomerList.length)];
            const todaysCustomerP2 = fullCustomerList[gameLogic.randGen(fullCustomerList.length)];
            gameLogic.askForPizza(todaysCustomerP1, player1);
            gameLogic.playerMakesPizza(player1)
            gameLogic.comparePizzas(todaysCustomerP1, player1);
            gameLogic.askForPizza(todaysCustomerP2, player2);
            gameLogic.playerMakesPizza(player2)
            gameLogic.comparePizzas(todaysCustomerP2, player2);
            window.alert(`Long night! ${player1.name} has $${player1.money} and ${player2.name} has $${player2.money}.`);
            day++;
        }
    },
    fullGame: ()=>{
        let input = window.prompt('Welcome to Pizzafreak! How many days do you want to compete?', '3')
        const p1Name = window.prompt('Please type Player 1\'s name', 'Player 1');
        const p2Name = window.prompt('Please type Player 2\'s name', 'Player 2')
        player1.name = p1Name;
        player2.name = p2Name;
        input++;
        while (day < input) {
            gameLogic.runDayLoop()
            if (gameLogic.checkAutoLoss() === 1) {
                return;
            };
        }
        gameLogic.checkWinner()
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
        // const toppingsList = gameAssets.makeToppingList()
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

const position1 = 'left: 750px; top: 520px';
const position2 = 'left: 790px; top: 675px';
const position2 = 'left: 645px; top: 725px';

const position4 = 'left: 565px; top: 575px';

gameAssets.makeToppingList()

let day = 0;

const ruthie = new gameAssets.customer('Ruthie')
const kathleen = new gameAssets.customer('Kathleen')
const chris = new gameAssets.customer('Chris')
const greg = new gameAssets.customer('Greg')
const margaret = new gameAssets.customer('Margaret')
const michelle = new gameAssets.customer('Michelle')

const fullCustomerList = [ruthie, kathleen, chris, greg, margaret, michelle]

const player1 = new gameAssets.player('Player 1')
// player1.constructedPizza.push(toppingsList[gameLogic.randGen(toppingsList.length)])
// player1.constructedPizza.push(toppingsList[gameLogic.randGen(toppingsList.length)])
// player1.constructedPizza.push(toppingsList[gameLogic.randGen(toppingsList.length)])
// player1.constructedPizza.push(toppingsList[gameLogic.randGen(toppingsList.length)])
const player2 = new gameAssets.player('Player 2')

// console.log(ruthie)
// console.log(greg)
// console.log(toppingsList)
// console.log(player1)

// gameLogic.fullGame();

console.log('Please type the following to play:')
console.log('gameLogic.fullGame()')
console.log('Reload (Command-R) when the game is over to play again')

$( ()=>{
    

    
});