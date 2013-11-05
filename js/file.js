function getFiles(container, callback) {
	$.get('http://conv2.punchy.com:9123/container/' + container + '/list', function(data) {
		callback(data);
	});
}
