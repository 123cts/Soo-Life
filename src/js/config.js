/*
	requirejs配置
 */
require.config({
	// baseUrl:'js'
	paths:{
        jquery:'../lib/jquery-3.2.1',
		Carousel:'../lib/jquery.Carousel/jquery.Carousel',
		Zoom:'../lib/jquery.Zoom/jquery.Zoom'
	},
	shim:{
        common:['jquery'],
		Carousel:['jquery'],
        Zoom:['jquery'],
	}
});