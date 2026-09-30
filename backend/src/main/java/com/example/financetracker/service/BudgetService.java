package com.example.financetracker.service;

import com.example.financetracker.model.Budget;
import com.example.financetracker.repository.BudgetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BudgetService {

    private final BudgetRepository budgetRepository;

    @Autowired
    public BudgetService(BudgetRepository budgetRepository) {
        this.budgetRepository = budgetRepository;
    }

    public List<Budget> getBudgets(int month, int year) {
        return budgetRepository.findByMonthAndYear(month, year);
    }

    public Budget saveBudget(Budget budget) {
        // If a budget already exists for this category, month, and year, we update it
        Optional<Budget> existing = budgetRepository.findByCategoryIgnoreCaseAndMonthAndYear(
                budget.getCategory(), budget.getMonth(), budget.getYear()
        );
        if (existing.isPresent()) {
            Budget existingBudget = existing.get();
            existingBudget.setLimit(budget.getLimit());
            return budgetRepository.save(existingBudget);
        }
        return budgetRepository.save(budget);
    }

    public Budget updateBudget(Long id, Budget budgetDetails) {
        Budget budget = budgetRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Budget not found with id " + id));
        budget.setCategory(budgetDetails.getCategory());
        budget.setLimit(budgetDetails.getLimit());
        budget.setMonth(budgetDetails.getMonth());
        budget.setYear(budgetDetails.getYear());
        return budgetRepository.save(budget);
    }

    public void deleteBudget(Long id) {
        budgetRepository.deleteById(id);
    }

    public Optional<Budget> getBudgetByCategoryMonthAndYear(String category, int month, int year) {
        return budgetRepository.findByCategoryIgnoreCaseAndMonthAndYear(category, month, year);
    }
}
