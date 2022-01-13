const canvasDiv = document.getElementById("canvas");
const clearButton = document.querySelector(".clearButton");

//Clear button functionality

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

    for (let i = 0; i<slider.value*slider.value; i++){
        const canvasBox = document.createElement("div");
        canvasBox.classList.add("canvasBox");
        canvasBox.style.height = `${calculateBoxDim()}px`;
        canvasBox.style.width = `${calculateBoxDim()}px`;
        canvasBox.setAttribute("id", `box${i}`);
        canvasDiv.appendChild(canvasBox);
        }
    if(!checkRGB()){
        for (let i = 0; i<slider.value*slider.value; i++){
            const currentBox = document.getElementById(`box${i}`);
            currentBox.addEventListener("mouseenter", function(){
                currentBox.style.backgroundColor="black";
            });
        }
    } else {
        for (let i = 0; i<slider.value*slider.value; i++){
            const currentBox = document.getElementById(`box${i}`);

            currentBox.addEventListener("mouseenter", function(){
                const style = getComputedStyle(currentBox);
                const backgroundColor = style.backgroundColor;

                if (backgroundColor == "rgb(255, 255, 255)"){
                        const newColor = generateRandomColor();
                        currentBox.style.backgroundColor= newColor;
                        currentBox.value = newColor;
                        console.log(currentBox.value);
                } else {
                        const substr = currentBox.value.slice(4, currentBox.value.length-1);
                        const array = substr.split(","); 
                        let newR = parseInt(array[0]) - (parseInt(array[0]/10));
                        let newG = parseInt(array[1]) - (parseInt(array[1]/10));
                        let newB = parseInt(array[2]) - (parseInt(array[2]/10));

                        const newRGB = `rgb(${newR}, ${newG}, ${newB})`;
                        currentBox.style.backgroundColor = newRGB;
                }
            });


        }
    }
}

function multiplyRGB(string){
    const substr = string.slice(4, string.length-1);
    const array = substr.split(",");
    let newR = parseInt(array[0])*0.8;
    let newG = parseInt(array[1])*0.8;
    let newB = parseInt(array[2])*0.8;

    const newRGB = `rgb(${newR}, ${newG}, ${newB})`;
    return newRGB;
}

function addTenPercent(value){
    const newNum = value*1.1;

    if(value<=255){
        return newNum;
    }
    return 255;
}

function generateRandomColor(){
    const r = Math.floor(Math.random()*255);
    const g = Math.floor(Math.random()*255);
    const b = Math.floor(Math.random()*255);
    const rgb = `rgb(${r}, ${g}, ${b})`;
    return rgb;
}

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


/* 
create a random color
add event listener for every div with mouseenter
assign random color to div if event fires
save color value somehow
check if div is already assigned a new color
if so make it darker by 10%
*/