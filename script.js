class Calculator{
constructor(previousoperandTextElement,currentoperandTextElement){
     this.previousoperandTextElement = previousoperandTextElement;
     this.currentoperandTextElement = currentoperandTextElement;
    this.clear();///
}
clear(){
this.currentOperand='';
this.previousOperand='';
this.operation=undefined;
}
delete(){
    this.currentOperand=this.currentOperand.toString().slice(0,-1)
}
appendNumber(number){
    if(number==='.'&& this.currentOperand.includes('.')) return //stop execution of function
    this.currentOperand=this.currentOperand.toString() + number.toString();
}
chooseOperation(operation){
    if(this.currentOperand==='')return
    if(this.previousOperand !==''){
        this.compute();
    }
    this.operation=operation;
    this.previousOperand=this.currentOperand
    this.currentOperand=''
}
compute(){
    let computation;
    const prev =parseFloat(this.previousOperand); 
    const current =parseFloat(this.currentOperand);
    if(isNaN(prev)||isNaN(current))return
    switch(this.operation){
        case "+": computation=prev+current;break;
        case "-": computation=prev-current;break;
        case "*": computation=prev*current;break;
        case "÷": computation=prev/current;break;
        default:return      
    }
    this.currentOperand=computation
    this.operation=undefined
    this.previousOperand=""
}

getDisplayNumber(number){
    const stringNumber=number.toString()
    const intergerDigits=parseFloat(stringNumber.split('.')[0])
    const decimalDigits=stringNumber.split('.')[1]
    let intergerDisplay
    if(isNaN(intergerDigits)){
        intergerDisplay=''
    }else{
        intergerDisplay=intergerDigits.toLocaleString('en',{
             maximumFractionDigits:0
            })
        }
        if(decimalDigits!=null){
            return `${intergerDisplay}.${decimalDigits}`
        }else{
            return intergerDisplay
        }
}


updateDisplay(){
    this.currentoperandTextElement.innerText=this.getDisplayNumber
    (this.currentOperand);
    if(this.operation!=null){
        this.previousoperandTextElement.innerText=
        `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
    }else{
        this.previousoperandTextElement.innerText=''
    }
}
}


const numberButton = document.querySelectorAll('[data-number]')
const operationButton=document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousoperandTextElement=document.querySelector('[data-previous-operand]')
const currentoperandTextElement=document.querySelector('[data-current-operand]')



const calculator=new Calculator(previousoperandTextElement, currentoperandTextElement)

numberButton.forEach(button=>{
    button.addEventListener('click',()=>{
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})
operationButton.forEach(button=>{
    button.addEventListener('click',()=>{
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalsButton.addEventListener('click',()=>{
    calculator.compute();
    calculator.updateDisplay()
})
allClearButton.addEventListener('click',()=>{
    calculator.clear();
    calculator.updateDisplay()
})
deleteButton.addEventListener('click',()=>{
    calculator.delete();
    calculator.updateDisplay()
})