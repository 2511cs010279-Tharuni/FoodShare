package com.foodshare.repository;
import com.foodshare.model.Delivery; import org.springframework.data.jpa.repository.JpaRepository; import java.util.List;
public interface DeliveryRepository extends JpaRepository<Delivery,Integer>{ List<Delivery> findByVolunteerId(Integer id); boolean existsByRequestId(Integer id); }
