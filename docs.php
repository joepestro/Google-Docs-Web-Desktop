<?php
	/* Joe Pestro <joepestro@gmail.com> */

	include_once("api.php");
	echo google_documents_list_data_api($_POST['sessionToken']);
?>