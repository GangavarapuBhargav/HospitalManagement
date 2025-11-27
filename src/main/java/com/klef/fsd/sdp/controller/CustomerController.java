package com.klef.fsd.sdp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.klef.fsd.sdp.model.Customer;
import com.klef.fsd.sdp.service.CustomerService;

@RestController
@RequestMapping("/customer")
@CrossOrigin("*")
public class CustomerController {

	@Autowired
	private CustomerService customerService;
	
	@GetMapping("/")
	public String home() {
		return "Final project";
	}
	
	@PostMapping("/registration")
	   public ResponseEntity<String> customerregistration(@RequestBody Customer customer)
	   {
		   try
		   {
			  String output = customerService.customerregistration(customer);
			  return ResponseEntity.ok(output); // 200 - success
		   }
		   catch(Exception e)
		   {
  // return ResponseEntity.status(500).body("Registration failed: " + e.getMessage());
			   return ResponseEntity.status(500).body("Customer Registration failed");

		   }
	   }
	
	@PostMapping("/checkcustomerlogin")
	public ResponseEntity<?> checkcustomerlogin(@RequestBody Customer customer) 
	{
	    try 
	    {
	        Customer c = customerService.checkcustomerlogin(customer.getEmail(), customer.getPassword());

	        if (c != null) 
	        {
	            return ResponseEntity.ok(c); 
	        } 
	        else 
	        {
	            return ResponseEntity.status(401).body("Invalid Email or Password");
	        }
	    } 
	    catch (Exception e) 
	    {
	        return ResponseEntity.status(500).body("Login failed: " + e.getMessage());
	    }
	}
	
	
}
