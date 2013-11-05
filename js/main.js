$.ajaxPrefilter(function (options, originalOptions, jqXHR){ 
	var newObject = {
		key : 'secret'
	}
	options.data = $.param($.extend(originalOptions.data, newObject));
});

function MainViewModel() {
	var self = this;
	
	// containers and files
	self.containers = ko.observableArray([]);
	self.files = ko.observableArray([]);

	// selected states
	self.selectedContainer = ko.observable();
	self.selectedFile = ko.observable();
	
	// events
	self.setContainer = function(container) {
		if (container == 'undefined')
			container = this;

		// set the selected container
		self.selectedContainer(container);

		var i = 1;
		getFiles(container.name, function(data) {
			// reset list of files
			self.files([]);
			self.selectedFile(0);

			// bind new files to the model
			var files = data.files;
			_.each(files, function(file) {
				_.extend(file, { id: i });
				self.files.push(file);
				i++;
			});
		});
	};

	self.setFile = function() {
		self.selectedFile(this.id);
	};

	self.addContainer = showAddContainer;
}

$(function() {
	redrawContainers(true);
});
