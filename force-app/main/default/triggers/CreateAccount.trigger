trigger CreateAccount on Account (after insert) {

    if(Trigger.isAfter && Trigger.isInsert){
        
        Set<Id> acid = new Set<Id>();
        
        for(Account ac:Trigger.new){
            
            if(!CreateAccountHandler.seId.contains(ac.Id)){
                CreateAccountHandler.seId.add(ac.Id);
                acid.add(ac.Id);
            }
        }
        if(!acid.isEmpty()){
            CreateAccountHandler.createAcc(acid);
        }
    }
}