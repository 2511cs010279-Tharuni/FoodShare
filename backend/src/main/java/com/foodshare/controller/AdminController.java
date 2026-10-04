package com.foodshare.controller;
import com.foodshare.repository.*;import org.springframework.web.bind.annotation.*;import java.util.*;
@RestController @RequestMapping("/api/admin") public class AdminController{
 private final UserRepository users;private final DonationRepository donations;private final RequestRepository requests;private final DeliveryRepository deliveries;public AdminController(UserRepository u,DonationRepository d,RequestRepository r,DeliveryRepository de){users=u;donations=d;requests=r;deliveries=de;}
 @GetMapping("/summary") public Map<String,Object> summary(){return Map.of("totalUsers",users.count(),"totalDonations",donations.count(),"totalRequests",requests.count(),"totalDeliveries",deliveries.count(),"users",users.findAll().stream().map(u->Map.of("name",u.getFullName(),"email",u.getEmail(),"role",u.getRole(),"location",u.getLocation()==null?"":u.getLocation())).toList(),"donations",donations.findAll(),"requests",requests.findAll(),"deliveries",deliveries.findAll());}
}
