global class WithoutSharingClass implements Database.Batchable<sObject> {
    
    global Database.QueryLocator start(Database.BatchableContext bc) {
        return Database.getQueryLocator('SELECT Id, Name FROM Account');
    }
    
    global void execute(Database.BatchableContext bc, List<sObject> scope) {
    }
    
    
    global void finish(Database.BatchableContext bc) {
        
    }
}