class Calulator{
    constructor(previousOperandTextElement,currntOperandTextElement){
        this.previousOperandTextElement = previousOperandTextElement;
        this.currntOperandTextElement = currntOperandTextElement;
        this.clear();
    }
    clear(){
        this.currentOprand = '';
        this.previousOprand = '';
        this.operation = undefined;
    }
    delete(){
        if(this.currentOprand == 'TO BIG!'){
            this.clear();
        }
        else{
        this.currentOprand = this.currentOprand.toString().slice(0,-1);
        }
    }
    appendNumber(number){
        if(number === '.' && this.currentOprand.includes('.')) return;
        this.currentOprand = this.currentOprand.toString() + number.toString();
    }
    chooseOperation(operation){
        if(this.operation == '!' && this.previousOprand !== ''){
            this.compute();
        }
        if(this.currentOprand === '') return;
        if(this.previousOprand !== ''){
            this.compute();
        }
        this.operation = operation;
        this.previousOprand = this.currentOprand;
        this.currentOprand = '';
    }
    compute(){
        let computation;
        const prev = parseFloat(this.previousOprand);
        const curr = parseFloat(this.currentOprand);
        if(this.operation === '!'){
            if(prev == 0) computation=1;
            else if(prev<=25){
                computation=1;
                for(var i=1; i<=prev; i++){
                    computation*=i;
                }
            }
            else{
                computation = `TO BIG!`;
            }
        }
        else{
        if(isNaN(prev) || isNaN(curr)) return ;
        switch(this.operation){
            case '+':
                computation = prev + curr;
                break;
            case '-':
                computation = prev - curr;
                break;
            case '*':
                computation = prev * curr;
                break;
            case '/':
                computation = prev / curr;
                break;
            case '^':
                computation=1;
                for(var i=1;i<=curr;i++){
                    computation*=prev;
                }
                break;    
            default :
                return;          
        }
        }
        this.currentOprand = computation;
        this.operation=undefined;
        this.previousOprand = '' ; 
    }
    getDisplayNumber(number){
        const stringnumber = number.toString();
        const integerdigits = parseFloat(stringnumber.split('.')[0]);
        const decimalDigits = stringnumber.split('.')[1];
        let integerDisplay ;
        if(isNaN(integerdigits)){
            integerDisplay='';
        }
        else{
            integerDisplay = integerdigits.toLocaleString('en',{maximumFractionDigits: 0});
        }
        if(decimalDigits !=null){
            return `${integerdigits}.${decimalDigits}`
        }
        else{
            return integerDisplay;
        }
    }

    updateDisplay(){
        if(this.currentOprand == 'TO BIG!'){
            this.currntOperandTextElement.innerText = this.currentOprand;
        }
        else{
        this.currntOperandTextElement.innerText = this.getDisplayNumber(this.currentOprand);
        }
        if(this.operation != null){
            this.previousOperandTextElement.innerText = `${this.getDisplayNumber(this.previousOprand)} ${this.operation}`
        }
        else{
            this.previousOperandTextElement.innerText = '';
        }
    }
}


const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalButtons = document.querySelector('[data-equal]');
const deleteButtons = document.querySelector('[data-delete]');
const allClearButtons = document.querySelector('[data-all-clear]');
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currntOperandTextElement = document.querySelector('[data-current-operand]');


const Calulator1 = new Calulator(previousOperandTextElement,currntOperandTextElement); 
numberButtons.forEach(button=>{
    button.addEventListener('click',()=>{
        Calulator1.appendNumber(button.innerText);
        Calulator1.updateDisplay();
    });
});

operationButtons.forEach(button=>{
    button.addEventListener('click',()=>{
        Calulator1.chooseOperation(button.innerText);
        Calulator1.updateDisplay();
    });
});
equalButtons.addEventListener('click',button=>{
    Calulator1.compute();
    Calulator1.updateDisplay();
});

allClearButtons.addEventListener('click',button=>{
    Calulator1.clear();
    Calulator1.updateDisplay();
});
deleteButtons.addEventListener('click',button=>{
    Calulator1.delete();
    Calulator1.updateDisplay();
});

//My-work
