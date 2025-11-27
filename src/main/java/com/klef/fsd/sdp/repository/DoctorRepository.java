package com.klef.fsd.sdp.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.klef.fsd.sdp.model.Doctor;

public interface DoctorRepository extends JpaRepository<Doctor, Integer> {
    Doctor findByEmailAndPassword(String email, String password);
}