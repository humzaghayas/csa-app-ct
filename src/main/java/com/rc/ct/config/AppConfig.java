package com.rc.ct.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.commercetools.api.client.ByProjectKeyRequestBuilder;
import com.commercetools.api.defaultconfig.ApiFactory;
import com.commercetools.api.defaultconfig.ServiceRegion;

import io.sphere.sdk.client.SphereClient;
import io.sphere.sdk.client.SphereClientFactory;
import io.vrap.rmf.base.client.oauth2.ClientCredentials;
import org.springframework.web.client.RestTemplate;

import java.time.Duration;

/**
 * @author Muhammad Humza Ghayas This is config class for commercetools properties.
 */

@Configuration
@ConfigurationProperties
public class AppConfig {
	

	@Value("${ctp.authUrl}")
	private String authUrl;

	@Value("${ctp.apiUrl}")
	private String apiUrl;

	@Value("${ctp.projectKey}")
	private String projectKey;

	@Value("${ctp.clientId}")
	private String clientId;

	@Value("${ctp.clientSecret}")
	private String clientSecret;

	@Value("${ctp.scopes}")
	private String scopes;
	
	@Value("${mirakl.url}")
	private String miraklUrl;
	
	@Value("${mirakl.front.key}")
	private String miraklFrontKey;

	@Value("${from.email}")
	private String fromEmail;

	@Value("${spring.sendgrid.apikey}")
	private String sendGridApiKey;

	@Value("${spring.order.confirmation.templateId}")
	private String sendGridTemplateId;

	@Value("${spring.order.confirmation.summary.templateId}")
	private String orderSendgridTemplateId;

	
	public String getAuthUrl() {
		return authUrl;
	}

	public void setAuthUrl(String authUrl) {
		this.authUrl = authUrl;
	}

	public String getApiUrl() {
		return apiUrl;
	}

	public void setApiUrl(String apiUrl) {
		this.apiUrl = apiUrl;
	}

	/**
	 * This method is for getting the projectKey.
	 */
	public String getProjectKey() {
		return projectKey;
	}

	/**
	 * This method is for setting the projectKey.
	 */
	public void setProjectKey(String projectKey) {
		this.projectKey = projectKey;
	}

	/**
	 * This method is for getting the clientId.
	 */
	public String getClientId() {
		return clientId;
	}

	/**
	 * This method is for setting the clientId.
	 */
	public void setClientId(String clientId) {
		this.clientId = clientId;
	}

	/**
	 * This method is for getting the clientSecret.
	 */
	public String getClientSecret() {
		return clientSecret;
	}

	/**
	 * This method is for setting the clientSecret.
	 */
	public void setClientSecret(String clientSecret) {
		this.clientSecret = clientSecret;
	}

	/**
	 * This method is for getting the scopes.
	 */
	public String getScopes() {
		return scopes;
	}

	/**
	 * This method is for setting the scopes.
	 */
	public void setScopes(String scopes) {
		this.scopes = scopes;
	}

	public String getMiraklUrl() {
		return miraklUrl;
	}

	public void setMiraklUrl(String miraklUrl) {
		this.miraklUrl = miraklUrl;
	}

	public String getMirklFrontKey() {
		return miraklFrontKey;
	}

	public void setMirklFrontKey(String mirklFrontKey) {
		this.miraklFrontKey = mirklFrontKey;
	}

	public String getFromEmail(){
		return fromEmail;
	}
	public String getSendGridApiKey(){
		return sendGridApiKey;
	}
	public String getSendGridTemplateId(){
		return sendGridTemplateId;
	}
	public String getOrderSendgridTemplateId() { return orderSendgridTemplateId; }

	
	/**
	 * This method is for getting the request builder object.
	 */
	@Bean(name = "ctAdminRequestBuilder")
	public ByProjectKeyRequestBuilder getCTAdminRequestBuilder() {
		return ApiFactory.create(
				ClientCredentials.of().withClientId(clientId).withClientSecret(clientSecret).withScopes(scopes).build(),
				ServiceRegion.GCP_US_CENTRAL1.getOAuthTokenUrl(),
				ServiceRegion.GCP_US_CENTRAL1.getApiUrl()).withProjectKey(projectKey);
	} // end of getCTAdminRequestBuilder();

}
