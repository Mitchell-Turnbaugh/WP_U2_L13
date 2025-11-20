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
function randomCards(){
    let cards = document.getElementsByClassName("card");
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
        console.log(i)
    }
    console.log(cards);
}