public with sharing class FileUploadHandler {
    
    @AuraEnabled(cacheable=true)
    public static List<String> getAllObjects() {
        List<String> objectNames = new List<String>();
        for (Schema.SObjectType objType : Schema.getGlobalDescribe().values()) {
            objectNames.add(objType.getDescribe().getName());
        }
        objectNames.sort();
        return objectNames;
    }
    
    @AuraEnabled(cacheable=true)
    public static Map<String,String> getObjectFields(String objectName) {
        List<String> fieldNames = new List<String>();
        Map<String,String> fieldsMap = new Map<String,String>();
        Map<String, Schema.SObjectField> fieldMap = Schema.getGlobalDescribe().get(objectName).getDescribe().fields.getMap();
        for(Schema.SObjectField field : fieldMap.values()){
            fieldsMap.put(field.getDescribe().getLabel(), field.getDescribe().getName());
        }
        
        List<String> sortedKeys = new List<String>(fieldsMap.keySet());
        sortedKeys.sort();
        
        Map<String, String> sortedFieldsMap = new Map<String, String>();
        for (String key : sortedKeys) {
            sortedFieldsMap.put(key, fieldsMap.get(key));
        }
    
    return sortedFieldsMap;
    }
    
    @AuraEnabled
    public static void createRecords(String recordsString, String objectApiName) {
        List<sObject> recordsToInsert = new List<sObject>();
        
        try {
            List<Map<String, Object>> recordInputs = new List<Map<String, Object>>();
            for (Object obj : (List<Object>) JSON.deserializeUntyped(recordsString)) {
                recordInputs.add((Map<String, Object>) obj);
            }
            
            System.debug('FileUploadHandler => '+recordInputs);
            
            SObjectType objType = Schema.getGlobalDescribe().get(objectApiName);
            for (Map<String, Object> recordInput : recordInputs) {
                sObject newRecord = objType.newSObject();
                for (String field : recordInput.keySet()) {
                    newRecord.put(field, recordInput.get(field));
                }
                recordsToInsert.add(newRecord);
                System.debug('FileUploadHandler'+recordsToInsert);
            }
            
            insert recordsToInsert;
        } catch (Exception e) {
            System.debug('Error inserting records: ' + e.getMessage());
            throw new AuraHandledException('Error inserting records: ' + e.getMessage());
        }
    }    
}