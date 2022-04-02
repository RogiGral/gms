package com.gymsystem.gms.repository;


import com.gymsystem.gms.model.MembershipType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MembershipTypeRepository extends JpaRepository<MembershipType,Long> {
    MembershipType findMembershipTypeByNameAndPriceAndMonthlyPayment(String name, Long price, Integer monthlyPayment);
    MembershipType findMembershipTypeByName(String name);
    MembershipType findMembershipTypeById(Long membershipTypeId);
}
