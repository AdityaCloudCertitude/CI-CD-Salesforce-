trigger CheckAccountForContact on Contact (before insert) {
    
    if(Trigger.isBefore && Trigger.isInsert){
        Map<Id,Contact> seMap = new Map<Id,Contact>();
        for(Contact con : Trigger.new){
            if(con.AccountId != null){
                seMap.put(con.AccountId,con);
            }
        }
        if(!seMap.isEmpty()){
            CheckAccountForContactHandler.checkAcc(seMap);
        }
    }
}