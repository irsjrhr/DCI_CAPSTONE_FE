


// +++++++++ METHOD TERKAIT APP LAYER ++++++++++++++++++++++
var animasi_transisi;


function init_app_layer() {
	//Membuat callback delay
	animasi_transisi = $('.container_app_layer').css('transition-duration');
	animasi_transisi = animasi_transisi.split("s");
	animasi_transisi = animasi_transisi[0];
	animasi_transisi = parseFloat( animasi_transisi );
	animasi_transisi = animasi_transisi * 1000; //Karena 1 s = 1000ms

}

// +++++++++++ METHOD BASIC APP LAYER  +++++++++++
function open_app_layer( app_layer_target, content_layer_target = false ) {
	var app_layer_target = $( app_layer_target );
	var container_app_layer = app_layer_target.find('.container_app_layer');	
	//Mematikan overflow parent acuan agar tidak offset pada saat app_layer muncul dan tertutup semua dari segi vertikal dimensi
	var el_parent_acuan = app_layer_target.parent();	
	el_parent_acuan.css('overflow', 'hidden');

	//Hilangkan app_layer yang sedang aktif
	close_app_layer();

	//Munculkan app_layer target 
	app_layer_target.addClass('active');

	//Munculkan container_app_layer pada app layer tersebut 
	open_container_appLayer( container_app_layer );

	//++++++ Munculkan content layer pada content_app_layer
	open_contentLayer( content_layer_target, 'slide' );

}

function close_app_layer() {

	//Hilangkan app_layer yang sedang aktif
	var app_layer_active = $('.app_layer').filter('.active');
	var container_app_layer = app_layer_active.find('.container_app_layer');

	//Membuka overflow parent acuan agar kembali normal
	var el_parent_acuan = app_layer_active.parent();	
	el_parent_acuan.css('overflow', 'hidden');

	close_container_appLayer( container_app_layer );
}

function open_container_appLayer( container_app_layer ) {
	//Membuat container_app_layer ada dibawah layar agar posisi tak terlihat yang menjadi posisi awal animasi 
	container_app_layer.css('bottom', '-100%');
	setTimeout(function(e) {
		//Memunculkan container app layer ke posisi vertikal yang terihat 
		container_app_layer.css('bottom', '0');
	}, animasi_transisi)
}
function close_container_appLayer( container_app_layer ) {

	//Kembalikan container_app_layer ke posisi tidak terlihat untuk menjalankan animasi 
	container_app_layer.css('bottom', '-100%');

	//Hilangka app layer yang sedang aktif setelah animasi container app layer selesai 
	var app_layer_active = container_app_layer.parents('.app_layer');
	setTimeout(function(e) {
		app_layer_active.removeClass('active');
	}, animasi_transisi)
	
}

function open_contentLayer( content_layer_target = false,  effect = "none", callback = false) {
	//Fungsi membuka content layer dari app layer yang sedang aktif atau terbuka
	if ( callback == false ) {
		callback = function() {
			return 1;
		}
	}

	//Pilih content layer target dengan logika aman
	if ( content_layer_target != false ) {
		content_layer_target = $(content_layer_target);
	}else{
		var container_app_layer_active = $('.app_layer').filter('.active').find('.container_app_layer');
		//Jika tidak ada content layer yang dipilih, maka pilih di elemen yang pertema content layeer pada app layer tersebbut
		content_layer_target = container_app_layer_active.find('.content_layer').eq(0);
	}
	//Error Handling jika tidak ada element content_layer pada app layer yang sedang dibuka
	if ( content_layer_target.length < 1 ) {
		var msg_err = "Tidak ada element content layer yang dituju atau bisa dibuka pada app layer yang dibuka";
		console.log(msg_err);
		alert(msg_err);
	}

	//Menghilangkan content layer yang active dan hilangkan tandanya
	var content_layer_active = $('.content_layer').filter('.active');
	content_layer_active.hide(); //Agar ada animasi
	content_layer_active.removeClass('active');
	//Memunculkan content layer yang dituju dan berikan tandanya
	content_layer_target.show(effect); //Agar ada animasi
	content_layer_target.addClass('active');

	open_nav_contentLayer();

	callback( content_layer_target );
}

function open_nav_contentLayer() {
	//Tentukan muncul atau tidaknya navigasi content layer, dengan ketentuan jika content layer welcome yang active, maka navigasi tidak ada atau navigasi akan muncul jika content layer yang terbuka selain content layer welcome
	var content_layer_active = $('.content_layer').filter('.active'); 
	var content_layer_activeId = content_layer_active.attr('id');
	if ( content_layer_activeId != "content_welcome" ) {
		$('.nav_content_layer').show();

		var col_nav_active = $('.col_nav').filter('.active');
		col_nav_active.removeClass('active');

		var col_nav_target = $('.col_nav').filter('.col_nav[data-content-id='+content_layer_activeId+']');
		col_nav_target.addClass('active');

	}else{
		$('.nav_content_layer').hide();
	}
}


