package com.klef.fsd.sdp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.klef.fsd.sdp.model.Doctor;
import com.klef.fsd.sdp.repository.DoctorRepository;

@Service
public class DoctorServiceImpl implements DoctorService {

    @Autowired
    private DoctorRepository doctorRepository;

    @Override
    public Doctor checkDoctorLogin(String email, String password) {
        return doctorRepository.findByEmailAndPassword(email, password);
    }
}