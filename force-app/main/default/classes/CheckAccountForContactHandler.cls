public class CheckAccountForContactHandler {
    
    public static void checkAcc(Map<Id,Contact> conMap){
        
        for(Account con:[select id,(select id , Present_Account__c from Contacts where Present_Account__c = true) from Account where Id IN: conMap.keySet()]){
            if(conMap.containsKey(con.Id)){
                if(con.Contacts.size() > 0){
                    conMap.get(con.Id).Present_Account__c = false;
                }else{
                    conMap.get(con.Id).Present_Account__c = true;
                }
            }  
        }
    }
}