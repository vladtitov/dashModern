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


interface VORaw{
    id:number;
    icon:string;
    msg:string;
    t:number;
    sort:number;
    b_r:number;
}

interface  VOItem extends VORaw{
    stamp:number;
    name:string;
    time:number;
}

class Registry {
    static CURRENT_DATE:string='CURRENT_DATE';
    static LOAD_DATA:string='LOAD_DATA';
    static LIST_NEW_DATE:string='LIST_NEW_DATE';
    static LIST_NEW_DATA:string='LIST_NEW_DATA';
    static SET_CURRENT_DATE:string='SET_CURRENT_DATE';
    static WORK_START_TIME:string ='WORK_START_TIME';

    static event:JQuery = $({});
    static data:any = {};
}


$(document).ready(function(){
    var R = Registry;
    R.data[R.CURRENT_DATE]= '2016-03-15T8:30:00';
    R.data[R.WORK_START_TIME]='08:00:00';
    setInterval(()=>{Registry.event.triggerHandler(Registry.LOAD_DATA,Registry.data[R.CURRENT_DATE])},5000);
    //setTimeout(()=>{Registry.event.triggerHandler(Registry.LOAD_DATA,Registry.data[R.CURRENT_DATE])},666);

    Registry.event.on(Registry.LIST_NEW_DATE,function(evt,date){
        Registry.data[Registry.CURRENT_DATE]=date;
        Registry.event.triggerHandler(Registry.SET_CURRENT_DATE,date);
    })
  /* service.Service.service.start();
    var list = new desh.BasicList($('#listtable'));
    var screen = new callcenter.FieldsUpdate();
    var graphs = new callcenter.Graphs();
*/


})