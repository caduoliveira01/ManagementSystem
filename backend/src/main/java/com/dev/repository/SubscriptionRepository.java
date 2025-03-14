package com.dev.repository;

import com.dev.model.Subscription;
import com.dev.service.SubscriptionService;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SubscriptionRepository extends JpaRepository<Subscription,Long> {

    Subscription findByUserId(Long userId);
}
