var Container = Backbone.Model.extend({
	init: function() {
		alert("INIT!");
	},
	
	defaults: {
		name: 'name'
	}
});

var test = new Container({ name: "home" });
var name = test.get('name');
test.save();