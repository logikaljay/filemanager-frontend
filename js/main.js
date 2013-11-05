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

	self.setFile = function(data, event) {
		self.selectedFile(data.id);
		var file = data;
		_.extend(file, { container: self.selectedContainer(), event: event, $el: $("file-" + data.id) });
		selectedFile(file);
	};

	self.addContainer = showAddContainer;
	self.deleteContainer = showDeleteContainer;

	self.addFile = function() {
		showAddFile(self.selectedContainer().name);
	};

	// Format functions
	self.formatSize = function(size) {
		if (size < 1025) {
			return size.toFixed(2) + " B";
		}

		size = size / 1024;
		if (size < 1025) {
			return size.toFixed(2) + " KB";
		}

		size = size / 1024;
		if (size < 1025) {
			return size.toFixed(2) + " MB";
		}

		size = size / 1024;
		return size.toFixed(2) + " GB";
	}
}

$(function() {
	redrawContainers(true);
});
