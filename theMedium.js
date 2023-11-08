console.log("theMessage");

const theButton = document.querySelector("button");
const theInput = document.querySelector("input")
let theDivider = document.querySelector("div")

let theUserWords;
let theItem;
let theTxt;

theButton.addEventListener('click', makeList)

function makeList() {
    console.log("click!");
    theUserWords = theInput.value;
    // console.log(theUserWords)
    theItem = document.createElement('li')
    const theSpan = document.createElement('span');
    theTxt = document.createTextNode(theUserWords);
    // document.body.appendChild(theItem);
    theDivider.appendChild(theItem);
    theItem.appendChild(theTxt);
    //theTxt.randomOrientation;
    theTxt.style.setProperty(transform.rotate, Math.random);
}

document.querySelector("p").addEventListener('click', eraseList)

function eraseList(){
    console.log("erase!");
    document.querySelector("div").remove(theItem)
}
let x;

function randomOrientation (){
    x = getRandomIntInclusive(0, 4);

    if (x == 1) {
      document.querySelector("li").textOrientation = "mixed";
    }
    if (x == 2) {
        document.querySelector("li").textOrientation = "upright";
    }
    if (x == 3) {
        document.querySelector("li").textOrientation = "sideways-right";
    }
    if (x == 4) {
        // document.querySelector("li").text-orientation = sideways;
    }

}