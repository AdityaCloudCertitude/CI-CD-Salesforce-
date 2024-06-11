import { LightningElement, api, wire, track } from 'lwc';
import getAllObjects from '@salesforce/apex/FileUploadHandler.getAllObjects';
import getObjectFields from '@salesforce/apex/FileUploadHandler.getObjectFields';
import createRecords from '@salesforce/apex/FileUploadHandler.createRecords';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class FileUpload extends LightningElement {
    showSpinner = false
    @track objectOptions = [];
    @track selectedObject;
    @track fileData = [];
    @track fieldsMapping;
    @track options;
    @track dataList = [];
    @track records = [];
    @track selectedVal;
    @track headers;

    handleFileUpload(event) {
        const files = event.target.files;
        console.log('filesall : ',files);
        for(let i=0;i<files.length;i++){

            const file = files[i];
        const reader = new FileReader();
        reader.onload = () => {
            const result = reader.result;
            console.log('result : ', result);
            this.fileData = this.parseCSV(result);
            console.log('this.fileData : ', this.fileData);
        };
        reader.readAsText(file);
        }
    }

    parseCSV(csv) {
    const rows = csv.split('\n');
    const headers = rows[0].replace(/"/g, '').split(',');
    console.log('headers =>', headers);
    
    let data = [];
    
    for (let i = 1; i < rows.length; i++) {
        const row = rows[i].split(',');
        console.log('const row : ', row);
        if (row.length === headers.length) {
            const obj = {};
            for (let j = 0; j < headers.length; j++) {
                obj[headers[j]] = row[j];
                console.log('obj[headers[j]] : ', obj[headers[j]]);
            }
            data.push(obj);
            console.log('datadata : ', data);
        }
    }
    
    let newHeaders = headers.map(header => ({
        'header': header,
        'options': [{ 'label': '--None--', 'value': null }],
        'selectedField': null,
    }));
    this.fieldsMapping = this.fieldsMapping ? [...this.fieldsMapping, ...newHeaders] : newHeaders;
    
    return data;
}

    @wire(getAllObjects)
    wiredObjectInfo({ error, data }) {
        if (data) {
            console.log('data : ', data);
            this.objectOptions = data.map(objectName => ({
                label: objectName,
                value: objectName
            }))
            console.log('this.objectOptions : ', this.objectOptions);
        } else if (error) {
            console.error('Error fetching object information:', error);
        }
    }

    handleChange(event) {
        this.selectedObject = event.detail.value;

        getObjectFields({ objectName: this.selectedObject })
            .then(result => {
                var temp = [{ 'label': '--None--', 'value': null }];
                for (const [key, value] of Object.entries(result)) {
                    temp.push({
                        'label': key,
                        'value': value
                    })
                }
                this.options = [...temp];
                this.fieldsMapping.forEach(item => {
                    item.options = [...temp];
                    item.selectedField = null;
                });
                console.log('this.options', this.options);
            })
            .catch(error => {
                console.log('ERROR : ', error);
            })
    }

    handleFieldChange(event) {
        let index = event.currentTarget.dataset.index;
        console.log(index);
        let field = event.detail.value;
        console.log('field',field);
        let header = event.target.dataset.header;
        console.log('header',header);
        let selectedFields = [];

        this.fieldsMapping[index].selectedField = field;
        this.fieldsMapping.forEach((dt)=>{
            if (dt.selectedField) {
                selectedFields.push(dt.selectedField);
           }
        })
        this.fieldsMapping.forEach(dt=>{
            let list = selectedFields.filter(d=> d != dt.selectedField);
            dt.options  =  this.options.filter(opt=> (!list.includes(opt.value)))
            
        })

        console.log(this.fieldsMapping);

        // this.fieldsMapping.forEach(item => {
        //     if (item.header == header) {
        //         let indx = selectedFields.findIndex(opt => opt != item.selectedField);
        //             console.log(indx);
        //             if (indx > -1) {
        //                 selectedFields.splice(indx,1);
        //             }
        //         item.selectedField = field;

        // });
        // console.log('selectedFields : ',selectedFields);
        // this.fieldsMapping.forEach((item, ind) => {
        //     console.log(selectedFields);
        //     console.log(selectedFields.includes(item.selectedField));
        //     if (ind != index && !selectedFields.includes(item.selectedField)) {
        //         let options = [...this.options]
        //         selectedFields.forEach(elle => {
        //             let indx = options.findIndex(opt => opt.value == elle);
        //             console.log(indx);
        //             if (indx > -1) {
        //                 options.splice(indx, 1);
        //                 item.options = options;
        //                 console.log(item.options);
        //             }
        //         })
        //     }
        // })
        // console.log('fieldsMapping  ', this.fieldsMapping);

    }



    createRelatedRecords() {
        const recordInputs = [];
        this.showSpinner = true
        for (const data of this.dataList) {
            const fieldVal = {};
            for (const item of this.fieldsMapping) {
                if (item.selectedField) {
                    fieldVal[item.selectedField] = data[item.header].replace(/^"|"$/g, '');
                }
            }
            recordInputs.push(fieldVal);
            console.log('OUTPUT : ', recordInputs);
        }
        console.log('recordInputs ', recordInputs);

        createRecords({ recordsString: JSON.stringify(recordInputs), objectApiName: this.selectedObject }).then((result) => {
            console.log('result ', result);
            this.selectedObject = null
            this.fieldsMapping = null;

            this.showSpinner = false;
            this.showToast('Success', 'Record inserted successfully', 'success');
        }).catch((err) => {
            console.log('err ', err);
            this.showSpinner = false;
            this.showToast('Error', err.body.message, 'error');
        });
    }

    handleButtonClick() {
        this.createRelatedRecords();
    }

    showToast(title, message, variant) {
        const event = new ShowToastEvent({
            title: title,
            message: message,
            variant: variant
        });
        this.dispatchEvent(event);
    }
}