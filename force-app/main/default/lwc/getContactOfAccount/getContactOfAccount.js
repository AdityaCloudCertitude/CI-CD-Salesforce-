import { LightningElement, api, wire } from 'lwc';
import { getRelatedListRecords } from 'lightning/uiRelatedListApi';

const pageSize = 10;

export default class GetContactOfAccount extends LightningElement {

    @api recordId;
    records;
    error;
    pageNumber = 1;
    nextPage;
    currentPage;
    previousPage;

    @wire(getRelatedListRecords, {
        parentRecordId: '$recordId',
        relatedListId: 'Contacts',
        fields: ['Contact.Id', 'Contact.Name'],
        pageToken: '$currentPage',
        pageSize : 1200
        // nextPageToken:'$nextPage',
        // previousPageToken:'$previousPage',

    }) wiredContacts({ error, data }) {
        if (data) {
            let i = 1;
            console.log('this.data', data);
            this.records = JSON.parse(JSON.stringify(data.records));
            //this.currentPage = data.currentPageToken;
            this.nextPage = data.nextPageToken;
            this.previousPage = data.previousPageToken;
            console.log('this.currentPage : ', this.currentPage);
            console.log('this.nextPage : ', this.nextPage);
            console.log('this.previousPage : ', this.previousPage);
            this.records.forEach(ev => {
                ev.Index = i;
                i++;
            });
            console.log('this.records', this.records);
            this.error = undefined;
        } else if (error) {
            this.error = error;
            console.log('this.error', error);
            this.records = undefined;
        }
    }

    // get paginatedRecords() {
    //     if (this.records) {
    //         const startIndex = (this.pageNumber - 1) * pageSize;
    //         const endIndex = startIndex + pageSize;
    //         return this.records.slice(startIndex, endIndex);
    //     }
    //     return [];
    // }

    handleNext() {
        if (this.nextPage != null) {
            this.currentPage = this.nextPage;
            console.log('this.currentPage1 : ', this.currentPage);
            console.log('this.nextPage1 : ', this.nextPage);
        }
    }

    handlePrevious() {
       if (this.previousPage != null) {
            this.currentPage = this.previousPage;
            console.log('this.currentPage1 : ', this.currentPage);
            console.log('this.previousPage : ', this.previousPage);
        }
    }

    get isPreviousDisabled() {
        //return this.pageNumber === 1;
    }

    get isNextDisabled() {
        //return !this.records || this.pageNumber * pageSize >= this.records.length;
    }

}