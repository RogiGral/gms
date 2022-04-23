package com.gymsystem.gms.controller;


import com.gymsystem.gms.exceptions.ExceptionHandling;
import com.gymsystem.gms.exceptions.model.*;
import com.gymsystem.gms.model.HttpResponse;
import com.gymsystem.gms.model.UserMembership;
import com.gymsystem.gms.service.UserMembershipService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static org.springframework.http.HttpStatus.OK;


@RestController
@RequestMapping(value ="/userMembership")
@AllArgsConstructor
public class UserMembershipController extends ExceptionHandling {

    @Autowired
    UserMembershipService userMembershipService;

    @PostMapping("/add")
    public ResponseEntity<UserMembership> assignUserToMembership(@RequestParam("username") String username,
                                                                 @RequestParam("membershipTypeName") String membershipTypeName) throws UserNotFoundException, UserMembershipException, MembershipTypeNotFoundException {
        UserMembership userMembership = userMembershipService.addUserMembership(username,membershipTypeName);
        return new ResponseEntity<>(userMembership, OK);
    }
    @GetMapping("/list")
    public ResponseEntity<UserMembership> getUserMembership(@RequestParam("username") String username) throws UserNotFoundException, UserMembershipException {
        UserMembership userMembership = userMembershipService.getUserMembership(username);
        return new ResponseEntity<>(userMembership, OK);
    }
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<HttpResponse> deleteUserMembership(@PathVariable("id") Long id) throws UserNotFoundException {
        userMembershipService.deleteUserMembership(id);
        return response(OK, "USER_MEMBERSHIP_DELETED");
    }

    private ResponseEntity<HttpResponse> response(HttpStatus httpStatus, String message) {
        return new ResponseEntity<>(new HttpResponse(httpStatus.value(), httpStatus, httpStatus.getReasonPhrase().toUpperCase(),
                message), httpStatus);
    }


}
