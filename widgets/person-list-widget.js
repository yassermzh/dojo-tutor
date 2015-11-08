'use strict';
define([
    "dojo/_base/declare", "dojo/parser", "dojo/ready",
    'dojo/_base/array',
    'dojo/dom', "dojo/dom-construct",
    "dijit/_WidgetBase", "dijit/_TemplatedMixin", "dijit/_WidgetsInTemplateMixin",
    "dojo/text!/widgets/templates/person-list.html",
    "dijit/form/Button",
    "../person.js"
], function(declare, parser, ready,
            array,
            dom, domConstruct,
            _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin,
            template,
            Button,
            Person) {

    return declare("PersonWidget", [_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, Person], {
        // put methods, attributes, etc. here
        //templateString: "<div><span data-dojo-attach-point='nameNode'></span></div>",
        templateString: template,

        constructor: function(params, srcNodeRef){
            this.persons  = params;
            console.log("creating persons list ");
        },

        // Attributes
        name: "unknown",
        //_setNameAttr: { node: "nameNode", type: "innerHTML" }
        popup: function(){
            window.alert('Name='+ this.whatIsYourName());
        },

        remove: function() {
            this.destroy();
        },

        postCreate: function() {

            array.forEach(this.persons, function(person){
                console.log(person);
                var node = domConstruct.create('div', {},
                                               dom.byId('list'), 'after');
                var widget = new PersonWidget(person, node);
            });

            // array.forEach(persons, function(person, id){
            //     console.log(person, id);
            //     var node = domConstruct.create('div', {}, dom.byId('list'), 'after');
            //     var widget = new PersonWidget(person, node);
            //     // var widget = new PersonWidget(person);
            //     // var list= dom.byId('persons0');
            //     // widget.startup();
            //     // domConstruct.place(widget, list);

            // });

        }

    });
    ready(function(){
        // Call the parser manually so it runs after our widget is defined, and page has finished loading
        console.log('parser called');
        parser.parse();
    });
});
