({
    doInit : function(component, event, helper) {
        var a = component.get("v.fetchData");
        
        
    },

    handleClick :  function(component, event, helper){
        
        fetch('https://data.covid19india.org/v4/min/data.min.json')
        .then(data=>{
            console.log(data);
        });

     }
})