package com.gymsystem.gms.service.Impl;

import com.gymsystem.gms.model.UserContactDetails;
import com.gymsystem.gms.service.UserContactDetailsService;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
public class UserContactDetailsImpl implements UserContactDetailsService {
    @Override
    public List<UserContactDetails> getAllUserContactDetails() {
        return null;
    }

    @Override
    public List<UserContactDetails> getAllUserContactDetails(Long userId) {
        return null;
    }

    @Override
    public UserContactDetails addUserContactDetails(String username, String city, String street, String streetNumber, String flatNumber, String postCode, String phoneNumber) {
        return null;
    }

    @Override
    public UserContactDetails updateUserContactDetails(String username, String newCity, String newStreet, String newStreetNumber, String newFlatNumber, String newPostCode, String newPhoneNumber) {
        return null;
    }

    @Override
    public void deleteUserContactDetails(Long userId) {

    }
}
