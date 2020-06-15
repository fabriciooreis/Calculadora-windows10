class calcController{

    constructor(){
        this.initialize();
        this._dispalyCalcEl = document.querySelector("#display");
        this._cont = 0;
        this._operation = [];
        this._operationLimited = ["/", "x", "%", "x²"];
        this._operationIlimited = ["+", "-","¹/x", "√"];
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
    }
    //retorna o ultimo index do vetor
    getLastOperation(){
        return this._operation[this._operation.length-1];
    }
    //retorna o tamanho do vetor
    getLengthArray(){
        return this._operation.length;
    }
    getIndexOneArray(){
        return this._operation[1];
    }
    getLastButOnePositionArray(){
        return this._operation[this._operation.length-2];
    }
    getFirtNumberArray(){
        return this._operation[0];
    }
    //método para inserir no vetor, fazendo a verificação
    //caso o vetor seja maior que 3, chama a função CalC
    pushOperation(value){
        this._operation.push(value);
        this.showConsole();
        if(this.getLastOperation() == "%"){
            this.CalCPercent();

        }else if(this.getLengthArray() > 4){
            //this.CalC();
        }
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
    getArray(){
        return this._operation;
    }
    getOperationOfIlimited(value){
        return this._operationIlimited.indexOf(value);
    }
    

    //método para calcular os indices do vetor
    CalC(){
        

    }
    getCalCPercent(value){

        let valueOne = this._operation[0];
        let valueTwo = this._operation[2];
        let result ="";

        valueOne = Number(valueOne);
        valueTwo = Number(valueTwo);

        try{
            if(value == "+"){
            
                console.log("Entrei aqui no mais");
                result = (valueOne + (valueOne *(valueTwo/100)));
            }else if(value == "-"){
                result = ((valueOne - (valueOne *(valueTwo/100))));
            } 

            this._operation =[result.toString()];
            this.showConsole();

        }catch(error){
            this.setError();
        }
      
        

    }
    //calculo dos %
    CalCPercent(){
        if(this.getOperator("+") > -1){
            this.getCalCPercent("+");
        }else if(this.getOperator("-") > -1){
            this.getCalCPercent("-");
        }else{
            //remove percent of array
            this._operation.pop();
        
            let beforePercent = this.getLastOperation();
            beforePercent /= 100;
            
            this._operation.pop();
            this.pushOperation(beforePercent.toString());
            this.showConsole();
        }
        
    }
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
    
    //método para adicionar no vetor operation
    addOperation(value){
        let lastNumber ="";
        let lastOperator="";

         //verificar se o primeiro valor a ser inserido no vetor
        if(this.getLengthArray() == 0){
            //o que vai ser inserido no 1º índice é um sinal matemático? 
            if(this.getOperationLimited(value) >-1){
                //console.log("Não posso inserir um operador no primeiro indice do vetor");
                return;
                //o que vai ser inserido no vetor é um sinal do ilimited
            }else if(this.getOperationIlimited(value) > -1){
                this.pushOperation(value);
                //o que vai ser inserido é um número
            }else if(!isNaN(value)){
                this.pushOperation(value);
            }
            //ultimo index é um número && é o valor de entrada é um número
            //concatena os números e armazena no mesmo indice
        }else if((!isNaN(this.getLastOperation())) && (!isNaN(value))){
            lastNumber = this._operation.pop();
            lastNumber = (lastNumber+value);
            this.pushOperation(lastNumber);

           //se o ultimo index é um número e o valor de entrada é um sinal
           //armazena no proximo index do vetor
        }else if((!isNaN(this.getLastOperation())) && isNaN(value)){
            
            this.pushOperation(value);

            //se o ultimo index for um sinal e o valor de entrada for um número
        }else if(isNaN(this.getLastOperation()) && (!isNaN(value))){
            lastOperator = this.getLastOperation();

            this.pushOperation(value);
          
            //se o ultimo index do vetor for um operador e o valor de entrada também for um operador
            //trocar a operação do calculo, exceto se for um operadorIlimited
        }else if(isNaN(this.getLastOperation()) && isNaN(value)){
            // se na primeira posição for entrar um operador Limited, não será permitido.
            if(this.getLengthArray() == 1 && this.getOperationLimited(value) > -1){
                return;
                //se o ultimo index for um operador e esse o perador for um operador do ilimited,
                //não é feita a substituição, simplesmente é acrescentado em um novo index do vetor
            }else{
                this._operation.pop();
                this.pushOperation(value);
            }
        } 
    
        
    }
    setLastNumberToDisplay(){
        
    }

    setError(value){
        this.displayCalc = "Sintaxe Error "+value;
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

    getOperationIlimited(value){
        return this._operationIlimited.indexOf(value);
    }

    getOperationLimited(value){
        return this._operationLimited.indexOf(value);
    }

    get displayCalc(){
        return this._dispalyCalcEl.innerHTML;
    }
    set displayCalc(value){
        this._dispalyCalcEl.innerHTML = value;
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
                this.addOperation(value);
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
            case '%':
                this.addOperation(value);
                break;
            case '√':
                this.addOperation(value);
                break;
            case 'x²':
                this.addOperation(value);
                break;
            case '¹/x':
            case '←':
                this.addOperation(value);
                break;
            case '=':
                this.CalC();
                break;
            case ',':
                this.addDot(value);
                break;
            default:
                this.setError(value);
                break;
        }
    }
}
