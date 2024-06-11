import { LightningElement } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

export default class NavToComponentWithState extends NavigationMixin(LightningElement)  {
 navigateToComponent() {
    this[NavigationMixin.Navigate]({
      
      type: 'standard__component',
      attributes: {
        componentName: 'c_realeaseSummer24',
      },
      state: {
        c__propertyValue: '2000',
      },
    });
  }
}