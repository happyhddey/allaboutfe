/* model */



// Card
const Card = function(cardName, cardValue){
    this.name = cardName;
    this.value = cardValue;
    this.state = "front";
    this.exception = false;
}
Card.prototype.getName = function(){
    return this.name;
}
Card.prototype.getValue = function(){
    return this.value;
}
Card.prototype.isFront = function(){
    return this.state === "front";
}
Card.prototype.flipCard = function(){
    this.state = "back";
}
Card.prototype.isException = function(){
    return this.exception;
}
Card.prototype.setException = function(){
    this.exception = true;
}
Card.prototype.resetException = function(){
    this.exception = false;
}



// Deck
const Player = function(cardNameList){
    this.deck = (() => {
        const tempDeck = {};
        let deckSize = cardNameList.length;
        for(let i=0; i<deckSize; i++){
            const cardName = cardNameList[i];
            tempDeck[cardName] = new Card(cardName, i+1);
        }
        return tempDeck;
    })();

    this.score = 0;
}
Player.prototype.printDeck = function(){
    console.log(this.deck);
}
Player.prototype.getScore = function(){
    return this.score;
}
Player.prototype.getValue = function(cardName){
    return this.deck[cardName].getValue();
}
Player.prototype.updateScore = function(value){
    this.score += value;
}
Player.prototype.updateCard = function(cardName, score){
    const card = this.deck[cardName];
    if (card.isFront()){
        card.flipCard();
        this.updateScore(score);
        return true;
    } else{
        return false;
    }
}
Player.prototype.isOver = function(){
    let isEnd = true;
    for(cardName in this.deck){
        const card = this.deck[cardName];
        if (card.isFront()){
            isEnd = false;
            break;
        }
    }
    return isEnd;
}



// model
const DistancingCardGameModel = function(){
    this.Controller;

    this.cardNameList = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
    this.USER = new Player(this.cardNameList);
    this.AI = new Player(this.cardNameList);
    this.standardCardValue = 7;
    this.standardCardName = "7";
}
DistancingCardGameModel.prototype.getCardNameList = function(){
    return this.cardNameList;
}
DistancingCardGameModel.prototype.updateStandardCard = function(value){
    this.standardCardValue = value;
}
DistancingCardGameModel.prototype.calculateScore = function(selectedCardValue){
    return Math.abs(this.standardCardValue - selectedCardValue);
}
DistancingCardGameModel.prototype.getByDepth = function(player, curCardValue, depth){
    let bestProfit = -100, maxCardName = "";
    for (cardName in player.deck){
        const card = player.deck[cardName];
        if (!card.isException() && card.isFront()){
            card.setException();
            const profit = Math.abs(card.getValue() - curCardValue);
            let none, loss;
            if(depth > 0){
                if (player === this.USER){
                    [none, loss] = this.getByDepth(this.AI, card.getValue(), depth-1);
                }else if (player === this.AI){
                    [none, loss] = this.getByDepth(this.USER, card.getValue(), depth-1);
                }
                else{
                    console.error("player error");
                }
            }else{
                loss = 0;
            }
            if (profit - loss > bestProfit){
                bestProfit = profit - loss;
                maxCardName = card.getName();
            }
            card.resetException();
        }
    }
    return [maxCardName, bestProfit];
}
DistancingCardGameModel.prototype.aiSelectCard = function(){
    const [cardName, profit] = this.getByDepth(this.AI, this.standardCardValue, 5);
    return cardName;
}
DistancingCardGameModel.prototype.aiTurn = function(){
    const selectedCard = this.aiSelectCard();
    const selectedCardValue = this.AI.getValue(selectedCard);
    const expectedScore = this.calculateScore(selectedCardValue);
    if (this.AI.updateCard(selectedCard, expectedScore)){
        this.updateStandardCard(selectedCardValue);
        this.Controller.notifyingChangeAfterAiTurn(selectedCard, this.AI.getScore());
        return true;
    } else{
        return false;
    }
}
DistancingCardGameModel.prototype.userTurn = function(selectedCard){
    const selectedCardValue = this.USER.getValue(selectedCard);
    const expectedScore = this.calculateScore(selectedCardValue);
    if (this.USER.updateCard(selectedCard, expectedScore)){
        this.updateStandardCard(selectedCardValue);
        this.Controller.notifyingChangeAfterUserTurn(selectedCard, this.USER.getScore());
        return true;
    } else{
        return false;
    }
}
DistancingCardGameModel.prototype.isOver = function(){
    return this.AI.isOver() && this.USER.isOver();
}
DistancingCardGameModel.prototype.gameOverMessage = function(userScore, aiScore){
    let winner;
    let comment = "[USER] " + userScore + " : " + aiScore + " [AI]";
    if(userScore == aiScore){
        winner = "DRAW";
    } else if(userScore > aiScore){
        winner = "USER WINS";
    } else{
        winner = "AI WINS";
    }
    return [winner, comment];
}
DistancingCardGameModel.prototype.turn = function(cardName){
    if (this.userTurn(cardName)){
        setTimeout(() => {
            this.aiTurn();
            if(this.isOver()){
                const [winner, comment] = this.gameOverMessage(this.USER.getScore(), this.AI.getScore())
                this.Controller.notifyingGameOver(winner, comment);
            }
        },300)
        
    }
}
DistancingCardGameModel.prototype.setController = function(controller){
    this.Controller = controller;
}






/* view */

const View = function( ){
    this.Controller;

    this.cardNameList;
    this.head = "front";
    this.tail = "back";
}

