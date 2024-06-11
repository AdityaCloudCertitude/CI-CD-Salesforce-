({
    
    init : function(component, event, helper) {
        component.set("v.inputValue", "");
    },
    
    
    handleInputChange : function(component, event, helper) {
        var newValue = component.get("v.inputValue");
        
        if(newValue !== undefined && newValue !== null) {
            newValue = newValue.toUpperCase();
            component.set("v.inputValue", newValue);
        }
    },
    
    render : function(component, event, handler){
        console.log("this is controller render")
        var inputValue = component.get("v.inputValue");
        
        if(inputValue) {
            var count = inputValue.length;
        }else{
            var count = 0;
        }
        component.set("v.renderCount",count);
    },
})