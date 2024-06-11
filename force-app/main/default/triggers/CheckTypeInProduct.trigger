trigger CheckTypeInProduct on OpportunityLineItem (after insert) {
    
    if(Trigger.isAfter && Trigger.isInsert){
        
        CheckTypeInProductHandler.checkType(Trigger.newMap);
    }
}