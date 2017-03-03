/*

Poker Face Off

TODO:
- move chips from pot to winner
- turn opp cards face up on end game
- dim losing cards


*/

var deck = ['s2','s3','s4','s5','s6','s7','s8','s9','sa','sb','sc','sd','se',
            'h2','h3','h4','h5','h6','h7','h8','h9','ha','hb','hc','hd','he',
            'd2','d3','d4','d5','d6','d7','d8','d9','da','db','dc','dd','de',
            'c2','c3','c4','c5','c6','c7','c8','c9','ca','cb','cc','cd','ce']

var card_suits = {'c':'clubs', 'd':'diamonds', 'h':'hearts', 's':'spades'}
var card_names = {'e':'Ace','d':'King','c':'Queen','b':'Jack','a':'Ten',
		 	      '9':'9','8':'8','7':'7','6':'6','5':'5','4':'4','3':'3','2':'2','1':'Ace'}

var cards = []

var state = {
	startPlayer: 0,
	handsPlayed: 0,
	player0: {
		name : 'JesseJames',
		purse: 1000
	},
	player1: {
		name : 'Dillinger',
		purse: 1000
	}
}

var game = {
	self   : [],
	opp    : [],
	common : [],
	turn   : 0,
	cycle  : 0,
	bet    : 0,
	pot    : 0
}


function init(){
	setup()
	// random start so game.turn can be 0 or 1 
	state.startPlayer = Math.round(Math.random(1))
	game.turn = state.startPlayer
	newGame()
	id('decktop').addEventListener('click',cycle,false)
}

function setup(){
	// detect screen resolution to scale viewport
	scaleViewport()
	loadPlayers()
}

function scaleViewport(){
	var ratio = Math.min(window.innerWidth/1000,window.innerHeight/520)
	document.body.style.zoom=ratio-0.01
	//TODO: event on resize: rescale,rezoom
	// window.addEventListener('resize',scaleViewport,false)
}

function scaleViewportOld(){
	var w,h,rw,rh,x
	w  = window.innerWidth
	h  = window.innerHeight
	rw = parseInt(w/1366*10)/10
	rh = parseInt(h/ 768*10)/10
	x  = Math.min(rw,rh)
	console.log(rw,rh)
	document.body.style.webkitTransform = 'scale('+x+')'
	document.body.style.width  = window.innerWidth
	document.body.style.height = window.innerHeight
}

function loadPlayers(){
	player0 = 1000
	player1 = 1000
}

function newGame(){
	next = 1 - game.turn // cycle 0 -> 1 -> 0 ...
	game = {self:[], opp:[], common:[], turn:next, cycle:0, bet:0, pot:0}
	precheck()
	cleanTable()
	lightCards()
	swapToken()
	shuffle()
	antebet()
	dealHand()
	showStatus('Click on the deck to play')
	// wait for bets
}

function precheck(){
	// TODO: Check if player is connected
	// TODO: Check if players have enough money
}

function hideSpots(){
	hide('cospot0')
	hide('cospot1')
	hide('cospot2')
	hide('cospot3')
	hide('cospot4')
	hide('opspot0')
	hide('opspot1')
	hide('myspot0')
	hide('myspot1')
}

function showSpots(){
	show('cospot0')
	show('cospot1')
	show('cospot2')
	show('cospot3')
	show('cospot4')
	show('opspot0')
	show('opspot1')
	show('myspot0')
	show('myspot1')
}

function hide(name){
	id(name).style.visibility = 'hidden'
}

function show(name){
	id(name).style.visibility = 'visible'
}

function cleanTable(){
	showSpots()

	// Remove cards from table
	var clean = document.getElementsByClassName('clean')
	var body  = document.body
    for(var i=clean.length; i>0; i--){
        body.removeChild(clean[i-1])
    }

    // Remove chips from table. Shouldn't be any!
    var clean = document.getElementsByClassName('pot')
	var body  = document.body
    for(var i=clean.length; i>0; i--){
        body.removeChild(clean[i-1])
    }
}

function swapToken(){
	//id('token').style.top = (game.turn==1?'440px':'20px');
	id('token').className = 'token'+game.turn;
}

function shuffle(){
	newdeck = deck.slice(0);
	cards = [];
	n = newdeck.length;
	while(n>0){
		any  = parseInt(Math.random(newdeck.length)*n);
		card = newdeck.splice(any,1);
		cards.push(card[0]);
		n--;
	}
	//log(cards);
}


