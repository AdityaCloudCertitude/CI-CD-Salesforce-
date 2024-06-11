public class CheckDuplicacyOnContactHandler {
    
    public static void checkEmail(Map<String,Contact> conMap){
        
        Map<String,Contact> emMap = new Map<String,Contact>();
        
        for(Contact con:[Select id, Email From Contact Where Email IN: conMap.keySet()]){
            if(conMap.containsKey(con.Email)){
                conMap.get(con.Email).addError('Duplicate Email');
            }
        }
    }
}