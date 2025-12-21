def calculate_tax_with_relief(taxable_income: float, category: str, high_turnover:bool):
    # 1. Standard Slab Calculation for Individual (already defined)
    if category == "Individual":
        tax = 0
        if taxable_income <= 400000: tax = 0
        elif taxable_income <= 800000: tax = (taxable_income - 400000) * 0.05
        elif taxable_income <= 1200000: tax = 20000 + (taxable_income - 800000) * 0.10
        else: tax = 60000 + (taxable_income - 1200000) * 0.15

        # Section 87A Rebate (Full rebate up to 12L for New Regime 2025)
        if taxable_income <= 1200000:
            return 0

        # Marginal Relief Calculation 
        excess_income = taxable_income - 1200000
        if tax > excess_income:
            tax = excess_income 

        return round(tax * 1.04, 2) # Final tax with 4% Cess

    # 2. HUF (Hindu Undivided Family) - Generally follows the same slabs as Individuals
    elif category == "HUF":
        tax = 0
        if taxable_income <= 400000: tax = 0
        elif taxable_income <= 800000: tax = (taxable_income - 400000) * 0.05
        elif taxable_income <= 1200000: tax = 20000 + (taxable_income - 800000) * 0.10
        else: tax = 60000 + (taxable_income - 1200000) * 0.15
        
        return round(tax * 1.04, 2)

    # 3. Firms and LLP (Limited Liability Partnerships) - Flat 30% Tax Rate
    elif category in ["Firms", "LLP"]:
        tax = taxable_income * 0.30
        return round(tax * 1.04, 2)

    # 4. Domestic Company - Base rate is typically 25% (if turnover < 400cr) or 30%
    elif category == "DomesticCompany":
        rate = 0.30 if high_turnover else 0.25
        tax = taxable_income * rate # Simplified for the hackathon prototype
        return round(tax * 1.04, 2)

    # 5. Foreign Company - Higher flat rate (typically 40%)
    elif category == "ForeignCompany":
        tax = taxable_income * 0.40
        return round(tax * 1.04, 2)

    # 6. Co-operative Society - Progressive Slabs
    elif category == "CoOpSociety":
        if taxable_income <= 10000: tax = taxable_income * 0.10
        elif taxable_income <= 20000: tax = 1000 + (taxable_income - 10000) * 0.20
        else: tax = 3000 + (taxable_income - 20000) * 0.30
        return round(tax * 1.04, 2)

    # 7. AOPs/BOI (Association of Persons / Body of Individuals)
    elif category == "AOP_BOI":
        # Simplified: Often taxed at Maximum Marginal Rate (MMR) or Individual rates
        tax = taxable_income * 0.30 
        return round(tax * 1.04, 2)

    else:
        return 0