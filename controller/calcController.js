class calcController{

    constructor(){
        this._dispalyCalcEl = document.querySelector("#display");
        
        this.initButtonsEventClick();
        this.initButtonsEventDrag();
        
    }
    initialize(){
        

    }
    //iniciando o evento de click
    initButtonsEventClick(){
        let buttons = document.querySelectorAll(".row > button");
        buttons.forEach(btn=>{
            btn.addEventListener("click", e=>{
                let txtBtn = btn.innerHTML;
                //console.log(txtBtn+" "+e.type);
                console.log(txtBtn);
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
        this._dispalyCalcEl = value;
    }
}
