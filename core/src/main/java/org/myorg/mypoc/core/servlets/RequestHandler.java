package org.myorg.mypoc.core.servlets;

import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.InputStreamReader;
import java.net.URL;

import javax.net.ssl.HttpsURLConnection;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class RequestHandler {
	
	 private static final Logger logger = LoggerFactory
             .getLogger(RequestHandler.class);

	public static final String SITE_VERIFY_URL = "https://www.google.com/recaptcha/api/siteverify";
	public static final String SECRET = "6Ld5XGYUAAAAAE8Mza-h3yXEtzoXdIM5yqsr4nFo";
	private final static String USER_AGENT = "Mozilla/5.0";

	public static boolean verifyResponse(String recaptchaResponse)  {
		if (recaptchaResponse == null || "".equals(recaptchaResponse)) {
			return false;
		}		
		try{
		
		URL obj = new URL(SITE_VERIFY_URL);
		HttpsURLConnection httpConnection = (HttpsURLConnection) obj.openConnection();
		httpConnection.setRequestMethod("POST");
		httpConnection.setRequestProperty("User-Agent", USER_AGENT);
		String postParams = "secret=" + SECRET + "&response=" + recaptchaResponse;


		httpConnection.setDoOutput(true);
		DataOutputStream wr = new DataOutputStream(httpConnection.getOutputStream());
		wr.writeBytes(postParams);
		wr.flush();
		wr.close();

		BufferedReader inputReader = new BufferedReader(new InputStreamReader(
				httpConnection.getInputStream()));
		String inputLine;
		StringBuffer response = new StringBuffer();

		while ((inputLine = inputReader .readLine()) != null) {
			response.append(inputLine);
		}
		inputReader .close();
		//JSONObject jsonObject = new JSONObject();
	//jsonObject.put(response.toString());
		logger.info("response::::::::::::::::::::"+response.toString());
		
		JSONParser parser = new JSONParser();
		org.apache.sling.commons.json.JSONObject jsonObject= new org.apache.sling.commons.json.JSONObject(response.toString());
		// jsonObject = (JSONObject) parser.parse(response.toString());
		logger.info("response::::::::::::::::::::"+jsonObject.getBoolean("success"));
		return jsonObject.getBoolean("success");
		}catch(Exception e){
			e.printStackTrace();
			return false;
		}
	}
}
