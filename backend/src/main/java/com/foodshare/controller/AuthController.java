package com.foodshare.controller;
import com.foodshare.model.User; import com.foodshare.repository.UserRepository; import com.foodshare.service.AuthService; import org.springframework.http.*; import org.springframework.web.bind.annotation.*; import java.security.Principal; import java.util.*;
@RestController @RequestMapping("/api/auth") public class AuthController {
 private final AuthService auth;private final UserRepository users;public AuthController(AuthService a,UserRepository u){auth=a;users=u;}
 @PostMapping("/register") public ResponseEntity<?> register(@RequestBody Map<String,String> d){try{return ResponseEntity.ok(auth.register(d));}catch(Exception e){return ResponseEntity.badRequest().body(Map.of("message",e.getMessage()));}}
 @PostMapping("/login") public ResponseEntity<?> login(@RequestBody Map<String,String> d){try{return ResponseEntity.ok(auth.login(d));}catch(Exception e){return ResponseEntity.status(401).body(Map.of("message",e.getMessage()));}}
 @GetMapping("/me") public Object me(Principal p){return auth.safe(users.findByEmail(p.getName()).orElseThrow());}
}
