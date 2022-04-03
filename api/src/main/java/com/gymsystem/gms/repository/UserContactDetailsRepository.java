package com.gymsystem.gms.repository;


import com.gymsystem.gms.model.UserContactDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserContactDetailsRepository extends JpaRepository<UserContactDetails,Long> {

}
