package com.foodshare.repository;
import com.foodshare.model.FoodRequest; import org.springframework.data.jpa.repository.JpaRepository; import java.util.List;
public interface RequestRepository extends JpaRepository<FoodRequest,Integer>{ List<FoodRequest> findByNgoId(Integer id); }
