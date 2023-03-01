package com.rc.spring;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = {"com.rc" , "org.openapitools.configuration"})
public class CTMirakleSprngBoot  {
	
	public static void main(String[] args) {
        SpringApplication.run(CTMirakleSprngBoot.class, args);
	}
}