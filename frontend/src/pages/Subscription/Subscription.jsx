import React from "react";
import SubscriptionCard from "./SubscriptionCard";

const paidPlan = ["test paid", "just example"];
const annualPlan = ["test annual", "just example"];
const freePlan = ["test free", "just example"];

const Subscription = () => {
  return (
    <div className="p-10">
      <h1 className="font-semibold py-5 text-5xl pb-16 text-center">Pricing</h1>
      <div className="flex flex-col lg:flex-row justify-center items-center gap-9">
        <SubscriptionCard
          data={{
            planName: "Free",
            fetures: freePlan,
            planType: "FREE",
            price: 0,
            buttonName: true ? "Current plan" : "Get Started",
          }}
        />
        <SubscriptionCard
          data={{
            planName: "Monthly Paid Plan",
            fetures: paidPlan,
            planType: "MONTHLY",
            price: 799,
            buttonName: true ? "Current plan" : "Get Started",
          }}
        />
        <SubscriptionCard
          data={{
            planName: "Anuual Paid Plan",
            fetures: annualPlan,
            planType: "ANNUALLY",
            price: 6999,
            buttonName: true ? "Current plan" : "Get Started",
          }}
        />
      </div>
    </div>
  );
};

export default Subscription;