function antebet(){
	// Take 10 from every player to the pot
	// TODO: visuals moving chips to pot
	var ante = 10
	chipToPot(ante,0)
	chipToPot(ante,1)
	state.player0.purse -= ante
	state.player1.purse -= ante
	game.pot += 20
	showPot(game.pot)
	showPlayers()
}

function chipToPot(n,p){
	// Move chip of amount n from player p to pot
	var chipsHTML = {
		 10:'<div id="chip10"  ><img class="chip" src="/public/images/chip_white.png"></div>',
		 20:'<div id="chip20"  ><img class="chip" src="/public/images/chip_blue.png"></div>',
		 50:'<div id="chip50"  ><img class="chip" src="/public/images/chip_green.png"></div>',
		100:'<div id="chip100" ><img class="chip" src="/public/images/chip_red.png"></div>',
		500:'<div id="chip500" ><img class="chip" src="/public/images/chip_black.png"></div>'
	}
	var chip = document.createElement('div')
	chip.innerHTML = chipsHTML[n]
	if(p==0){	
		chip.className = 'mychip-white chip-to-move'
		chip.id='chip0'
		document.body.appendChild(chip)
	} else {
		chip.className = 'opchip-white chip-to-move'
		chip.id='chip1'		
		document.body.appendChild(chip)
	}
	setTimeout(moveChip,100,chip,p)
}

function moveChip(chip,p){
	chip.className += ' pot chip-to-pot'+p
}

function potToPlayer(){
	// TODO: move all chips from pot to winners
}

function showPot(n){
	id('pot').innerHTML = '$'+n
}

function showPlayers(n){
	id('player0').innerHTML = state.player0.name + ' $' + state.player0.purse
	id('player1').innerHTML = state.player1.name + ' $' + state.player1.purse
}

function dealHand(){
	// my cards
	game.self.push(cards.pop())
	game.self.push(cards.pop())
	//id('mycard0').src = imgurl(game.self[0]+'.png');
	//id('mycard1').src = imgurl(game.self[1]+'.png');
	// opp cards
	game.opp.push(cards.pop())
	game.opp.push(cards.pop())
	//id('opcard0').src = imgurl('back_blue.png');
	//id('opcard1').src = imgurl('back_blue.png');

	animateHand()
	//log(game);
}

function animateHand(){
	if(game.turn==1){
		setTimeout(animateCard, 100,'mycard0x',game.self[0],0,0)
		setTimeout(animateCard, 400,'mycard1x',game.self[1],0,1)
		setTimeout(animateCard, 700,'opcard0x','back_blue' ,1,0)
		setTimeout(animateCard,1000,'opcard1x','back_blue' ,1,1)
	} else {
		setTimeout(animateCard, 100,'opcard0x','back_blue' ,1,0)
		setTimeout(animateCard, 400,'opcard1x','back_blue' ,1,1)
		setTimeout(animateCard, 700,'mycard0x',game.self[0],0,0)
		setTimeout(animateCard,1000,'mycard1x',game.self[1],0,1)
	}
}

function animateCard(name,kind,p,n){
	card = newCard(name,kind)
	card.className += ' card-on-deck'
	setTimeout(moveCard,100,card,p,n)
}
function moveCard(card,p,n){
	card.className += ' card-spot-'+p+n
}

function newCard(name,kind){
	var card = document.createElement('div')
	var img  = document.createElement('img')
	img.id   = name
	img.src  = '/public/images/'+kind+'.png'
	card.appendChild(img)
	card.className = 'clean'
	document.body.appendChild(card)
	return card
}

/* Cycle */

function showFlop(){
	game.common.push(cards.pop());
	game.common.push(cards.pop());
	game.common.push(cards.pop());
	//id('card0').src = imgurl(game.common[0]+'.png');
	//id('card1').src = imgurl(game.common[1]+'.png');
	//id('card2').src = imgurl(game.common[2]+'.png');
	setTimeout(animateCard, 100,'commoncard0',game.common[0],2,0)
	setTimeout(animateCard, 400,'commoncard1',game.common[1],2,1)
	setTimeout(animateCard, 700,'commoncard2',game.common[2],2,2)
	game.cycle = 1;
	showStatus('Here comes the flop. Place your bets!')
}


function showTurn(){
	game.common.push(cards.pop());
	//id('card3').src = imgurl(game.common[3]+'.png');
	setTimeout(animateCard, 100,'commoncard3',game.common[3],2,3)
	game.cycle = 2;
	showStatus('The turn is up. Place your bets!')
}


function showRiver(){
	game.common.push(cards.pop());
	//id('card4').src = imgurl(game.common[4]+'.png');
	setTimeout(animateCard, 100,'commoncard4',game.common[4],2,4)
	game.cycle = 3;
	showStatus('And here comes the river. Place your final bets!')
}

