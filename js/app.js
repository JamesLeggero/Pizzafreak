// console.log($)

$( ()=>{
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
    removeAllToppings: (player)=>{
        const $removedTopping = $('.topping')
        $removedTopping.removeAttr('style')
        player.constructedPizza = []

    },
    playerMakesPizza: (customer, player)=>{
        // const $okButton = $("<button class='okButton'>New OK</button>")
        // $okButton.insertBefore($('.playerScores'))
        const $updatingText = $('#updatingText')
        $updatingText.text(`${player.name} is making a pizza for ${customer.name}. Click on a topping to add it to the pizza!`)
        player.constructedPizza = []
        console.log('made it to playerMakesPizza 1)')
        gameAssets.makeToppingList()
        for (let i = 0; i < toppingsList.length; i++) {
            toppingsList[i].onPlayerPizza = false;
        }
        const $remakeButton = $("<button id='remakePizza'>Remake Pizza</button>")
        $remakeButton.appendTo($('.toppingPan'))
        const $confirmButton = $("<button id='confirmPizza'>Confirm Pizza</button>")
        $confirmButton.appendTo($('.toppingPan'))
        const $topping = $('.topping')




        const position0 = 'left: 690px; top: 65px;';
        const position1 = 'left: 760px; top: 230px';
        const position2 = 'left: 610px; top: 300px';
        const position3 = 'left: 540px; top: 140px';


        const moveToppingToPizza = (event) => {
            const toppingObject = toppingsList[$topping.index(event.currentTarget)]
            console.log(toppingObject.name)
            console.log('clicked', event.currentTarget)

            if (player.constructedPizza.length === 0) {
                $(event.currentTarget).attr('style', position0)
                player.constructedPizza.push(toppingObject.name)
            } else if (player.constructedPizza.length === 1) {
                $(event.currentTarget).attr('style', position1)
                player.constructedPizza.push(toppingObject.name)
            } else if (player.constructedPizza.length === 2) {
                $(event.currentTarget).attr('style', position2)
                player.constructedPizza.push(toppingObject.name)
            } else if (player.constructedPizza.length === 3) {
                $(event.currentTarget).attr('style', position3)
                player.constructedPizza.push(toppingObject.name)
            }
            console.log(player.constructedPizza)

        }
        $topping.on('click', moveToppingToPizza)
        $remakeButton.on('click', () => {
            gameLogic.removeAllToppings(player)

        })
        // const comparedCustomer = customer;
        $confirmButton.on('click', ()=>{
            if (player.constructedPizza.length < 4){
                $updatingText.text('You must put 4 toppings on!')
                // window.setTimeout($updatingText.text(`${player.name} is making a pizza for ${customer.name}`), 2000)
                setTimeout(()=>{$updatingText.text(`${player.name} is making a pizza for ${customer.name}. Click on a topping to add it to the pizza!`)}, 3000)
                // console.log('not enough')
                
            } else {
            
                gameLogic.comparePizzas(customer, player)
                $topping.off('click', moveToppingToPizza)
            }



        })
        // while (player.constructedPizza.length < 4) {
        //     if (player.constructedPizza.length === 0) {
        //         window.alert("Let's put on some toppings!")
        //     }
        //     let randomTopping = gameLogic.randGen(toppingsList.length);
        //     randomTopping++;
        //     let input = window.prompt(`What would you like to put on the pizza? Type: 1 for ${toppingsList[0].name}, 2 for ${toppingsList[1].name}, 3 for ${toppingsList[2].name}, 4 for ${toppingsList[3].name}, 5 for ${toppingsList[4].name}, 6 for ${toppingsList[5].name}, 7 for ${toppingsList[6].name}, 8 for ${toppingsList[7].name}, 9 for ${toppingsList[8].name}, or 10 for ${toppingsList[9].name}.`, randomTopping)
        //     input--;
        //     if (toppingsList[input].onPlayerPizza === true) {
        //         window.alert(`Whoops, there's already ${toppingsList[input].name} on your pizza.`)
        //     } else {
        //         toppingsList[input].onPlayerPizza = true;
        //         player.constructedPizza.push(toppingsList[input])
        //     }
        //     if (player.constructedPizza.length === 1) {
        //         window.alert(`Your pizza currently has ${player.constructedPizza[0].name} on it.`)
        //     } else if (player.constructedPizza.length === 2) {
        //         window.alert(`Your pizza currently has ${player.constructedPizza[0].name} and ${player.constructedPizza[1].name} on it.`)
        //     } else if (player.constructedPizza.length === 3) {
        //         window.alert(`Your pizza currently has ${player.constructedPizza[0].name}, ${player.constructedPizza[1].name}, and ${player.constructedPizza[2].name} on it.`)
        //     } else {
        //         window.alert(`Your pizza currently has ${player.constructedPizza[0].name}, ${player.constructedPizza[1].name}, ${player.constructedPizza[2].name},and ${player.constructedPizza[3].name} on it.`)
        //     }
        // }
        // window.alert('Ok! Time to see how you did!')
    },
    askForPizza: (customer, player)=>{
        // if (day === 0) {
        //     console.log(`Hi ${player.name}! My name is ${customer.name}. Can you please make me a pizza with ${customer.favToppings[0].name}, ${customer.favToppings[1].name}, ${customer.favToppings[2].name}, and ${customer.favToppings[3].name}? Thanks!`)
        // } else {
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
        

        // const playerConstructedObjArr = Array.from(Object.values(player.constructedPizza))
        // const playerConstructedList = [];
        const playerConstructedList = player.constructedPizza
        // for (let i = 0; i < 4; i++) {
        //     playerConstructedList.push(playerConstructedObjArr[i].name)
        // }
    
        console.log(customerToppingList, playerConstructedList)

        //making the difference lists and evaluating them

        const $whatCustomerWanted = $(customerToppingList).not(playerConstructedList)
        const $whatPlayerMade = $(playerConstructedList).not(customerToppingList)


        // console.log($whatCustomerWanted)
        // console.log($whatPlayerMade)
        const $updatingText = $('#updatingText')
        $updatingText.text('Let\'s see how you did!')
        const $okButton = $("<button class='okButton'>OK</button>")
        $okButton.insertBefore($('.playerScores'))
        $okButton.on('click', ()=>{
            $okButton.remove()
            
            if ($whatCustomerWanted.length > 2) {
                $updatingText.text(`${customer.name.toUpperCase()}: \"You really screwed up my order. I want a refund!\"`)
                gameLogic.tipPlayer(player, -15)
                const $okButton = $("<button class='okButton'>REFUND: You lose $15</button>")
                $okButton.insertBefore($('.playerScores'))
                $okButton.on('click', ()=>{
                    gameLogic.removeAllToppings(player)
                    // day++
                    $okButton.remove()
                    gameLogic.runNormalDayLoop()
                    })
                // const $p1Money = $('.p1Money')
                // $p1Money.text(`$${player1.money}`)
                // const $p2Money = $('.p2Money')
                // $p2Money.text(`$${player2.money}`)
            } else if ($whatCustomerWanted.length === 2) {
                // console.log(`You're not great at this. I wanted ${$whatCustomerWanted[0]} and ${$whatCustomerWanted[1]}, but you gave me ${$whatPlayerMade[0]} and ${$whatPlayerMade[1]} instead.`)
                $updatingText.text(`${customer.name.toUpperCase()}: \"You're not great at this. I wanted ${$whatCustomerWanted[0]} and ${$whatCustomerWanted[1]}, but you gave me ${$whatPlayerMade[0]} and ${$whatPlayerMade[1]} instead."`)
                const $okButton = $("<button class='okButton'>No tip</button>")
                $okButton.insertBefore($('.playerScores'))
                $okButton.on('click', ()=>{
                    gameLogic.removeAllToppings(player)
                    // day++
                    $okButton.remove()
                    gameLogic.runNormalDayLoop()
                    })
                // const $p1Money = $('.p1Money')
                // $p1Money.text(`$${player1.money}`)
                // const $p2Money = $('.p2Money')
                // $p2Money.text(`$${player2.money}`)
            } else if ($whatCustomerWanted.length === 1) {
                // console.log(`It's not perfect, but you did ok. I wanted ${$whatCustomerWanted[0]}, but you gave me ${$whatPlayerMade[0]} instead.`)
                $updatingText.text(`${customer.name.toUpperCase()}: \"It's not perfect, but you did ok. I wanted ${$whatCustomerWanted[0]}, but you gave me ${$whatPlayerMade[0]} instead.\"`)
                
                gameLogic.tipPlayer(player, 5)
                const $okButton = $("<button class='okButton'>You made $5</button>")
                $okButton.insertBefore($('.playerScores'))
                $okButton.on('click', ()=>{
                    gameLogic.removeAllToppings(player)
                    // day++
                    $okButton.remove()
                    gameLogic.runNormalDayLoop()
                    })
                // const $p1Money = $('.p1Money')
                // $p1Money.text(`$${player1.money}`)
                // const $p2Money = $('.p2Money')
                // $p2Money.text(`$${player2.money}`)
            } else if ($whatCustomerWanted.length === 0){
                $updatingText.text(`${customer.name.toUpperCase()}: \"Nice job... the perfect pizza!\"`)
                gameLogic.tipPlayer(player, 10)
                const $okButton = $("<button class='okButton'>You made $10</button>")
                $okButton.insertBefore($('.playerScores'))
                $okButton.on('click', ()=>{
                    gameLogic.removeAllToppings(player)
                    // day++
                    $okButton.remove()
                    gameLogic.runNormalDayLoop()
                    })
                // const $p1Money = $('.p1Money')
                // $p1Money.text(`$${player1.money}`)
                // const $p2Money = $('.p2Money')
                // $p2Money.text(`$${player2.money}`)
            }
            if (player.money < 0) {
                player.autoLoss = true
            }
            
           
            
            // return
            // gameLogic.runNormalDayLoop()
        })
        const $p1Money = $('.p1Money')
            $p1Money.text(`$${player1.money}`)
            const $p2Money = $('.p2Money')
            $p2Money.text(`$${player2.money}`)
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
        const $updatingText = $('#updatingText')
        const $checkWinButton = $('.okButton')
        $checkWinButton.remove()
        
        // if (player1.money === player2.money) {
        //     console.log('You two are equally good... for a coupla punks. Aw, what the heck... you\'re both hired!')
        // } else if (player1.money > player2.money) {
        //     console.log(`${player1.name}, I think we can all see you're top pizzamaker. ${player2.name}, scram!`)
        // } else {
        //     console.log(`${player2.name}, the pizza whisperer. Come back new week!`)
        // }
        if (player1.money > 24) {
            $updatingText.text('\"You\'re a serious pizzafreak. Welcome aboard!\"')
        } else if (player1.money > 14) {
            $updatingText.text('\"Eh, your\'re ok. We can throw you some part-time work.\"')
        } else if (player1.money > 0) {
            $updatingText.text('\"Not interested. You just can\'t hack it in the worlda pizza. Scram!\"')
        } else {
            $updatingText.text('\"You cost me money this week. I oughta wring your neck! Vamoose!!\"')
        }





        return;
    },
    runNormalDayLoop: () => {
        // console.log('made it to day loop')
        // const $startButton = $('#startButton')
        // $startButton.remove()
        // gameLogic.removeAllToppings(player1)
        // gameLogic.removeAllToppings(player2)
        const $updateMoney = $('span')
        $updateMoney.text(`$${player1.money}`)
        day++
        const $checkWinButton = $("<button class='okButton'>FINAL RESULT</button>")
        const $updatingText = $('#updatingText')
        const $okButton = $("<button class='okButton'>OK</button>")
        // const $startButton = $('#startButton')
        if (day < 4) {
            $updatingText.text(`It's Day ${day}. Let's make some freakin' pizza!!`)
            
            $okButton.insertBefore($('.playerScores'))
            $okButton.on('click', () => {
                // const $newOkButton = $("<button class='okButton'>New OK</button>")
                // $newOkButton.insertBefore($('.playerScores'))

                // console.log('clicking through', day)
                const todaysCustomerP1 = fullCustomerList[gameLogic.randGen(fullCustomerList.length)];
                // const todaysCustomerP2 = fullCustomerList[gameLogic.randGen(fullCustomerList.length)];
                // console.log('paper')
                gameLogic.askForPizza(todaysCustomerP1, player1)
                // console.log('plastic')
                // gameLogic.askForPizza(todaysCustomerP2, player2)

                // gameLogic.playerMakesPizza(todaysCustomerP1, player1)
                // console.log('cloth')
                // $newOkButton.on('click', ()=>{
                //     console.log('time to ask for pizza', day)
                //     day++;
                //     $newOkButton.remove()
                // $okButton.remove()
                // gameLogic.runNormalDayLoop()  
                
            })
        
                
                // console.log('running day loop', 'Day ', day)
                // $startButton.remove()
                // $okButton.remove()
                // gameLogic.runNormalDayLoop()

                //         // gameLogic.askForPizza(todaysCustomerP1, player1);
                //         // gameLogic.playerMakesPizza(player1)
                //         // gameLogic.comparePizzas(todaysCustomerP1, player1);
                //         // gameLogic.askForPizza(todaysCustomerP2, player2);
                //         // gameLogic.playerMakesPizza(player2)
                //         // gameLogic.comparePizzas(todaysCustomerP2, player2);
                //         // window.alert(`Long night! ${player1.name} has $${player1.money} and ${player2.name} has $${player2.money}.`);
                //         $okButton.remove()
                //         gameLogic.runNormalDayLoop()
            } else {
                // $okButton.remove()
                $checkWinButton.insertBefore($('.playerScores'))
                $updatingText.text('Let\'s see how you did!')
            }
            // $okButton.insertBefore($('.playerScores'))


        
        // $checkWinButton.on('click', () => { console.log('made it to final tally') })
        $checkWinButton.on('click', gameLogic.checkWinner)


    }







    ,
    runZeroDayLoop: ()=>{
            
            const $updatingText = $('#updatingText')
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
                                        $updatingText.text("\"Alright, now get to studyin\'! You start tomorrow!\"")
                                        $okButton.remove()
                                        const $startButton = $("<button class='okButton'id='startButton'>START</button>")
                                        $startButton.insertBefore($('.playerScores'))
                                        $startButton.on('click', () => {
                                            console.log('start clicked')
                                            // day++;
                                            $startButton.remove()
                                            gameLogic.runNormalDayLoop()
                                            // return;
                                            
                                        })

                                    })

                                })
                            })
                        })
                    })
                })
            })
            
            console.log('got to here')

        //     $okButton.on('click', () => {
        //         $updatingText.text(`
        //             ${fullCustomerList[1].name.toUpperCase()}: 
        //                 ${fullCustomerList[1].favToppings[0].name}, 
        //                 ${fullCustomerList[1].favToppings[1].name}, 
        //                 ${fullCustomerList[1].favToppings[2].name}, and
        //                 ${fullCustomerList[1].favToppings[3].name}`)
        //     })
        //     $okButton.remove()
        //     $okButton.insertBefore($('.playerScores'))
        
        
        
            


        //     for (let i = 0; i < 3; i++) {

        //         gameLogic.askForPizza(fullCustomerList[i], player1)
        //     }
        //     for (let i = 3; i < 6; i++) {
        //         gameLogic.askForPizza(fullCustomerList[i], player2)
        //     }
            // day++;
        // } else {
        //     window.alert(`It's Day ${day}. Let's make some freakin' pizza!!`)
        //     const todaysCustomerP1 = fullCustomerList[gameLogic.randGen(fullCustomerList.length)];
        //     const todaysCustomerP2 = fullCustomerList[gameLogic.randGen(fullCustomerList.length)];
        //     gameLogic.askForPizza(todaysCustomerP1, player1);
        //     gameLogic.playerMakesPizza(player1)
        //     gameLogic.comparePizzas(todaysCustomerP1, player1);
        //     gameLogic.askForPizza(todaysCustomerP2, player2);
        //     gameLogic.playerMakesPizza(player2)
        //     gameLogic.comparePizzas(todaysCustomerP2, player2);
        //     window.alert(`Long night! ${player1.name} has $${player1.money} and ${player2.name} has $${player2.money}.`);
        //     day++;
        // }
    },
    fullGame: () => {
        // let input = window.prompt('Welcome to Pizzafreak! How many days do you want to compete?', '3')
        // const p1Name = window.prompt('Please type Player 1\'s name', 'Player 1');
        // const p2Name = window.prompt('Please type Player 2\'s name', 'Player 2')
        // player1.name = p1Name;
        // player2.name = p2Name;
        // input++;
        const $firstInput = $('.player1Input')
        const $secondInput = $("<input class ='player2Input' type='text' placeholder='Player 2'></input>")
        const $okButton = $("<button class='okButton'>OK</button>")
        const $updatingText = $('#updatingText')

        const firstPlayerInput = event => {
            if (event.key === 'Enter') {
                if ($firstInput.val() === '') {
                    $firstInput.val('Pizza Genius')
                }
                // console.log($firstInput.val())
                const $oldPlayer1Name = $('#oldPlayer1Name')
                $oldPlayer1Name.remove()
                const $newPlayer1 = $("<h2 class='playerName'>")
                $newPlayer1.text($firstInput.val())
                // console.log('New Name:', $newPlayer1)
                $newPlayer1.prependTo($('#player1'))
                $firstInput.remove()
                player1.name = $firstInput.val()
                // $firstInput.off('keypress', firstPlayerInput)
                // $secondInput.appendTo($('.dialogue'))
                // $updatingText.text('Excellent! Let\'s put in Player 2\'s name.')
                $okButton.insertBefore($('.playerScores'))
                $updatingText.text('The owner of ARETE PIZZA is looking for a new genius cook. Can you serve up perfect pizzas to his starving customers? Let\'s find out!')
            }
        }

        const secondPlayerInput = event => {
            if (event.key === 'Enter') {
                if ($secondInput.val() === '') {
                    $secondInput.val('Player 2')
                }
                // console.log($secondInput.val())
                const $oldPlayer2Name = $('#oldPlayer2Name')
                $oldPlayer2Name.remove()
                const $newPlayer2 = $("<h2 class='playerName'>")
                $newPlayer2.text($secondInput.val())
                // console.log('New Name:', $newPlayer2)
                $newPlayer2.prependTo($('#player2'))
                $secondInput.remove()
                player2.name = $secondInput.val()
                // $secondInput.off('keypress', secondPlayerInput)
                $okButton.insertBefore($('.playerScores'))
                $updatingText.text('The owner of ARETE PIZZA is looking for a new genius cook. Can you serve up perfect pizzas to his starving customers? Let\'s find out!')
            }
        }

        $firstInput.on('keypress', firstPlayerInput)
        $secondInput.on('keypress', secondPlayerInput)
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

// const $topping = $('.topping')





// $onions.css('background-color', 'blue')

// const clickedElement = () => {
//     $topping.on('click', console.log('element was clicked'))}

// const moveToppingToPizza = event =>{
//     $(event.currentTarget).attr('')
// }
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

// console.log('Please type the following to play:')
// console.log('gameLogic.fullGame()')
// console.log('Reload (Command-R) when the game is over to play again')


// const testStartGame = (event) => {
//     console.log('button was clicked', event.currentTarget)
//     const $player1Name = $(`<h3 class='playerName'>${$player1Input}</h3>`)
//     $player1Input.remove()
//     $player1Name.prependTo($('#player1'))


// }



// const $okButton = $('.okButton')
// const $player1Input = $('#player1Name')
// $player1Input.keyup('keypress', ()=>{console.log($player1Input.val())})
// const $player2Input = $('#player2Name')
// // $okButton.on('click', testStartGame)
gameLogic.fullGame()


    
    
});