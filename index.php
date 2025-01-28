<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title>

		FE CAPSTONE

	</title>
	<link rel="stylesheet" href="https://code.jquery.com/ui/1.14.1/themes/base/jquery-ui.css">
	<link rel="stylesheet" type="text/css" href="asset/css/bootstrap.min.css">
	<link rel="stylesheet" type="text/css" href="asset/css/style.css">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" integrity="sha512-1ycn6IcaQQ40/MKBW2W4Rhis/DbILU74C1vSrLJxCq57o941Ym01SwNsOMqvEBFlcgUa6xLiPY/NS5R+E6ztJQ==" crossorigin="anonymous" referrerpolicy="no-referrer" />
	<link rel="stylesheet" href="asset/css/sweetalert2.min.css">
	<script src="asset/js/sweetalert2.js"></script>



</head>
<body>


	<div class="container-fluid">
		<div class="row">
			<div class="col-12 text-center pt-5">
				<img src="asset/gam/logo.png" style="width:100px;height: 100px;">
				<h3 class="mb-3">  DCI CAPSTONE PROJECT BACKEND  </h3>
				<p>
					Tata Cara Pengerjaan : <br>
					<a href="https://simplistic-rabbit-c57.notion.site/Tugas-Capstone-Backend-dengan-Node-JS-DCI-187cc5a60c3a809e9a20c9477a62511e"> https://simplistic-rabbit-c57.notion.site/Tugas-Capstone-Backend-dengan-Node-JS-DCI-187cc5a60c3a809e9a20c9477a62511e </a> 
				</p>
				<p>
					Tata Cara Integrasi : <br>
					<a href=""> Klik Disini </a> 
				</p>

				<button class="btn btn-primary" onclick="open_app_layer('#dci_app_booking')"> START APPS </button>
			</div>
		</div>
	</div>



	<!-- App Layer -->
	<div class="app_layer" id="dci_app_booking" style="display:none;">
		<div class="backdrop"></div>
		<!-- Container App Layer - Flex Vertical Area -->
		<div class="container_app_layer">

			<!-- Header Layer -->
			<div class="header_layer" style="border: 2px solid #ccc">
				<div class="container-fluid">
					<div class="row justify-content-center">
						<img src="asset/gam/browser.png" style="width:50px;height: 50px;">
						<div class="col">
							<div class="form-group">
								<input type="text" class="form-control" name="base_url">
							</div>
						</div>
						<div class="col-4 text-center">
							<button class="btn btn-default btn_run_deploy btn_base_url btn_deploy">
								<span class="deploy"> DEPLOY  </span>
								<span class="stop_deploy"> STOP  </span>
							</button>
						</div>

					</div>
				</div>
			</div>
			<!-- End Of Header Layer -->

			<!-- body Layer -->
			<div class="body_layer" style="overflow: auto;">


				<!-- Load Layer -->
				<div class="load_layer">
					<div class="content_load">
						<div class="animasi_load">
						</div>
						<img src="asset/gam/logo.png">
					</div>
				</div>
				<!-- End Of Load Layer -->
				<style type="text/css">
				.nav_content_layer *{
					color: #fff;
				}
			</style>
			<!-- Nav  -->
			<nav class="nav_content_layer">
				<div class="container-fluid">
					<div class="row">
						<div class="col col_nav" data-content-id="content_data_room" onclick="open_content_dataRoom()">
							<i class="fas fa-home"></i>
							<p class="mt-1"> List Room </p>
						</div>
						<div class="col col_nav" data-content-id="content_tambah_room" onclick="open_contentLayer('#content_tambah_room')">
							<i class="fas fa-plus"></i>
							<p class="mt-1"> Tambah Room </p>

						</div>
						<div class="col col_nav" data-content-id="content_data_booking" onclick="open_content_dataBooking()">
							<i class="fas fa-list"></i>
							<p class="mt-1"> History Booking </p>

						</div>
					</div>
				</div>
			</nav>
			<!-- 				<button class="btn btn-secondary btn_back btn_home">
				<i class="fas fa-home"></i>
			</button> -->

			<!-- Card Product Ex - Jadi Bahan Clone Di JS -->
			<?php require_once 'card_product_ex.php' ?>
			<!-- End Of Card Product Ex - Jadi Bahan Clone Di JS -->

			<?php require_once "content_welcome.php" ?>

			<!-- Content Room -->
			<?php require_once "content_data_room.php" ?>
			<?php require_once "content_view_room.php" ?>
			<?php require_once "content_tambah_room.php" ?>
			<?php require_once "content_edit_room.php" ?>

			<!-- Content Booking -->
			<?php require_once "content_data_booking.php" ?>
			<?php require_once "content_view_booking.php" ?>
			<?php require_once "content_tambah_booking.php" ?>



		</div>
		<!--End Of body Layer -->

	</div>
	<!-- End Of Container App Layer - Flex Vertical Area -->
</div>
<!-- End Of App Layer  -->

<!-- End Of Layer Dimension Fly App -->



<script type="text/javascript" src="asset/js/jquery.min.js"></script>
<script src="asset/js/jquery-ui.js"></script>
<script type="text/javascript" src="asset/js/app.js"></script>
<script type="text/javascript">

	$(document).ready(function() {

	})

</script>

</body>
</html>