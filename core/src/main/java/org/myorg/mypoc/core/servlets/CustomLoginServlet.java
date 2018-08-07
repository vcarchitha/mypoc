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
package org.myorg.mypoc.core.servlets;

import java.io.IOException;

import javax.servlet.Servlet;
import javax.servlet.ServletException;

import org.apache.felix.scr.annotations.Reference;
import org.apache.felix.scr.annotations.sling.SlingServlet;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.resource.ResourceResolverFactory;
import org.apache.sling.api.servlets.HttpConstants;
import org.apache.sling.api.servlets.SlingAllMethodsServlet;
import org.osgi.framework.Constants;
import org.osgi.service.component.annotations.Component;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Component(service=Servlet.class,

property={

Constants.SERVICE_DESCRIPTION + "=Custom Login Servlet",

"sling.servlet.methods=" + HttpConstants.METHOD_POST,

"sling.servlet.paths="+ "/bin/test"

           })
public class CustomLoginServlet extends SlingAllMethodsServlet {
                private static final long serialVersionUID = 1L;
                
                private static final Logger logger = LoggerFactory
                                                .getLogger(CustomLoginServlet.class);

                  @Reference 
                    private ResourceResolverFactory resourceResolverFactory; 
                
                  
               /*   @Override
                  protected void doGet(final SlingHttpServletRequest req,
                          final SlingHttpServletResponse resp) throws ServletException, IOException {
                	  String username = req.getParameter("user");
                      logger.info("username:::::::"+username);
                  }*/
                
                @Override
                protected void doPost(final SlingHttpServletRequest request,
                                                final SlingHttpServletResponse response) throws ServletException,
                                                IOException {
                                String username = request.getParameter("user");
                                logger.info("username::INSIDE post:::::"+username);
                                   }
                                                                  

                               
                }

