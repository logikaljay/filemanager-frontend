$.ajaxPrefilter(function (options, originalOptions, jqXHR){ 
	var newObject = {
		key : 'secret'
	}
	options.data = $.param($.extend(originalOptions.data, newObject));
});

function MainViewModel() {
	var self = this;
	self.containers = ko.observableArray([]);
	self.files = ko.observable();
	self.selectedContainer = ko.observable();
	
	self.getFiles = function() {
		self.selectedContainer(this.id);
		console.log(self.selectedContainer());
	};
}

$(function() {
	getContainers(function(result) {
		var i = 1;
		var viewModel = new MainViewModel();
		var containers = result.containers;
		_.each(containers, function(container) {
			_.extend(container, { id: i });
			viewModel.containers.push(container);
			i++;
		});

		ko.applyBindings(viewModel);
	});
});
