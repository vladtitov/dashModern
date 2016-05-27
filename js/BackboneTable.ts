/**
 * Created by Vlad on 5/26/2016.
 */
///<reference path="App.ts"/>
    
module table{
    export class RowModel extends Backbone.Model {

        defaults():VOItem {
            return {
                stamp: 0,
                id: 3,
                icon: '',
                name: '',
                t: 0,
                time: 0,
                msg:'',
                sort:0,
                b_r:0
            }
        }

        initialize(){
            setInterval(()=>{
                var t:number = this.get('time')+1;
                this.set('time',t);
            },1000)
        }
    }

    export class TableCollection extends Backbone.Collection<RowModel> {
        model:any = RowModel;
        data:any;
        params:any;
        icons:any;
        url: string;
        constructor(options:any) {
            super(options)
            for(var str in options)this[str] = options[str];
            this.fetch({data: this.params});
            setInterval(()=> {
                this.fetch({data: this.params});
            }, 5000);
        }

        parse(res) {
            var icons= this.icons;
            var d:string = res.stamp;
            //console.log(res);
            this.params.date = d.replace(' ', 'T');
            var stamp = Date.now();
            _.map(res.result.list, function (item:any) {
                item.stamp = stamp;
                item.icon = 'fa ' + (icons[item.icon] || icons['defailt']) ;
                item.time = item.t;
                item.name = item.id;
            });

            // console.log(res.result.list.length);
            //  console.log(res);
            return res.result.list
        }

        //parse:(data)=>{ }
    }


    export class TableView extends Backbone.View<RowModel> {
        collectionAgentsC;

        container:JQuery;

        constructor(options) {
            super(options);
            this.container = $(options.id);
            this.setElement(this.container.find('tbody').first(), true);
            RowView.template = _.template($(options.rowTemplate).html());
            // collection.bind('reset', this.render);
            this.collection = new TableCollection(options);
            this.collection.bind('remove', (evt)=> {
                //console.log('remove', evt);
            }, this);

            this.collection.bind("add", (evt)=> {
                //  console.log('add',evt);
                var row = new RowView({model: evt, tagName: 'tr'});
                this.$el.append(row.render().el);
            }, this);
            this.render = function () {
                //console.log(this);
                return this;
            }
        }

        render():TableView {

            //console.log('render');

            return this;
        }


    }

    export  class RowView extends Backbone.View<RowModel> {
        template:(data:any)=>string;
        model:RowModel
        static template:any

        constructor(options:any) {
            super(options);
            this.model.bind('change', ()=>this.render());
            this.model.bind('destroy', ()=>this.destroy());
            this.model.bind('remove', ()=>this.remove());
            //  this.model.bind('add',()=>this.add());
        }

        render() {
            // console.log(this.model);
            this.$el.html(RowView.template(this.model.toJSON()));

            return this;
        }

        remove():RowView {
            this.$el.fadeOut(()=> {
                super.remove();
            })
            return this;

        }

        add():void {
            //console.log('add');
        }

        destroy():void {
            //console.log('destroy');
        }


    }


}