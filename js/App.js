/**
 * Created by VladHome on 3/5/2016.
 */
///<reference path="../typings/jquery.d.ts"/>
///<reference path="../typings/underscore.d.ts"/>
///<reference path="../typings/require.d.ts"/>
///<reference path="../typings/backbone-global.d.ts"/>
///<reference path="BackboneTable.ts"/>
///<reference path="BarChart.ts"/>
///<reference path="FieldsUpdate2.ts"/>
///<reference path="Formatter.ts"/>
var Registry = (function () {
    function Registry() {
    }
    Registry.CURRENT_DATE = 'CURRENT_DATE';
    Registry.LOAD_DATA = 'LOAD_DATA';
    Registry.LIST_NEW_DATE = 'LIST_NEW_DATE';
    Registry.LIST_NEW_DATA = 'LIST_NEW_DATA';
    Registry.SET_CURRENT_DATE = 'SET_CURRENT_DATE';
    Registry.WORK_START_TIME = 'WORK_START_TIME';
    Registry.event = $({});
    Registry.data = {};
    return Registry;
}());
$(document).ready(function () {
    var R = Registry;
    R.data[R.CURRENT_DATE] = '2016-03-15T8:30:00';
    R.data[R.WORK_START_TIME] = '08:00:00';
    setInterval(function () { Registry.event.triggerHandler(Registry.LOAD_DATA, Registry.data[R.CURRENT_DATE]); }, 5000);
    //setTimeout(()=>{Registry.event.triggerHandler(Registry.LOAD_DATA,Registry.data[R.CURRENT_DATE])},666);
    Registry.event.on(Registry.LIST_NEW_DATE, function (evt, date) {
        Registry.data[Registry.CURRENT_DATE] = date;
        Registry.event.triggerHandler(Registry.SET_CURRENT_DATE, date);
    });
    /* service.Service.service.start();
      var list = new desh.BasicList($('#listtable'));
      var screen = new callcenter.FieldsUpdate();
      var graphs = new callcenter.Graphs();
  */
});
//# sourceMappingURL=App.js.map