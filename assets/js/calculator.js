// variable initilaizations
let screenInput = document.getElementById("input")
let screenResult = document.getElementById("result")
let equalBtn = document.querySelector('#btn-equals')
let backspaceBtn = document.querySelector('#btn-backspace')
let clearBtn = document.querySelector('#btn-ac')

// Grab List of all the number buttons
let numBtns = document.querySelectorAll('.btn-numbers')
//Grab list of all the Operator buttons
let opBtns = document.querySelectorAll('.btn-operators')

// Combine numbers and operator buttons together
let allBtns = [...numBtns,...opBtns]
// let allBtns = Object.assign(numBtns,opBtns)

// Listin for event on each of the nuber buttons and display the value on screen
numBtns.forEach(btn =>{
    btn.onclick = () =>{
        screenInput.value += btn.innerHTML
        
    }
})

// Listen for click event on each of the operator buttons and also display the value
opBtns.forEach(btn => {
    btn.onclick = () => {
        let result = screenResult.innerHTML
        //Check if the screenResult is empty
        if( result != ''){
            screenInput.value = result + btn.innerHTML
            //Clear the result
            screenResult.innerHTML = ''
            return
        }
        screenInput.value += btn.innerHTML
    }

})

//Listen for click on the eqaulity sign
equalBtn.onclick = () => {
    resultDisplay(calculate())
}

//Listin for click on the backspace button
backspaceBtn.onclick = () => {
    let str = screenInput.value.substr(0,screenInput.value.length - 1)
    screenInput.value = str
}

//Listin for click on the clear button
clearBtn.onclick = () => {
    screenInput.value = ''
    screenResult.innerHTML = ''
}

// Function declarations
let calculate = (input = screenInput.value) => {
    let ans = eval(input);
    return ans
}

//Function to display the result
let resultDisplay = value =>{
    screenResult.innerHTML = value
}