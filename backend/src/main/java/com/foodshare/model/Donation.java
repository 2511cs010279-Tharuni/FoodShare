package com.foodshare.model;
import jakarta.persistence.*; import java.time.*;
@Entity @Table(name="donations")
public class Donation {
 @Id @GeneratedValue(strategy=GenerationType.IDENTITY) private Integer id;
 @ManyToOne(optional=false) @JoinColumn(name="donor_id",nullable=false) private User donor;
 @Column(name="food_name",nullable=false,length=100) private String foodName;
 @Column(length=500) private String description;
 @Column(nullable=false) private Integer quantity;
 @Column(nullable=false,length=150) private String location;
 @Column(name="pickup_date") private LocalDate pickupDate; @Column(name="pickup_time") private LocalTime pickupTime;
 @Column(length=30) private String status="AVAILABLE"; @Column(name="created_at",insertable=false,updatable=false) private LocalDateTime createdAt;
 public Integer getId(){return id;} public User getDonor(){return donor;} public void setDonor(User v){donor=v;} public String getFoodName(){return foodName;} public void setFoodName(String v){foodName=v;} public String getDescription(){return description;} public void setDescription(String v){description=v;} public Integer getQuantity(){return quantity;} public void setQuantity(Integer v){quantity=v;} public String getLocation(){return location;} public void setLocation(String v){location=v;} public LocalDate getPickupDate(){return pickupDate;} public void setPickupDate(LocalDate v){pickupDate=v;} public LocalTime getPickupTime(){return pickupTime;} public void setPickupTime(LocalTime v){pickupTime=v;} public String getStatus(){return status;} public void setStatus(String v){status=v;}
}
