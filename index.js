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
    card.src = `resources/index/${card.className.split(" ")[1]}`;
    card.style.display = "";
    card.className += " flipped";
    const flippedCards = document.getElementsByClassName("flipped");
    if(flippedCards.length !== 1){
        if(card.className.split(" ")[1] === flippedCards[0].className.split(" ")[1]){
            console.log("test");
        }else{
            await sleep(1000);
            card.style.display = "none";
            flippedCards[0].style.display = "none";
        }
    }
}