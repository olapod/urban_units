import { action, observable } from "mobx";

class TableStore {
    @observable order;
    @observable orderBy;
    @observable data;

    constructor (appStore) {
        this.appStore = appStore;
        this.order = 'asc';
        this.orderBy = 'id';
        this.data = this.appStore.summary.sort((a, b) => (a.id < b.id ? -1 : 1))

    }

    handleRequestSort(property, numeric) {
        return computed(() => {
            const orderBy = property;
            let order = 'desc';

            if (this.orderBy === property && this.order === 'desc') {
            order = 'asc';
            };

            if (this.data ) {
                if (order === 'desc' && numeric) {
                    const data = this.data.sort((a, b) => (b[orderBy] < a[orderBy] ? -1 : 1))
                    return data}
                if (order === 'asc' && numeric) {
                    const data = this.data.sort((a, b) => (a[orderBy] < b[orderBy] ? -1 : 1));
                    return data}
                if (order === 'desc' && !numeric) {
                    const data = this.data.sort((a, b) => b[orderBy].localeCompare(a[orderBy]));
                    return data}
                else {const data = this.data.sort((a, b) => ab[orderBy].localeCompare(b[orderBy]))
                    return data}
        }
        })
    }
};

export default TableStore;