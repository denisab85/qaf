(function($,document,window){"use strict";function resize(that){var documentHeight=$(document).height(),windowHeight=$(window).height();if(that.settings.resizeTo==='window'){$(that).css('height',windowHeight);}else{if(windowHeight>=documentHeight){$(that).css('height',windowHeight);}else{$(that).css('height',documentHeight);}}}
function preload(that){$(that.controlbox).append(that.settings.preloadHtml);if(that.settings.preloadCallback){(that.settings.preloadCallback).call(that);}}
function play(that){var video=that.find('video').get(0),controller;if(that.settings.controlPosition){controller=$(that.settings.controlPosition).find('.ui-video-background-play a');}else{controller=that.find('.ui-video-background-play a');}
if(video.paused){video.play();controller.toggleClass('ui-icon-pause ui-icon-play').text(that.settings.controlText[1]);}else{if(video.ended){video.play();controller.toggleClass('ui-icon-pause ui-icon-play').text(that.settings.controlText[1]);}else{video.pause();controller.toggleClass('ui-icon-pause ui-icon-play').text(that.settings.controlText[0]);}}}
function mute(that){var video=that.find('video').get(0),controller;if(that.settings.controlPosition){controller=$(that.settings.controlPosition).find('.ui-video-background-mute a');}else{controller=that.find('.ui-video-background-mute a');}
if(video.volume===0){video.volume=1;controller.toggleClass('ui-icon-volume-on ui-icon-volume-off').text(that.settings.controlText[2]);}else{video.volume=0;controller.toggleClass('ui-icon-volume-on ui-icon-volume-off').text(that.settings.controlText[3]);}}
function loadedEvents(that){if(that.settings.resize){$(window).on('resize',function(){resize(that);});}
that.controls.find('.ui-video-background-play a').on('click',function(event){event.preventDefault();play(that);});that.controls.find('.ui-video-background-mute a').on('click',function(event){event.preventDefault();mute(that);});if(that.settings.loop){that.find('video').on('ended',function(){$(this).get(0).play();$(this).toggleClass('paused').text(that.settings.controlText[1]);});}}
function loaded(that){$(that.controlbox).html(that.controls);loadedEvents(that);if(that.settings.loadedCallback){(that.settings.loadedCallback).call(that);}}
var methods={init:function(options){return this.each(function(){var that=$(this),compiledSource='',attributes='',data=that.data('video-options'),image,isArray;if(document.createElement('video').canPlayType){that.settings=$.extend(true,{},$.fn.videobackground.defaults,data,options);if(!that.settings.initialised){that.settings.initialised=true;if(that.settings.resize){resize(that);}
$.each(that.settings.videoSource,function(){isArray=Object.prototype.toString.call(this)==='[object Array]';if(isArray&&this[1]!==undefined){compiledSource=compiledSource+'<source src="'+this[0]+'" type="'+this[1]+'">';}else{if(isArray){compiledSource=compiledSource+'<source src="'+this[0]+'">';}else{compiledSource=compiledSource+'<source src="'+this+'">';}}});attributes=attributes+'preload="'+that.settings.preload+'"';if(that.settings.poster){attributes=attributes+' poster="'+that.settings.poster+'"';}
if(that.settings.autoplay){attributes=attributes+' autoplay="autoplay"';}
if(that.settings.loop){attributes=attributes+' loop="loop"';}
$(that).html('<video '+attributes+'>'+compiledSource+'</video>');that.controlbox=$('<div class="ui-video-background ui-widget ui-widget-content ui-corner-all"></div>');if(that.settings.controlPosition){$(that.settings.controlPosition).append(that.controlbox);}else{$(that).append(that.controlbox);}
that.controls=$('<ul class="ui-video-background-controls"><li class="ui-video-background-play">'+'<a class="ui-icon ui-icon-pause" href="#">'+that.settings.controlText[1]+'</a>'+'</li><li class="ui-video-background-mute">'+'<a class="ui-icon ui-icon-volume-on" href="#">'+that.settings.controlText[2]+'</a>'+'</li></ul>');if(that.settings.preloadHtml||that.settings.preloadCallback){preload(that);that.find('video').on('canplaythrough',function(){if(that.settings.autoplay){that.find('video').get(0).play();}
loaded(that);});}else{that.find('video').on('canplaythrough',function(){if(that.settings.autoplay){that.find('video').get(0).play();}
loaded(that);});}
that.data('video-options',that.settings);}}else{that.settings=$.extend(true,{},$.fn.videobackground.defaults,data,options);if(!that.settings.initialised){that.settings.initialised=true;if(that.settings.poster){image=$('<img class="ui-video-background-poster" src="'+that.settings.poster+'">');that.append(image);}
that.data('video-options',that.settings);}}});},play:function(options){return this.each(function(){var that=$(this),data=that.data('video-options');that.settings=$.extend(true,{},data,options);if(that.settings.initialised){play(that);that.data('video-options',that.settings);}});},mute:function(options){return this.each(function(){var that=$(this),data=that.data('video-options');that.settings=$.extend(true,{},data,options);if(that.settings.initialised){mute(that);that.data('video-options',that.settings);}});},resize:function(options){return this.each(function(){var that=$(this),data=that.data('video-options');that.settings=$.extend(true,{},data,options);if(that.settings.initialised){resize(that);that.data('video-options',that.settings);}});},destroy:function(options){return this.each(function(){var that=$(this),data=that.data('video-options');that.settings=$.extend(true,{},data,options);if(that.settings.initialised){that.settings.initialised=false;if(document.createElement('video').canPlayType){that.find('video').off('ended');if(that.settings.controlPosition){$(that.settings.controlPosition).find('.ui-video-background-mute a').off('click');$(that.settings.controlPosition).find('.ui-video-background-play a').off('click');}else{that.find('.ui-video-background-mute a').off('click');that.find('.ui-video-background-play a').off('click');}
$(window).off('resize');that.find('video').off('canplaythrough');if(that.settings.controlPosition){$(that.settings.controlPosition).find('.ui-video-background').remove();}else{that.find('.ui-video-background').remove();}
$('video',that).remove();}else{if(that.settings.poster){that.find('.ui-video-background-poster').remove();}}
that.removeData('video-options');}});}};$.fn.videobackground=function(method){if(!this.length){return this;}
if(methods[method]){return methods[method].apply(this,Array.prototype.slice.call(arguments,1));}
if(typeof method==='object'||!method){return methods.init.apply(this,arguments);}
$.error('Method '+method+' does not exist on jQuery.videobackground');};$.fn.videobackground.defaults={videoSource:[],poster:null,autoplay:true,preload:'none',loop:false,controlPosition:null,controlText:['Play','Pause','Mute','Unmute'],resize:true,preloadHtml:'',preloadCallback:null,loadedCallback:null,resizeTo:'document'};}(jQuery,document,window));