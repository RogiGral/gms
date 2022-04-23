package com.gymsystem.gms.service.Impl;

import com.gymsystem.gms.exceptions.model.MembershipTypeNotFoundException;
import com.gymsystem.gms.exceptions.model.UserMembershipException;
import com.gymsystem.gms.exceptions.model.UserNotFoundException;
import com.gymsystem.gms.model.MembershipType;
import com.gymsystem.gms.model.User;
import com.gymsystem.gms.model.UserMembership;
import com.gymsystem.gms.repository.MembershipTypeRepository;
import com.gymsystem.gms.repository.UserMembershipRepository;
import com.gymsystem.gms.repository.UserRepository;
import com.gymsystem.gms.service.UserMembershipService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

import static com.gymsystem.gms.constraints.MembershipType.*;
import static com.gymsystem.gms.constraints.UserImplConstant.NO_USER_FOUND;

@Service
@Transactional
public class UserMembershipImpl implements UserMembershipService {

    UserMembershipRepository userMembershipRepository;
    UserRepository userRepository;
    MembershipTypeRepository membershipTypeRepository;

    @Autowired
    public UserMembershipImpl(UserMembershipRepository userMembershipRepository, UserRepository userRepository, MembershipTypeRepository membershipTypeRepository) {
        this.userMembershipRepository = userMembershipRepository;
        this.userRepository = userRepository;
        this.membershipTypeRepository = membershipTypeRepository;
    }


    @Override
    public UserMembership getUserMembership(String username) throws UserNotFoundException, UserMembershipException {
        User user = checkIfUserExist(username);
        if(user == null){
            throw new UserNotFoundException(NO_USER_FOUND+"by username "+username);
        }
        UserMembership userMembership = userMembershipRepository.getUserMembershipByUserId(user);
        if(userMembership == null){
            throw new UserMembershipException(USER_HAS_NO_MEMBERSHIP);
        }
        return userMembership;
    }

    @Override
    public UserMembership addUserMembership(String username, String membershipTypeName) throws MembershipTypeNotFoundException, UserNotFoundException, UserMembershipException {
        User user = checkIfUserExist(username);
        MembershipType membershipType = checkIfMembershipTypeExist(membershipTypeName);
        checkIfUserHasMembership(user);
        UserMembership userMembership = new UserMembership();
        userMembership.setUserId(user);
        userMembership.setMembershipTypeId(membershipType);
        userMembershipRepository.save(userMembership);
        return userMembership;
    }

    @Override
    public void deleteUserMembership(Long userId) throws UserNotFoundException {
        User user = userRepository.findUserById(userId);
        if(user ==  null){
            throw new UserNotFoundException(NO_USER_FOUND);
        }
        userMembershipRepository.deleteUserMembershipByUserId(user);
    }

    private MembershipType checkIfMembershipTypeExist(String membershipTypeName) throws MembershipTypeNotFoundException {
        MembershipType membershipType = membershipTypeRepository.findMembershipTypeByName(membershipTypeName);
        if(membershipType == null){
            throw new MembershipTypeNotFoundException(MEMBERSHIP_TYPE_NOT_FOUND);
        }
        return membershipType;
    }

    private User checkIfUserExist(String username) throws UserNotFoundException {
        User user = userRepository.findUserByUsername(username);
        if(user ==  null){
            throw new UserNotFoundException(NO_USER_FOUND);
        }
        return user;
    }

    private void checkIfUserHasMembership(User user) throws UserMembershipException {
        UserMembership userMembership = userMembershipRepository.getUserMembershipByUserId(user);
        if(userMembership != null){
            throw new UserMembershipException(USER_ALREADY_HAS_MEMBERSHIP);
        }
    }

}
