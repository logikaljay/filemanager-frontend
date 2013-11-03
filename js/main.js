$.ajaxPrefilter(function (options, originalOptions, jqXHR){ 
	var newObject = {
		key : 'secret'
	}
	options.data = $.param($.extend(originalOptions.data, newObject));
});