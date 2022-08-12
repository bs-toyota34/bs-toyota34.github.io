(function($){
	// prettyPhoto
	/*
	jQuery(document).ready(function(){
		jQuery('a[data-gal]').each(function(){
			jQuery(this).attr('rel', jQuery(this).data('gal'));
		});
		jQuery("a[data-rel^='prettyPhoto']").prettyPhoto({animationSpeed:'slow',theme:'light_square',slideshow:false,overlay_gallery: false,social_tools:false,deeplinking:false});
	});
	*/

	//slide show
	$('.mypattern').slick({
		autoplay: true,
		autoplaySpeed: 2500,
		speed: 800,
		arrows: false,
		centerMode: true,
		centerPadding: '25%',
		variableWidth: true,
		dots: true,
	});

	//check announce date
	const announces = document.getElementsByClassName("anno-finished");
	const current_date = new Date();
	for(let i = 0; i < announces.length; i++){
		if(current_date > new Date(announces[i].textContent)){
			announces[i].textContent += " (終了)";
		}
	}
	const announce_form = document.getElementById("announce-form");
	if(announce_form !== null){
		const data = announce_form.getElementsByTagName("p");
		let infos = [];
		for(let i = 0; i < data.length; i++){
			const li = data[i].textContent.split(' ');
			infos.push({
				title: li[1], url: li[0],
				event_date: li[2], outline: li[3],
				is_past: current_date > new Date(li[2]) 
			});
		}
		announce_form.innerHTML = ""; //clear all
		infos.sort((a, b) => {
			if(a.is_past !== b.is_past) return a.is_past - b.is_past;
			return (new Date(a.event_date) - new Date(b.event_date)) * (0.5 - a.is_past);
		});
		for(let i = 0; i < infos.length; i++){
			const str = create_announce(infos[i]);
			announce_form.innerHTML += str;
		}
	}
})(jQuery);


//announce
function create_announce(info){
	return`<div>
					<a href="${info.url}">
						<h4 class="ctitle" style="display:inline">${info.title}</h4>
					</a>
					<p style="display:inline">
						<i class="fa-solid fa-calendar-days"></i>
						<span>${info.event_date}${info.is_past ? " (終了)" : ""}</span>
					</p>
					<p>${info.outline}</p>
					<div class="hline"></div>
					<div style="margin-top:10px; margin-bottom:10px"></div>
				</div>`;
}