function open_loadLayer() {
	var load_layer = $('.load_layer');
	load_layer.show();
}
function close_loadLayer() {
	var load_layer = $('.load_layer');
	load_layer.hide();
}

function load_layer(callback, timer) {
	open_loadLayer();
	setTimeout( function() {
		callback();
		close_loadLayer();
	}, timer );
}




var base_url;
function create_card( dataObj, param_id_card = false, callback = false ) {
	if ( callback ==false ) {
		callback = function() {
			return 1;
		}
	}

	/*
	Method clone( true ) akan menyalin dan mengembalikan element html yang sudah ada sebelumnya dan juga seluruh element tersebut event handlernya sudah langsung terdaftar yang jika sudah ditetapkan sebelumnya maka element barunnya akan punya juga event tersebut.
	*/


	var card_product_target = $('.card_product_ex');
	if ( param_id_card != false ) {
		//Jika kita ingin memilih card_product_ex berdasarkan idnya 
		card_product_target = card_product_target.filter( param_id_card );
	}else{
		//Jika tidak ada card_product_ex berdasarkan id yang dipilih, maka gunakan card_product_ex berdasarkan index awal
		card_product_target = $( '.card_product_ex' ).eq(0);
	}
	var new_card_product = card_product_target.clone( true );
	new_card_product.removeClass('card_product_ex');
	new_card_product.attr('data-id', dataObj.id);

	callback( new_card_product );

	new_card_product.show();
	return new_card_product;
}




// =============== METHOD TERKAIT DATA ROOM ==================

function get_allDataRoom( callback = false ) {
	if ( callback == false ) {
		callback = function() {
			return 1;
		}
	}

	open_loadLayer();

	$.ajax({
		method: "GET",
		url : base_url +"/rooms",
		success: function( res ) {
			close_loadLayer();
			console.log(res);
			if ( res.status == "success" ) {
				callback( res );
			}else {
				Swal.fire("Gagal mengambil data room, perbaiki backend kamu!");
			}

		},
		error: function( xhr, status, error ) {
			console.log(error);
			console.log(status);
			const statusCode = xhr.status;
			Swal.fire("Error, perbaiki backend kamu! Status Code :" + statusCode)
		}
	})
}

function get_idDataRoom( id_data, callback ) {
	open_loadLayer();

	$.ajax({
		method: "GET",
		url : base_url +"/rooms/"+id_data,
		success: function( res ) {
			close_loadLayer();
			console.log(res);
			if ( res.status == "success" ) {
				callback( res );
			}else {
				Swal.fire("Gagal mengambil data room, perbaiki backend kamu!");
			}

		},
		error: function( xhr, status, error ) {
			console.log(error);
			console.log(status);
			const statusCode = xhr.status;
			Swal.fire("Error, perbaiki backend kamu! Status Code :" + statusCode)
		}
	})
}
//++++++  Content layer Room ++++++++++++++++
function open_content_dataRoom() {
	var content_data = $('#content_data_room');
	var data_card_product = content_data.find('#data_card_product');
	get_allDataRoom( function( res ) {
		data_card_product.html(" "); //Kosongin element apapun
		var data = res.data;
		for (var i = 0; i < data.length; i++) {
			var dataObj = data[i];
			var el_card_baru = create_card(dataObj, ".card_room", function( new_card_product ) {
				new_card_product.find('#title_card').text( dataObj.name );
				new_card_product.find('#subtitle_card').text( dataObj.capacity );
			});
			console.log( el_card_baru );
			data_card_product.append( el_card_baru );
		}	
		open_contentLayer( content_data, 'slide');

	});

}
function open_content_viewRoom( id_data, param_view = false ) {
	var content_view = $('#content_view_room');


	get_idDataRoom( id_data, function( res ) {
		var data_row_room = res.data;

		var nama_room = content_view.find('#nama_room');
		var kapasitas = content_view.find('#kapasitas');
		var deskripsi = content_view.find('#deskripsi');

		content_view.attr('data-id', id_data );
		nama_room.text( data_row_room.name );
		kapasitas.text( data_row_room.capacity );
		deskripsi.text( data_row_room.description );

		if ( param_view == "booked" ) {
			content_view.find('#btn_booking_room').hide();
		}else{
			content_view.find('#btn_booking_room').show();

		}

		open_contentLayer( content_view, 'slide');

	})

}














