<?php

	if($_POST['action'] === 'doFunctionOnServer2'){
        $curl_post_data = $_POST['data'];
        $service_url = 'https://37.17.36.103/services/v2/shop/getExternalOrderStatus';
        $curl = curl_init($service_url);
        curl_setopt($curl, CURLOPT_HTTPHEADER , array(
            "Content-Type: application/json",
            "Authorization: Basic a3ZhbGltYmVsOjF5MTNOMk1KOU0="
        ));
        
        curl_setopt($curl, CURLOPT_POST, true);
        curl_setopt($curl, CURLOPT_POSTFIELDS, $curl_post_data);
        curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, 0);
        curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, 0);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
        $curl_response = curl_exec($curl);
        $response = json_decode($curl_response);
        curl_close($curl);
           print_r($curl_response);
       
    }

?>