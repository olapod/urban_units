import get_summary from './SummaryContainer';


        describe("Get_summary function", () => {
            test("it should get number of records in urban units", () => {
                const data = [
                    { "jednostka": 49,
                      "ulica": "al. armii krajowej",
                      "numer": 101,
                    },
                    {"jednostka": 49,
                      "ulica": "al. armii krajowej",
                      "numer": 104,
                    }]
                const summary = get_summary(data)
                const output = {"count": 2, "id": 49}
              expect(summary[48]).toEqual(output);
            });


          });