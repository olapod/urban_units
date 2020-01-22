import { observable, action } from "mobx";

class TableStore {
    @observable order;
    @observable orderBy;

    constructor (appStore) {
        this.appStore = appStore;
        this.order = 'asc';
        this.orderBy = 'id';
    }

    @action sortedDataforTable() {
            const sortedData = this.appStore.summary.sort((a, b) => (a.id < b.id ? -1 : 1))
            this.appStore.summary.replace(sortedData);
        }

    @action handleRequestSort(property, numeric) {
        console.log('Testujemy:' ,this.appStore.summary )
        const orderBy = property;
        let order = 'desc';

        if (this.orderBy === property && this.order === 'desc') {
            order = 'asc';
        };

        if (order === 'desc' && numeric) {
            const sortedData = this.appStore.summary.sort((a, b) => (b[orderBy] < a[orderBy] ? -1 : 1))
            this.appStore.summary.replace(sortedData);}

        if (order === 'asc' && numeric) {
            const sortedData = this.appStore.summary.sort((a, b) => (a[orderBy] < b[orderBy] ? -1 : 1));
            this.appStore.summary.replace(sortedData);}

        if (order === 'desc' && !numeric) {
            const sortedData = this.appStore.summary.sort((a, b) => b[orderBy].localeCompare(a[orderBy]));
            this.appStore.summary.replace(sortedData);}

        else {const sortedData = this.appStore.summary.sort((a, b) => ab[orderBy].localeCompare(b[orderBy]))
            this.appStore.summary.replace(sortedData);}

    }
};

export default TableStore;