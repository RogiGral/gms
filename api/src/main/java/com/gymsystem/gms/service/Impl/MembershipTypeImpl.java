package com.gymsystem.gms.service.Impl;

import com.gymsystem.gms.exceptions.model.MembershipTypeExistException;
import com.gymsystem.gms.exceptions.model.MembershipTypeNotFoundException;
import com.gymsystem.gms.model.MembershipType;
import com.gymsystem.gms.repository.MembershipTypeRepository;
import com.gymsystem.gms.service.MembershipTypeService;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

import static com.gymsystem.gms.constraints.MembershipType.MEMBERSHIP_TYPE_ALREADY_EXISTS;
import static com.gymsystem.gms.constraints.MembershipType.MEMBERSHIP_TYPE_NOT_FOUND;

@Service
@Transactional
public class MembershipTypeImpl implements MembershipTypeService {

    MembershipTypeRepository membershipTypeRepository;

    @Override
    public List<MembershipType> getMembershipTypes() {
        return membershipTypeRepository.findAll();
    }

    @Override
    public MembershipType addMembershipType(String name, Long price, Integer monthlyPayment) throws MembershipTypeExistException {
        checkIfMembershipTypeExists(name,price,monthlyPayment);
        MembershipType membershipType = new MembershipType();
        membershipType.setName(name);
        membershipType.setPrice(price);
        membershipType.setMonthlyPayment(monthlyPayment);
        membershipTypeRepository.save(membershipType);
        return null;
    }

    @Override
    public MembershipType updateMembershipType(String oldName, String newName, Long newPrice, Integer newMonthlyPayment) throws MembershipTypeNotFoundException {
        MembershipType membershipType = findMembershipTypeByName(oldName);
        membershipType.setName(newName);
        membershipType.setPrice(newPrice);
        membershipType.setMonthlyPayment(newMonthlyPayment);
        membershipTypeRepository.save(membershipType);
        return membershipType;
    }

    @Override
    public MembershipType findMembershipTypeByName(String name) throws MembershipTypeNotFoundException {
        MembershipType membershipType = membershipTypeRepository.findMembershipTypeByName(name);
        if(membershipType ==  null){
            throw new MembershipTypeNotFoundException(MEMBERSHIP_TYPE_NOT_FOUND);
        }
        return membershipType;
    }

    @Override
    public void deleteMembershipType(Long id) {
        membershipTypeRepository.deleteById(id);
    }


    private void checkIfMembershipTypeExists(String name, Long price, Integer monthlyPayment) throws MembershipTypeExistException {
        MembershipType membershipType = membershipTypeRepository.findMembershipTypeByNameAndPriceAndMonthlyPayment(name,price,monthlyPayment);
        if(membershipType!=null){
            throw new MembershipTypeExistException(MEMBERSHIP_TYPE_ALREADY_EXISTS);
        }
    }
}
