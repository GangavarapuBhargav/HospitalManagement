package com.klef.fsd.sdp.service;

import com.klef.fsd.sdp.model.Customer;

public interface CustomerService {
  public String customerregistration(Customer customer);
  public Customer checkcustomerlogin(String username, String password);
}
