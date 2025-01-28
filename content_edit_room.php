				<!-- Content Layer - edit Data -->
				<div id="content_edit_room" class="content_layer" style="padding: 20px;">
					<h3 class="text-center mb-3">
						Edit Room Id : #<span id="id_room"> </span>
					</h3>
					<form id="form_edit_room">
						<input type="hidden" name="id_room">

						<div class="form-group">
							<label> Nama Room : </label>
							<input type="text" class="form-control" name="name">
						</div>
						<div class="form-group">
							<label>  Deskripsi : </label>
							<textarea class="form-control" name="description"></textarea>
						</div>
						<div class="form-group">
							<label> Kapasitas : </label>
							<input type="number" class="form-control" name="capacity">
						</div>
						<div class="form-group">
							<button class="btn btn-success form-control mt-3"> 
								<i class="fas fa-plus"></i>
								SUBMIT
							</button>
						</div>
						
					</form>
				</div>
				<!-- End Of Content Layer - edit Data -->