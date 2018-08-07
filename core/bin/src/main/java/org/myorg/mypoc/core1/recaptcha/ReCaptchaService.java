package org.myorg.mypoc.core.recaptcha;

import org.apache.sling.api.SlingHttpServletRequest;

public interface ReCaptchaService {
	
	public boolean verify(SlingHttpServletRequest request);
    public String getSiteKey();
    
}
