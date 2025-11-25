let canClick = true;
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
        i.className = `card ${img}`;
        images = remove(images,img);
    }   
}
function sleep(time){
    return new Promise((resolve) => setTimeout(resolve,time))
}
async function flipCard(card){
    const turn = document.getElementById("turn");
    const turnUseable = (Number(turn.textContent.split(" ")[1].split("'")[0]));
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
            }else{
                await sleep(1000);
                card.style.display = "none";
                flippedCards[0].style.display = "none";
                card.className = `${cardSplit[0]} ${cardSplit[1]}`;
                flippedCards[0].className = `${flippedCardsSplit[0]} ${flippedCardsSplit[1]}`;
                if(turnUseable === 2){
                    turnUseable = 1;
                }
                turn.textContent = `Player ${(turnUseable + 1)}'s Turn`;
            }
        }else{
            card.className += " flipped";
        }
        canClick = true;
    }
}
