var File = Backbone.Model.extend({
	defaults: {
		container: 'home',
		files: [
			{
				item: "file",
				size: 0,
				mtime: "",
				type: "mime"
			}
		]
	}
});

var FileCollection = Backbone.Collection.extend({
	model: File,
	url: 'http://conv2.punchy.com:9123/container/',
	
	initialize: function(models, options) {
        container = options.container || "";
		if (container.length > 0) {
			this.setContainer(container);
		}
    },
	
	setContainer: function(container) {
		var baseUrl = this.url;
		this.url += container + "/list";
		this.fetch();
	}
});

var FileView = Backbone.View.extend({
	el: "#files",
	initialize: function() {
		this.model = new Container();
		this.render();
	},
	render: function() {
		var self = this;
		this.collection.each(function(result) {
			var files = result.get('files');
			_.each(files, function(file) {
				self.$el.append("<li>" + file.item +"</li>");
			});
		}, this);
	}
});

function getFiles(container) {
	var files = new FileCollection({}, { container: container });
	files.fetch({
		success: function() {
			var fileView = new FileView({ collection: files });
		}
	});
}