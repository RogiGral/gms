package com.gymsystem.gms.service;

import com.gymsystem.gms.exceptions.model.MembershipTypeNotFoundException;
import com.gymsystem.gms.exceptions.model.UserMembershipException;
import com.gymsystem.gms.exceptions.model.UserNotFoundException;
import com.gymsystem.gms.model.UserMembership;

public interface UserMembershipService {
    UserMembership getUserMembership(String username) throws UserNotFoundException, UserMembershipException;
    UserMembership addUserMembership(String username, String membershipTypeName) throws MembershipTypeNotFoundException, UserNotFoundException, UserMembershipException;
    void deleteUserMembership(Long userId) throws UserNotFoundException;
}
