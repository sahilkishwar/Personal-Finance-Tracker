package com.example.financetracker.repository;

import com.example.financetracker.model.Budget;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface BudgetRepository extends JpaRepository<Budget, Long> {
    List<Budget> findByMonthAndYear(int month, int year);
    Optional<Budget> findByCategoryIgnoreCaseAndMonthAndYear(String category, int month, int year);
}
