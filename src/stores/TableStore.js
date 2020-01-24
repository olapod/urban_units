import { observable, action } from "mobx";

class TableStore {
    @observable order;
    @observable orderBy;

    constructor (appStore) {
        this.appStore = appStore;
        this.order = 'asc';
        this.orderBy = 'id';
    }

    @action sortedDataforTable = () => {
            const sortedData = this.appStore.summary.sort((a, b) => (a.id < b.id ? -1 : 1))
            this.appStore.summary.replace(sortedData);
        }

    @action handleRequestSort = (property, numeric) => {

        const orderBy = property;

        if (this.orderBy === property && this.order === 'desc') {
            this.order = 'asc';
        }
        else if (this.orderBy === property && this.order === 'asc') {
            this.order = 'desc';
        };


        if (this.order === 'desc' && numeric  === 'true') {
            const sortedData = this.appStore.summary.sort((a, b) => (b[orderBy] < a[orderBy] ? -1 : 1))
            this.appStore.summary.replace(sortedData);
            this.orderBy = orderBy;
        }

        if (this.order === 'asc' && numeric  === 'true' ) {
            const sortedData = this.appStore.summary.sort((a, b) => (a[orderBy] < b[orderBy] ? -1 : 1));
            this.appStore.summary.replace(sortedData);
            this.orderBy = orderBy;
        }

        if (this.order === 'desc' && numeric  === 'false') {
            const sortedData = this.appStore.summary.sort((a, b) => b[orderBy].localeCompare(a[orderBy]));
            this.appStore.summary.replace(sortedData);
            this.orderBy = orderBy;
        }

        if (this.order === 'asc' && numeric  === 'false')
        {const sortedData = this.appStore.summary.sort((a, b) => a[orderBy].localeCompare(b[orderBy]))
            this.appStore.summary.replace(sortedData);
            this.orderBy = orderBy;
        }
    }
};

export default TableStore;