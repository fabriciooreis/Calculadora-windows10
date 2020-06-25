class calcController{

    constructor(){
       
        this._displayCalcEl = document.getElementById("display");
        this._operation = [];
        this._operationSign = ["/", "x", "+", "-"];
        //this._root = '√';
        //this._oneX = '¹/x';
        //this._xSquare = 'x²';
        this.initButtonsEventClick();
        this.initButtonsEventDrag();   
    }

    showConsole(){
        console.log(this._operation);
    }

    //removendo a ultima posição do array
    setClearEntry(){
        this._operation.pop();
        this.showConsole();  
        this.setLastOperationToDispalay();
    }

    //limpando o array
    setClear(){
        this._operation = [];
        this.showConsole();
        this.setZeroDisplay();   
    }

    //setar zero no display 
    setZeroDisplay(){
       this.displayCalc = "0";
    }

    //setar o display
    setLastOperationToDispalay(){
        if(this.getLengthArray() == 0){
            this.setZeroDisplay();
        }else{
            let lastNumber = this._operation.join("");
            if(lastNumber.indexOf('*')>-1){
                lastNumber = lastNumber.replace("*", "x");
            }
            this.displayCalc = lastNumber;
        }
     
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
    
    //calcular o %
    getCalCPercent(){
        
    }


    //buscando o ponto 
    getDoot(value){
        let doot;
        doot = value.indexOf(".");
        return doot;
    }

    //buscando o %
    getPercent(value){
        let percent;
        percent = value.indexOf('%');
        return percent;
    }
    //add percent
    addPercent(value){
        let lastNumber;
        let dootPosition;
        
        if(this.getLengthArray()==0){
            return;
        }else if(this.getLastOperation() == '%'){
            return;
            //verificando se a ultima opção é um número
        }else if(!isNaN(this.getLastOperation())){

            lastNumber = this.getLastOperation();
            //posicao do ponto na string
            dootPosition = this.getDoot(lastNumber);
            
            //aqui se o ponto existir, só é permitido add se depois do ponto existir um número 
            if(dootPosition > -1){
                let result = lastNumber.substring((dootPosition+1));

                //se dopois do ponto for vazio retorna, para que não entre na calculadora como por exemplo 0.%
                if(result == ""){
                    this.showConsole();
                    return;
                    
                    //se depois do ponto existir um número, então pode add o %
                }else if(!isNaN(result)){
                    lastNumber = this._operation.pop();
                    this.pushOperation(lastNumber+value);

                }

            }
            else{
                lastNumber = this._operation.pop();
                this.pushOperation(lastNumber+value);
            }
            
            //se não for um número, ou tiver um ponto
            //o 0. alguma coisa é considerado um número pelo método isNaN();
        }

    }
    //Adicionando o ponto nos números
    addDot(value){
        let lastNumber;
        value = value.replace(",", ".");
        if(!isNaN(this.getLastOperation())){
            lastNumber = this._operation.pop();
            //se já tiver um ponto
            if(this.getDoot(lastNumber) > -1){
                //novamente eu add no vetor
                lastNumber = lastNumber.toString();
                this.pushOperation(lastNumber);

            }else{
                //se não tiver o ponto, acrescento junto ao ultimo número um ponto
                lastNumber = lastNumber.toString()+value.toString();
                this.pushOperation(lastNumber);
                
            }

        }else if(isNaN(this.getLastOperation())){
                this.pushOperation("0.");
        }else{
            return;
        }
    }

    //método para adicionar os sinais no vetor
    addSign(value){
        let lastNumber;
        let result;
        //se o vetor ainda não tiver nenhum elemento
        if(this.getLengthArray() == 0){
            return;
            //para não trocar o sinal de - e + no primeiro elemento do vetor
        }else if(this.getLengthArray() == 1 && value == 'x'){
            lastNumber = this.getLastOperation();
            lastNumber = lastNumber.indexOf("%");
            if(!isNaN(this.getLastOperation())){
                this.pushOperation(value);
                return;
            }else if(isNaN(this.getLastOperation()) && lastNumber >-1){
                this.pushOperation(value);
                return;
            }
            //para não trocar o sinal de - e + no primeiro elemento do vetor
        }else if(this.getLengthArray() == 1 && value == "/"){
            lastNumber = this.getLastOperation();
            lastNumber = lastNumber.indexOf("%");
            if(!isNaN(this.getLastOperation())){
                this.pushOperation(value);
                return;
            }else if(isNaN(this.getLastOperation()) && lastNumber >-1){
                this.pushOperation(value);
                return;
            }
             
            //se o ultimo elemento do vetor for um número
        }else if(!isNaN(this.getLastOperation())){
            this.pushOperation(value);
            
            //impedindo do 1÷ ser trocado por outro sinal
        }else if(this.getLastOperation() == '1÷'){
            return;
        }
        //se o ultimo elemento do vetor for um sinal
        else if(isNaN(this.getLastOperation())){
            lastNumber = this.getLastOperation();
            //procura se no ultimo elemento existe o %
            lastNumber = lastNumber.indexOf("%");

            if(lastNumber > -1){
                this.pushOperation(value);
            }else{
                this._operation.pop();
                this.pushOperation(value);
            }
            
        }
    }

    //um sob x
    oneUnderX(value){
        let lastNumber;
        lastNumber = this.getLastOperation();
        if(lastNumber == undefined && this.getLengthArray() == 0){
            this.pushOperation(value);
            return;
            
        }else{
            lastNumber = lastNumber.indexOf("%");
        }

            //se no ultimo index tiver o sinal de %
        if(isNaN(this.getLastOperation()) && lastNumber >-1){
            return;

            //se for somente um sinal qualuer
        }else if(isNaN(this.getLastOperation())){
            if((this.getLastOperation() === '1÷') && value === '1÷'){
                return;
            }else{
                this.pushOperation(value);
                return;
            }

        }else if(!isNaN(this.getLastOperation())){
            return;
        }
        
    }
   

    //método para inserir no vetor, fazendo a verificação
    //caso o vetor seja maior que 3, chama a função CalC
    pushOperation(value){
        this._operation.push(value);
        if(this.getLengthArray() > 3 && this.findRoot() == -1 && this.findOneX() == -1){
            this.checkSigns();
        }
        this.showConsole();
        this.setLastOperationToDispalay();
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
            result = (number*number);
            this.pushOperation(result.toString());
        }else{
            return;
        }
        
    }
    //Tirar a raiz
    setRootSrt(value){
    
        if(this.getLengthArray() == 0){
            this.pushOperation(value);
            return;

        }else if(this.getLastOperation() == '√'){
            return;
            //se o ultimo index for um número, não adiciona, primeiro add o sinal
        }else if(!isNaN(this.getLastOperation())){
            return;
        }
        //getSignIntoArray busca se o valor passado pertence aos sinais primários dos calculos x / + -
        if(isNaN(this.getLastOperation()) || this.getSignIntoArray(value) >-1){
            //verifica se o ultimo index não é um número
            if(isNaN(this.getLastOperation())){

                let last = this.getLastOperation();
                //busca se o % é o ultimo valor
                if(this.getPercent(last) > -1){
                    return;
                }else{
                    this.pushOperation(value);
                    return;
                }
                
            }else if(this.getSignIntoArray(value) > -1){
                this.pushOperation(value);
                return;
            }
            
        }
        
    }
    
    
    //método para adicionar no vetor operation
    addNumber(value){
        let lastNumber;
        //se o tamanho do vetor for 0 ou o ultimo index não for um número
        if(this.getLengthArray() == 0 || isNaN(this.getLastOperation())){
            //se o array ainda estiver vazio
            if(this.getLengthArray() ==0){
                this.pushOperation(value);
                //se o array for maior do que 1
            }else if(this.getLengthArray() >= 1){
                //busco dentro da ultima opção se existe um sinal de %
                lastNumber = this.getLastOperation();
                lastNumber = lastNumber.indexOf("%");
                //caso exista o % não permito add outro número, pois o próximo valor deve ser um sinal
                if(lastNumber > -1){
                    return;
                }else{
                    //caso não exista o %, add no vetor o número digitado
                    this.pushOperation(value);
                }
            }
            //Se o ultimo elemento do vetor for um número e o valor da nova entrada for um número, concatena e add
        }else if(!isNaN(this.getLastOperation()) && !isNaN(value)){
            lastNumber = this._operation.pop();
            lastNumber += value;
            this.pushOperation(lastNumber);
        }
        
    }
    //inserindo o sinal de + ou -
    //também inverte os sinais.
    addMoreOrLess(){
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
    
    //encontrar os sinais da raiz dentro do vetor e passar o método para o array
    findRootIndex(){
        let root = this._operation.indexOf('√');
        let oneAfter;

        while(root > -1){

            oneAfter = this._operation[root+1];
            if(oneAfter == undefined){
                this.setError();
                return;
                
            }
            this._operation[root] = eval(`Math.sqrt(${oneAfter})`);
            this._operation[root+1] = '';
            root = this._operation.indexOf('√');
            
        }
        
    }

    //econtrar o '1÷' dentro do vetor e passar o método para o array
    findOneUnderXIndex(){
        let oneUnder = this._operation.indexOf('1÷');
        let oneAfter;
        let result;
        while(oneUnder > -1){
            oneAfter = this._operation[oneUnder+1];
            if(oneAfter == undefined){
                this.setError();
                return;
            }
            result = (1/oneAfter);
            this._operation[oneUnder] = result;
            this._operation[oneUnder+1] = "";
            oneUnder = this._operation.indexOf('1÷');

        }
    }
    //encontrar os indices dos 1/x
    findOneX(){
       let indexOneX = this._operation.indexOf('1÷');
       return indexOneX;
    }
    //econtrar os índices das raizes
    findRoot(){
        let indexRoot = this._operation.indexOf('√');
        return indexRoot;
    }

    //método para calcular os indices do vetor, para calcular usando os sinais + - / * e x²
    CalC(){
        let str;
        let result;
        
        try{
            let lastOperation = this.getLastOperation();
            if(!isNaN(lastOperation)){
                str = this._operation.join("");
                
                result = eval(str);
                result = parseFloat(result.toFixed(2));
                this._operation = [result];
                this.setLastOperationToDispalay();
                
            }else{
                lastOperation = this._operation.pop();
                str = this._operation.join("");
                
                result = eval(str);
                result = parseFloat(result.toFixed(2));
                this._operation = [result, lastOperation];
                this.setLastOperationToDispalay();
            }
            
            
        }catch(e){
            this.setError();
            console.log(e);
        }
        

    }

    //conferindo os operadores no vetor
    checkSigns(){
        let root = this.findRoot();
        let oneX = this.findOneX();
        //o calculo será realizado a cada dois números inseridos
        if(this.findRoot() == -1 && this.findOneX()== -1){
            this.CalC();

            //verificando se existe uma raiz no índice do vetor
        }else if(root > -1){
            //verificar o que vem depois da raiz
            //se for um sinal, nesse caso só pode ser um sinal de divisão
            if(isNaN(this._operation[root+1])){
                this.findOneUnderXIndex();
                this.findRootIndex();
                this.CalC();

                //se o que vem depois da raiz for número
            }else if(!isNaN(this._operation[root+1])){
                this.findRootIndex();
                this.findOneUnderXIndex();
                this.CalC();
            }
            
        }else if(oneX > -1){
            this.findOneUnderXIndex();
            this.CalC();
        }
        this.showConsole();
    }

    //setando o erro de sintaxe
    setError(){
        this.displayCalc = "Sintaxe Error ";
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

    //checando se o ultimo elemento do vetor é um sinal
    checkLastIsSign(){
        let last = this.getLastOperation();
        if(isNaN(last)){
            return true;
        }
    }

    get displayCalc(){
        return this._displayCalcEl.innerHTML;
    }
    
    set displayCalc(value){
        this._displayCalcEl.innerHTML = value;
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
                this.addSign(value);
                break;
            case 'x':
                this.addSign('*');
                break;
            case 'x²':
                this.addRootSquare();
                break;
            case '%':   
                this.addPercent(value);
                break;
            case '√':
                this.setRootSrt(value);
                break;
            case '¹/x':
                this.oneUnderX('1÷');
                break;
            case '←':
                break;
            case '=':
                this.checkSigns();
                //this.CalC();
                break;
            case ',':
                this.addDot(value);
                break;
            case '±':
                this.addMoreOrLess();
                break;
            default:
                this.setError(value);
                break;
        }
    }
}
