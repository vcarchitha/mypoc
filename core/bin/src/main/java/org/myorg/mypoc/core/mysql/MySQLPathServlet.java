package org.myorg.mypoc.core.mysql;

import java.io.IOException;

import javax.servlet.Servlet;
import javax.servlet.ServletException;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ValueMap;
import org.apache.sling.api.servlets.HttpConstants;
import org.apache.sling.api.servlets.SlingAllMethodsServlet;
import org.apache.sling.api.servlets.SlingSafeMethodsServlet;
import org.myorg.mypoc.core.servlets.CustomLoginServlet;
import org.osgi.framework.Constants;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Component(service=Servlet.class,
property={
	Constants.SERVICE_DESCRIPTION + "=My SQL Path Servlet",
	"sling.servlet.methods=" + HttpConstants.METHOD_POST,
	"sling.servlet.paths="+ "/bin/mypoc/mysql",
	"sling.servlet.extensions=" + "html"
})
public class MySQLPathServlet extends SlingAllMethodsServlet{

	private static final long serialVersionUid = 1L;
	private static final Logger logger = LoggerFactory
			.getLogger(MySQLPathServlet.class);
	@Reference
	private MySQLService mySQLService;
	
	@Override
	protected void doGet(final SlingHttpServletRequest req,
			final SlingHttpServletResponse resp) throws ServletException, IOException {
		logger.info("inside do get");
		final Resource resource = req.getResource();
		//resp.setContentType("text/plain");
		//resp.getWriter().write("Title = " + resource.adaptTo(ValueMap.class).get("jcr:title"));

	}


	@Override
	protected void doPost(final SlingHttpServletRequest request,
			final SlingHttpServletResponse response) throws ServletException,
			IOException {
		logger.info("inside do POST");
		boolean result=false;
		String firstName = request.getParameter("firstName");
		String lastName = request.getParameter("lastName");
		logger.info("username::INSIDE post:::::"+firstName);
		if(null!=mySQLService){
			logger.info("mySQLService is not null");
			result=mySQLService.insertFormData(firstName, lastName);
			
		}
		if(result){
			response.getWriter().write("data added to db ");	
			
		}else{
			response.getWriter().write("something went wrong");	
		}
	}




}