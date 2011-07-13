<?php
	/* Joe Pestro <joepestro@gmail.com> */

	$session_token = NULL;

	/* 
		Step #1: Upgrade to session token
		Accepts a temporary token and returns the required session token
		http://code.google.com/apis/documents/developers_guide_protocol.html#AuthSubSessionToken
	*/
	function google_request_session_token($token) {
		global $session_token;
		
		if ($session_token != NULL)
			return $session_token;
		
		$fp = fsockopen("www.google.com", 80, $errno, $errstr, 30);
		if (!$fp) {
			echo "$errstr ($errno)<br/>\n";
			return "null";
		} else {
			$out = "GET https://www.google.com/accounts/AuthSubSessionToken HTTP/1.0\r\n";
			$out .= "Content-Type: application/x-www-form-urlencoded\r\n";
			$out .= "Authorization: AuthSub token=\"" . $token . "\"\r\n";
			$out .= "Host: https://www.google.com\r\n";
			$out .= "Accept: text/html, image/gif, image/jpeg, *; q=.2, */*; q=.2\r\n";
			$out .= "Connection: close\r\n\r\n";
			
			$headers = "";
			fwrite($fp, $out);
		    while (!feof($fp)) {
			    $in = fgets($fp, 128);
			    $headers .= $in;
		    }
		    fclose($fp);
		    
		   	$pos = strpos($headers, "Token=");
		   	$session_token = substr($headers, $pos+6);
		   	$session_token = substr($session_token, 0, strlen($session_token)-1);
		   	
		   	if ($pos === false)
		   		$session_token = "null";
		   	return $session_token;
		}
	}

	/* 
		Step #2: Get full document list 
		Accepts a session token [optional], or uses session token obtained from google_request_session_token()
		http://code.google.com/apis/documents/developers_guide_protocol.html#ListDocs
	*/
	function google_documents_list_data_api($remote_session_token = NULL) {
		global $session_token;
		
		if ($remote_session_token === NULL)
			$remote_session_token = $session_token;
		
		$fp2 = fsockopen("docs.google.com", 80, $errno, $errstr, 30);
		if (!$fp2) {
		    echo "$errstr ($errno)<br />\n";
		    return "null";
		} else {
		    $out = "GET http://docs.google.com/feeds/documents/private/full?alt=json HTTP/1.0\r\n";
		    $out .= "Authorization: AuthSub token=\"" . $remote_session_token . "\"\r\n";
		    $out .= "Connection: close\r\n\r\n";
		
		    $headers = "";
		    fwrite($fp2, $out);
		    while (!feof($fp2)) {
		        $in = fgets($fp2, 128);
		        $headers .= $in;
		    }
		    fclose($fp2);
		    
		    $feed = "null";
		    $pos = strpos($headers, "{");
		    
		    if ($pos === false || strpos($headers, "feed") === false)
		    	$feed = "null";
		    else {
		    	$feed = substr($headers, $pos);
		    	$feed = substr($feed, 0, strrpos($feed, "}")+1);
			}
	    	return $feed;
		}
	}
?>