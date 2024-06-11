public class CreateTaskRelatedToAccountHandler {
    
    public static void createTask(List<Account> newList){
        
        List<Task> taskList = new List<Task>();
        for(Account acc:newList){
            Task tas = new Task();
            tas.WhatId = acc.Id;
            tas.Subject = 'Email';
            tas.Priority = 'High';
            
            if(System.Now().format('E') == 'Sat' || System.Now().format('E') == 'Sun'){
                
                DateTime mon = System.Today().toStartOfWeek().addDays(8);
                tas.ActivityDate = mon.date();
                //tas.CreatedDate = mon.addHours(10);
            }
            else{
                tas.ActivityDate = System.Today();
                //tas.CreatedDate = System.Now();
            }
            taskList.add(tas);
        }
        
        if(!taskList.isEmpty()){
            Insert taskList;
        }
    }
}