package org.myorg.mypoc.core.models;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import javax.annotation.PostConstruct;
import javax.inject.Inject;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.ValueMap;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ScriptVariable;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


/**
 * @author aimen.sania
 * 
 */
@Model(adaptables = SlingHttpServletRequest.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class NewCarouselModel {

	private String[] queryParameter;
	private String[] quickLinks;

	@ScriptVariable
	private ValueMap properties;

	@Inject
	private SlingHttpServletRequest request;

	private List<String> imagePathItems;


	protected final static Logger log = LoggerFactory
			.getLogger(NewCarouselModel.class);

	@PostConstruct
	protected void init() {

		this.queryParameter = this.properties.get("queryParameter",
				String[].class);
		log.info("queryParameter:::::" + Arrays.toString(this.queryParameter));
		this.quickLinks = this.properties.get("quickLinks", String[].class);
		log.info("quickLinks::::::::::" + Arrays.toString(this.quickLinks));
		String parameter = request.getParameter("param");
		log.info("url::::::" + request.getParameter("param"));
		JSONParser jsnobject = new JSONParser();

		if (parameter != null) {
			for (String value : queryParameter) {
				try {
					JSONObject json = (JSONObject) jsnobject.parse(value);
					String param = (String) json.get("queryParameter");
					log.info("param::::::" + param);
					log.info("parameter::::::" + parameter);

					if (param.equals(parameter)) {
						JSONArray jsonArray = (JSONArray) json.get("imagePath");
						log.info("jsonArray.size():::::::::::::::::::"
								+ jsonArray.size());
						imagePathItems = new ArrayList<String>();
						for (int i = 0; i < jsonArray.size(); i++) {
							log.info("imagePath::::::" + jsonArray.get(i));
							String imagePath = jsonArray.get(i).toString();
							log.info("imagePathafter::::::" + imagePath);
							JSONObject json1 = (JSONObject) jsnobject
									.parse(jsonArray.get(i).toString());
							String param1 = json1.get("imagePath").toString();
							log.info("dgfgfdgfdgdgd::::::::::::::::::" + param1);
							imagePathItems.add(param1);
						}
						break;
					}
				} catch (ParseException e) {

					e.printStackTrace();
				}
			}
		}

		if (imagePathItems == null) {
			imagePathItems = new ArrayList<String>();
			for (String value : quickLinks) {
				JSONObject json;
				try {
					json = (JSONObject) jsnobject.parse(value);
					String param = json.get("label").toString();
					imagePathItems.add(param);
				} catch (ParseException e) {
					e.printStackTrace();
				}
			}
		}
	}

	public List<String> getImagePathItems() {
		return imagePathItems;
	}

	public String[] getQueryParameter() {
		return queryParameter;
	}

}
