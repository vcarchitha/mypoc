package org.myorg.mypoc.core.mysql;

import java.io.IOException;

import javax.servlet.Servlet;
import javax.servlet.ServletException;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ValueMap;
import org.apache.sling.api.servlets.HttpConstants;
import org.apache.sling.api.servlets.SlingSafeMethodsServlet;
import org.myorg.mypoc.core.servlets.CustomLoginServlet;
import org.osgi.framework.Constants;
import org.osgi.service.component.annotations.Component;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Component(service=Servlet.class,
property={
	Constants.SERVICE_DESCRIPTION + "=My SQL Servlet",
	"sling.servlet.methods=" + HttpConstants.METHOD_GET,
	"sling.servlet.resourceTypes="+ "/mypoc/components/content/mysql",
	"sling.servlet.extensions=" + "html"
})
public class MySQLResourceServlet extends SlingSafeMethodsServlet {

	private static final long serialVersionUid = 1L;
    private static final Logger logger = LoggerFactory
            .getLogger(MySQLResourceServlet.class);
	@Override
	protected void doGet(final SlingHttpServletRequest req,
			final SlingHttpServletResponse resp) throws ServletException, IOException {
		 logger.info("inside do get");
		final Resource resource = req.getResource();
		 logger.info("resource::INSIDE get:::::"+resource.getPath());
		   String firstName = req.getParameter("firstName");
           logger.info("firstName::INSIDE get:::::"+firstName);
		//resp.setContentType("text/plain");
		//resp.getWriter().write("Title = " + resource.adaptTo(ValueMap.class).get("jcr:title"));

	}}