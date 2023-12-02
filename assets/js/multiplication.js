const form = document.querySelector('#multiplication-form')
const btnGenerate = document.querySelector('#generate-btn')

form.onsubmit = e =>{
    e.preventDefault()
    const F = e.target //This points to the form object
    let display = document.querySelector('#output')
    let v = validate(F)// validate form inputs
    if(v !== true) { //if there is an error
        console.log(v)
        msg_range = document.querySelector('#range_error')
        msg_range.innerHTML = ''
        document.querySelector('#mult_error').innerHTML = ''
        if(v.min){
            msg_range.innerHTML += `<span class='d-block'>${v.min}`
            document.querySelector('#min-range').classList.add('error')
        }else{
            document.querySelector('#min-range').classList.remove('error')
        }

        if(v.max){ 
            msg_range.innerHTML += `<span class='d-block'>${v.max}`
            document.querySelector('#max-range').classList.add('error')
        }else{ document.querySelector('#max-range').classList.remove('error')}

        if(v.multiple){
            document.querySelector('#mult_error').innerHTML = `<span class='d-block'>${v?.multiple}`
            document.querySelector('#higest-multiple').classList.add('error')
        }else{
            document.querySelector('#higest-multiple').classList.remove('error')
        }
        return
    }

    display.innerHTML= generateTable(F).join('')
    let title = document.createElement('h2')
    title.innerHTML = 'Generated Result'
    if(!display.classList.contains('hasTitle')){
        display.parentElement.prepend(title)
        display.classList.add('hasTitle')
    }
    
}

let validate = (form) => {
    let min = parseInt(form.min_range.value)
    let max = parseInt(form.max_range.value)
    let multiple = parseInt(form.highest_multiple.value)
    let err = {}
    if(min <= 0 || isNaN(min)) err.min = 'Minimum Range must be greater than or equal to 1'

    if (max <= min || isNaN(max)) err.max = 'Maximum range must be greater than or equal to the Minimum range'
    if (multiple < 1 || isNaN(multiple) ) err.multiple = 'Highest Mulitple must be greater than 1'
    return  (Object.keys(err).length == 0) ? true : err
}

let generateTable = ({min_range,max_range,highest_multiple}) => {
    let output = []
    for(let oloop = parseInt(min_range.value); oloop <= parseInt(max_range.value); oloop++){
        let card = "<ul class='card card-primary p-2'>"
        for(let iloop = 1; iloop <= parseInt(highest_multiple.value); iloop++){
            product = oloop * iloop
            card += `<li>${oloop} * ${iloop} = ${product}</li>`
        }
        card += '</ul>'
        output.push(card)
    }
    
    return output
}