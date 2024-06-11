public class CreateAccountHandler {
    
    public static Set<Id> seId = new Set<Id>();
    
    public static void createAcc(Set<Id> newSet){
        
        List<Account> acList = new List<Account>();
        for(Integer i=0;i<newSet.size();i++){
            Account ac = new Account();
            ac.Name = 'test'+i;
            acList.add(ac);
        }
        if(!acList.isEmpty()){
            Insert acList;
        }
    }
}