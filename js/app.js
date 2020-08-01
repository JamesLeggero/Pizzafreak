console.log($)

$( ()=>{

    class Customer {
        constructor(name) {
            this.name = name;
            this.favToppings = [];
            this.isVegetarian = false;
            //for now, hardcoded. Veggie mode is a stretch
        }
        sayHello() {
            console.log(`Hello, I\'m ${this.name}`);
    
        }
    }
    class Topping {
        constructor(name, isMeat) {
            this.name = name;
            this.isMeat = isMeat;
            this.onPlayerPizza = false;
        }
    }
    class Player {
        constructor(name) {
            this.name = name;
            this.money = 0;
            this.constructedPizza = []
        }
    }

    //Customers
    const ruthie = new Customer('Ruthie');
    const kathleen = new Customer('Kathleen');
    const chris = new Customer('Chris');
    const greg = new Customer('Greg');
    const margaret = new Customer('Margaret');
    const michelle = new Customer('Michelle');

    //Toppings
    const onions = new Topping('onions', false);
    const hots = new Topping('hot peppers', false);
    const mushrooms = new Topping('mushrooms', false)
    const tomatoes = new Topping('tomatoes', false)
    const pineapples = new Topping('pineapple', false)
    const pepperoni = new Topping('pepperoni', true)
    const sausage = new Topping ('sausage', true)
    const ham = new Topping('ham', true)
    const bacon = new Topping('bacon', true)
    const chicken = new Topping('chicken', true)

    const toppingsList = [onions, hots, mushrooms, tomatoes, pineapples, pepperoni, sausage, ham, bacon, chicken]

    //Players (for now, limited to 2)
    //Stretch = add an input/function that asks for player's name, then creates the new player)
    const player1 = new Player('Player 1');
    const player2 = new Player('Player 2')


    // console.log(ruthie)

});

// const add = (num1, num2) => {
//     return num1 + num2
// }