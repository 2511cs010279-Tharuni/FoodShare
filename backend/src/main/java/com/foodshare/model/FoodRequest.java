package com.foodshare.model;
import jakarta.persistence.*; import java.time.LocalDateTime;
@Entity @Table(name="requests")
public class FoodRequest {
 @Id @GeneratedValue(strategy=GenerationType.IDENTITY) private Integer id;
 @ManyToOne(optional=false) @JoinColumn(name="donation_id",nullable=false) private Donation donation;
 @ManyToOne(optional=false) @JoinColumn(name="ngo_id",nullable=false) private User ngo;
 @Column(nullable=false) private Integer quantity; @Column(length=30) private String status="PENDING";
 @Column(name="created_at",insertable=false,updatable=false) private LocalDateTime createdAt;
 public Integer getId(){return id;} public Donation getDonation(){return donation;} public void setDonation(Donation v){donation=v;} public User getNgo(){return ngo;} public void setNgo(User v){ngo=v;} public Integer getQuantity(){return quantity;} public void setQuantity(Integer v){quantity=v;} public String getStatus(){return status;} public void setStatus(String v){status=v;}
}