// =============== METHOD TERKAIT DATA BOOK ==================
function get_allDataBooking( callback = false ) {
	if ( callback == false ) {
		callback = function() {
			return 1;
		}
	}

	open_loadLayer();

	$.ajax({
		method: "GET",
		url : base_url +"/bookings",
		success: function( res ) {
			close_loadLayer();
			console.log(res);
			if ( res.status == "success" ) {
				callback( res );
			}else {
				Swal.fire("Gagal mengambil data book, perbaiki backend kamu!");
			}

		},
		error: function( xhr, status, error ) {
			console.log(error);
			console.log(status);
			const statusCode = xhr.status;
			Swal.fire("Error, perbaiki backend kamu! Status Code :" + statusCode)
		}
	})
}
function get_idDataBooking( id_data, callback ) {
	open_loadLayer();

	$.ajax({
		method: "GET",
		url : base_url +"/bookings/"+id_data,
		success: function( res ) {
			close_loadLayer();
			console.log(res);
			if ( res.status == "success" ) {
				callback( res );
			}else {
				Swal.fire("Gagal mengambil data book, perbaiki backend kamu!");
			}

		},
		error: function( xhr, status, error ) {
			console.log(error);
			console.log(status);
			const statusCode = xhr.status;
			Swal.fire("Error, perbaiki backend kamu! Status Code :" + statusCode)
		}
	})
}
function open_content_dataBooking() {
	var content_data = $('#content_data_booking');

	get_allDataBooking( function( res ) {

		var data_card_product = content_data.find('#data_card_product');

		data_card_product.html(" "); //Kosongin element apapun
		var data = res.data;
		for (var i = 0; i < data.length; i++) {
			var dataObj = data[i];
			var el_card_baru = create_card(dataObj, ".card_booking", function( new_card_product ) {
				new_card_product.find('#title_card').text( dataObj.name );
				new_card_product.find('#subtitle_card').text( dataObj.id_room  );
				new_card_product.find('#tanggal_booking').text( dataObj.date  );
			});
			console.log( dataObj );
			console.log( el_card_baru );
			data_card_product.append( el_card_baru );
		}	
		open_contentLayer( content_data, 'slide');

	});
}
function open_content_viewBooking( id_data ) {
	var content_viewBook = $('#content_view_booking');

	get_idDataBooking( id_data, function( res ) {

		// Col Detail Book 
		var data_row_book = res.data;
		content_viewBook.attr('data-id', id_data );
		var col_detail_book = content_viewBook.find('.col_detail_book');
		col_detail_book.find('#nama_booking').text( data_row_book.name );
		col_detail_book.find('#kontak_booking').text( data_row_book.contact );
		col_detail_book.find('#tanggal_booking').text( data_row_book.date );

		// Implementasi untuk col room dan card room
		var id_room = data_row_book.id_room;
		get_idDataRoom( id_room, function( res ) {
			var dataObj = res.data;
			var card_room = content_viewBook.find('.card_product.card_room');
			card_room.attr('data-id', id_room);
			card_room.find('#title_card').text( dataObj.name );
			card_room.find('#subtitle_card').text( dataObj.capacity );
		})

		open_contentLayer( content_viewBook, 'slide');
	})

}
function open_content_tambahBooking( id_room ) {
	$('span.id_room').text(id_room);
	$('input.id_room').val(id_room);
	open_contentLayer('#content_tambah_booking');
}
$(document).ready(function(e) {

	// +++++++++++++++  METHOD EVENT UNTUK APP LATER ++++++++++

	// base_url = "http://localhost:3000";
	init_app_layer();
	open_contentLayer('#content_welcome');
	open_nav_contentLayer();
	$('.app_layer .backdrop').on('click', function(e) {
		close_app_layer();
	});

	//Jalankan deploy aplikasi berdasarkan base url yang di inputkan
	$('.btn_run_deploy').on('click', function() {

		open_loadLayer();

		var btn = $(this);
		var input_base_url = $('input[name=base_url]');
		

		if (  btn.hasClass('btn_deploy') ) {
			//+++++ Jalankan deploy aplikasi 

			//Tentukan base url
			var base_url_val = input_base_url.val();
			//Ganti ke variabel
			base_url = base_url_val;
			input_base_url.prop('disabled', true);

			//Lakukan request data all di content data
			open_content_dataRoom();


			//Pindahin ke stop deploy
			btn.removeClass('btn_deploy');
			btn.addClass('btn_stop_deploy');

		}else if(btn.hasClass('btn_stop_deploy')){

			//+++++ Hentikan deploy aplikasi 

			//Pindahin ke  deploy
			btn.removeClass('btn_stop_deploy');
			btn.addClass('btn_deploy');
			input_base_url.prop('disabled', false);

			open_contentLayer("#content_welcome");

			close_loadLayer();


		}

	});


	// ================ EVENT HANDLER UNTUK CONTENT ROOM ==============

	//Event untuk View Room
	$('.card_room .btn_view').on('click', function() {
		var btn_view = $(this);
		var card_product = btn_view.parents('.card_product');
		var data_id_data = card_product.attr('data-id');

		if ( btn_view.parents('#content_view_booking').length > 0 ) {
			$('.btn_booking_room').hide();
		}else{
			$('.btn_booking_room').show();
		}
		open_content_viewRoom(data_id_data);
	});

	//Tambah Room
	$('#form_tambah_room').on('submit', function(e) {
		var form = $(this);
		var data = form.serialize();

		open_loadLayer();
		$.ajax({
			method: "POST",
			url : base_url +"/rooms",
			data: data,
			success: function( res ) {
				close_loadLayer();
				Swal.fire( res.message );
				// Debug 
				console.log("+++ Response +++++++");
				console.log( res );
			},	
			error: function( xhr, status, error ) {
				console.log(error);
				console.log(status);
				const statusCode = xhr.status;
				Swal.fire("Error, perbaiki backend kamu! Status Code :" + statusCode)
			}
		})

		return false;
	});

	//Update data room
	$('.btn_edit_room').on('click', function() {
		var btn_delete = $( this );
		var card_product = btn_delete.parents('.card_product');
		var data_id_data = card_product.attr('data-id');

		var content_edit_room = $('#content_edit_room');
		content_edit_room.find('input[name=id_room]').val( data_id_data );
		content_edit_room.find('#id_room').text( data_id_data );
		open_contentLayer(content_edit_room)

	});
	$('#form_edit_room').on('submit', function(e) {
		var form = $(this);
		var data = form.serialize();
		var id_room = form.find('input[name=id_room]').val();

		open_loadLayer();
		$.ajax({
			method: "PUT",
			url : base_url +"/rooms/"+id_room,
			data: data,
			success: function( res ) {
				close_loadLayer();
				Swal.fire( res.message );
				// Debug 
				console.log("+++ Response +++++++");
				console.log( res );
			},	
			error: function( xhr, status, error ) {
				console.log(error);
				console.log(status);
				const statusCode = xhr.status;
				Swal.fire("Error, perbaiki backend kamu! Status Code :" + statusCode)
			}
		})

		return false;
	});


	//Hapus Room
	$('.btn_delete_room').on('click', function(e) {
		var btn_delete = $( this );
		var card_product = btn_delete.parents('.card_product');
		var data_id_data = card_product.attr('data-id');

		$.ajax({
			method: "DELETE",
			url : base_url +"/rooms/"+data_id_data,
			success: function( res ) {
				close_loadLayer();
				Swal.fire( res.message );

				//Kembalikan ke content data
				open_content_dataRoom();

				// Debug 
				console.log("+++ Response +++++++");
				console.log( res );
			},	
			error: function( xhr, status, error ) {
				console.log(error);
				console.log(status);
				const statusCode = xhr.status;
				Swal.fire("Error, perbaiki backend kamu! Status Code :" + statusCode)
			}
		})
	});




	// ================ EVENT HANDLER UNTUK CONTENT BOOKING ==============

	// open_content_dataBooking();
	$('.card_booking .btn_view').on('click', function() {
		var btn_view = $(this);
		var card_product = btn_view.parents('.card_product');
		var data_id_data = card_product.attr('data-id');
		open_content_viewBooking(data_id_data);
	});

	//Tambah data booking room
	$('.btn_booking_room').on('click', function(e) {
		
		var btn = $(this);
		var content_view_room = btn.parents('#content_view_room');
		var data_id = content_view_room.attr('data-id');

		open_content_tambahBooking(data_id);
		return false;
	});
	//Tambah Booking Room
	$('#form_tambah_booking').on('submit', function(e) {
		var form = $(this);
		var data = form.serialize();

		open_loadLayer();
		$.ajax({
			method: "POST",
			url : base_url +"/bookings",
			data: data,
			success: function( res ) {
				close_loadLayer();
				Swal.fire( res.message );
				// Debug 
				console.log("+++ Response +++++++");
				console.log( res );
			},	
			error: function( xhr, status, error ) {
				console.log(error);
				console.log(status);
				const statusCode = xhr.status;
				Swal.fire("Error, perbaiki backend kamu! Status Code :" + statusCode)
			}
		})

		return false;
	});

	// open_content_tambahBooking("1");




});



