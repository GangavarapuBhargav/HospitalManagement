package com.klef.fsd.sdp.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "custr_table")
public class Customer {

	  @Id
	  @GeneratedValue(strategy = GenerationType.IDENTITY)
	  @Column(name = "customer_id")
	  private int id;
	  
	  @Column(name = "customer_name", length = 50 , nullable = false)
	  private String name;
	  
	  @Column(name = "customer_email", length = 50, nullable = false , unique = true)
	  private String email;
	  
	  @Column(name = "customer_password", length = 50, nullable = false)
	  private String password;

	  @Column(name = "role", length = 20, nullable = false)
	  private String role;

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getRole() {
		return role;
	}
	public void setRole(String role) {
		this.role = role;
	}
	  
}
