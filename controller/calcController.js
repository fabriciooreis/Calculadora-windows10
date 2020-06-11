class calcController{

    constructor(){
        this.initialize();
        this._dispalyCalcEl = document.querySelector("#display");
        this._cont = 0;
        this._operation = [];
        this._operationOfCalc = ["+", "-", "/", "x", "%"];
        this._operationComplexes = ["√","x²","¹/x","←"];
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
    //método para inserir no vetor, fazendo a verificação
    //caso o vetor seja maior que 3, chama a função CalC
    pushOperation(value){
        this._operation.push(value);
        this.showConsole();
        if(this.getLengthArray() > 3){
            this.CalC();
        }
    }
    //calculo será realizado aqui
    getResult(){
        let value = this._operation.join("");
        value = value.replace("x", "*");
        return eval(value);
    }
    //método para calcular os indices do vetor
    CalC(){
        let lastOperation ="";
        let firstNumber ="";

        if(this.getLengthArray() == 1){
            
            firstNumber = this._operation[0];
            this._operation =[firstNumber];
            this.showConsole();
            return;
        }else if(this.getLengthArray() == 2){
            
            //terminar isso
            firstNumber = this._operation[0];
            lastOperation = this._operation[1];
            this.showConsole();
            return;
        
        }else if(this.getLengthArray() == 3){
            
            firstNumber = this.getResult();
            this._operation = [firstNumber.toString()];
            this.showConsole();
            return;

        }else if(this.getLengthArray() > 3){
            
            lastOperation = this._operation.pop();
            let calcArray = this.getResult();
            this._operation = [calcArray.toString(), lastOperation]; 
            this.showConsole();
            return;

        }else{
            
            this._cont++;
            console.log(this._cont);
        }
        
       
       
    
    }
    
    //método para adicionar no vetor operation
    addOperation(value){

         //verificar se o primeiro valor a ser inserido no vetor
        if(this.getLengthArray() == 0){
            //o que vai ser inserido no 1º índice é um sinal matemático? 
            if(this.getOperationOfCalc(value) >-1){
                console.log("Não posso inserir um operador no primeiro indice do vetor");
            }else if(!isNaN(value)){
                this.pushOperation(value);
                
            }
            //ultimo index é um número && é o valor de entrada é um número
        }else if((!isNaN(this.getLastOperation())) && (!isNaN(value))){
            let lastNumber = this._operation.pop();
            lastNumber = (lastNumber+value);
            this.pushOperation(lastNumber);

           //se o ultimo index é um número e o valor de entrada é um sinal
        }else if((!isNaN(this.getLastOperation())) && isNaN(value)){
            this.pushOperation(value);

            //se o ultimo index for um sinal e o valor de entrada for um número
        }else if(isNaN(this.getLastOperation()) && (!isNaN(value))){
            this.pushOperation(value);

            //se o ultimo index do vetor for um operador e o valor de entrada também for um operador
            //trocar a operação do calculo
        }else if(isNaN(this.getLastOperation()) && isNaN(value)){
            this._operation.pop();
            this.pushOperation(value);
        }  
        
    }
    setError(value){
        this.displayCalc = "Error "+value;
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

    getOperationComplexes(value){
        return this._operationComplexes.indexOf(value);
    }

    getOperationOfCalc(value){
        return this._operationOfCalc.indexOf(value);
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
            case 'x²':
            case '¹/x':
            case '←':
                //this.addOperation(value);
                break;
            case '=':
                this.CalC();
                break;
            default:
                this.setError(value);
                break;
        }
    }
}
