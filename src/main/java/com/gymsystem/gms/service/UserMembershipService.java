package com.gymsystem.gms.service;

import com.gymsystem.gms.exceptions.model.MembershipTypeNotFoundException;
import com.gymsystem.gms.exceptions.model.UserNotFoundException;
import com.gymsystem.gms.model.UserMembership;

import java.util.List;

public interface UserMembershipService {
    List<UserMembership> getAllUserMemberships();
    UserMembership getUserMembership(Long userId);
    UserMembership addUserMembership(Long userId, Long membershipTypeId) throws MembershipTypeNotFoundException, UserNotFoundException;
    void deleteUserMembership(Long userId);
}
