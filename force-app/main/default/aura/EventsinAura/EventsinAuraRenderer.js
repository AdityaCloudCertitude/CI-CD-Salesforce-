({
    render : function(component, helper){
        
        var le = this.superRender();
        console.log('this is Render');
        return le;
    },
    
    rerender : function(component, helper){
        
        this.superRerender();
        console.log('this is Rerender');
        var h1Element = component.find('header').getElement();
        var inputValue = component.get("v.inputValue");
        
        if(inputValue.length>10){
            h1Element.style.color = 'red';
        }else{
            h1Element.style.color = 'green';
        }
    },
    
    afterRender: function(component, helper) {
        
        this.superAfterRender();
        console.log('this is AfterRender');
    },
    
    unrender : function(component, helper){
        
        this.superUnrender();
        console.log('this is unrender');
        alert('ghjkl');
    }
})