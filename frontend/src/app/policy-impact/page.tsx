"use client";
import Link from 'next/link'
import { 
  TrendingUp, 
  ShieldCheck, 
  Scale, 
  CheckCircle2, 
  XCircle, 
  ArrowRight,
  Calculator,
  Briefcase,
  Home,
  PiggyBank
} from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle, 
  CardFooter
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";

export default function PolicyImpactPage() {

  return (
    <div className="min-h-screen bg-slate-50/50 p-6 md:p-10 font-sans">
      <div className="max-w-5xl mx-auto space-y-12">
        
        {/* HEADER */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">Tax Regime Impact</h1>
          <p className="text-lg text-slate-500">
            The battle between "Simplicity" and "Optimization." Understanding when to switch regimes is the key to saving thousands.
          </p>
        </div>

        {/* SECTION 1: WHEN IS NEW REGIME GOOD? */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="outline" className="text-indigo-600 border-indigo-200 bg-indigo-50">Scenario A</Badge>
            <h2 className="text-2xl font-bold text-slate-800">When is the New Regime Better?</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <Card className="border-t-4 border-t-indigo-500 shadow-md h-full">
              <CardHeader>
                <CardTitle className="text-indigo-700 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5"/> The "Default" Choice
                </CardTitle>
                <CardDescription>Best for 70% of taxpayers</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 text-slate-600">
                <p>
                  The New Regime is designed for the modern employee who prefers <strong>cash in hand</strong> over locking money into specific investments.
                </p>
                <ul className="space-y-2 mt-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-indigo-500 shrink-0"/>
                    <span>You have low investments (less than ₹1.5L/year).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-indigo-500 shrink-0"/>
                    <span>You do not have a Home Loan.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-indigo-500 shrink-0"/>
                    <span>You just started your career (Income &lt; ₹15L).</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Visualizing Lower Rates */}
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <h3 className="font-semibold text-slate-900 mb-4">Why it wins: Lower Tax Rates</h3>
                <div className="space-y-5">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-slate-500">New Regime Rate (10L - 12L Income)</span>
                      <span className="font-bold text-indigo-600">15% Tax</span>
                    </div>
                    <Progress value={40} className="h-3" indicatorClassName="bg-indigo-500" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-slate-500">Old Regime Rate (Same Income)</span>
                      <span className="font-bold text-slate-400">30% Tax</span>
                    </div>
                    <Progress value={85} className="h-3 bg-slate-100" indicatorClassName="bg-slate-400" />
                  </div>
                </div>
                <p className="text-xs text-slate-400 mt-4 italic">
                  *New regime slashes tax rates by half in middle-income brackets.
                </p>
              </div>
            </div>
          </div>
        </section>

        <Separator />

        {/* SECTION 2: THE TIPPING POINT */}
        <section className="space-y-4">
           <div className="flex items-center gap-2 mb-4 justify-center">
            <Badge variant="outline" className="text-orange-600 border-orange-200 bg-orange-50">The Math</Badge>
            <h2 className="text-2xl font-bold text-slate-800">The "Tipping Point": ₹3.75 Lakhs</h2>
          </div>

          <Card className="bg-linear-to-br from-slate-900 to-slate-800 text-white border-none overflow-hidden relative">
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl"></div>
            
            <CardContent className="p-8 md:p-12 text-center space-y-6">
              <Scale className="w-12 h-12 mx-auto text-orange-400 mb-2" />
              <h3 className="text-2xl md:text-3xl font-bold">
                The Golden Rule of Deductions
              </h3>
              <p className="text-slate-300 max-w-2xl mx-auto text-lg leading-relaxed">
                Do your total deductions (80C + 80D + HRA + Home Loan Interest) exceed <span className="text-orange-400 font-bold">₹3,75,000</span>?
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto mt-8">
                <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm border border-white/10 hover:bg-white/15 transition-colors cursor-default">
                  <div className="text-orange-400 font-bold text-xl mb-1">&lt; ₹3.75 Lakhs</div>
                  <div className="text-sm text-slate-300">Stick to New Regime</div>
                </div>
                <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm border border-white/10 hover:bg-white/15 transition-colors cursor-default">
                  <div className="text-emerald-400 font-bold text-xl mb-1">&gt; ₹3.75 Lakhs</div>
                  <div className="text-sm text-slate-300">Switch to Old Regime</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <Separator />

        {/* SECTION 3: WHEN IS OLD REGIME GOOD? */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 mb-4">
             <Badge variant="outline" className="text-emerald-600 border-emerald-200 bg-emerald-50">Scenario B</Badge>
            <h2 className="text-2xl font-bold text-slate-800">When is the Old Regime Better?</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1 space-y-4">
              <h3 className="text-lg font-semibold text-slate-700">The "Optimization Stack"</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                To beat the New Regime, you generally need to stack <strong>all three</strong> of these major deductions. If you miss even one, the New Regime often wins.
              </p>
              
              <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-100 mt-4">
                 <h4 className="font-bold text-emerald-800 text-sm mb-2 flex items-center">
                    <ShieldCheck className="w-4 h-4 mr-2"/> The Winning Formula
                 </h4>
                 <div className="space-y-2 text-sm text-emerald-700">
                    <div className="flex justify-between">
                        <span>Section 80C</span>
                        <span className="font-semibold">₹1.5 L</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Home Loan Interest</span>
                        <span className="font-semibold">+ ₹2.0 L</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Standard Deduction</span>
                        <span className="font-semibold">+ ₹50 K</span>
                    </div>
                    <div className="border-t border-emerald-200 pt-1 mt-1 flex justify-between font-bold">
                        <span>Total Shield</span>
                        <span>₹4.0 L</span>
                    </div>
                 </div>
              </div>
            </div>

            {/* Cards for each deduction type */}
            <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
               <Card>
                 <CardHeader className="pb-2">
                    <Home className="w-8 h-8 text-emerald-600 mb-2" />
                    <CardTitle className="text-base">Home Loan Borrowers</CardTitle>
                 </CardHeader>
                 <CardContent>
                    <p className="text-xs text-slate-500">
                        Section 24(b) allows you to deduct up to ₹2 Lakhs of interest paid on your home loan. This is the biggest differentiator.
                    </p>
                 </CardContent>
               </Card>

               <Card>
                 <CardHeader className="pb-2">
                    <Briefcase className="w-8 h-8 text-emerald-600 mb-2" />
                    <CardTitle className="text-base">HRA Claimants</CardTitle>
                 </CardHeader>
                 <CardContent>
                    <p className="text-xs text-slate-500">
                        If you pay rent of ₹20k/month in a metro city, HRA exemption can massively reduce taxable income.
                    </p>
                 </CardContent>
               </Card>

               <Card className="sm:col-span-2 bg-slate-50 border-dashed">
                 <CardContent className="flex items-center justify-between p-6">
                    <div className="space-y-1">
                        <h4 className="font-semibold text-slate-900">Are you ready to check your status?</h4>
                        <p className="text-sm text-slate-500">Enter your specific salary details to get a precise recommendation.</p>
                    </div>
                    <Link  href="/financial-diary">
                    <Button className="bg-indigo-600 hover:bg-indigo-700">
                        Calculate Now <ArrowRight className="ml-2 w-4 h-4"/>
                    </Button>
                    </Link>
                 </CardContent>
               </Card>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}