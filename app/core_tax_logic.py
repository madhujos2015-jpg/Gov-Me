# --- SHARED LOGIC (Capital Gains) ---
def calculate_investment_tax(investments: list) -> dict:
    total_equity_ltcg = 0
    total_equity_stcg = 0
    total_other_ltcg = 0  
    
    for inv in investments:
        gain = inv.sell_price - inv.buy_price
        if gain <= 0: continue
            
        if inv.asset_type == "equity":
            if inv.is_long_term: total_equity_ltcg += gain
            else: total_equity_stcg += gain
        else:
            if inv.is_long_term: total_other_ltcg += gain
            else: pass 

    equity_ltcg_tax = max(0, total_equity_ltcg - 125000) * 0.125
    equity_stcg_tax = total_equity_stcg * 0.20
    other_ltcg_tax = total_other_ltcg * 0.125 
    
    return {
        "investment_tax": equity_ltcg_tax + equity_stcg_tax + other_ltcg_tax,
        "breakdown": {
            "ltcg_equity_tax": round(equity_ltcg_tax, 2),
            "stcg_equity_tax": round(equity_stcg_tax, 2),
            "other_ltcg_tax": round(other_ltcg_tax, 2)
        }
    }

# --- OLD REGIME LOGIC ---
def process_salary_old(gross_salary: float) -> float:
    return max(0, gross_salary - 50000)

def calculate_deductions_old(data):
    total = 0
    total += min(data.other_deductions_80c, 150000)
    total += min(data.health_insurance, 25000)
    total += min(data.nps_voluntary, 50000)
    return float(total)

def calculate_property_old(properties: list) -> float:
    total_property_impact = 0.0
    for p in properties:
        if p.is_self_occupied:
            total_property_impact -= min(p.loan_interest, 200000)
        else:
            nav = p.rental_income - p.municipal_taxes
            taxable_rent = (nav * 0.70) - p.loan_interest
            total_property_impact += taxable_rent
            
    if total_property_impact < -200000:
        return -200000.0
    return float(total_property_impact)

def calculate_slab_tax_old(taxable_income: float) -> float:
    if taxable_income <= 500000: return 0.0
    
    tax = 0.0
    income = taxable_income
    
    if income > 1000000:
        tax += (income - 1000000) * 0.30
        income = 1000000
    if income > 500000:
        tax += (income - 500000) * 0.20
        income = 500000
    if income > 250000:
        tax += (income - 250000) * 0.05
        
    return float(tax)

# --- NEW REGIME LOGIC ---
def process_salary_new(gross_salary: float) -> float:
    return max(0, gross_salary - 75000)

def calculate_property_new(properties: list) -> float:
    total_property_income = 0
    for p in properties:
        if p.is_self_occupied: continue
        else:
            nav = p.rental_income - p.municipal_taxes
            taxable_rent = (nav * 0.70) - p.loan_interest
            total_property_income += max(0, taxable_rent)
    return float(total_property_income)

def calculate_slab_tax_new(taxable_income: float) -> float:
    if taxable_income <= 1200000: return 0.0
    
    tax = 0
    income = taxable_income
    
    if income > 2400000:
        tax += (income - 2400000) * 0.30
        income = 2400000
    if income > 2000000:
        tax += (income - 2000000) * 0.25
        income = 2000000
    if income > 1600000:
        tax += (income - 1600000) * 0.20
        income = 1600000
    if income > 1200000:
        tax += (income - 1200000) * 0.15
        income = 1200000
    if income > 800000:
        tax += (income - 800000) * 0.10
        income = 800000
    if income > 400000:
        tax += (income - 400000) * 0.05

    return float(tax)