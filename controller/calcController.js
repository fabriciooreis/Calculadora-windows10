class calcController{

    constructor(){
        this.initialize();
        this._dispalyCalcEl = document.querySelector("#display");
        this._operation = [];
        this._operationSign = ["/", "x", "+", "-"];
        this._root = '√';
        this._oneX = '¹/x';
        this._xSquare = 'x²';
        this.initButtonsEventClick();
        this.initButtonsEventDrag();   
    }

    initialize(){
        this.setClear();
    }
    showConsole(){
        console.log(this._operation);
    }
    //removendo a ultima posição do array
    setClearEntry(){
        this._operation.pop();
        this.showConsole();
    }
    //limpando o array
    setClear(){
        this._operation = [];
        this.showConsole();
        //this.setLastNumberToDisplay();
    }
    //retorna o ultimo index do vetor
    getLastOperation(){
        return this._operation[this._operation.length-1];
    }
    //retorna o tamanho do vetor
    getLengthArray(){
        return this._operation.length;
    }
    //calculo será realizado aqui
    getResult(){
        let value = this._operation.join("");
        value = value.replace("x", "*");
        return eval(value);
    }
    //confirmar qual o operador, o método retorna o index 
    getOperator(value){
        return this._operation.indexOf(value);
    }
    //retorna todo o array
    getArray(){
        return this._operation;
    }
    //método para comparação dos elementos do array
    getSignIntoArray(value){
        return this._operation.indexOf(value);
    }
    
    //método para calcular os indices do vetor
    CalC(){
        

    }
    //calcular o %
    getCalCPercent(value){

    }

    //calculo dos %
    CalCPercent(){
        
    }
    //Adicionando o ponto nos números
    addDot(value){
        value = value.replace(",", ".");
        if(!isNaN(this.getLastOperation())){
            let lastNumber = this._operation.pop();
            lastNumber = lastNumber.toString()+value.toString();
            this._operation.push(lastNumber);
            this.showConsole();
        }else{
            return;
        }
    }

    //método para adicionar os sinais no vetor
    addSign(value){

        //se o vetor ainda não tiver nenhum elemento
        if(this.getLengthArray() == 0){
            return;
            //para não trocar o sinal de - e + no primeiro elemento do vetor
        }else if(this.getLengthArray() == 1 && value == 'x'){
            return;
            //para não trocar o sinal de - e + no primeiro elemento do vetor
        }else if(this.getLengthArray() == 1 && value == "/"){
            return;
            //se o ultimo elemento do vetor for um número
        }else if(!isNaN(this.getLastOperation())){
            this.pushOperation(value);

            //se o ultimo elemento do vetor for um sinal
        }else if(isNaN(this.getLastOperation())){
            this._operation.pop();
            this.pushOperation(value);
        }
    }
   

    //método para inserir no vetor, fazendo a verificação
    //caso o vetor seja maior que 3, chama a função CalC
    pushOperation(value){
        this._operation.push(value);
        this.showConsole();
    }
    //adionar raiz quadrada
    addRootSquare(){
        let number = 0;
        let result = 0;
        if(this.getLengthArray()==0 && this.getLengthArray() == 1){
            return;
            //se o ultiomo elemento for um número
            //podemos elevar ao quadrado
        }else if(!isNaN(this.getLastOperation())){
            number = this._operation.pop();
            result = (number*number)
            this.pushOperation(result.toString());
        }else{
            return;
        }
    }
    //Tirar a raiz
    getRootSrt(value){
        let sign = this.getSignIntoArray(value);
        if(this.getLengthArray() == 0){
            this.pushOperation(value);
            return;
        }
        if(isNaN(this.getLastOperation()) || this.getSignIntoArray(value) >-1){
            if(isNaN(this.getLastOperation())){
                this.pushOperation(value);
                return;
            }else if(this.getSignIntoArray(value) > -1){
                this.pushOperation(value);
                return;
            }
            
        }
    }
    
    
    //método para adicionar no vetor operation
    addNumber(value){
        let lastNumber ="";

        if(this.getLengthArray() == 0 || isNaN(this.getLastOperation())){
            this.pushOperation(value);
            
            //Se o ultimo elemento do vetor for um número e o valor da nova entrada for um número, concatena e add
        }else if(!isNaN(this.getLastOperation()) && !isNaN(value)){
            lastNumber = this._operation.pop();
            lastNumber += value;
            this.pushOperation(lastNumber);
        }
        //this.setLastNumberToDisplay();
    }
    //inserindo o sinal de + ou -
    addMoreOrLess(value){
        if(this.getLengthArray() == 0){
            this.pushOperation("-")
            //invertendo os sinais
        }else if(isNaN(this.getLastOperation())){
            if(this.getLastOperation()== '-'){
                this._operation.pop();
            this.pushOperation("+");
            }else{
                this._operation.pop();
                this.pushOperation('-');
            }
            
        }else if(!isNaN(this.getLastOperation())){
            this.pushOperation('-');
        }
    }

    //display Calc
    setLastNumberToDisplay(){
        let lastNum = "";
            
        for(let x = 0; x< this._operation.length; x++){
            lastNum += this._operation[x];
        }

        console.log(lastNum);
        this.setDisplayCalc = lastNum;
    }

    setError(){
        this.setDisplayCalc = "Sintaxe Error ";
    }
    //iniciando o evento de click
    initButtonsEventClick(){
        let buttons = document.querySelectorAll(".row > button");
        buttons.forEach(btn=>{
            btn.addEventListener("click", e=>{
                let txtBtn = btn.innerHTML;
                this.excBtn(txtBtn);
                //console.log(txtBtn+" "+e.type);
                //console.log(txtBtn);
            });
        });
    }
    //iniciando o evento drag = arrastar
    initButtonsEventDrag(){
        let buttons = document.querySelectorAll(".row > button");
        buttons.forEach(btn=>{
            btn.addEventListener("drag", e=>{
                let txtBtn = btn.innerHTML;
                console.log(txtBtn);
            })
        });
    }

    get displayCalc(){
        return this._dispalyCalcEl;
    }
    set setDisplayCalc(value){
        this._dispalyCalcEl.innerHTML = value;
    }
    get numRoot(){
        return this._root;
    }
    excBtn(value){
        switch(value){
            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
                this.addNumber(value);
                break;
            case 'CE':
                this.setClearEntry();
                break;
            case 'C':
                this.setClear();
                break;
            case '+':
            case '-':
            case '/':
            case 'x':
                this.addSign(value);
                break;
            case 'x²':
                this.addRootSquare();
                break;
            case '%':   
            case '√':
                this.getRootSrt(value);
                break;
            case '¹/x':
            case '←':
                break;
            case '=':
                this.CalC();
                break;
            case ',':
                this.addDot(value);
                break;
            case '±':
                this.addMoreOrLess(value);
                break;
            default:
                this.setError(value);
                break;
        }
    }
}
