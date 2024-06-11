public class AsyncAwaitHandler {
    
    @AuraEnabled
    public static List<Account> fetchData() {
        
        return [select id, name from Account];
    }
}