import { action, observable } from "mobx";
import appStore from './AppStore'

class TableStore {
    @observable order;
    @observable orderBy;
    @observable data;

    constructor (appStore) {
        this.appStore = appStore;
        this.order = 'asc';
        this.orderBy = 'id';
        this.setData();
    }

    @action setData () {
        this.data = this.appStore.summary.sort((a, b) => (a.id < b.id ? -1 : 1))
    }

    @action handleRequestSort = ( property, numeric) => {
        const orderBy = property;
        let order = 'desc';
        const data =  [];

        if (this.orderBy === property && this.order === 'desc') {
          order = 'asc';
        };

        if (order === 'desc' && numeric) {
           data = this.data.sort((a, b) => (b[orderBy] < a[orderBy] ? -1 : 1))}
        if (order === 'asc' && numeric) {
            data = this.data.sort((a, b) => (a[orderBy] < b[orderBy] ? -1 : 1));}
        if (order === 'desc' && !numeric) {
            data = this.data.sort((a, b) => b[orderBy].localeCompare(a[orderBy]));}
        else {this.data.sort((a, b) => ab[orderBy].localeCompare(b[orderBy]))}
      };
};

export default TableStore;