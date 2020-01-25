
    import { action, computed, observable } from "mobx";
    import TableStore from './TableStore';
    import Worker from "../file.worker";

    class AppStore {
        constructor () {
            this.resetState();
            this.worker = new Worker();
            this.tableStore = new TableStore(this);
        }

        @observable urban_units
        @observable database
        @observable summary
        @observable problem_units
        @observable loading
        @observable converted_units;
        @observable error;


        @action resetState = () => {
            this.urban_units = [];
            this.database = [];
            this.summary = [];
            this.problem_units = [];
            this.converted_units = [];
            this.loading = false;
            this.error = false;

        };

        @action loadUrbanUnits = units => {
            this.urban_units = units;
        };

        @action loadDatabase = data => {
            this.database = data;
        };

        @action errorHandle = () => {
            this.error = true;
        }

        @action getAll = () => {
            this.loading = true;
            this.worker.postMessage({urban_units: JSON.parse(JSON.stringify(this.urban_units)), database: JSON.parse(JSON.stringify(this.database))});
            this.worker.addEventListener('message', (event) => {
                const { data } = event;
                this.summary = data.summary;
                this.problem_units = data.problem_units;
                this.converted_units = data.converted_units;
                this.loading = data.loading;
                this.error = data.error;
                this.tableStore.sortedDataforTable();
              })

        };
    };

    const appStore = new AppStore();

    export default appStore;