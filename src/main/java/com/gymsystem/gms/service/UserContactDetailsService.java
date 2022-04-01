package com.gymsystem.gms.service;

import com.gymsystem.gms.model.UserContactDetails;

import java.util.List;

public interface UserContactDetailsService {
    List<UserContactDetails> getAllUserContactDetails();
    List<UserContactDetails> getAllUserContactDetails(Long userId);
    UserContactDetails addUserContactDetails(Long userId, String city, String street, String streetNumber, String flatNumber, String postCode, String phoneNumber);
    UserContactDetails updateUserContactDetails(Long userId, String newCity, String newStreet, String newStreetNumber, String newFlatNumber, String newPostCode, String newPhoneNumber);
    void deleteUserContactDetails(Long userId);
}
