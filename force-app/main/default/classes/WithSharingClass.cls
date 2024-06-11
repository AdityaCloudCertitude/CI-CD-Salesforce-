public with sharing class WithSharingClass {
    public static List<Account> getAccounts() {
        return [SELECT Id, Name FROM Account];
    }
}