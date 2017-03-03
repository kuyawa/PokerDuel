/****  POKER WINNERS  ****/

function get_winners(hand1,hand2){
    // takes a list of seven cards per player
    var rank1 = hand_rank(hand1) 
    var rank2 = hand_rank(hand2) 
    if(rank1==rank2){ return [0,rank1] }
    if(rank1 >rank2){ return [1,rank1] }
    else{             return [2,rank2] }
}

function best_hand(hand){
    // From a 7-card hand, return the best 5 card hand
    var hands = combinations(hand,5)
    var best  = null
    var max   = ''
    var rank  = ''
    for(var i in hands){
        rank = hand_rank(hands[i])
        if(rank>max){
            max=rank
            best=hands[i] 
        }
    }
    return best
}

function hand_rank(hand){
    // Take five cards only
    // Return a value indicating the ranking of a hand, all ranks, add suit if flush
    var suit   = hand[0][0]  // save for flush
    var ranks  = card_ranks(hand)
    var cranks = ranks.join('')
    if(ranks[0]=='e' && straight(ranks) && flush(hand)){ return '9'+cranks }
    else if(straight(ranks) && flush(hand)){  return '8'+cranks }
    else if(kind(4,ranks)){                   return '7'+kind(4,ranks)+kind(1,ranks) }
    else if(kind(3,ranks) && kind(2,ranks)){  return '6'+kind(3,ranks)+kind(2,ranks) }
    else if(flush(hand)){                     return '5'+cranks+suit }
    else if(straight(ranks)){                 return '4'+cranks }
    else if(kind(3,ranks)){                   return '3'+kind(3,ranks)  +rest(ranks) }
    else if(two_pair(ranks)){                 return '2'+two_pair(ranks)+rest(ranks) }
    else if(kind(2,ranks)){                   return '1'+kind(2,ranks)  +rest(ranks) }
    else{                                     return '0'+cranks }
}

function card_ranks(hand){
    // Return a list of the ranks, sorted with higher first
    // Possible ranks in hex: 123456789abcde
    var ranks = []
    for(var card in hand){
        ranks.push(hand[card][1])
    }
    ranks.sort().reverse()
    if(ranks.join('')==['e5432']){ ranks=['5','4','3','2','1'] }
    return ranks
}

function flush(hand){
    // Return True if all the cards have the same suit
    var suits = []
    for(var card in hand){
        suits.push(hand[card][0])
    }
    return set(suits).length==1
}

function straight(ranks){
    // Return True if the ordered ranks form a 5-card straight
    var hex1 = parseInt(listmax(ranks),16)
    var hex2 = parseInt(listmin(ranks),16)
    return (hex1-hex2==4) && (set(ranks).length==5)
}

function kind(n, ranks){
    // Return the first rank that this hand has exactly n-of-a-kind of. 
    // Return null if there is no n-of-a-kind in the hand.
    for(var i in ranks){
        if(count(ranks,ranks[i])==n){ 
            return rep(ranks[i],n)
        }
    }
    return null
}

function two_pair(ranks){
    // If there are two pair here, return the two ranks of the two pairs, else null
    var hipair = kind(2, ranks)
    var lopair = kind(2, ranks.slice().reverse())  // make a copy of ranks
    if(hipair && (lopair!=hipair)){
        return hipair+lopair
    }
    return null
}


function kicker(rank){
    // takes a hand_rank and returns a kicker or second pair
    var high = ''
    switch(rank[0]){
        case '9': high = rank[1]; break;
        case '8': high = rank[1]; break;
        case '7': high = rank[5]; break;
        case '6': high = rank[4]; break;
        case '5': high = rank[1]; break;
        case '4': high = rank[1]; break;
        case '3': high = rank[4]; break;
        case '2': high = rank[4]; break;
        case '1': high = rank[3]; break;
        case '0': high = rank[2]; break;
    }
    return high
}

function rest(list){
    return nodup(list).join('')
}




/****  UTILS  ********************************************/

function rep(text,n){
    res = text
    for(var i=1; i<n; i++){
        res+=text
    }
    return res
}

function listmax(list){
    var max = list[0]
    for(var i in list){
        if(list[i]>max){ max=list[i] }
    }
    return max
}

function listmin(list){
    var min = list[0]
    for(var i in list){
        if(list[i]<min){ min=list[i] }
    }
    return min
}

function set(list){
    // return unique items in list
    if(typeof list=='string'){ 
        list = list.split('')       // if pool is string then split as list of chars
    }
    var unique = []
    for(var i in list){
        if(unique.indexOf(list[i])<0){ 
            unique.push(list[i]) 
        }
    }
    return unique
}

function nodup(list){
    // return non-duplicated elements of a list
    if(typeof list=='string'){ 
        list = list.split('')       // if pool is string then split as list of chars
    }
    var unique = []
    for(var i in list){
        if(list.indexOf(list[i])==list.lastIndexOf(list[i])){ 
            unique.push(list[i]) 
        }
    }
    return unique
}

function count(list,item){
    // count item in list
    var n = 0
    for(var i in list){
        if(list[i]==item){ n++ }
    }
    return n
}

function equals(listA,listB) {
    if(listA===listB){
        return true;   /* both point to same object */
    }
    if(listA.length != listB.length){
        return false;
    }
    for(key in listA){
        if(listA[key] !== listB[key]){
            return false;
        }
    }
    return true;
}

function range(i,n){
    if(!n){ n=i; i=0 }
    var list = []
    for(; i<n; i++){
        list[i] = i
    }
    return list
}

function mix(list,indices){
    var one = []
    for(var i in indices){
        one.push(list[indices[i]])
    }
    //log(one)
    return one
}

function combinations(pool,num){
    // combinations('ABCD', 2)    --> AB AC AD BC BD CD
    // combinations([0,1,2,3], 3) --> 012 013 023 123

    if(typeof pool=='string'){ 
        pool = pool.split('')       // if pool is string then split as list of chars
    }
    var top = pool.length           // max index
    if(num>top){ return pool }      // if nothing to combine, return pool

    var ind = range(num)            // [0,1,2,3] to loop indices to the end of list
    var rev = range(num).reverse()  // [3,2,1,0] start from the last index
    var all = []                    // to store all combinations
    all.push(mix(pool,ind))         // first combination as it comes

    var ok,rest,i,j,stop=0
    while(true){
        stop++
        if(stop>30){ log('STOP!'); break;}
        ok = true
        for(var k in rev){
            i=rev[k]
            if(ind[i] != i+top-num){
                ok = false
                break
            }
        }
        if(ok){ return all }
        ind[i] += 1
        rest = range(i+1,num)
        for(j in rest){
            ind[rest[j]] = ind[rest[j]-1]+1
        }
        all.push(mix(pool,ind))
    }
}

function test_combinations(){
    combinations(['a','b','c','d','e','f','g'],5)
    combinations(['a','b','c','d','e','f','g'],3)
    combinations('abcdefg',2)
}


/****  END OF PROGRAM  ***********************************/
