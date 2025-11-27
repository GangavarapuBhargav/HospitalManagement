package com.klef.fsd.sdp.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.klef.fsd.sdp.model.Customer;

public interface CustomerRepository extends JpaRepository<Customer, Integer> {
    public Customer findByEmailAndPassword(String email, String password); 
}
