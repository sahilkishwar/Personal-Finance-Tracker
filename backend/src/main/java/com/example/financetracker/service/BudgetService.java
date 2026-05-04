package com.example.financetracker.service;

import com.example.financetracker.model.Budget;
import com.example.financetracker.repository.BudgetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class BudgetService {

    @Autowired
    private BudgetRepository repo;

    public List<Budget> getByMonthAndYear(int month, int year) {
        return repo.findByMonthAndYear(month, year);
    }

    public Budget save(Budget budget) { return repo.save(budget); }

    public void delete(Long id) { repo.deleteById(id); }

    public Optional<Budget> findByCategoryAndMonth(String category, int month, int year) {
        return repo.findByCategoryIgnoreCaseAndMonthAndYear(category, month, year);
    }
}
