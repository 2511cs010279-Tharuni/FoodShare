package com.foodshare.model;
import jakarta.persistence.*; import java.time.LocalDateTime;
@Entity @Table(name="deliveries")
public class Delivery {
 @Id @GeneratedValue(strategy=GenerationType.IDENTITY) private Integer id;
 @ManyToOne(optional=false) @JoinColumn(name="request_id",nullable=false) private FoodRequest request;
 @ManyToOne @JoinColumn(name="volunteer_id") private User volunteer;
 @Column(length=30) private String status="ASSIGNED"; @Column(name="created_at",insertable=false,updatable=false) private LocalDateTime createdAt;
 public Integer getId(){return id;} public FoodRequest getRequest(){return request;} public void setRequest(FoodRequest v){request=v;} public User getVolunteer(){return volunteer;} public void setVolunteer(User v){volunteer=v;} public String getStatus(){return status;} public void setStatus(String v){status=v;}
}
