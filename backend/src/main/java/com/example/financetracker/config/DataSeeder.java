package com.example.financetracker.config;

import com.example.financetracker.model.Transaction;
import com.example.financetracker.model.TransactionType;
import com.example.financetracker.model.Budget;
import com.example.financetracker.repository.TransactionRepository;
import com.example.financetracker.repository.BudgetRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import java.time.LocalDate;
import java.util.List;

@Configuration
public class DataSeeder {

    @Bean
    CommandLineRunner seedData(TransactionRepository txRepo, BudgetRepository budgetRepo) {
        return args -> {
            if (txRepo.count() == 0) {
                LocalDate now = LocalDate.now();
                int month = now.getMonthValue();
                int year = now.getYear();

                // txRepo.saveAll(List.of(...));

                budgetRepo.saveAll(List.of(
                    new Budget(null, "Food", 8000, month, year),
                    new Budget(null, "Housing", 20000, month, year),
                    new Budget(null, "Entertainment", 2000, month, year),
                    new Budget(null, "Health", 5000, month, year),
                    new Budget(null, "Transport", 5000, month, year),
                    new Budget(null, "Education", 5000, month, year),
                    new Budget(null, "Utilities", 2000, month, year)
                ));

                System.out.println("✅ Sample finance data seeded successfully!");
            }
        };
    }
}
