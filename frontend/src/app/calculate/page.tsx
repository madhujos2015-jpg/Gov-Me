'use client'

import { useState, useMemo } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Info, Landmark, Scale, ShieldCheck } from "lucide-react"

export default function CalculationPage() {
  const [income, setIncome] = useState("");
  const [category, setCategory] = useState("Individual");
  const [isHighTurnover, setIsHighTurnover] = useState(false);
  const [tax, setTax] = useState<number | null>(null);

  // Dynamic Summary Data based on Category
  const summary = useMemo(() => {
    const details: Record<string, { title: string; rate: string; logic: string; note: string }> = {
      Individual: {
        title: "Individual / HUF (New Regime)",
        rate: "0% to 30% (Progressive)",
        logic: "Under the default New Tax Regime (AY 2026-27), income up to ₹4 Lakh is tax-free. Slabs then increase by 5% every ₹4 Lakh. A standard deduction of ₹75,000 applies to salaried individuals.",
        note: "Rebate u/s 87A makes income up to ₹12 Lakh effectively tax-free for residents."
      },
      HUF: {
        title: "Hindu Undivided Family",
        rate: "Slab Based",
        logic: "HUF units are taxed as separate entities using the same progressive slabs as individuals. They are entitled to most deductions like 80C under the old regime, but the new regime is now the default.",
        note: "Allows for tax planning by distributing income among family members."
      },
      DomesticCompany: {
        title: "Domestic Company",
        rate: isHighTurnover ? "30% (Base)" : "25% (Base)",
        logic: `Companies with a turnover up to ₹400 Cr in FY 2023-24 enjoy a reduced rate of 25%. Larger corporations are taxed at 30%. Optional concessional rates (15% or 22%) are available for manufacturing.`,
        note: "Surcharge of 7% applies if income exceeds ₹1 Cr; 12% if above ₹10 Cr."
      },
      ForeignCompany: {
        title: "Foreign Company",
        rate: "40% (Flat)",
        logic: "Foreign entities are generally taxed at a flat rate of 40% on income earned within India. Specific tax treaties (DTAA) may apply to lower this for certain services or royalties.",
        note: "Surcharge is lower (2% to 5%) compared to domestic companies."
      },
      Firms: {
        title: "Partnership Firms",
        rate: "30% (Flat)",
        logic: "Partnership firms are taxed at a flat rate of 30% on total income. The profit shared with partners is exempt in the partners' hands, but remuneration/interest is taxed.",
        note: "A 12% surcharge applies if total income exceeds ₹1 Crore."
      },
      LLP: {
        title: "Limited Liability Partnership",
        rate: "30% (Flat)",
        logic: "LLPs follow the same flat 30% taxation as traditional firms. They must also account for Alternate Minimum Tax (AMT) if regular tax is less than 18.5% of adjusted total income.",
        note: "Effective April 2025, new 10% TDS rules apply to partner payments above ₹20,000."
      },
      CoOpSociety: {
        title: "Co-operative Society",
        rate: "10% to 30% (Graduated)",
        logic: "Income up to ₹10k (10%), ₹10k-₹20k (20%), and >₹20k (30%). Societies can opt for a flat 22% rate u/s 115BAD to avoid complex slab structures.",
        note: "Manufacturing co-operatives registered after April 2023 can opt for a lower 15% rate."
      }
    };
    return details[category] || details.Individual;
  }, [category, isHighTurnover]);

  const handleCalculate = async () => {
    try {
      const backendUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";
      const res = await fetch(`${backendUrl}/services/tax_engine?taxable_income=${income}&category=${category}&high_turnover=${isHighTurnover}`, {
        method: 'POST',
      });
      const data = await res.json();
      setTax(data.tax_details);
    } catch (e) {
      alert("Check FastAPI! Is it running?" + e);
    }
  }

  return (
    <main className="min-h-screen bg-zinc-50 p-6 md:p-12">
      <div className="max-w-6xl mx-auto space-y-8 animate-in zoom-in-95 duration-500">
        
        {/* Input & Output Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="p-8 shadow-2xl border-none">
            <CardHeader className="px-0 pt-0">
              <CardTitle className="text-3xl font-bold">Tax Calculation</CardTitle>
            </CardHeader>
            <div className="space-y-6">
              <div className="space-y-2">
                <Label>Taxpayer Category</Label>
                <Select onValueChange={setCategory} defaultValue={category}>
                  <SelectTrigger className="h-12 text-lg"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Individual">Individual</SelectItem>
                    <SelectItem value="HUF">HUF</SelectItem>
                    <SelectItem value="DomesticCompany">Domestic Company</SelectItem>
                    <SelectItem value="ForeignCompany">Foreign Company</SelectItem>
                    <SelectItem value="Firms">Firms</SelectItem>
                    <SelectItem value="LLP">LLP</SelectItem>
                    <SelectItem value="CoOpSociety">Co-operative Society</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {category === "DomesticCompany" && (
                <div className="flex items-center justify-between p-4 bg-zinc-100 rounded-lg animate-in slide-in-from-top-2">
                  <div className="space-y-0.5">
                    <Label>Turnover {'>'} ₹400 Cr?</Label>
                    <p className="text-xs text-zinc-500">Affects base tax rate (25% vs 30%)</p>
                  </div>
                  <Switch checked={isHighTurnover} onCheckedChange={setIsHighTurnover} />
                </div>
              )}

              <div className="space-y-2">
                <Label>Annual Taxable Income (INR)</Label>
                <Input type="number" value={income} onChange={(e) => setIncome(e.target.value)} className="h-12 text-lg" />
              </div>
              <Button onClick={handleCalculate} className="w-full h-14 text-xl font-bold">Analyze Duty</Button>
            </div>
          </Card>

          <Card className="bg-zinc-900 text-white p-8 shadow-2xl border-none flex flex-col justify-between">
            <div>
              <p className="text-zinc-400 text-xs font-bold uppercase tracking-widest">Total Duty Calculated</p>
              <h2 className="text-6xl font-black mt-4 tracking-tighter">₹{tax !== null ? tax.toLocaleString('en-IN') : "0"}</h2>
            </div>
            <div className="pt-8 border-t border-zinc-800">
              <p className="text-zinc-400 text-sm italic">"Your fiscal duty fuels the nation. Next, we check your rights."</p>
            </div>
          </Card>
        </div>

        {/* Dynamic Taxation Summary Section */}
        <Card className="border-none shadow-xl bg-white overflow-hidden">
          <div className="bg-zinc-100 px-8 py-4 border-b flex items-center gap-2">
            <Info className="w-5 h-5 text-zinc-600" />
            <span className="font-bold text-zinc-700 uppercase tracking-tight text-sm">Category Analysis: {summary.title}</span>
          </div>
          <CardContent className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-zinc-500 mb-1">
                  <Scale className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase">Tax Structure</span>
                </div>
                <p className="text-2xl font-bold text-zinc-900">{summary.rate}</p>
              </div>
              
              <div className="md:col-span-2 space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-zinc-500">
                    <Landmark className="w-4 h-4" />
                    <span className="text-xs font-bold uppercase">Fiscal Logic</span>
                  </div>
                  <p className="text-zinc-600 leading-relaxed">{summary.logic}</p>
                </div>
                
                <div className="p-4 bg-zinc-50 rounded-lg border border-zinc-100 flex gap-3 items-start">
                  <ShieldCheck className="w-5 h-5 text-emerald-600 mt-0.5" />
                  <div>
                    <span className="block text-xs font-bold text-zinc-500 uppercase">Expert Note</span>
                    <p className="text-sm text-zinc-700 font-medium">{summary.note}</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

      </div>
    </main>
  )
}