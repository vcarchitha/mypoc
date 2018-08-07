/*
*  Copyright 2015 Adobe Systems Incorporated
*
*  Licensed under the Apache License, Version 2.0 (the "License");
*  you may not use this file except in compliance with the License.
*  You may obtain a copy of the License at
*
*      http://www.apache.org/licenses/LICENSE-2.0
*
*  Unless required by applicable law or agreed to in writing, software
*  distributed under the License is distributed on an "AS IS" BASIS,
*  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
*  See the License for the specific language governing permissions and
*  limitations under the License.
*/
package org.myorg.mypoc.core.recaptcha;

import java.io.IOException;

import javax.servlet.Servlet;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.servlets.HttpConstants;
import org.apache.sling.api.servlets.SlingAllMethodsServlet;
import org.osgi.framework.Constants;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Component(service=Servlet.class,

property={

Constants.SERVICE_DESCRIPTION + "=RecaptchaServlet Servlet",

"sling.servlet.methods=" + HttpConstants.METHOD_POST,

"sling.servlet.paths="+ "/bin/servlet/verifyRecaptcha"

           })
public class RecaptchaServlet extends SlingAllMethodsServlet {
	@Reference
	private  ReCaptchaService reCaptchaService;
                private static final long serialVersionUID = 1L;
                
                private static final Logger logger = LoggerFactory
                                                .getLogger(RecaptchaServlet.class);

                //private static final long serialVersionUID = -6087689053766658045L;
            	
            	
            	@Override
            	protected void doPost (SlingHttpServletRequest request, SlingHttpServletResponse response) {	
            		
            		//logger.info("ddddfdf::::::::::::::"+reCaptchaService.verify(request));

                	try {
                		if(reCaptchaService.verify(request)){
                			logger.info("gffhfginside iff");
						response.getWriter().write("success");}
					} catch (IOException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}
        			

            	}
            	@Override
                protected void doGet(final SlingHttpServletRequest req,final SlingHttpServletResponse resp){
                	
                }
}