class calcController{

    constructor(){
        this._dispalyCalcEl = document.querySelector("#display");
        this._operation = [];
        this.initButtonsEventClick();
        this.initButtonsEventDrag();
        
    }
    initialize(){
        

    }
    showConsole(){
        console.log(this._operation);
    }
    //método para adicionar no vetor operation
    addOperation(value){
        this._operation.push(value);
        this.showConsole();
    }
    setError(){
        this.displayCalc = "Error";
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
            default:
                this.setError();
                break;
        }
    }
}
