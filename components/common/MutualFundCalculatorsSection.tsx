"use client";

import React, { useState, useId } from "react";
import {
  Calculator,
  Coins,
  Repeat,
  ArrowRightLeft,
  TrendingUp,
  Target,
  ArrowRight,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { Card } from "@/components/common/Card";
import { Button } from "@/components/common/Button";
import { motion, AnimatePresence } from "framer-motion";

export type CalculatorType =
  | "sip"
  | "lumpsum"
  | "swp"
  | "stp"
  | "sip-topup"
  | "goal-lumpsum";

interface CalculatorMeta {
  id: CalculatorType;
  name: string;
  shortName: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  badge: string;
}

const CALCULATORS: CalculatorMeta[] = [
  {
    id: "sip",
    name: "SIP Calculator",
    shortName: "SIP",
    description: "Calculate expected returns on your monthly Systematic Investment Plans.",
    icon: Calculator,
    badge: "Monthly Savings",
  },
  {
    id: "lumpsum",
    name: "Lumpsum Calculator",
    shortName: "Lumpsum",
    description: "Calculate expected wealth growth on one-time lump sum investments.",
    icon: Coins,
    badge: "One-Time",
  },
  {
    id: "swp",
    name: "SWP Calculator",
    shortName: "SWP",
    description: "Calculate regular monthly income and remaining balance via Systematic Withdrawal.",
    icon: Repeat,
    badge: "Monthly Income",
  },
  {
    id: "stp",
    name: "STP Calculator",
    shortName: "STP",
    description: "Calculate returns when systematically transferring funds from liquid to equity.",
    icon: ArrowRightLeft,
    badge: "Fund Transfer",
  },
  {
    id: "sip-topup",
    name: "SIP Top-Up Calculator",
    shortName: "SIP Top-Up",
    description: "Calculate returns with annual step-up increases in your monthly SIP.",
    icon: TrendingUp,
    badge: "Annual Step-Up",
  },
  {
    id: "goal-lumpsum",
    name: "Goal-Based Lumpsum Calculator",
    shortName: "Goal Lumpsum",
    description: "Calculate the exact one-time investment needed to achieve your target goal.",
    icon: Target,
    badge: "Goal Planning",
  },
];

// Helper formatters
function formatINR(val: number): string {
  if (isNaN(val) || val === null || val === undefined) return "₹0";
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Math.round(val));
}

function numberToWordsINR(amount: number): string {
  if (!amount || isNaN(amount)) return "";
  if (amount >= 10000000) {
    const cr = (amount / 10000000).toFixed(2);
    return `(${cr} Crores)`;
  }
  if (amount >= 100000) {
    const lakh = (amount / 100000).toFixed(2);
    return `(${lakh} Lakhs)`;
  }
  if (amount >= 1000) {
    const k = (amount / 1000).toFixed(1);
    return `(${k} Thousand)`;
  }
  return "";
}

