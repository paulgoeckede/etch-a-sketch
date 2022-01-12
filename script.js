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

function checkRGB(){
    
    if(checkBox.checked == true){
        console.log("true");
    } else {
        console.log("false");
    }
}

//Creating the canvas parts

function fillCanvas(){
    
    for (let i = 0; i<slider.value*slider.value; i++){
        const canvasBox = document.createElement("div");
        canvasBox.classList.add("canvasBox");
        canvasBox.style.height = `${calculateBoxDim()}px`;
        canvasBox.style.width = `${calculateBoxDim()}px`;
        canvasBox.setAttribute("id", `box${i}`);
        canvasBox.addEventListener("mouseenter", () => canvasBox.classList.add("canvasBoxHovered"));
        canvasDiv.appendChild(canvasBox);
    }
}

//This calculates height and width of one canvas box based on the slider value the user entered

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