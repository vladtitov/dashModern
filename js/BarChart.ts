/**
 * Created by VladHome on 3/16/2016.
 */
    ///<reference path="../typings/jquery.d.ts"/>
    ///<reference path="../typings/chartist.d.ts"/>
///<reference path="../typings/moment.d.ts"/>
    ///<reference path="../typings/underscore.d.ts"/>
///<reference path="../typings/bootstrap.v3.datetimepicker.d.ts"/>

module graphs{
    export class BarChart{

        constructor(private selector:string, private opts:any) {


            this.loadData();



        }

        chart:any

        url:string='http://front-desk.ca/mi/callcenter/rem/getBarChart.php?id=';
        loadData():void{
            $.get(this.url+this.opts.id).done((res)=>{
                //console.log(res);
                this.drawChart(res);


            });

        }



        drawChart(data:any):void{

           this.chart = new Chartist.Bar(this.selector, data,this.options, this.responsiveOptions);
        }


        options:any = {
            seriesBarDistance: 0
            };

        responsiveOptions:any = [
            ['screen and (max-width: 640px)', {
                seriesBarDistance: 0,
                axisX: {
                    labelInterpolationFnc: function (value) {
                        return value[0];
                    }
                }
            }]
        ];
    }
}