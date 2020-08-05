// console.log($)

$( ()=>{

const gameLogic = {
    randGen: (num)=>{
        return Math.floor(Math.random() * num)
    },
    tipPlayer: (player, tipMoney)=>{
        player.money += tipMoney;
    },
    removeAllToppings: (player)=>{
        const $removedTopping = $('.topping')
        $removedTopping.removeAttr('style')
        player.constructedPizza = []

    },
    playerMakesPizza: (customer, player)=>{
        const $updatingText = $('#updatingText')
        $updatingText.text(`${player.name} is making a pizza for ${customer.name}. Click on a topping to add it to the pizza!`)
        player.constructedPizza = []
        gameAssets.makeToppingList()
        for (let i = 0; i < toppingsList.length; i++) {
            toppingsList[i].onPlayerPizza = false;
        }
        const $remakeButton = $("<button id='remakePizza'>Remake Pizza</button>")
        $remakeButton.appendTo($('.toppingPan'))
        const $confirmButton = $("<button id='confirmPizza'>Confirm Pizza</button>")
        $confirmButton.appendTo($('.toppingPan'))
        const $topping = $('.topping')

//Defines positions of potential toppings on pizza
        const position0 = 'left: 690px; top: 65px;';
        const position1 = 'left: 760px; top: 230px';
        const position2 = 'left: 610px; top: 300px';
        const position3 = 'left: 540px; top: 140px';


        const moveToppingToPizza = (event) => {
            const toppingObject = toppingsList[$topping.index(event.currentTarget)]
            
            if (player.constructedPizza.length === 0) {
                $(event.currentTarget).attr('style', position0)
                player.constructedPizza.push(toppingObject)
            } else if (player.constructedPizza.length === 1) {
                $(event.currentTarget).attr('style', position1)
                player.constructedPizza.push(toppingObject)
            } else if (player.constructedPizza.length === 2) {
                $(event.currentTarget).attr('style', position2)
                player.constructedPizza.push(toppingObject)
            } else if (player.constructedPizza.length === 3) {
                $(event.currentTarget).attr('style', position3)
                player.constructedPizza.push(toppingObject)
            }
        }
        $topping.on('click', moveToppingToPizza)
        $remakeButton.on('click', () => {
            gameLogic.removeAllToppings(player)

        })

        $confirmButton.on('click', ()=>{
            if (player.constructedPizza.length < 4){
                $updatingText.text('You must put 4 toppings on!') 
                setTimeout(()=>{$updatingText.text(`${player.name} is making a pizza for ${customer.name}. Click on a topping to add it to the pizza!`)}, 3000) 
            } else {
            
                gameLogic.comparePizzas(customer, player)
                $topping.off('click', moveToppingToPizza)
            }



        })
    },
    askForPizza: (customer, player)=>{
       
            gameLogic.removeAllToppings(player)
            const $updatingText = $('#updatingText')
            const $oldOkButton = $('.okButton')
            $oldOkButton.remove()
            $updatingText.text(`Hey ${player.name}, it's me, ${customer.name}! Just the usual, please.`)
            const $newOkButton = $("<button class='okButton'>OK</button>")
            $newOkButton.insertBefore($('.playerScores'))
            $newOkButton.on('click', ()=>{
                $newOkButton.remove()
                $updatingText.text('')
                gameLogic.playerMakesPizza(customer, player)
    
                
            })
            
           
    },
    comparePizzas: (customer, player) => {

        //making and sorting two lists based on the names of the customer toppings and player toppings
        const $returnOff = $('body')
        $returnOff.on('keypress', (event)=>{
            if (event.key === "Enter") {
                return false
            }
        })
        const customerToppingObjArr = Array.from(Object.values(customer.favToppings))
        const customerToppingList = [];
        for (let i = 0; i < 4; i++) {
            customerToppingList.push(customerToppingObjArr[i].name)
        }
        

        
        const playerConstructedList = []
        for (let i = 0; i < player.constructedPizza.length; i++) {
            playerConstructedList.push(player.constructedPizza[i].name)
        }
        // console.log(playerConstructedList)
        
       
    
        // console.log(customerToppingList, playerConstructedList)

        //making the difference lists and evaluating them

        const $whatCustomerWanted = $(customerToppingList).not(playerConstructedList)
        const $whatPlayerMade = $(playerConstructedList).not(customerToppingList)

        const $updatingText = $('#updatingText')
        $updatingText.text('Let\'s see how you did!')
        const $okButton = $("<button class='okButton'>OK</button>")
        $okButton.insertBefore($('.playerScores'))
        $okButton.on('click', ()=>{
            $okButton.remove()
            const sadVegetarian = ()=>{
                for (let i = 0; i < player1.constructedPizza.length; i++) {
                    if (player1.constructedPizza[i].isMeat) {
                        return true
                    }
                    // return false
                }
            }
            if (sadVegetarian() === true && customer.isVegetarian === true) {
                // console.log('uh oh! you put on meat!')
                player.autoLoss = true
            }
            
            if ($whatCustomerWanted.length > 2) {
                $updatingText.text(`${customer.name.toUpperCase()}: \"You really screwed up my order. I want a refund!\"`)
                gameLogic.tipPlayer(player, -15)
                const $okButton = $("<button class='okButton'>REFUND: Lose $15</button>")
                $okButton.insertBefore($('.playerScores'))
                $okButton.on('click', ()=>{
                    gameLogic.removeAllToppings(player)
                   
                    $okButton.remove()
                    gameLogic.runNormalDayLoop()
                    })
              
            } else if ($whatCustomerWanted.length === 2) {
               
                $updatingText.text(`${customer.name.toUpperCase()}: \"You're not great at this. I wanted ${$whatCustomerWanted[0]} and ${$whatCustomerWanted[1]}, but you gave me ${$whatPlayerMade[0]} and ${$whatPlayerMade[1]} instead."`)
                const $okButton = $("<button class='okButton'>No Tip</button>")
                $okButton.insertBefore($('.playerScores'))
                $okButton.on('click', ()=>{
                    gameLogic.removeAllToppings(player)
                    $okButton.remove()
                    gameLogic.runNormalDayLoop()
                    })
                
            } else if ($whatCustomerWanted.length === 1) {
               
                $updatingText.text(`${customer.name.toUpperCase()}: \"It's not perfect, but you did ok. I wanted ${$whatCustomerWanted[0]}, but you gave me ${$whatPlayerMade[0]} instead.\"`)
                
                gameLogic.tipPlayer(player, 5)
                const $okButton = $("<button class='okButton'>$5 Tip</button>")
                $okButton.insertBefore($('.playerScores'))
                $okButton.on('click', ()=>{
                    gameLogic.removeAllToppings(player)
                    
                    $okButton.remove()
                    gameLogic.runNormalDayLoop()
                    })
             
            } else if ($whatCustomerWanted.length === 0){
                $updatingText.text(`${customer.name.toUpperCase()}: \"Nice job... the perfect pizza!\"`)
                gameLogic.tipPlayer(player, 10)
                const $okButton = $("<button class='okButton'>$10 Tip</button>")
                $okButton.insertBefore($('.playerScores'))
                $okButton.on('click', ()=>{
                    gameLogic.removeAllToppings(player)
                    
                    $okButton.remove()
                    gameLogic.runNormalDayLoop()
                    })
              
            }
            
            
           
            
            
        })
        const $p1Money = $('.p1Money')
            $p1Money.text(`$${player1.money}`)
            
        
    },

    checkAutoLoss: ()=>{
        const $updatingText = $('#updatingText')
        const $checkLoseButton = $('.okButton')
        const $playAgainBtn = $("<button class='okButton'>PLAY AGAIN</button>")
        $checkLoseButton.remove()
        $updatingText.text(`${player1.name.toUpperCase()}!!! I just got a call that you put meat on a vegetarian\'s pizza yesterday. This is unacceptable! GET OUT!!!`)
        $playAgainBtn.insertBefore($('.playerScores'))
        $playAgainBtn.on('click', ()=>{
            window.location.reload();
        })
        return

    },
    // checkAutoLoss: ()=>{
    //     if (player1.money < 0 && player2.money < 0){
    //         console.log('You two are a disgrace! Even my cat makes better pizzas than you. Both of you, vamoose!')
    //         setTimeout(()=>{window.alert('Yikes! You both lost. Better luck next time.')}, 3000);
    //         return 1
    //     } else if (player1.money < 0 || player2.money < 0){
    //         if (player1.money < 0) {
    //             console.log(`${player1.name}, you're outta here! You're costing me way too much money! ${player2.name}, you're hired!`)
    //             setTimeout(()=>{window.alert(`Great job, ${player2.name}! Enjoy your win with a delicious pizza.`)}, 3000);
    //             return 1
    //         } else {
    //             console.log(`${player2.name}, get lost! You're makin' me go into debt. ${player1.name}, you're hired!`)
    //             setTimeout(()=>{window.alert(`Congrats, ${player1.name}! You're the pizza champ.`)}, 3000);
    //             return 1
    //         }
    //     }
        
    // },
    checkWinner: ()=>{
        const $updatingText = $('#updatingText')
        const $checkWinButton = $('.okButton')
        const $playAgainBtn = $("<button class='okButton'>PLAY AGAIN</button>")
        $checkWinButton.remove()
        if (player1.autoLoss) {
            gameLogic.checkAutoLoss()
            return
        }
        if (player1.money > 24) {
            $updatingText.text('\"You\'re a serious pizzafreak. Welcome aboard!\"')
        } else if (player1.money > 14) {
            $updatingText.text('\"Eh, you\'re ok. We can throw you some part-time work.\"')
        } else if (player1.money >= 0) {
            $updatingText.text('\"Not interested. You just can\'t hack it in the worlda pizza. Scram!\"')
        } else {
            $updatingText.text('\"You cost me money this week. I oughta wring your neck! Vamoose!!\"')
        }
        $playAgainBtn.insertBefore($('.playerScores'))
        $playAgainBtn.on('click', ()=>{
            window.location.reload();
        })
        return;
    },
    runNormalDayLoop: () => {
       
        const $updateMoney = $('span')
        $updateMoney.text(`$${player1.money}`)
        day++
        const $checkWinButton = $("<button class='okButton'>FINAL RESULT</button>")
        const $updatingText = $('#updatingText')
        const $okButton = $("<button class='okButton'>OK</button>")

       
        if (day < 4) {
            $updatingText.text(`It's Day ${day}. Let's make some freakin' pizza!!`)
            
            $okButton.insertBefore($('.playerScores'))
            $okButton.on('click', () => {
                if (player1.autoLoss) {
                    gameLogic.checkAutoLoss()
                    return
                }
                const todaysCustomerP1 = fullCustomerList[gameLogic.randGen(fullCustomerList.length)];
                // const todaysCustomerP1 = michelle
                gameLogic.askForPizza(todaysCustomerP1, player1)
            })
            } else {
                
                $checkWinButton.insertBefore($('.playerScores'))
                $updatingText.text('Let\'s see how you did!')
            }
        $checkWinButton.on('click', gameLogic.checkWinner)
    },
    runZeroDayLoop: ()=>{ 
            const $updatingText = $('#updatingText')
            const $secretMessage = $('<h6>(and don\'t you DARE open the Chrome Developer Console (Option-Command-J) to find my secret cheat sheet!)"</h6>')
            $updatingText.text("\"These are some of my customer's favorite orders. Learn 'em... or you're outta here!\"")
            const $okButton = $('.okButton')
            //COMMENT - Yes, I know this is a terrible way to do this. For time's sake, this seems to work and I'll do a refac later.
            $okButton.on('click', () => {
                $updatingText.text(`
                    ${fullCustomerList[0].name.toUpperCase()}: 
                        ${fullCustomerList[0].favToppings[0].name}, 
                        ${fullCustomerList[0].favToppings[1].name}, 
                        ${fullCustomerList[0].favToppings[2].name}, and
                        ${fullCustomerList[0].favToppings[3].name}`)
                $okButton.remove()
                $okButton.insertBefore($('.playerScores'))
                $okButton.on('click', () => {
                    $updatingText.text(`
                        ${fullCustomerList[1].name.toUpperCase()}: 
                            ${fullCustomerList[1].favToppings[0].name}, 
                            ${fullCustomerList[1].favToppings[1].name}, 
                            ${fullCustomerList[1].favToppings[2].name}, and
                            ${fullCustomerList[1].favToppings[3].name}`)
                    $okButton.remove()
                    $okButton.insertBefore($('.playerScores'))
                    $okButton.on('click', () => {
                        $updatingText.text(`
                            ${fullCustomerList[2].name.toUpperCase()}: 
                                ${fullCustomerList[2].favToppings[0].name}, 
                                ${fullCustomerList[2].favToppings[1].name}, 
                                ${fullCustomerList[2].favToppings[2].name}, and
                                ${fullCustomerList[2].favToppings[3].name}`)
                        $okButton.remove()
                        $okButton.insertBefore($('.playerScores'))
                        $okButton.on('click', () => {
                            $updatingText.text(`
                                ${fullCustomerList[3].name.toUpperCase()}: 
                                    ${fullCustomerList[3].favToppings[0].name}, 
                                    ${fullCustomerList[3].favToppings[1].name}, 
                                    ${fullCustomerList[3].favToppings[2].name}, and
                                    ${fullCustomerList[3].favToppings[3].name}`)
                            $okButton.remove()
                            $okButton.insertBefore($('.playerScores'))
                            $okButton.on('click', () => {
                                $updatingText.text(`
                                    ${fullCustomerList[4].name.toUpperCase()}: 
                                        ${fullCustomerList[4].favToppings[0].name}, 
                                        ${fullCustomerList[4].favToppings[1].name}, 
                                        ${fullCustomerList[4].favToppings[2].name}, and
                                        ${fullCustomerList[4].favToppings[3].name}`)
                                $okButton.remove()
                                $okButton.insertBefore($('.playerScores'))
                                $okButton.on('click', () => {
                                    $updatingText.text(`
                                        ${fullCustomerList[5].name.toUpperCase()}: 
                                            ${fullCustomerList[5].favToppings[0].name}, 
                                            ${fullCustomerList[5].favToppings[1].name}, 
                                            ${fullCustomerList[5].favToppings[2].name}, and
                                            ${fullCustomerList[5].favToppings[3].name}`)
                                    $okButton.remove()
                                    $okButton.insertBefore($('.playerScores'))
                                    $okButton.on('click', () => {
                                        $updatingText.text("\"Alright, now get to studyin\'! You start tomorrow!")
                                        $secretMessage.insertAfter($updatingText)
                                        $okButton.remove()
                                        console.log('CUSTOMER CHEAT SHEET')
                                        for (let i = 0; i < fullCustomerList.length; i++){
                                            console.log(`${fullCustomerList[i].name}: ${fullCustomerList[i].favToppings[0].name}, ${fullCustomerList[i].favToppings[1].name}, ${fullCustomerList[i].favToppings[2].name}, and ${fullCustomerList[i].favToppings[3].name}`)
                                        }
                                        const $startButton = $("<button class='okButton'id='startButton'>START</button>")
                                        $startButton.insertBefore($('.playerScores'))
                                        $startButton.on('click', () => {
                                            $startButton.remove()
                                            $secretMessage.remove()
                                            gameLogic.runNormalDayLoop()
                                            
                                            
                                        })

                                    })

                                })
                            })
                        })
                    })
                })
            })
    },
    startGame: () => {
        
        const $firstInput = $('.player1Input')
        const $secondInput = $("<input class ='player2Input' type='text' placeholder='Player 2'></input>")
        const $okButton = $("<button class='okButton'>OK</button>")
        const $updatingText = $('#updatingText')

        const firstPlayerInput = event => {
            if (event.key === 'Enter') {
                if ($firstInput.val() === '') {
                    $firstInput.val('Pizza Genius')
                }
                const $oldPlayer1Name = $('#oldPlayer1Name')
                $oldPlayer1Name.remove()
                const $newPlayer1 = $("<h2 class='playerName'>")
                $newPlayer1.text($firstInput.val())
                $newPlayer1.prependTo($('#player1'))
                $firstInput.remove()
                player1.name = $firstInput.val()
                $okButton.insertBefore($('.playerScores'))
                $updatingText.text('The owner of ARETE PIZZA is looking for a new genius cook. Can you serve up perfect pizzas to his starving customers? Let\'s find out!')
            }
        }


        $firstInput.on('keypress', firstPlayerInput)
        // $secondInput.on('keypress', secondPlayerInput)
        $okButton.on('click', gameLogic.runZeroDayLoop)
        // while (day < 4) {
        //     if (gameLogic.checkAutoLoss() === 1) {
        //         return;
        //     };
        // }
        // gameLogic.checkWinner()
    }
    


}

const gameAssets = {
    topping: class Topping {
        constructor(name, isMeat, position) {
            this.name = name;
            this.isMeat = isMeat;
            this.onPlayerPizza = false;
            this.position = position;
        }
    },
    makeToppingList: ()=>{
        const onions = new gameAssets.topping('onions', false, 'left: 20px; top: 20px');
        const tomatoes = new gameAssets.topping('tomatoes', false, 'left: 20px; top: 160px');
        const hots = new gameAssets.topping('hot peppers', false, 'left: 20px; top: 300px');
        const broccoli = new gameAssets.topping('broccoli', false, 'left: 120px; top: 80px;');
        const pineapple = new gameAssets.topping('pineapples', false, 'left: 120px; top: 270px;');
        const pepperoni = new gameAssets.topping('pepperoni', true, 'right: 120px; top: 20px;');
        const sausage = new gameAssets.topping('sausage', true, 'right: 120px; top: 160px;');
        const ham = new gameAssets.topping('ham', true, 'right: 127.5px; top: 300px;');
        const bacon = new gameAssets.topping('bacon', true, 'right: 23px; top: 80px;');
        const chicken = new gameAssets.topping('chicken', true, 'right: 20px; top: 270px;');

        toppingsList = [onions, tomatoes, hots, broccoli, pineapple, pepperoni, sausage, ham, bacon, chicken]

        return toppingsList
    },
    makeCustomerToppings: (veggieOrMeat)=>{
        const favToppingsSet = new Set()
        while (favToppingsSet.size < 4) {
            if (veggieOrMeat === 'veggie') {
                favToppingsSet.add(toppingsList[gameLogic.randGen(toppingsList.length/2)])
            } else {
            favToppingsSet.add(toppingsList[gameLogic.randGen(toppingsList.length)])}
        }
        const favToppingsList = Array.from(favToppingsSet)
        return favToppingsList;
    },  
    customer: class Customer {
        constructor(name, isVegetarian) {
            this.name = name;
            this.isVegetarian = isVegetarian;
            //for now, hardcoded. Veggie mode is a stretch
            this.favToppings = this.isVegetarian ? gameAssets.makeCustomerToppings('veggie') : gameAssets.makeCustomerToppings('meat')
            // gameAssets.makeCustomerToppings()
        
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

const ruthie = new gameAssets.customer('Ruthie', false)
const kathleen = new gameAssets.customer('Kathleen', false)
const chris = new gameAssets.customer('Chris', false)
const greg = new gameAssets.customer('Greg', false)
const margaret = new gameAssets.customer('Margaret', false)
const michelle = new gameAssets.customer('Michelle', true)

const fullCustomerList = [ruthie, kathleen, chris, greg, margaret, michelle]

const player1 = new gameAssets.player('Player 1')

// const player2 = new gameAssets.player('Player 2')

gameLogic.startGame()


});