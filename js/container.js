function getContainers(onResult) {
	$.get('http://conv2.punchy.com:9123/container/list', function(data) {
		onResult(data);
	});
}
