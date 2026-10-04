package com.foodshare.model;

import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonIgnore;
import java.time.LocalDateTime;

@Entity @Table(name="users")
public class User {
    @Id @GeneratedValue(strategy=GenerationType.IDENTITY) private Integer id;
    @Column(name="full_name", nullable=false, length=100) private String fullName;
    // Older local databases may still have a required `name` column. Keep it
    // populated while Hibernate's update strategy preserves that legacy schema.
    @Column(name="name", length=100) private String legacyName;
    @Column(nullable=false, unique=true, length=100) private String email;
    @Column(length=20) private String phone;
    @JsonIgnore @Column(nullable=false) private String password;
    // Older local databases may still require `password_hash` as well.
    @JsonIgnore @Column(name="password_hash", length=255) private String legacyPasswordHash;
    @Column(nullable=false, length=20) private String role;
    @Column(length=150) private String location;
    @Column(name="created_at", insertable=false, updatable=false) private LocalDateTime createdAt;
    public Integer getId(){return id;} public String getFullName(){return fullName;} public void setFullName(String v){fullName=v;legacyName=v;}
    public String getEmail(){return email;} public void setEmail(String v){email=v;} public String getPhone(){return phone;} public void setPhone(String v){phone=v;}
    public String getPassword(){return password;} public void setPassword(String v){password=v;legacyPasswordHash=v;} public String getRole(){return role;} public void setRole(String v){role=v;}
    public String getLocation(){return location;} public void setLocation(String v){location=v;} public LocalDateTime getCreatedAt(){return createdAt;}
}
