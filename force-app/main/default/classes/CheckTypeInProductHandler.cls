public class CheckTypeInProductHandler {
    
    public static void checkType(Map<Id,OpportunityLineItem> newMap){
        
        List<Opportunity> opList = new List<Opportunity>();
        Set<Id> proIds = new Set<Id>();
        Map<Id,Product2> proMap;   
        Map<Id,Opportunity> opMap = new Map<Id,Opportunity>();
        
        for(OpportunityLineItem ole:newMap.values()){          
            if(ole.Product2Id != null){
                proIds.add(ole.Product2Id);
            }
        }
        if(!proIds.isEmpty()){
        	proMap = new Map<Id,Product2>([SELECT family from product2 where Id IN: proIds AND family = 'Sponsor']);            
            if(!proMap.isEmpty()){
                for(OpportunityLineItem ole:newMap.values())	    {
                    if(proMap.containsKey(ole.Product2Id)){
                    	opMap.put(ole.OpportunityId,new Opportunity(Id = ole.OpportunityId, Type='Sponsor'));    
                    }
                }
            }
        }
        opList.addAll(opMap.values());
        if(!opList.isEmpty()){
            Update opList;
        }
    }  
}