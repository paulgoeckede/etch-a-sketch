const canvasDiv = document.getElementById("canvas");

//Clear button functionality

const clearButton = document.querySelector(".clearButton");
clearButton.addEventListener("click", deleteCanvas);

//This below part is the function for displaying the current value of the dimensions slider

let slider = document.getElementById("myRange");
let output = document.getElementById("demo");

output.innerHTML = slider.value;

slider.oninput = function() {
    output.innerHTML = this.value;
    deleteCanvas();
}

//This below part is the functionality of the toggle Switch

//get the Checkbox
const checkBox = document.getElementById("toggleRGB");
checkBox.addEventListener("click", checkRGB);
checkBox.addEventListener("click", deleteCanvas);

function checkRGB(){
    
    if(checkBox.checked == true){
        return true;
    } 
    return false;
}

//Creating the canvas parts

function fillCanvas(){

    /* 
    This loop creates the total amount of divs needed to fill the canvas evenly. This is done by multiplying the by the user requested dimensions.
    Each created div gets a class which gives it its default style, as well as a unique numbered ID, which is needed later to target specific divs.
    Every div is then added to the canvas, filling it completely.
    */
    for (let i = 0; i<slider.value*slider.value; i++){
        const canvasBox = document.createElement("div");
        canvasBox.classList.add("canvasBox");
        canvasBox.style.height = `${calculateBoxDim()}px`;
        canvasBox.style.width = `${calculateBoxDim()}px`;
        canvasBox.setAttribute("id", `box${i}`);
        canvasDiv.appendChild(canvasBox);
        }

    //The following if condition checks if the "Rainbow-Mode" is turned on
    if(!checkRGB()){

        /*
        If it is turned off, the for loop loops through every div in the canvas and adds an Event Listener for when the mouse hovers or enters over it.
        If the event happens, the color of the div will turn black. 
        */
        for (let i = 0; i<slider.value*slider.value; i++){
            const currentBox = document.getElementById(`box${i}`);
            currentBox.addEventListener("mouseenter", function(){
                currentBox.style.backgroundColor="black";
            });
        }
    } else {
        
        // This part of the function will only be executed if Rainbow Mode is turned on.
        
        // This for loop loops through each unique div by grabbing the ID that we assigned earlier
        for (let i = 0; i<slider.value*slider.value; i++){
            const currentBox = document.getElementById(`box${i}`);

            /* 
            Below an event listener for mouseenter event is added. There are a few important things that happen: 
            If the event is fired, the current background color of the div is grabbed. If the background color equals white (as an RGB value), this means that 
            this is a blank div and will change its color for the first time. It is assigned a random color and the background is changed. This initial/first 
            background color is saved as the div elements value and stored for later use.

            If the color is not white, this means that the Div has already been changed. This is important to know, because we want already changed divs with a
            random color to get darker by 10% each time the mouse passes through them again.
            To do this, the initially assigned random color is grabbed through the earlier declared value, then each R, G and B value is grabbed and divided by 9.
            Then the result of this division is subtracted from the current color and the new value assigned to the div, leading to the values reaching 0 after
            the 10th event.
            */

            currentBox.addEventListener("mouseenter", function(){
                const style = getComputedStyle(currentBox);
                const backgroundColor = style.backgroundColor;

                //if background color is white / div has not been assigned a random color yet
                if (backgroundColor == "rgb(255, 255, 255)"){
                        const newColor = generateRandomColor();
                        currentBox.style.backgroundColor= newColor;
                        currentBox.value = newColor;
                
                //if not white / div has already been assigned a color
                } else {
                        const originalColor = currentBox.value.slice(4, currentBox.value.length-1);
                        const originalArray = originalColor.split(","); 
                        const currentColor = backgroundColor.slice(4, backgroundColor.length-1);
                        const currentArray = currentColor.split(",");
                        
                        let newR = Math.floor(currentArray[0] - (originalArray[0]/9));
                        let newG = Math.floor(currentArray[1] - (originalArray[1]/9));
                        let newB = Math.floor(currentArray[2] - (originalArray[2]/9));

                        const newRGB = `rgb(${newR}, ${newG}, ${newB})`;
                        currentBox.style.backgroundColor= newRGB;
                }
            });
        }
    }
}

//This function generates a random RGB color value
function generateRandomColor(){
    const r = Math.floor(Math.random()*255);
    const g = Math.floor(Math.random()*255);
    const b = Math.floor(Math.random()*255);
    const rgb = `rgb(${r}, ${g}, ${b})`;
    return rgb;
}

//This function calculates the height and width dimension each square in the canvas has to have so they have the exact size to completely fill the canvas
function calculateBoxDim(){
    const boxDim = 420/slider.value;
    return boxDim;
}

//This function deletes all generated boxes inside the canvas and replaces them with fresh ones
function deleteCanvas(){
    while(canvasDiv.firstChild){
        canvasDiv.removeChild(canvasDiv.firstChild);
    }

    fillCanvas();
}

fillCanvas();