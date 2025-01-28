				<!-- Content Layer - Tambah Data -->
				<div id="content_tambah_booking" class="content_layer" style="padding: 20px;">
					<h3 class="text-center mb-3">
						Booking Room Id : <span class="id_room"></span>
					</h3>
					<form id="form_tambah_booking">
						<input type="hidden" name="id_room" class="id_room">
						<div class="form-group">
							<label> Nama Booking : </label>
							<input type="text" class="form-control" name="name">
						</div>
						<div class="form-group">
							<label>  Kontak Booking : </label>
							<input type="text" class="form-control" name="contact">
						</div>
						<div class="form-group">
							<label>  Tanggal Booking : </label>
							<input type="date" class="form-control" name="date">
						</div>
						<div class="form-group">
							<button class="btn btn-success form-control mt-3"> 
								<i class="fas fa-plus"></i>
								Booking Room 
							</button>
						</div>
						
					</form>
				</div>
				<!-- End Of Content Layer - Tambah Data -->