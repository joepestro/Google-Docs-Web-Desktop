<?php include_once("api.php"); ?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
   "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
   
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" >

<head>
	<!--	
		Thanks for your interest in the (unofficial) Google Web Desktop. If 
		you have any questions or comments about this, I'd love to hear 
		them. You can email me at joepestro[at]gmail.com. I'm graduating in 
		2008 from Miami University. Enjoy!
	-->
	
	<title>Google Web Desktop - by Joe Pestro</title>
	
	<!-- Meta Tags -->
	<meta http-equiv="content-type" content="text/html; charset=utf-8" />
	<meta name="robots" content="index, follow" />
	
	<!-- Favicon -->
	<link rel="shortcut icon" type="image/ico" href="favicon.ico">
	
	<!-- CSS -->
	<link rel="stylesheet" type="text/css" href="css/lightwindow.css" />
	<link rel="stylesheet" type="text/css" href="css/desktop.css" />
    
	<!-- JavaScript -->
	<script type="text/javascript" src="javascripts/prototype.js"></script>
	<script type="text/javascript" src="javascripts/scriptaculous.js"></script>
	<script type="text/javascript" src="javascripts/lightwindow.js"></script>
	<script type="text/javascript" src="javascripts/desktop.js"></script>
	
</head>

<body>
	
	<!-- Icons -->
	<div id="icons"></div>

	<!-- Google Session Token -->
	<div id="googleSessionToken" style="display:none"><?php if (isset($_GET['token'])) echo google_request_session_token($_GET['token']); ?></div>
	
	<!-- JSON Feed Data -->
	<div id="jsonFeedData" style="display:none"><?php if (isset($_GET['token'])) echo google_documents_list_data_api(NULL); ?></div>

	<!-- Welcome Message -->
	<div id="welcome">
		<p><span><strong style="color:rgb(255, 0, 0)">New! </strong>Presentation support, instantly add new docs, and more.</span></p>
		<a class="box" href="https://www.google.com/accounts/AuthSubRequest?scope=http%3A%2F%2Fdocs.google.com%2Ffeeds%2Fdocuments&session=1&secure=0&next=https%3A%2F%2Fwww.users.muohio.edu%2Fpestroja%2Fgooglewebdesktop">Sign in to <strong>Google Docs (BETA)</strong></a>
		<p class="signup"><strong>Not signed up yet? </strong><a class="normal" href="https://www.google.com/accounts/NewAccount?service=writely&hl=en&continue=http://docs.google.com/&followup=http://docs.google.com/">Get Google Docs now!</a></p>	
	</div>
	
	<!-- Manage Google Docs -->
	<div id="manage">
		<span class="newDocument"><strong>New </strong><a class="normal">Document</a>, <a class="normal">Spreadsheet</a>, or <a class="normal">Presentation</a></span>
		<a class="normal manageDocuments" href="http://docs.google.com/" target="_blank">Manage Google Docs</a>
	</div>
	
	<!-- Credits -->
	<div id="credits">Google Web Desktop - by Joe Pestro<span>Powered by <a href="http://www.prototypejs.org/" target="_blank">Prototype</a>, <a href="http://code.google.com/apis/" target="_blank">Google Docs Data APIs</a>, &amp; <a href="http://www.stickmanlabs.com/lightwindow/" target="_blank">LightWindow</a></span></div>
	
</body>

</html>
