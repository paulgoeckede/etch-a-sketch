//This below part is the function for displaying the current value of the dimensions slider

let slider = document.getElementById("myRange");
let output = document.getElementById("demo");

output.innerHTML = slider.value;

slider.oninput = function() {
    output.innerHTML = this.value;
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