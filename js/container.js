var Container = Backbone.Model.extend({	
	defaults: {
		containers: [ "fdas" ]
	}
});

var ContainerCollection = Backbone.Collection.extend({
	model: Container,
	url: 'http://conv2.punchy.com:9123/container/list'
});

var ContainerView = Backbone.View.extend({
	el: "#containers",

	initialize: function() {
		this.render();
	},

	events: {
		"click" : "getFiles"
	},
	
	render: function() {
		var self = this;
		/*
		this.collection.each(function(result) {
			var containers = result.get('containers');
			_.each(containers, function(container) {
				var data = { container: container };
				var template = _.template($("#container_template").html(), data);
				self.$el.append(template);
			});
		}, this);
		*/
		var i = 0;
		this.collection.each(function(container) {
			i++;
			_.each(container.get("containers"), function(item) {
				this.data = { container: item };
				var template = _.template($("#container_template").html(), this.data);
				self.$el.append(template);
			});
		}, this);
		
		return this;
	},
	
	getFiles: function(e) {
		console.log(e);
	}
});

var containers = new ContainerCollection();
containers.fetch({
	model: new Container(),
	success: function() {
		var containerView = new ContainerView({ collection: containers });
	}
});