function openGame(){
	id('opcard0x').src = imgurl(game.opp[0]+'.png');
	id('opcard1x').src = imgurl(game.opp[1]+'.png');
    showWinner();
	game.cycle = 4;
}

function showWinner(){
	var stats = null
	var opp   = []
	var self  = []
	var rank  = ''
	var high  = ''
	var kick  = ''
    var best1 = []
    var best2 = []

	self  = game.common.concat(game.self)
	opp   = game.common.concat(game.opp)
    best1 = best_hand(self) 
    best2 = best_hand(opp) 
	stats = get_winners(best1,best2)
	won   = stats[0]
	rank  = stats[1]
	topp  = rank[0]
	high  = card_names[rank[1]]
	kick  = kicker(rank)
	if(topp=='5'){ 
		kick = card_suits[rank[6]]   // if flush, get the suit no the kicker
	} else {
		kick = card_names[kick]
	}
	log(rank)

	hideSpots()
	if     (won==1){ dimCards(best1) }
	else if(won==2){ dimCards(best2) }
	else           { /* tie */       }
	winMessage(won,topp,high,kick)
}

function winMessage(won,topp,high,kick){
	var txt = [
		'{0}-high with {1} kicker',
		'Pair of {0}s with {1} kicker',
		'Two Pair of {0}s and {1}s',
		'Three of a kind in {0}s',
		'Straight to the {0}',
		'Flush of {1} with {0}-high',
		'Full house of {0}s and {1}s',
		'Four {0}s and a lucky hand',
		'Straight flush to the {0}',
		'Royal Flush! Perfect hand'][topp];
    var msg = txt.replace('{0}',high).replace('{1}',kick);
	if(won==1){
	    msg = msg + ' for you'
	} else if(won==2) {
	    msg = msg + ' for your opponent'
	} else {
	    msg = msg + ' for both players';
	}
	showStatus(msg)
}

function showStatus(txt){
	var message = id('message')
	message.innerHTML = txt
	id('status').style.display = 'block' 
}

function clearStatus(){
	var message = id('message')
	message.innerHTML = ''
	id('status').style.display = 'block' 
}

function hideStatus(){
	id('status').style.display = 'none' 
}

function dimCards(cards){
	cocard0 = id('commoncard0')
	cocard1 = id('commoncard1')
	cocard2 = id('commoncard2')
	cocard3 = id('commoncard3')
	cocard4 = id('commoncard4')
	mycard0 = id('mycard0x')
	mycard1 = id('mycard1x')
	opcard0 = id('opcard0x')
	opcard1 = id('opcard1x')

	dim = 0.5
	if(cards.indexOf(game.common[0])<0){ cocard0.style.opacity=dim }
	if(cards.indexOf(game.common[1])<0){ cocard1.style.opacity=dim }
	if(cards.indexOf(game.common[2])<0){ cocard2.style.opacity=dim }
	if(cards.indexOf(game.common[3])<0){ cocard3.style.opacity=dim }
	if(cards.indexOf(game.common[4])<0){ cocard4.style.opacity=dim }
	if(cards.indexOf(game.self[0]  )<0){ mycard0.style.opacity=dim }
	if(cards.indexOf(game.self[1]  )<0){ mycard1.style.opacity=dim }
	if(cards.indexOf(game.opp[0]   )<0){ opcard0.style.opacity=dim }
	if(cards.indexOf(game.opp[1]   )<0){ opcard1.style.opacity=dim }
}

function lightCards(){
	cocard0 = id('commoncard0')
	cocard1 = id('commoncard1')
	cocard2 = id('commoncard2')
	cocard3 = id('commoncard3')
	cocard4 = id('commoncard4')
	mycard0 = id('mycard0x')
	mycard1 = id('mycard1x')
	opcard0 = id('opcard0x')
	opcard1 = id('opcard1x')

	all=[cocard0,cocard1,cocard2,cocard3,cocard4,mycard0,mycard1,opcard0,opcard1]
	for(card in all){
		if(all[card]){ all[card].style.opacity=1 }
	}
}

function cycle(){
	switch(game.cycle){
		case 0: showFlop();  break;
		case 1: showTurn();  break;
		case 2: showRiver(); break;
		case 3: openGame();  break;
		case 4: newGame();   break;
	}
}


//---- UTILS ----------------------------------------------
function log(any){
	console.log(any);
}

function id(name){
	return document.getElementById(name);
}

function imgurl(name){
	path = '/public/images/';
	return path+name;
}

document.body.onLoad = init();

//---- END OF PROGRAM -------------------------------------
