package org.myorg.mypoc.core.recaptcha;

import org.osgi.service.metatype.annotations.AttributeDefinition;
import org.osgi.service.metatype.annotations.AttributeType;
import org.osgi.service.metatype.annotations.ObjectClassDefinition;

@ObjectClassDefinition(name = "GEU Captcha Service", description = "ReCaptcha verification service based on Google implementation")
public @interface ReCaptchaServiceConfiguration {
	
	@AttributeDefinition(name = "Private Key", defaultValue="6Ld5XGYUAAAAAE8Mza-h3yXEtzoXdIM5yqsr4nFo", type = AttributeType.STRING, description = "Private ReCaptcha Key")
	String privateKey();
	
	@AttributeDefinition(name = "Site Key", defaultValue="6Ld5XGYUAAAAAODE0H8lJRd4nvmHhWXg3khKUpXu", type = AttributeType.STRING, description = "Site ReCaptcha Key")
	String siteKey();
	
	@AttributeDefinition(name = "Verification URL", defaultValue="https://www.google.com/recaptcha/api/siteverify", type = AttributeType.STRING, description = "ReCaptcha Verification URL")
	String verificationURL();


}
