trigger CheckDuplicacyOnContact on Contact (before insert, before update) {
    
   /* if(Trigger.isBefore){
        if(Trigger.isUpdate || Trigger.isInsert){
            
            Map<Id,Contact> oldMap = Trigger.oldMap;
            Map<String,Contact> conList = new Map<String,Contact>();
            
            for(Contact con:Trigger.new){
                if((Trigger.isInsert && con.Email != Null) || (con.Email != oldMap.get(con.Id).Email)){
                    conList.put(con.Email,con);
                }
            }
            if(!conList.isEmpty()){
             CheckDuplicacyOnContactHandler.checkEmail(conList);
            }
        }
    }*/
}