// Namming class of html element
View.prototype.getCardContainerClassName = function(cardType){
    return cardType + "-card-container";
}
View.prototype.getCardClassName = function(cardType, cardName){
    return cardType + "-card-" + cardName;
}
// Controlling html element
View.prototype.setCardText = function(tag, text){
    tag.innerText = text;
}
View.prototype.setCardClass = function(tag, ...className){
    for (let name of className){
        tag.classList.add(name);
    }
}
View.prototype.setStandardCard = function(standardCardName){
    const tag = document.getElementsByClassName("standard-card")[0];
    this.setCardText(tag, standardCardName);
}
View.prototype.setUserScore = function(userScore){
    const tag = document.getElementsByClassName("user-turn")[0];
    this.setCardText(tag, "USER : " + userScore);
}
View.prototype.setAiScore = function(aiScore){
    const tag = document.getElementsByClassName("ai-turn")[0];
    this.setCardText(tag, "AI : " + aiScore);
}
View.prototype.changeCardClass = function(tag, prevClassName, targetClassName){
    tag.classList.replace(prevClassName, targetClassName);
}
View.prototype.changeCardHeadTail = function(cardType, cardName){
    const cardClassName = this.getCardClassName(cardType, cardName);
    const card = document.getElementsByClassName(cardClassName)[0];
    this.changeCardClass(card, this.head, this.tail);
}
// Making view
View.prototype.setCardNameList = function(_cardNameList){
    this.cardNameList = _cardNameList;
}
View.prototype.createCard = function(cardType, cardName){
    const tag = document.createElement("button");
    const cardClassName = this.getCardClassName(cardType, cardName);
    this.setCardText(tag, cardName);
    this.setCardClass(tag, cardClassName, this.head);
    return tag;
}
View.prototype.createDeck = function(cardType){
    const cardContainerName = this.getCardContainerClassName(cardType);
    const cardContainer = document.getElementsByClassName(cardContainerName)[0];
    for (let cardName of this.cardNameList){
        const card = this.createCard(cardType, cardName);
        cardContainer.appendChild(card);
    }
}
View.prototype.setAction = function(cardType){
    for (let cardName of this.cardNameList){
        const cardClassName = this.getCardClassName(cardType, cardName);
        const card = document.getElementsByClassName(cardClassName)[0];
        card.onclick = () => {
            this.Controller.notifyingClick(cardName);
        }
    }
}   
View.prototype.initializeView = function(_cardNameList, player1, player2, standardCardName, aiScore, userScore){
    this.setCardNameList(_cardNameList);

    this.createDeck(player1);
    this.createDeck(player2);
    this.setStandardCard(standardCardName);

    this.setAiScore(aiScore);
    this.setUserScore(userScore);

    this.setAction(player2);
}
View.prototype.popModal = function(winner, comment){
    const modal_wrapper = document.querySelector('.modal-wrapper');
    const modal_title = document.querySelector('.modal-title');
    const modal_text = document.querySelector('.modal-text');
    modal_title.innerText = winner;
    modal_text.innerText = comment;
    modal_wrapper.style.display = 'flex';
}
View.prototype.closeModal = function(){
    const modal_wrapper = document.querySelector('.modal-wrapper');
    const button_close = document.getElementById('close');
    button_close.onclick = () => {
        modal_wrapper.style.display = 'none';
        document.location.reload();
    }
}
View.prototype.setController = function(controller){
    this.Controller = controller;
}





/* controller */
const Controller = function(ai, user, model, view){
    this.AI = ai;
    this.USER = user;
    this.Model = model;
    this.View = view;

    const cardNameList = this.Model.getCardNameList();
    const standardCardName = this.Model.standardCardName;
    const aiScore = this.Model.AI.getScore();
    const userScore = this.Model.USER.getScore();
    this.View.initializeView(cardNameList, this.AI, this.USER, standardCardName, aiScore, userScore);
}
Controller.prototype.flipCard = function(cardType, cardName){
    this.View.changeCardHeadTail(cardType, cardName);
}
Controller.prototype.notifyingUserCardFlip = function(cardName){
    this.flipCard(this.USER, cardName);
}
Controller.prototype.notifyingAiCardFlip = function(cardName){
    this.flipCard(this.AI, cardName);
}
Controller.prototype.notifyingClick = function(cardName){
    this.Model.turn(cardName);
}
Controller.prototype.notifyingStandardCardChange = function(standardCardName){
    this.View.setStandardCard(standardCardName);
}
Controller.prototype.notifyingUserScoreChange = function(userScore){
    this.View.setUserScore(userScore);
}
Controller.prototype.notifyingAiScoreChange = function(aiScore){
    this.View.setAiScore(aiScore);
}
Controller.prototype.notifyingChangeAfterAiTurn = function(selectedCard, score){
    this.notifyingAiScoreChange(score);
    this.notifyingAiCardFlip(selectedCard);
    this.notifyingStandardCardChange(selectedCard);
}
Controller.prototype.notifyingChangeAfterUserTurn = function(selectedCard, score){
    this.notifyingUserScoreChange(score);
    this.notifyingUserCardFlip(selectedCard);
    this.notifyingStandardCardChange(selectedCard);
}
Controller.prototype.notifyingGameOver = function(winner, comment){
    this.View.popModal(winner, comment);
    this.View.closeModal();
}

const distancingCardGameModel = new DistancingCardGameModel();
const distancingCardGameView = new View();
const modelViewController = new Controller("ai", "user", distancingCardGameModel, distancingCardGameView);
distancingCardGameModel.setController(modelViewController);
distancingCardGameView.setController(modelViewController);




