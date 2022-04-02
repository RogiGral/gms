package com.gymsystem.gms.service.Impl;

import com.gymsystem.gms.exceptions.model.MembershipTypeNotFoundException;
import com.gymsystem.gms.exceptions.model.UserNotFoundException;
import com.gymsystem.gms.model.MembershipType;
import com.gymsystem.gms.model.User;
import com.gymsystem.gms.model.UserMembership;
import com.gymsystem.gms.repository.MembershipTypeRepository;
import com.gymsystem.gms.repository.UserMembershipRepository;
import com.gymsystem.gms.repository.UserRepository;
import com.gymsystem.gms.service.UserMembershipService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

import static com.gymsystem.gms.constraints.MembershipType.MEMBERSHIP_TYPE_NOT_FOUND;
import static com.gymsystem.gms.constraints.UserImplConstant.NO_USER_FOUND;

@Service
@Transactional
public class UserMembershipImpl implements UserMembershipService {

    UserMembershipRepository userMembershipRepository;
    UserRepository userRepository;
    MembershipTypeRepository membershipTypeRepository;

    @Override
    public List<UserMembership> getAllUserMemberships() {
        return userMembershipRepository.findAll();
    }

    @Override
    public UserMembership getUserMembership(Long userId) {
        return userMembershipRepository.getUserMembershipByUserId(userId);
    }

    @Override
    public UserMembership addUserMembership(Long userId, Long membershipTypeId) throws MembershipTypeNotFoundException, UserNotFoundException {
        checkIfUserExist(userId);
        checkIfMembershipTypeExist(membershipTypeId);
        User user = userRepository.findUserById(userId);
        MembershipType membershipType = membershipTypeRepository.findMembershipTypeById(membershipTypeId);
        UserMembership userMembership = new UserMembership();
        userMembership.setUserId(user);
        userMembership.setMembershipTypeId(membershipType);
        userMembershipRepository.save(userMembership);
        return userMembership;
    }

    private void checkIfMembershipTypeExist(Long membershipTypeId) throws MembershipTypeNotFoundException {
        MembershipType membershipType = membershipTypeRepository.findMembershipTypeById(membershipTypeId);
        if(membershipType == null){
            throw new MembershipTypeNotFoundException(MEMBERSHIP_TYPE_NOT_FOUND);
        }
    }

    private void checkIfUserExist(Long userId) throws UserNotFoundException {
        User user = userRepository.findUserById(userId);
        if(user ==  null){
            throw new UserNotFoundException(NO_USER_FOUND);
        }
    }

    @Override
    public void deleteUserMembership(Long userId) {
        userMembershipRepository.deleteUserMembershipByUserId(userId);
    }
}
