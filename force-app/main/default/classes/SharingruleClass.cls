public with sharing class SharingruleClass {
    
    @AuraEnabled
    public static list<Check_Security__c> getcon(){
        List<Check_Security__c> conList = new List<Check_Security__c>();
        conList = [Select id, name, Sharing_rule__c from Check_Security__c WITH USER_MODE];
        System.debug('conList'+conList);
        return conList;
    }
}