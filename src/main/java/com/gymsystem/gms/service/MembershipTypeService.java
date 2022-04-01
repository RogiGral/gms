package com.gymsystem.gms.service;

import com.gymsystem.gms.exceptions.model.MembershipTypeExistException;
import com.gymsystem.gms.exceptions.model.MembershipTypeNotFoundException;
import com.gymsystem.gms.model.MembershipType;

import java.util.List;

public interface MembershipTypeService {
    List<MembershipType> getMembershipTypes();
    MembershipType addMembershipType(String name, Long price, Integer monthlyPayment) throws MembershipTypeExistException;
    MembershipType updateMembershipType(String oldName,String newName, Long newPrice, Integer newMonthlyPayment) throws MembershipTypeNotFoundException;
    MembershipType findMembershipTypeByName(String name) throws MembershipTypeNotFoundException;
    void deleteMembershipType(Long id);
}
