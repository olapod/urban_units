import { action, computed, observable } from "mobx"
import convert_urban_units from '../logic/UnitsContainer';
import compare_databases from '../logic/DatabaseContainer';
import get_summary from '../logic/SummaryContainer';
import get_problem_units from '../logic/ProblemUnitsContainer';
;

class Store {
    @observable urban_units;
    @observable database;
    @observable summary;
    @observable problem_units;
    @observable loading;
    @observable converted_units;
    @observable compared_database;
    @observable initialState;

    constructor() {
        this.urban_units = [];
        this.database = [];
        this.summary = [];
        this.problem_units = [];
        this.loading = false;
        this.converted_units = []
        this.compared_database = [];
        this.initialState = { ...this }

    }

    @action loadUrbanUnits = units => {
        this.urban_units = units;

    };

    @action loadDatabase = data => {
        this.database = data;
    };

    // @action convertUnits() {
    //     this.converted_units = convert_urban_units(this.urban_units)
    // }

    getDataBase = () => {
        const converted_units = convert_urban_units(this.urban_units);
        const compared_database = compare_databases(this.database, converted_units)
        return Promise.resolve(compared_database)
    };

    // @action getProblemUnits() {
    //     this.problem_units = get_problem_units(this.compared_database)
    // };

    // @action getSummary() {
    //     this.summary = get_summary(this.compared_database);
    // }

    // @action showSpinner() {
    //   this.loading = true;
    // }

    // @action hideSpinner() {
    //     this.loading = false;
    // }

    @action getAll = () => {
        this.loading = true;
        this.getDataBase()
        .then(res => {
            this.summary = get_summary(res);
            this.problem_units = get_problem_units(res);
            this.loading = false;
        })
    };

    @action resetHandler = () => {
        this.initialState;
    };
}
const AppStore = new Store();

export default AppStore;


