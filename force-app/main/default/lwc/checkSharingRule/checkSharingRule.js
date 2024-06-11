import { LightningElement, track } from 'lwc';
import getcon from '@salesforce/apex/SharingruleClass.getcon';

export default class CheckSharingRule extends LightningElement {

 @track contactList;

    loadContacts() {
        getcon()
            .then(result => {
                this.contactList = result;
                console.log('result',result);
            })
            .catch(error => {
                console.log('error',error);
            });
    }
}