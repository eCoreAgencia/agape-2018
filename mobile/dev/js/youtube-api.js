var youtMount = __element({type: 'h2', content: 'Próximos'});
		youtMount += __element({type: 'p', content: 'Reprodução automática'});
		youtMount += __element({type: 'button', id: 'toggle-rep', 	content:__element({type: 'span', content: '&#10004;'})});

var youtAppend = __element({type: 'div', id: 'rep-menu', content: youtMount});
		youtAppend += __element({type:'ul'});
    youtAppend += __element({	type:'div',class:'col-md-12',
				id: 'load-more-wrapper', content:__element(
					{type: 'button', id: 'load-more-videos', content: 'Carregar mais'}
				)
			}
		);

$('#yt-app #more-videos').append(youtAppend);

//Carrega api iframe youtube///
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

//Requisita videos//
var order = 'date';
var parts = 'snippet';
var channelId = 'UCQGzq-YXXgr7-uV4m2BbkbA';
//var appKey = 'AIzaSyBHQpYVwiVVT7wz1bAA0gnM3xF9oz1HftM';
var appKey = 'AIzaSyCPHsjV7ewgLD_w_9TA0ygtZX31Lk7YXOw'
function getVideos(appKey,parts,channelId,order,limite, token){
	var url = 'https://www.googleapis.com/youtube/v3/search?order='+order+'&part='+parts+'&channelId='+channelId+'&maxResults='+limite+'&key='+appKey;
	if(token){
		url += ('&pageToken='+token);
	}
	var videos;
	$.ajax(url,{
		type: 'Get',
		async: false
	}).done(function(data, key, val){
		videos = data.items;
		videos['nextPageToken'] = data.nextPageToken;
	});
	return videos;
}

var ytPlayer;
var videos;
$('body.home').each(function(){
	var limite = '5';
	videos = getVideos(appKey,parts,channelId,order,limite);
});
$('body.videos').each(function(){
	var limite = '11';
	videos = getVideos(appKey,parts,channelId,order,limite);
	$('#yt-app #load-more-videos').click(function(){
		if(videos['nextPageToken']){
			limite -= 1;
			videos = getVideos(appKey,parts,channelId,order,limite,videos['nextPageToken']);
			for(i = 0; i < videos.length; i++){
				if(videos[i].id.videoId){
					var id = videos[i].id.videoId;
					var title = videos[i].snippet.title;
					var thumb = videos[i].snippet.thumbnails.medium.url;
					var miniVideo = __element(
							{type: 'li', data:[{name: id, id: id}], class: 'yt-video-item', content:__element(
											{type: 'img', class: 'yt-thumb', src: thumb}) +
											__element(
											{type: 'h3', class: 'yt-title', content: title})
							}
					);
					//var miniVideo = '<li data-id="'+id+'" class="yt-video-item"><img class="yt-thumb" src="'+thumb+'"/><h3 class="yt-title">'+title+'</h3></li>';
					$('#yt-app #more-videos ul').append(miniVideo);
				}
			}
		}else{
			$(this).remove();
		}
	});
});

for(i = 0; i < videos.length; i++){
	var id = videos[i].id.videoId;
	var title = videos[i].snippet.title;
	var thumb = videos[i].snippet.thumbnails.medium.url;
	if(i==0){
		var playerWidth = $('#main-video').width();
		function onYouTubeIframeAPIReady() {
		  ytPlayer = new YT.Player('main-video', {
		    videoId: id,
		    width: playerWidth,
		    height: getHeight(),
		    events: {
		    	'onStateChange': onPlayerStateChange,
		    }
		  });
		}
		function onPlayerStateChange(e) {
	        if(!(e.data) && $('#toggle-rep').hasClass('yt-rep-active')){
	        	var newId = $('#more-videos ul li:nth-of-type(2)').attr('data-id');
	        	ytPlayer.cueVideoById(newId);
	        	$('#more-videos ul').find('li').first().appendTo('#more-videos ul');
	        }
		}
		function getHeight(){
			var height = (playerWidth*9)/16;
			return height;
		}
		//var miniVideo = '<li data-id="'+id+'" class="yt-video-item"><img class="yt-thumb" src="'+thumb+'"/><h3 class="yt-title">'+title+'</h3></li>';
		var miniVideo = __element(
					{ type: 'li', data: [{name: id, id: id}], class: 'yt-video-item',
									content:__element(
								  			{ type: 'img', src: 'yt-thumb', class: 'yt-thumb'}) +
													__element(
													{	type: 'h3', class: 'yt-title', content: title }
													)
					}
		);
		$('#yt-app #more-videos ul').append(miniVideo);
	}else{
		//var miniVideo = '<li data-id="'+id+'" class="yt-video-item"><img class="yt-thumb" src="'+thumb+'"/><h3 class="yt-title">'+title+'</h3></li>';
		var miniVideo = __element(
					{ type: 'li', data: [{name: id, id: id}], class: 'yt-video-item',
									content:__element(
								  			{ type: 'img', src: 'yt-thumb', class: 'yt-thumb'}) +
													__element(
													{	type: 'h3', class: 'yt-title', content: title }
													)
					}
		);

		$('#yt-app #more-videos ul').append(miniVideo);
	}
}
// Funções de Botões //
	$('#yt-app #more-videos #toggle-rep').click(function(){
		$(this).toggleClass('yt-rep-active');
	});
	$('#yt-app #more-videos').on('click', 'li',function(){
		var newId = $(this).attr('data-id');
		ytPlayer.loadVideoById(newId);
		$('#more-videos ul').find('li').first().appendTo('#more-videos ul');
		$(this).prependTo('#more-videos ul');
	});
	$('#yt-app #more-videos ul').click(function(){
	    $(this).addClass('active');
	});
// Funções de Botões //