export function MutualFundCalculatorsSection() {
  const [activeTab, setActiveTab] = useState<CalculatorType>("sip");
  const [showInteractiveEngine, setShowInteractiveEngine] = useState(false);

  // Form input states
  // 1. SIP
  const [sipMonthly, setSipMonthly] = useState(25000);
  const [sipYears, setSipYears] = useState(10);
  const [sipRate, setSipRate] = useState(12);

  // 2. Lumpsum
  const [lumpsumAmount, setLumpsumAmount] = useState(500000);
  const [lumpsumYears, setLumpsumYears] = useState(10);
  const [lumpsumRate, setLumpsumRate] = useState(12);

  // 3. SWP
  const [swpInvestment, setSwpInvestment] = useState(1000000);
  const [swpWithdrawal, setSwpWithdrawal] = useState(8000);
  const [swpYears, setSwpYears] = useState(10);
  const [swpRate, setSwpRate] = useState(9);

  // 4. STP
  const [stpSourceAmount, setStpSourceAmount] = useState(1000000);
  const [stpMonthlyTransfer, setStpMonthlyTransfer] = useState(20000);
  const [stpYears, setStpYears] = useState(5);
  const [stpSourceRate, setStpSourceRate] = useState(6);
  const [stpTargetRate, setStpTargetRate] = useState(12);

  // 5. SIP Top-Up
  const [topupMonthly, setTopupMonthly] = useState(20000);
  const [topupPercentage, setTopupPercentage] = useState(10);
  const [topupYears, setTopupYears] = useState(10);
  const [topupRate, setTopupRate] = useState(12);

  // 6. Goal Lumpsum
  const [targetGoal, setTargetGoal] = useState(5000000);
  const [goalYears, setGoalYears] = useState(15);
  const [goalRate, setGoalRate] = useState(12);

  // Unique IDs for accessibility
  const sipMonthlyId = useId();
  const sipYearsId = useId();
  const sipRateId = useId();
  const lumpsumAmountId = useId();
  const lumpsumYearsId = useId();
  const lumpsumRateId = useId();
  const swpInvestmentId = useId();
  const swpWithdrawalId = useId();
  const swpYearsId = useId();
  const swpRateId = useId();
  const stpSourceAmountId = useId();
  const stpMonthlyTransferId = useId();
  const stpYearsId = useId();
  const stpSourceRateId = useId();
  const stpTargetRateId = useId();
  const topupMonthlyId = useId();
  const topupPercentageId = useId();
  const topupYearsId = useId();
  const topupRateId = useId();
  const targetGoalId = useId();
  const goalYearsId = useId();
  const goalRateId = useId();

  // Handle "Try Now" click
  const handleTryNow = (calcId: CalculatorType) => {
    setActiveTab(calcId);
    setShowInteractiveEngine(true);
    // Smooth scroll to interactive engine
    setTimeout(() => {
      const el = document.getElementById("interactive-calculator-engine");
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 50);
  };

  // Calculation Results
  const calculateResults = () => {
    switch (activeTab) {
      case "sip": {
        const i = sipRate / 12 / 100;
        const n = sipYears * 12;
        const totalInvested = sipMonthly * n;
        const fv = sipMonthly * (((Math.pow(1 + i, n) - 1) / i) * (1 + i));
        const totalGrowth = Math.max(0, fv - totalInvested);
        return {
          totalInvested,
          totalGrowth,
          totalFutureValue: fv,
          investedPct: fv > 0 ? (totalInvested / fv) * 100 : 50,
          growthPct: fv > 0 ? (totalGrowth / fv) * 100 : 50,
          investedLabel: "Total SIP Invested",
          growthLabel: "Total Expected Growth",
          futureLabel: "Total Future Value",
        };
      }
      case "lumpsum": {
        const fv = lumpsumAmount * Math.pow(1 + lumpsumRate / 100, lumpsumYears);
        const totalInvested = lumpsumAmount;
        const totalGrowth = Math.max(0, fv - totalInvested);
        return {
          totalInvested,
          totalGrowth,
          totalFutureValue: fv,
          investedPct: fv > 0 ? (totalInvested / fv) * 100 : 50,
          growthPct: fv > 0 ? (totalGrowth / fv) * 100 : 50,
          investedLabel: "Total One-Time Investment",
          growthLabel: "Total Wealth Growth",
          futureLabel: "Estimated Future Corpus",
        };
      }
      case "swp": {
        const i = swpRate / 12 / 100;
        const n = swpYears * 12;
        let balance = swpInvestment;
        let totalWithdrawn = 0;

        for (let month = 0; month < n; month++) {
          balance = balance * (1 + i);
          const withdrawal = Math.min(balance, swpWithdrawal);
          balance -= withdrawal;
          totalWithdrawn += withdrawal;
        }

        const finalBalance = Math.max(0, balance);
        const totalValue = totalWithdrawn + finalBalance;

        return {
          totalInvested: swpInvestment,
          totalGrowth: totalWithdrawn,
          totalFutureValue: finalBalance,
          investedPct: totalValue > 0 ? (swpInvestment / totalValue) * 100 : 50,
          growthPct: totalValue > 0 ? (totalWithdrawn / totalValue) * 100 : 50,
          investedLabel: "Initial Principal Corpus",
          growthLabel: "Total SWP Amount Withdrawn",
          futureLabel: "Remaining Corpus Balance",
        };
      }
      case "stp": {
        const n = stpYears * 12;
        const iSource = stpSourceRate / 12 / 100;
        const iTarget = stpTargetRate / 12 / 100;

        let sourceBal = stpSourceAmount;
        let targetBal = 0;

        for (let m = 0; m < n; m++) {
          sourceBal = sourceBal * (1 + iSource);
          const transfer = Math.min(sourceBal, stpMonthlyTransfer);
          sourceBal -= transfer;

          targetBal = (targetBal + transfer) * (1 + iTarget);
        }

        const totalConsolidated = sourceBal + targetBal;
        const totalGrowth = Math.max(0, totalConsolidated - stpSourceAmount);

        return {
          totalInvested: stpSourceAmount,
          totalGrowth: totalGrowth,
          totalFutureValue: totalConsolidated,
          investedPct: totalConsolidated > 0 ? (stpSourceAmount / totalConsolidated) * 100 : 50,
          growthPct: totalConsolidated > 0 ? (totalGrowth / totalConsolidated) * 100 : 50,
          investedLabel: "Total Initial Transferring Fund",
          growthLabel: "Net Yield & Growth",
          futureLabel: "Total Consolidated Portfolio Value",
        };
      }
      case "sip-topup": {
        const i = topupRate / 12 / 100;
        let currentMonthly = topupMonthly;
        let totalInvested = 0;
        let fv = 0;

        for (let yr = 0; yr < topupYears; yr++) {
          for (let m = 0; m < 12; m++) {
            totalInvested += currentMonthly;
            fv = (fv + currentMonthly) * (1 + i);
          }
          currentMonthly = currentMonthly * (1 + topupPercentage / 100);
        }

        const totalGrowth = Math.max(0, fv - totalInvested);

        return {
          totalInvested,
          totalGrowth,
          totalFutureValue: fv,
          investedPct: fv > 0 ? (totalInvested / fv) * 100 : 50,
          growthPct: fv > 0 ? (totalGrowth / fv) * 100 : 50,
          investedLabel: "Total Step-Up Amount Invested",
          growthLabel: "Total Accelerated Growth",
          futureLabel: "Total Accumulated Corpus",
        };
      }
      case "goal-lumpsum": {
        const requiredLumpsum =
          targetGoal / Math.pow(1 + goalRate / 100, goalYears);
        const estimatedGrowth = Math.max(0, targetGoal - requiredLumpsum);

        return {
          totalInvested: requiredLumpsum,
          totalGrowth: estimatedGrowth,
          totalFutureValue: targetGoal,
          investedPct: targetGoal > 0 ? (requiredLumpsum / targetGoal) * 100 : 50,
          growthPct: targetGoal > 0 ? (estimatedGrowth / targetGoal) * 100 : 50,
          investedLabel: "Required One-Time Investment",
          growthLabel: "Expected Returns Growth",
          futureLabel: "Target Financial Goal Amount",
        };
      }
    }
  };

  const results = calculateResults();

  return (
    <section className="py-20 md:py-28 bg-neutral-50/60 border-b border-neutral-200/80 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-12 text-center">
        {/* Section Header */}
        <div className="flex flex-col gap-3 max-w-3xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-600 flex items-center justify-center gap-1.5">
            <Sparkles className="h-4 w-4 text-emerald-600" />
            MUTUAL FUND CALCULATORS
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-navy-900 leading-tight">
            Plan Your Financial Future with Precision
          </h2>
          <p className="text-sm md:text-base text-neutral-500 font-body leading-relaxed">
            These calculators swiftly compute wealth projections and provide accurate estimates
            with interactive inputs to help you make informed investment decisions.
          </p>
        </div>

        {/* 6 Calculator Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
          {CALCULATORS.map((calc, index) => {
            const IconComponent = calc.icon;
            return (
              <Card
                key={calc.id}
                variant="resting"
                hoverEffect
                animateReveal
                delay={index * 0.08}
                className="flex flex-col justify-between p-6 sm:p-7 border-neutral-200/80 rounded-2xl bg-white group hover:border-blue-500/30 transition-all duration-300 shadow-sm"
              >
                <div className="flex flex-col gap-4">
                  {/* Icon & Category Badge */}
                  <div className="flex items-center justify-between">
                    <div className="h-12 w-12 rounded-xl bg-blue-50/80 border border-blue-100 flex items-center justify-center text-blue-600 group-hover:scale-105 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 shadow-xs">
                      <IconComponent className="h-6 w-6" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100/80">
                      {calc.badge}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <div className="flex flex-col gap-1.5 mt-1">
                    <h3 className="font-display font-bold text-lg text-navy-900 group-hover:text-blue-600 transition-colors">
                      {calc.name}
                    </h3>
                    <p className="text-xs text-neutral-500 font-body leading-relaxed font-light">
                      {calc.description}
                    </p>
                  </div>
                </div>

                {/* Try Now Button */}
                <div className="mt-6 pt-4 border-t border-neutral-100 flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-neutral-400 font-body">
                    Instant Simulation
                  </span>
                  <button
                    onClick={() => handleTryNow(calc.id)}
                    className="inline-flex items-center gap-2 text-xs font-bold text-blue-700 hover:text-blue-600 bg-blue-50/70 hover:bg-blue-100/80 px-4 py-2 rounded-xl border border-blue-200/60 transition-all duration-200 cursor-pointer group/btn"
                  >
                    <span>Try Now</span>
                    <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover/btn:translate-x-1" />
                  </button>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Interactive Calculator Engine (Reveals on "Try Now" click or toggle) */}
        <div id="interactive-calculator-engine" className="pt-6">
          <Card variant="elevated" className="p-6 sm:p-10 text-left border-neutral-200 bg-white">
            {/* Header + Tabs */}
            <div className="flex flex-col gap-6 border-b border-neutral-100 pb-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-emerald-600">
                    INTERACTIVE FINANCIAL ENGINE
                  </span>
                  <h3 className="font-display font-bold text-2xl text-navy-900 mt-1">
                    {CALCULATORS.find((c) => c.id === activeTab)?.name}
                  </h3>
                </div>
                <div className="text-xs text-neutral-400 font-body hidden sm:block">
                  Adjust sliders to simulate return scenarios
                </div>
              </div>

              {/* Mode Selection Tabs */}
              <div className="flex flex-wrap gap-2 pt-1 border-t border-neutral-100/80">
                {CALCULATORS.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-4 py-2 text-xs font-semibold rounded-xl border transition-all duration-200 cursor-pointer ${
                      activeTab === tab.id
                        ? "bg-navy-900 border-navy-950 text-white shadow-sm"
                        : "bg-neutral-50 border-neutral-200/80 text-neutral-600 hover:border-neutral-300 hover:bg-white"
                    }`}
                  >
                    {tab.shortName}
                  </button>
                ))}
              </div>
            </div>

            {/* Main Interactive Controls & Visual Chart Split */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mt-8">
              {/* Left Column: Sliders & Controls */}
              <div className="lg:col-span-7 flex flex-col gap-8">
                {/* Dynamic Input Control Rendering */}
                {activeTab === "sip" && (
                  <>
                    {/* Monthly SIP */}
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center justify-between">
                        <label htmlFor={sipMonthlyId} className="text-xs font-bold text-navy-900 uppercase tracking-wider">
                          Monthly SIP Investment (Rs)
                        </label>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-neutral-400 font-mono">₹</span>
                          <input
                            id={sipMonthlyId}
                            type="number"
                            value={sipMonthly}
                            onChange={(e) => setSipMonthly(Math.max(500, Number(e.target.value)))}
                            className="w-28 text-right font-mono font-semibold text-sm border border-neutral-200 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                          />
                        </div>
                      </div>
                      <input
                        type="range"
                        min={500}
                        max={200000}
                        step={500}
                        value={sipMonthly}
                        onChange={(e) => setSipMonthly(Number(e.target.value))}
                        className="w-full accent-blue-600 h-2 bg-neutral-200 rounded-lg cursor-pointer"
                      />
                      <div className="flex justify-between text-[11px] text-neutral-400 font-mono">
                        <span>₹ 500</span>
                        <span>{numberToWordsINR(sipMonthly)}</span>
                        <span>₹ 2,00,000</span>
                      </div>
                    </div>

                    {/* Tenure Years */}
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center justify-between">
                        <label htmlFor={sipYearsId} className="text-xs font-bold text-navy-900 uppercase tracking-wider">
                          Investment Period (Years)
                        </label>
                        <div className="flex items-center gap-2">
                          <input
                            id={sipYearsId}
                            type="number"
                            value={sipYears}
                            onChange={(e) => setSipYears(Math.max(1, Math.min(40, Number(e.target.value))))}
                            className="w-20 text-right font-mono font-semibold text-sm border border-neutral-200 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                          />
                          <span className="text-xs text-neutral-500 font-medium">Yr</span>
                        </div>
                      </div>
                      <input
                        type="range"
                        min={1}
                        max={35}
                        step={1}
                        value={sipYears}
                        onChange={(e) => setSipYears(Number(e.target.value))}
                        className="w-full accent-blue-600 h-2 bg-neutral-200 rounded-lg cursor-pointer"
                      />
                      <div className="flex justify-between text-[11px] text-neutral-400 font-mono">
                        <span>1 Year</span>
                        <span>({sipYears * 12} Months)</span>
                        <span>35 Years</span>
                      </div>
                    </div>

                    {/* Expected Return Rate */}
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center justify-between">
                        <label htmlFor={sipRateId} className="text-xs font-bold text-navy-900 uppercase tracking-wider">
                          Expected Return Rate (% p.a.)
                        </label>
                        <div className="flex items-center gap-2">
                          <input
                            id={sipRateId}
                            type="number"
                            step={0.5}
                            value={sipRate}
                            onChange={(e) => setSipRate(Math.max(1, Math.min(30, Number(e.target.value))))}
                            className="w-20 text-right font-mono font-semibold text-sm border border-neutral-200 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                          />
                          <span className="text-xs text-neutral-500 font-medium">%</span>
                        </div>
                      </div>
                      <input
                        type="range"
                        min={1}
                        max={30}
                        step={0.5}
                        value={sipRate}
                        onChange={(e) => setSipRate(Number(e.target.value))}
                        className="w-full accent-blue-600 h-2 bg-neutral-200 rounded-lg cursor-pointer"
                      />
                      <div className="flex justify-between text-[11px] text-neutral-400 font-mono">
                        <span>1%</span>
                        <span>Standard Equity ~12%</span>
                        <span>30%</span>
                      </div>
                    </div>
                  </>
                )}

                {activeTab === "lumpsum" && (
                  <>
                    {/* One-Time Lumpsum */}
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center justify-between">
                        <label htmlFor={lumpsumAmountId} className="text-xs font-bold text-navy-900 uppercase tracking-wider">
                          Total Lumpsum Investment (Rs)
                        </label>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-neutral-400 font-mono">₹</span>
                          <input
                            id={lumpsumAmountId}
                            type="number"
                            value={lumpsumAmount}
                            onChange={(e) => setLumpsumAmount(Math.max(5000, Number(e.target.value)))}
                            className="w-32 text-right font-mono font-semibold text-sm border border-neutral-200 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                          />
                        </div>
                      </div>
                      <input
                        type="range"
                        min={5000}
                        max={5000000}
                        step={5000}
                        value={lumpsumAmount}
                        onChange={(e) => setLumpsumAmount(Number(e.target.value))}
                        className="w-full accent-blue-600 h-2 bg-neutral-200 rounded-lg cursor-pointer"
                      />
                      <div className="flex justify-between text-[11px] text-neutral-400 font-mono">
                        <span>₹ 5,000</span>
                        <span>{numberToWordsINR(lumpsumAmount)}</span>
                        <span>₹ 50,00,000</span>
                      </div>
                    </div>

                    {/* Lumpsum Years */}
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center justify-between">
                        <label htmlFor={lumpsumYearsId} className="text-xs font-bold text-navy-900 uppercase tracking-wider">
                          Investment Period (Years)
                        </label>
                        <div className="flex items-center gap-2">
                          <input
                            id={lumpsumYearsId}
                            type="number"
                            value={lumpsumYears}
                            onChange={(e) => setLumpsumYears(Math.max(1, Number(e.target.value)))}
                            className="w-20 text-right font-mono font-semibold text-sm border border-neutral-200 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                          />
                          <span className="text-xs text-neutral-500 font-medium">Yr</span>
                        </div>
                      </div>
                      <input
                        type="range"
                        min={1}
                        max={30}
                        step={1}
                        value={lumpsumYears}
                        onChange={(e) => setLumpsumYears(Number(e.target.value))}
                        className="w-full accent-blue-600 h-2 bg-neutral-200 rounded-lg cursor-pointer"
                      />
                    </div>

                    {/* Lumpsum Return Rate */}
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center justify-between">
                        <label htmlFor={lumpsumRateId} className="text-xs font-bold text-navy-900 uppercase tracking-wider">
                          Expected Return Rate (% p.a.)
                        </label>
                        <div className="flex items-center gap-2">
                          <input
                            id={lumpsumRateId}
                            type="number"
                            step={0.5}
                            value={lumpsumRate}
                            onChange={(e) => setLumpsumRate(Number(e.target.value))}
                            className="w-20 text-right font-mono font-semibold text-sm border border-neutral-200 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                          />
                          <span className="text-xs text-neutral-500 font-medium">%</span>
                        </div>
                      </div>
                      <input
                        type="range"
                        min={1}
                        max={30}
                        step={0.5}
                        value={lumpsumRate}
                        onChange={(e) => setLumpsumRate(Number(e.target.value))}
                        className="w-full accent-blue-600 h-2 bg-neutral-200 rounded-lg cursor-pointer"
                      />
                    </div>
                  </>
                )}

                {activeTab === "swp" && (
                  <>
                    {/* SWP Total Investment */}
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center justify-between">
                        <label htmlFor={swpInvestmentId} className="text-xs font-bold text-navy-900 uppercase tracking-wider">
                          Total SWP Principal Corpus (Rs)
                        </label>
                        <input
                          id={swpInvestmentId}
                          type="number"
                          value={swpInvestment}
                          onChange={(e) => setSwpInvestment(Number(e.target.value))}
                          className="w-32 text-right font-mono font-semibold text-sm border border-neutral-200 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                        />
                      </div>
                      <input
                        type="range"
                        min={100000}
                        max={10000000}
                        step={50000}
                        value={swpInvestment}
                        onChange={(e) => setSwpInvestment(Number(e.target.value))}
                        className="w-full accent-blue-600 h-2 bg-neutral-200 rounded-lg cursor-pointer"
                      />
                    </div>

                    {/* Monthly Withdrawal */}
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center justify-between">
                        <label htmlFor={swpWithdrawalId} className="text-xs font-bold text-navy-900 uppercase tracking-wider">
                          Monthly Withdrawal Amount (Rs)
                        </label>
                        <input
                          id={swpWithdrawalId}
                          type="number"
                          value={swpWithdrawal}
                          onChange={(e) => setSwpWithdrawal(Number(e.target.value))}
                          className="w-32 text-right font-mono font-semibold text-sm border border-neutral-200 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                        />
                      </div>
                      <input
                        type="range"
                        min={1000}
                        max={100000}
                        step={1000}
                        value={swpWithdrawal}
                        onChange={(e) => setSwpWithdrawal(Number(e.target.value))}
                        className="w-full accent-blue-600 h-2 bg-neutral-200 rounded-lg cursor-pointer"
                      />
                    </div>

                    {/* Duration & Rate */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex flex-col gap-2">
                        <label htmlFor={swpYearsId} className="text-xs font-bold text-navy-900 uppercase tracking-wider">
                          Years
                        </label>
                        <input
                          id={swpYearsId}
                          type="number"
                          value={swpYears}
                          onChange={(e) => setSwpYears(Number(e.target.value))}
                          className="w-full text-right font-mono text-sm border border-neutral-200 rounded-lg px-3 py-1.5"
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label htmlFor={swpRateId} className="text-xs font-bold text-navy-900 uppercase tracking-wider">
                          Rate (% p.a.)
                        </label>
                        <input
                          id={swpRateId}
                          type="number"
                          step={0.5}
                          value={swpRate}
                          onChange={(e) => setSwpRate(Number(e.target.value))}
                          className="w-full text-right font-mono text-sm border border-neutral-200 rounded-lg px-3 py-1.5"
                        />
                      </div>
                    </div>
                  </>
                )}

                {activeTab === "stp" && (
                  <>
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center justify-between">
                        <label htmlFor={stpSourceAmountId} className="text-xs font-bold text-navy-900 uppercase tracking-wider">
                          Source Fund Initial Amount (Rs)
                        </label>
                        <input
                          id={stpSourceAmountId}
                          type="number"
                          value={stpSourceAmount}
                          onChange={(e) => setStpSourceAmount(Number(e.target.value))}
                          className="w-32 text-right font-mono font-semibold text-sm border border-neutral-200 rounded-lg px-3 py-1.5"
                        />
                      </div>
                      <input
                        type="range"
                        min={100000}
                        max={10000000}
                        step={50000}
                        value={stpSourceAmount}
                        onChange={(e) => setStpSourceAmount(Number(e.target.value))}
                        className="w-full accent-blue-600 h-2 bg-neutral-200 rounded-lg cursor-pointer"
                      />
                    </div>

                    <div className="flex flex-col gap-3">
                      <div className="flex items-center justify-between">
                        <label htmlFor={stpMonthlyTransferId} className="text-xs font-bold text-navy-900 uppercase tracking-wider">
                          Monthly Transfer Amount (Rs)
                        </label>
                        <input
                          id={stpMonthlyTransferId}
                          type="number"
                          value={stpMonthlyTransfer}
                          onChange={(e) => setStpMonthlyTransfer(Number(e.target.value))}
                          className="w-32 text-right font-mono font-semibold text-sm border border-neutral-200 rounded-lg px-3 py-1.5"
                        />
                      </div>
                      <input
                        type="range"
                        min={1000}
                        max={100000}
                        step={1000}
                        value={stpMonthlyTransfer}
                        onChange={(e) => setStpMonthlyTransfer(Number(e.target.value))}
                        className="w-full accent-blue-600 h-2 bg-neutral-200 rounded-lg cursor-pointer"
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      <div>
                        <label htmlFor={stpYearsId} className="text-[11px] font-bold text-navy-900 uppercase">Years</label>
                        <input
                          id={stpYearsId}
                          type="number"
                          value={stpYears}
                          onChange={(e) => setStpYears(Number(e.target.value))}
                          className="w-full text-right font-mono text-sm border rounded-lg px-2 py-1"
                        />
                      </div>
                      <div>
                        <label htmlFor={stpSourceRateId} className="text-[11px] font-bold text-navy-900 uppercase">Source Rate %</label>
                        <input
                          id={stpSourceRateId}
                          type="number"
                          value={stpSourceRate}
                          onChange={(e) => setStpSourceRate(Number(e.target.value))}
                          className="w-full text-right font-mono text-sm border rounded-lg px-2 py-1"
                        />
                      </div>
                      <div>
                        <label htmlFor={stpTargetRateId} className="text-[11px] font-bold text-navy-900 uppercase">Target Rate %</label>
                        <input
                          id={stpTargetRateId}
                          type="number"
                          value={stpTargetRate}
                          onChange={(e) => setStpTargetRate(Number(e.target.value))}
                          className="w-full text-right font-mono text-sm border rounded-lg px-2 py-1"
                        />
                      </div>
                    </div>
                  </>
                )}

                {activeTab === "sip-topup" && (
                  <>
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center justify-between">
                        <label htmlFor={topupMonthlyId} className="text-xs font-bold text-navy-900 uppercase tracking-wider">
                          Initial Monthly SIP (Rs)
                        </label>
                        <input
                          id={topupMonthlyId}
                          type="number"
                          value={topupMonthly}
                          onChange={(e) => setTopupMonthly(Number(e.target.value))}
                          className="w-32 text-right font-mono font-semibold text-sm border border-neutral-200 rounded-lg px-3 py-1.5"
                        />
                      </div>
                      <input
                        type="range"
                        min={1000}
                        max={100000}
                        step={1000}
                        value={topupMonthly}
                        onChange={(e) => setTopupMonthly(Number(e.target.value))}
                        className="w-full accent-blue-600 h-2 bg-neutral-200 rounded-lg cursor-pointer"
                      />
                    </div>

                    <div className="flex flex-col gap-3">
                      <div className="flex items-center justify-between">
                        <label htmlFor={topupPercentageId} className="text-xs font-bold text-navy-900 uppercase tracking-wider">
                          Annual Top-Up Step-Up (% Per Year)
                        </label>
                        <input
                          id={topupPercentageId}
                          type="number"
                          value={topupPercentage}
                          onChange={(e) => setTopupPercentage(Number(e.target.value))}
                          className="w-24 text-right font-mono font-semibold text-sm border border-neutral-200 rounded-lg px-3 py-1.5"
                        />
                      </div>
                      <input
                        type="range"
                        min={1}
                        max={25}
                        step={1}
                        value={topupPercentage}
                        onChange={(e) => setTopupPercentage(Number(e.target.value))}
                        className="w-full accent-blue-600 h-2 bg-neutral-200 rounded-lg cursor-pointer"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor={topupYearsId} className="text-xs font-bold text-navy-900 uppercase">Period (Years)</label>
                        <input
                          id={topupYearsId}
                          type="number"
                          value={topupYears}
                          onChange={(e) => setTopupYears(Number(e.target.value))}
                          className="w-full text-right font-mono text-sm border rounded-lg px-3 py-1.5"
                        />
                      </div>
                      <div>
                        <label htmlFor={topupRateId} className="text-xs font-bold text-navy-900 uppercase">Expected Rate (%)</label>
                        <input
                          id={topupRateId}
                          type="number"
                          value={topupRate}
                          onChange={(e) => setTopupRate(Number(e.target.value))}
                          className="w-full text-right font-mono text-sm border rounded-lg px-3 py-1.5"
                        />
                      </div>
                    </div>
                  </>
                )}

                {activeTab === "goal-lumpsum" && (
                  <>
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center justify-between">
                        <label htmlFor={targetGoalId} className="text-xs font-bold text-navy-900 uppercase tracking-wider">
                          Target Goal Amount (Rs)
                        </label>
                        <input
                          id={targetGoalId}
                          type="number"
                          value={targetGoal}
                          onChange={(e) => setTargetGoal(Number(e.target.value))}
                          className="w-36 text-right font-mono font-semibold text-sm border border-neutral-200 rounded-lg px-3 py-1.5"
                        />
                      </div>
                      <input
                        type="range"
                        min={100000}
                        max={50000000}
                        step={100000}
                        value={targetGoal}
                        onChange={(e) => setTargetGoal(Number(e.target.value))}
                        className="w-full accent-blue-600 h-2 bg-neutral-200 rounded-lg cursor-pointer"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor={goalYearsId} className="text-xs font-bold text-navy-900 uppercase">Time Horizon (Years)</label>
                        <input
                          id={goalYearsId}
                          type="number"
                          value={goalYears}
                          onChange={(e) => setGoalYears(Number(e.target.value))}
                          className="w-full text-right font-mono text-sm border rounded-lg px-3 py-1.5"
                        />
                      </div>
                      <div>
                        <label htmlFor={goalRateId} className="text-xs font-bold text-navy-900 uppercase">Return Rate (%)</label>
                        <input
                          id={goalRateId}
                          type="number"
                          value={goalRate}
                          onChange={(e) => setGoalRate(Number(e.target.value))}
                          className="w-full text-right font-mono text-sm border rounded-lg px-3 py-1.5"
                        />
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Right Column: Visual Breakdown Pie Chart + Results Summary */}
              <div className="lg:col-span-5 flex flex-col gap-6 bg-neutral-50/80 rounded-2xl p-6 border border-neutral-200/80">
                <h4 className="font-display font-bold text-sm uppercase tracking-wider text-navy-900 text-center">
                  Projected Wealth Breakdown
                </h4>

                {/* SVG Donut / Pie Chart */}
                <div className="relative h-44 w-44 mx-auto flex items-center justify-center">
                  <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
                    {/* Background Circle (Growth) */}
                    <circle
                      cx="18"
                      cy="18"
                      r="15.9155"
                      fill="none"
                      stroke="#10b981"
                      strokeWidth="3.8"
                    />
                    {/* Foreground Arc (Invested) */}
                    <circle
                      cx="18"
                      cy="18"
                      r="15.9155"
                      fill="none"
                      stroke="#0284c7"
                      strokeWidth="3.8"
                      strokeDasharray={`${results.investedPct} ${100 - results.investedPct}`}
                      strokeDashoffset="0"
                      className="transition-all duration-500 ease-out"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                      Target
                    </span>
                    <span className="text-xs font-bold text-navy-900 font-mono">
                      {Math.round(results.growthPct)}% Growth
                    </span>
                  </div>
                </div>

                {/* Legend Badges */}
                <div className="flex justify-center gap-4 text-xs font-semibold">
                  <span className="flex items-center gap-1.5 text-blue-700">
                    <span className="h-3 w-3 rounded-full bg-sky-600 inline-block" />
                    Invested ({results.investedPct.toFixed(1)}%)
                  </span>
                  <span className="flex items-center gap-1.5 text-emerald-700">
                    <span className="h-3 w-3 rounded-full bg-emerald-500 inline-block" />
                    Growth ({results.growthPct.toFixed(1)}%)
                  </span>
                </div>

                {/* Metrics Breakdown Cards */}
                <div className="flex flex-col gap-3 pt-2">
                  <div className="flex justify-between items-center p-3 rounded-xl bg-white border border-neutral-100 shadow-xs">
                    <span className="text-xs text-neutral-500 font-medium">{results.investedLabel}</span>
                    <span className="text-sm font-bold font-mono text-navy-900">
                      {formatINR(results.totalInvested)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl bg-emerald-50/60 border border-emerald-100">
                    <span className="text-xs text-emerald-800 font-medium">{results.growthLabel}</span>
                    <span className="text-sm font-bold font-mono text-emerald-700">
                      {formatINR(results.totalGrowth)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3.5 rounded-xl bg-navy-900 text-white shadow-md">
                    <span className="text-xs font-semibold text-neutral-200">{results.futureLabel}</span>
                    <span className="text-base font-extrabold font-mono text-emerald-400">
                      {formatINR(results.totalFutureValue)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
