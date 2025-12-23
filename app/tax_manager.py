from app.core_tax_logic import (
    process_salary_old, calculate_deductions_old, calculate_property_old, calculate_slab_tax_old,
    process_salary_new, calculate_property_new, calculate_slab_tax_new,
    calculate_investment_tax
)

def run_tax_comparison(data):
    # --- COMMON DATA ---
    inv_analysis = calculate_investment_tax(data.investments)
    inv_tax = inv_analysis["investment_tax"]

    # --- OLD REGIME CALC ---
    old_salary = process_salary_old(data.gross_salary)
    old_property = calculate_property_old(data.properties)
    old_deductions = calculate_deductions_old(data)
    
    old_taxable = max(0, old_salary + old_property - old_deductions)
    old_slab_tax = calculate_slab_tax_old(old_taxable)
    old_total = old_slab_tax + inv_tax
    old_cess = old_total * 0.04
    old_final = round(old_total + old_cess, 2)

    # --- NEW REGIME CALC ---
    new_salary = process_salary_new(data.gross_salary)
    new_property = calculate_property_new(data.properties)
    
    new_taxable = new_salary + new_property
    new_slab_tax = calculate_slab_tax_new(new_taxable)
    new_total = new_slab_tax + inv_tax
    new_cess = new_total * 0.04
    new_final = round(new_total + new_cess, 2)

    # --- RESPONSE FORMATTING ---
    return {
        "summary": {
            "best_regime": "New" if new_final < old_final else "Old",
            "savings": round(abs(old_final - new_final), 2)
        },
        "comparison_chart": [
            {
                "label": "Total Tax",
                "Old Regime": old_final,
                "New Regime": new_final
            },
            {
                "label": "Income Tax (Slab)",
                "Old Regime": round(old_slab_tax, 2),
                "New Regime": round(new_slab_tax, 2)
            }
        ],
        "details": {
            "old": {
                "total_tax": old_final,
                "components": {
                    "slab_tax": round(old_slab_tax, 2),
                    "investment_tax": inv_tax,
                    "cess": round(old_cess, 2)
                },
                "tax_shield": {
                    "deductions_saved": old_deductions,
                    "property_loss_benefit": abs(min(0, old_property))
                }
            },
            "new": {
                "total_tax": new_final,
                "components": {
                    "slab_tax": round(new_slab_tax, 2),
                    "investment_tax": inv_tax,
                    "cess": round(new_cess, 2)
                },
                "metadata": {
                    "taxable_income": new_taxable,
                    "standard_deduction": 75000
                }
            }
        }
    }
    