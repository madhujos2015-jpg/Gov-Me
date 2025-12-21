'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import schemesData from './schemes.json'
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { ArrowLeft, BookOpen, CheckCircle2, Wallet, SearchX } from 'lucide-react'

export default function SchemesPage() {
  const [age, setAge] = useState(25)
  const [gender, setGender] = useState("All")
  const [category, setCategory] = useState("All")
  const [occupation, setOccupation] = useState("Any")
  const [income, setIncome] = useState("All")
  const resetFilters = () => {
  setAge(25);
  setGender("All");
  setCategory("All");
  setOccupation("Any");
  setIncome("All");
};

  // Updated filtering logic to use standardized lowercase keys
  const filteredSchemes = useMemo(() => {
    return schemesData.schemes.filter(scheme => {
      const ageMatch = age >= scheme.min_age && age <= scheme.max_age;
      const genderMatch = gender === "All" || scheme.gender === "All" || scheme.gender === gender;
      const categoryMatch = category === "All" || scheme.category.includes(category);
      const occupationMatch = occupation === "Any" || scheme.occupation === "Any" || scheme.occupation.includes(occupation);
      // New logic for Income Thresholds
      const incomeMatch = income === "All" || scheme.income_threshold === "None" || scheme.income_threshold === income;
      
      return ageMatch && genderMatch && categoryMatch && occupationMatch && incomeMatch;
    });
  }, [age, gender, category, occupation, income]);

  return (
    <main className="min-h-screen bg-zinc-50 p-6 md:p-12 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Navigation & Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <Link href="/">
              <Button variant="ghost" className="mb-2 -ml-2 text-zinc-500 hover:text-black transition-colors">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
              </Button>
            </Link>
            <h1 className="text-4xl font-black tracking-tight text-zinc-900">Scheme Finder</h1>
            <p className="text-zinc-500 font-medium">Gov&Me Intelligence: Personalized Citizen Subsidies & Schemes</p>
          </div>
          <div className="bg-zinc-900 text-white px-5 py-5 rounded-full text-sm font-bold shadow-lg">
            {filteredSchemes.length} Matches Found
          </div>
        </div>

        {/* Dynamic Filters Grid */}
        {/* Dynamic Filters Grid - 12 Column Layout for better sizing */}
<Card className="p-6 shadow-2xl border-none bg-white/80 backdrop-blur-md sticky top-6 z-10">
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6 items-end">
    
    {/* 1. Age (Now relaxed and big) */}
    <div className="space-y-2">
      <Label className="text-[10px] uppercase font-black text-zinc-400 tracking-widest">Age</Label>
      <Input 
        type="number" 
        value={age} 
        onChange={(e) => setAge(Number(e.target.value))} 
        className="h-12 border-zinc-200 focus:ring-zinc-900" 
      />
    </div>
    
    {/* 2. Gender */}
    <div className="space-y-2">
      <Label className="text-[10px] uppercase font-black text-zinc-400 tracking-widest">Gender</Label>
      <Select onValueChange={setGender} value={gender}>
        <SelectTrigger className="h-12 border-zinc-200"><SelectValue /></SelectTrigger>
        <SelectContent>
          {schemesData.filters.genders.map(g => <SelectItem key={g} value={g}>{g}</SelectItem>)}
        </SelectContent>
      </Select>
    </div>

    {/* 3. Category */}
    <div className="space-y-2">
      <Label className="text-[10px] uppercase font-black text-zinc-400 tracking-widest">Category</Label>
      <Select onValueChange={setCategory} value={category}>
        <SelectTrigger className="h-12 border-zinc-200"><SelectValue /></SelectTrigger>
        <SelectContent>
          <SelectItem value="All">All Categories</SelectItem>
          {schemesData.filters.categories.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
        </SelectContent>
      </Select>
    </div>

    {/* 4. Occupation */}
    <div className="space-y-2">
      <Label className="text-[10px] uppercase font-black text-zinc-400 tracking-widest">Occupation</Label>
      <Select onValueChange={setOccupation} value={occupation}>
        <SelectTrigger className="h-12 border-zinc-200"><SelectValue /></SelectTrigger>
        <SelectContent>
          {schemesData.filters.occupations.map(o => <SelectItem key={o} value={o}>{o}</SelectItem>)}
        </SelectContent>
      </Select>
    </div>

    {/* 5. Income Group */}
    <div className="space-y-2">
      <Label className="text-[10px] uppercase font-black text-zinc-400 tracking-widest">Income Group</Label>
      <Select onValueChange={setIncome} value={income}>
        <SelectTrigger className="h-12 border-zinc-200"><SelectValue /></SelectTrigger>
        <SelectContent>
          {schemesData.filters.income_thresholds.map(i => <SelectItem key={i} value={i}>{i}</SelectItem>)}
        </SelectContent>
      </Select>
    </div>

    {/* 6. Reset Button (Equidistant and Big) */}
    <div className="pb-0.5">
      <Button 
        onClick={resetFilters}
        variant="outline" 
        className="w-full h-12 border-zinc-200 hover:bg-zinc-900 hover:text-white transition-all font-bold text-xs uppercase tracking-tighter"
      >
        Reset Filters
      </Button>
    </div>
  </div>
</Card>

        {/* Schemes Results */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSchemes.length > 0 ? (
            filteredSchemes.map((scheme, i) => (
              <Card key={i} className="flex flex-col h-full hover:shadow-2xl hover:-translate-y-1 transition-all border-zinc-200 group relative overflow-hidden bg-white">
                <div className="absolute top-0 right-0 p-3">
                   <Wallet className="h-5 w-5 text-zinc-100 group-hover:text-zinc-900 transition-colors" />
                </div>
                <CardHeader className="pb-2">
                  <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest block mb-1">
                    {scheme.type} • {scheme.category.split(',')[0]}
                  </span>
                  <CardTitle className="text-xl font-extrabold text-zinc-900 leading-tight">
                    {scheme.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="grow space-y-5">
                  <p className="text-sm text-zinc-600 leading-relaxed font-medium italic">
                    {scheme.description || "Official government support program."}
                  </p>
                  
                  <div className="p-4 bg-zinc-900 text-white rounded-2xl shadow-inner">
                    <p className="text-[9px] uppercase font-bold text-zinc-400 mb-1 tracking-widest">Primary Benefit</p>
                    <p className="text-sm font-semibold leading-snug">{scheme.benefit}</p>
                  </div>

                  <div className="pt-4 border-t border-zinc-100 space-y-2">
                    <div className="flex items-start text-xs text-zinc-500 font-bold">
                      <CheckCircle2 className="h-4 w-4 mr-2 text-zinc-900 flex-shrink-0" />
                      Required Docs: {scheme.docs}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="col-span-full py-32 flex flex-col items-center justify-center space-y-4">
              <SearchX className="h-16 w-16 text-zinc-200" />
              <div className="text-center">
                <p className="text-xl font-bold text-zinc-900">No matching benefits found</p>
                <p className="text-zinc-500">Try adjusting your filters to broaden the search.</p>
              </div>
              <Button onClick={() => {setIncome("All"); setOccupation("Any"); setGender("All"); setCategory("All")}} variant="outline" className="mt-4">
                Reset All Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}