package com.klef.fsd.sdp.service;



import java.util.List;
import java.util.Optional;

import com.klef.fsd.sdp.model.Appointment;

public interface AppointmentService {

    Appointment bookAppointment(Appointment appointment);

    List<Appointment> getAllAppointments();

    Optional<Appointment> getAppointmentById(Long id);

    void deleteAppointment(Long id);

    List<Appointment> getAppointmentsByDoctorId(String doctorId);
}
