package com.klef.fsd.sdp.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.klef.fsd.sdp.model.Appointment;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Long> {

    // You can add custom query methods if needed
    // Example: List<Appointment> findByDoctorId(String doctorId);

}
