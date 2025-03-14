package com.dev.service;

import com.dev.model.PlanType;
import com.dev.model.Subscription;
import com.dev.model.User;

public interface SubscriptionService {

    Subscription createSubscription (User user);

    Subscription getUserSubscription (Long userId) throws Exception;

    Subscription upgradeSubscription(Long userId, PlanType planType);

    boolean isValid(Subscription subscription);
}
