package com.server.pollingapp.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.server.pollingapp.request.LoginRequest;
import com.server.pollingapp.request.RegistrationRequest;
import com.server.pollingapp.response.LoginResponse;
import com.server.pollingapp.response.RegistrationResponse;
import com.server.pollingapp.service.UserAuthenticationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

/**
 * @author Jos Wambugu
 * @since 13-04-2021
 * @apiNote <p>
 *     All Authentication Endpoints should be placed here.
 * </p>
 */
@RestController
public class AuthController {

    @Autowired
    UserAuthenticationService userAuthenticationService;


    @PostMapping(value = "/api/v1/auth/signup",produces = MediaType.APPLICATION_JSON_VALUE,consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<RegistrationResponse> signUpUser(@RequestBody @Valid RegistrationRequest registrationRequest, BindingResult bindingResult){
       //IF INPUT HAS ERRORS WHICH IT SHOULDN'T CAUSE FRONTEND VALIDATED JUST RETURN THIS
        if(bindingResult.hasErrors()){
            RegistrationResponse response=new RegistrationResponse();
            response.setMessage("Please Check Your Details Again");
            response.setError(true);
            return ResponseEntity.badRequest().body(response);
        }
        //IF EVERYTHING IS OKAY,PROCEED TO NEXT STAGE
        return userAuthenticationService.RegisterUser(registrationRequest);

    }
    @PostMapping(value = "/api/v1/auth/signin",produces = MediaType.APPLICATION_JSON_VALUE,consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<LoginResponse> signInUser(@RequestBody @Valid LoginRequest loginRequest,BindingResult bindingResult){
        //IF INPUT HAS ERRORS WHICH IT SHOULDN'T CAUSE FRONTEND VALIDATED JUST RETURN THIS
        if (bindingResult.hasErrors()){
            LoginResponse loginResponse=new LoginResponse();
            loginResponse.setToken(null);
            loginResponse.setMessage("Please Check Your Details Again");
            loginResponse.setError(true);
            return ResponseEntity.badRequest().body(loginResponse);
        }
        return userAuthenticationService.LoginUser(loginRequest);

    }

}
