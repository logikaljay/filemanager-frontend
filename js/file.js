function getFiles(container, callback) {
	$.get('http://conv2.punchy.com:9123/container/' + container + '/list', function(data) {
		callback(data);
	});
}

function selectedFile(file) {
	var $el = $(".file-" + file.id);
	var $size = $el.find(".filesize"),
		$actionbar = $el.find(".fileaction");
}

function showAddFile(containerName) {
	var el = overlayBar(200);

	var template = _.template($("#add_file_template").html());
    el.$content.html(template({animate: true, container: containerName }));

    $(".action-required").show();
}

function uploadFile() {
	var container = $(".js-container-name").val();
	addFile(container);
}
