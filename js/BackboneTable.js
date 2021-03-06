/**
 * Created by Vlad on 5/26/2016.
 */
///<reference path="App.ts"/>
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var table;
(function (table) {
    var RowModel = (function (_super) {
        __extends(RowModel, _super);
        function RowModel(item) {
            _super.call(this, item);
        }
        RowModel.prototype.defaults = function () {
            return {
                stamp: 0,
                id: 3,
                icon: '',
                name: '',
                t: 0,
                time: 0,
                msg: '',
                sort: 0,
                b_r: 0
            };
        };
        RowModel.prototype.initialize = function () {
            var _this = this;
            setInterval(function () {
                var t = _this.attributes.t++;
                _this.set('time', Formatter.formatTime(t));
            }, 1000);
        };
        RowModel.prototype.myInit = function () {
        };
        return RowModel;
    }(Backbone.Model));
    table.RowModel = RowModel;
    var TableCollection = (function (_super) {
        __extends(TableCollection, _super);
        function TableCollection(options) {
            var _this = this;
            _super.call(this, options);
            this.model = RowModel;
            for (var str in options)
                this[str] = options[str];
            this.fetch({ data: this.params });
            setInterval(function () {
                _this.fetch({ data: _this.params });
            }, 5000);
        }
        TableCollection.prototype.parse = function (res) {
            var icons = this.icons;
            var d = res.stamp;
            //console.log(res);
            var out = [];
            this.params.date = d.replace(' ', 'T');
            var stamp = Date.now();
            _.map(res.result.list, function (item) {
                item.stamp = stamp;
                item.icon = 'fa ' + (icons[item.icon] || icons['defailt']);
                item.time = Formatter.formatTime(item.t);
                item.name = item.id;
                out.push(item);
            });
            this.trigger('NUM_OF_AGENTS', out.length);
            var out2 = _.sortBy(out, 'sort');
            // console.log(res.result.list.length);
            //  console.log(res);
            //return res.result.list
            return out2;
        };
        return TableCollection;
    }(Backbone.Collection));
    table.TableCollection = TableCollection;
    var TableView = (function (_super) {
        __extends(TableView, _super);
        function TableView(options) {
            var _this = this;
            _super.call(this, options);
            this.container = $(options.id);
            this.setElement(this.container.find('tbody').first(), true);
            RowView.template = _.template($(options.rowTemplate).html());
            // collection.bind('reset', this.render);
            this.collection = new TableCollection(options);
            this.collection.on('NUM_OF_AGENTS', function (evt) { return (_this.setAmount(evt)); });
            this.collection.bind('remove', function (evt) {
                //console.log('remove', evt);
            }, this);
            this.collection.bind("add", function (item) {
                //console.log('add',item);
                item.myInit();
                var row = new RowView({ model: item, tagName: 'tr' });
                _this.$el.append(row.render().el);
            }, this);
            this.render = function () {
                //console.log(this);
                return this;
            };
        }
        TableView.prototype.setAmount = function (num) {
        };
        TableView.prototype.render = function () {
            //console.log('render');
            return this;
        };
        return TableView;
    }(Backbone.View));
    table.TableView = TableView;
    var RowView = (function (_super) {
        __extends(RowView, _super);
        function RowView(options) {
            var _this = this;
            _super.call(this, options);
            this.model.bind('change', function () { return _this.render(); });
            this.model.bind('destroy', function () { return _this.destroy(); });
            this.model.bind('remove', function () { return _this.remove(); });
            //  this.model.bind('add',()=>this.add());
        }
        RowView.prototype.render = function () {
            // console.log(this.model);
            this.$el.html(RowView.template(this.model.toJSON()));
            return this;
        };
        RowView.prototype.remove = function () {
            var _this = this;
            this.$el.fadeOut(function () {
                _super.prototype.remove.call(_this);
            });
            return this;
        };
        RowView.prototype.add = function () {
            //console.log('add');
        };
        RowView.prototype.destroy = function () {
            //console.log('destroy');
        };
        return RowView;
    }(Backbone.View));
    table.RowView = RowView;
})(table || (table = {}));
//# sourceMappingURL=BackboneTable.js.map