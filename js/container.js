function getContainers(onResult) {
	$.get('http://conv2.punchy.com:9123/container/list', function(data) {
		onResult(data);
	});
}

function showAddContainer() {
	var el = overlayBar(200);
	
	var template = _.template($("#new_container_template").html());
	el.$content.html(template({animate: true}));

	$(".action-required").show();
}

function addContainer() {
	var containerName = $(".js-container-name").val();
	// validate if this container can be added by checking if a container by the name already exists
	$.post('http://conv2.punchy.com:9123/container/create', { container: containerName }, function(data) {
		if (data.container == "error") {
			$(".js-container-name").parent().append(data.message);
		} else {
			closeOverlayBar(true);
			window.location = '/';
		}
	});
}

function redrawContainers(applyBindings) {
	var viewModel = new MainViewModel();
	getContainers(function(result) {
		var i = 1;
		_.each(result.containers, function(container) {
			// set the initial selected container
			if (i == 1)
				viewModel.setContainer(container);

			_.extend(container, { id: i });
			viewModel.containers.push(container);
			i++;
		});

		ko.applyBindings(viewModel);
	});
}
