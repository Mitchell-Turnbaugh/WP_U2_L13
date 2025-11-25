let canClick = true;
cardsMatched = 0;
function remove(collection,item){
    const index = collection.indexOf(item);
    collection.splice(index,1);
    return collection;
}
function randint(max){
    return Math.floor(Math.random() * max);
}
function choice(collection){
    return collection[randint(collection.length)];
}
function createGameplay(){
    randomCards();
    const p1win = document.getElementById("p1win");
    const p2win = document.getElementById("p2win");
    p1win.textContent = `Player One Wins: ${Number(sessionStorage.getItem("Player One Wins"))}`
    p2win.textContent = `Player Two wins: ${Number(sessionStorage.getItem("Player Two Wins"))}`
}
function randomCards(){
    const cards = document.getElementsByClassName("card");
    let images = ["acorn_icon.png","campfire_icon.png","caramel_apple_icon.jpg",
    "fall_leaf_icon.png","fall_tree_icon.png","hedgehog_icon.png","pinecone_icon.jpg",
    "pumpkin_pie_icon.png","squirrel.png","umbrella_icon.png","acorn_icon.png",
    "campfire_icon.png","caramel_apple_icon.jpg","fall_leaf_icon.png",
    "fall_tree_icon.png","hedgehog_icon.png","pinecone_icon.jpg",
    "pumpkin_pie_icon.png","squirrel.png","umbrella_icon.png"
    ];
    for(i of cards){
        img = choice(images);
        i.className = `card ${img} notWon`;
        images = remove(images,img);
    }   
}
function sleep(time){
    return new Promise((resolve) => setTimeout(resolve,time))
}
async function flipCard(card){
    const turn = document.getElementById("turn");
    let turnUseable = (Number(turn.textContent.split(" ")[1].split("'")[0]) + 1);
    const cardSplit = card.className.split(" ");
    if(!card.className.includes("won") && !card.className.includes("flipped") && canClick){
        if(card.src === ""){
            card.src = `resources/index/${card.className.split(" ")[1]}`;
        }
        card.style.display = "";
        const flippedCards = document.getElementsByClassName("flipped"); 
        console.log(flippedCards.length)
        if(flippedCards.length !== 0){  
            canClick = false;
            console.log(flippedCards[0]);
            const flippedCardsSplit = flippedCards[0].className.split(" ");
            if(card.src === flippedCards[0].src){
                card.className = `${cardSplit[0]} ${cardSplit[1]} won `;
                flippedCards[0].className = `${flippedCardsSplit[0]} ${flippedCardsSplit[1]} won`;
                if(turnUseable === 2){
                    const p1match = document.getElementById("p1match");
                    p1match.textContent = `Player One Match: ${Number(p1match.textContent.split(" ")[3]) + 1}`;
                }else{
                    const p2match = document.getElementById("p2match");
                    p2match.textContent = `Player Two Match ${Number(p2match.textContent.split(" ")[3]) + 1}`;
                }
                cardsMatched++;
            }else{
                await sleep(1000);
                card.style.display = "none";
                flippedCards[0].style.display = "none";
                card.className = `${cardSplit[0]} ${cardSplit[1]} notWon`;
                flippedCards[0].className = `${flippedCardsSplit[0]} ${flippedCardsSplit[1]} notWon`;
                if(turnUseable === 3){
                    turnUseable = 1;
                }
                turn.textContent = `Player ${(turnUseable)}'s Turn`;
            }
        }else{
            card.className += " flipped";
        }
        canClick = true;
    }
    if(document.getElementsByClassName("notWon").length === 0){
        const p1match = document.getElementById("p1match");
        const p2match = document.getElementById("p2match");
        if(Number(p1match.textContent.split(" ")[3]) >= Number(p2match.textContent.split(" ")[3])){
            const p1win = document.getElementById("p1win");
            const wincount = Number(p1win.textContent.split(" ")[3]) + 1;
            p1win.textContent = `Player One Wins: ${wincount}`;
            sessionStorage.setItem("Player One Wins",wincount);
            const turn = document.getElementById("turn");
            turn.textContent = "Player 1 wins"
        }else if(Number(p2match.textContent.split(" ")[3]) >= Number(p1match.textContent.split(" ")[3])) {
            const p2win = document.getElementById("p2win");
            const wincount = Number(p2win.textContent.split(" ")[3]) + 1;
            p2win.textContent = `Player Two Wins: ${wincount}`;
            sessionStorage.setItem("Player Two Wins",wincount)
            const turn = document.getElementById("turn");
            turn.textContent = "Player 2 wins";
        }else{
            const ties = document.getElementById("ties");
            ties.textContent = `Ties ${Number(ties.textContent.split(" ")[1]) + 1}`;
            const turn = document.getElementById("turn");
            turn.textContent = "Tie";
        }
    }
}