package com.foodshare.service;
import com.foodshare.model.User; import com.foodshare.repository.UserRepository; import com.foodshare.security.JwtService; import org.springframework.security.crypto.password.PasswordEncoder; import org.springframework.stereotype.Service; import java.util.*;
@Service public class AuthService {
 private final UserRepository users; private final PasswordEncoder encoder; private final JwtService jwt;
 public AuthService(UserRepository users,PasswordEncoder encoder,JwtService jwt){this.users=users;this.encoder=encoder;this.jwt=jwt;}
 public Map<String,Object> register(Map<String,String> data){
  String name=value(data,"fullName").trim(), email=value(data,"email").trim().toLowerCase(), password=value(data,"password"), role=value(data,"role").trim().toUpperCase();
  if(name.isBlank()||email.isBlank()||password.isBlank())throw new IllegalArgumentException("Name, email and password are required.");
  if(!email.matches("^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$"))throw new IllegalArgumentException("Enter a valid email address.");
  if(password.length()<8)throw new IllegalArgumentException("Password must contain at least 8 characters.");
  if(!List.of("DONOR","NGO","VOLUNTEER").contains(role))throw new IllegalArgumentException("Choose DONOR, NGO or VOLUNTEER.");
  if(users.findByEmail(email).isPresent())throw new IllegalArgumentException("Email is already registered.");
  User u=new User();u.setFullName(name);u.setEmail(email);u.setPhone(data.get("phone"));u.setPassword(encoder.encode(password));u.setRole(role);u.setLocation(data.get("location"));users.save(u);return Map.of("message","Registration successful");
 }
 private String value(Map<String,String> data,String key){return data.getOrDefault(key,"")==null?"":data.get(key);}
 public Map<String,Object> login(Map<String,String> data){User u=users.findByEmail(data.getOrDefault("email","").trim().toLowerCase()).orElseThrow(()->new IllegalArgumentException("Incorrect email or password."));if(!encoder.matches(data.getOrDefault("password",""),u.getPassword()))throw new IllegalArgumentException("Incorrect email or password.");return Map.of("token",jwt.create(u.getEmail(),u.getRole()),"user",safe(u));}
 public Map<String,Object> safe(User u){return Map.of("id",u.getId(),"fullName",u.getFullName(),"email",u.getEmail(),"role",u.getRole(),"location",u.getLocation()==null?"":u.getLocation());}
}
