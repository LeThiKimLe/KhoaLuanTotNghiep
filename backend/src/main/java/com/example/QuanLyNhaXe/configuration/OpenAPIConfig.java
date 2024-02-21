package com.example.QuanLyNhaXe.configuration;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeIn;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeType;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.security.SecurityScheme;
import io.swagger.v3.oas.annotations.servers.Server;

@OpenAPIDefinition(
        info = @Info(
                contact =@Contact(
                        name = "Nguyễn Thị Cẩm Nguyên",
                        email = "20110315@student.hcmute.edu.vn"
                ),
                description = "Api documentation for Bus Ticket Booking Website",
                title = "Bus Ticket Booking Website",
                version = "1",
                termsOfService = "Term of Service"
        ),servers = {
                
        @Server (
                description = "LOCAL ENV",
                url = "http://localhost:5000/api"
        ),
        @Server (
                description = "DELOY ENV",
                //url = "http://xekimnguyenbackend-env.eba-m4ixemuy.us-east-1.elasticbeanstalk.com/"
                url = "http://xekimnguyen.us-east-1.elasticbeanstalk.com/api/"
        )
}
)
@SecurityScheme(
        name = "bearerAuth",
        description = "JWT auth description",
        scheme = "bearer",
        type = SecuritySchemeType.HTTP,
        bearerFormat = "JWT",
        in = SecuritySchemeIn.HEADER
)





public class OpenAPIConfig {

}
