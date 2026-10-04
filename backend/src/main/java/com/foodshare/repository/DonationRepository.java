package com.foodshare.repository;
import com.foodshare.model.Donation; import org.springframework.data.jpa.repository.JpaRepository; import java.util.List;
public interface DonationRepository extends JpaRepository<Donation,Integer>{ List<Donation> findByDonorId(Integer id); List<Donation> findByStatus(String status); }
