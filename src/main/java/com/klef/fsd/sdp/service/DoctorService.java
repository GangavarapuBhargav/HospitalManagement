package com.klef.fsd.sdp.service;

import com.klef.fsd.sdp.model.Doctor;

public interface DoctorService {
    Doctor checkDoctorLogin(String email, String password);
}