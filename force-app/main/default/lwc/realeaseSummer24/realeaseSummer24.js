import { LightningElement, api, wire } from 'lwc';
import { CurrentPageReference } from 'lightning/navigation';

export default class RealeaseSummer24 extends LightningElement {
    @api inputPropertyValue;
    @wire(CurrentPageReference)
    currentPageRef;

    connectedCallback() {
        if (this.currentPageRef && this.currentPageRef.state && this.currentPageRef.state.c__propertyValue) {
            this.inputPropertyValue = this.currentPageRef.state.c__propertyValue;
        }
    }

}