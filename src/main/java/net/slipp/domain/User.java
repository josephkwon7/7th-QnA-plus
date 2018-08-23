package net.slipp.domain;

import javax.persistence.Column;
import javax.persistence.Entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

@Entity
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"}) //this is required to avoid serializaiton related error.
public class User extends AbstractEntity {
	@Column(nullable=false, length=20, unique=true)
	@JsonProperty
	private String userId;
	
	private String password;
	
	@JsonProperty
	private String name;

	@JsonProperty
	private String email;

	public User() {
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public void setName(String name) {
		this.name = name;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public boolean matchPassword(String newPassword) {
		if (newPassword == null) {
			return false;
		}
		return newPassword.equals(password);
	}
	
	public String getUserId() {
		return userId;
	}
	
	public String getName() {
		return name;
	}
	
	public String getEmail() {
		return email;
	}
	
	public void update(User updatedUser) {
		this.password = updatedUser.password;
		this.name = updatedUser.name;
		this.email = updatedUser.email;
	}

	@Override
	public String toString() {
		return "User [" + super.toString() + ", userId=" + userId + ", password=" + password + ", name=" + name + ", email=" + email + "]";
	}

}
