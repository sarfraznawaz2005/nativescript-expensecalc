const observableModule = require("tns-core-modules/data/observable");
// https://github.com/davecoffin/nativescript-modal-datetimepicker
const ModalPicker = require("nativescript-modal-datetimepicker").ModalDatetimepicker;
const Toast = require("nativescript-toast");

const picker = new ModalPicker();

function HomeViewModel() {
    const viewModel = observableModule.fromObject({
        start_date: '',
        end_date: '',
        expense: '',
        total: 0.00,

        onselectStartDate: function () {
            picker
                .pickDate({
                    title: "Start Date",
                    theme: "light",
                    //startingDate: new Date()
                })
                .then(result => {
                    //const jsdate = new Date(result.year, result.month - 1, result.day);
                    this.start_date = result.day + "/" + result.month + "/" + result.year;
                })
                .catch(error => {
                    console.log("Error: " + error);
                });
        },

        onselectEndDate: function () {
            picker
                .pickDate({
                    title: "Start Date",
                    theme: "light",
                    //startingDate: new Date()
                })
                .then(result => {
                    //const jsdate = new Date(result.year, result.month - 1, result.day);
                    this.end_date = result.day + "/" + result.month + "/" + result.year;
                })
                .catch(error => {
                    console.log("Error: " + error);
                });
        },

        onCalculate: function () {

            if (!this.start_date.trim()) {
                Toast.makeText("Start Date is required!").show();
                return false;
            }

            if (!this.end_date.trim()) {
                Toast.makeText("End Date is required!").show();
                return false;
            }

            if (!this.expense) {
                Toast.makeText("Invalid Unit Expense!").show();
                return false;
            }

            const days = daysBetween(this.start_date, this.end_date);
            console.log(days);

            this.total = (Math.round((days * this.expense * 1000) / 10) / 100).toFixed(2);
        }
    });

    function daysBetween(date1, date2) {
        const ONE_DAY = 1000 * 60 * 60 * 24;

        var date1 = date1.split('/');
        var date2 = date2.split('/');

        date1 = new Date(date1[2], date1[1], date1[0]);
        date2 = new Date(date2[2], date2[1], date2[0]);

        return Math.round(Math.abs((date1.getTime() - date2.getTime()) / (ONE_DAY))) + 1;
    }

    return viewModel;
}

module.exports = HomeViewModel;