var timer,
	timerInterval = 0.2 * 1000,
	startSeconds,
	uploaded = 0,
	total = 0,
	percent = 0,
	speed = 0;

function addFile(container) {
	var file = document.getElementById("file").files[0];
	var formData = new FormData();
	formData.append('key', 'secret');
	formData.append('container', container);
	formData.append('file', file);
	
	// build request
	var ajax = new XMLHttpRequest();
	ajax.upload.addEventListener("progress", progressHandle, false);
	ajax.addEventListener("load", completeHandle, false);
	ajax.addEventListener("error", errorHandle, false);
	ajax.addEventListener("abort", abortHandle, false);
	ajax.open("POST", 'http://conv2.punchy.com:9123/upload');
	ajax.send(formData);

	// setup speed timer
	startSeconds = new Date().getTime() / 1000;
	timer = setInterval(function() {
		var currentSeconds = new Date().getTime() / 1000,
			elapsed = currentSeconds - startSeconds;
		speed = Number(uploaded) - Number(elapsed) / 1024;
	
		if (percent == 100) {
			clearInterval(timer);
		}
	}, timerInterval);
}

function progressHandle(e) {
	uploaded = e.loaded;
	total = e.total;
	percent = Math.round((uploaded / total) * 100);
	
	// some output
	document.getElementById("progress-info").innerHTML = (uploaded / 1024).toFixed(2) + "/" + (total / 1024).toFixed(2) + " Kb (" + (speed / 1024).toFixed(2) + " KB/s)";
	document.getElementById("progressbar").value = percent;
}

function completeHandle(e) {
	document.getElementById("progress-info").innerHTML = "Upload completed";
	document.getElementById("progressbar").value = 0;
	clearInterval(timer);
	window.location = '/';
}

function errorHandle(e) {
	document.getElementById("progress-info").innerHTML = "Upload failed";
	clearInterval(timer);
}

function abortHandle(e) {
	document.getElementById("progress-info").innerHTML = "Upload aborted";
	clearInterval(timer);
}

