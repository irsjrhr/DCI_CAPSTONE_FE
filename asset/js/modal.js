function modal_show( target ) {
	var modal = $(target);
	modal.fadeIn();

}
function modal_hide( target ) {
	var modal = $(target);

	modal.hide();

}
$(function(e) {
	/*
	$('.warpoelContainer').find('.btn_close').on('click', function(e) {
		var btn = $(this);
		var modal = btn.parents('.warpoelContainer');
		modal_hide(modal);
	});
	
	$('.modal_backdrop').on('click', function () {
		var backdrop = $(this);
		var modal = backdrop.parents('.warpoelContainer');
		modal_hide( modal );
	});
	*/
})