package com.example.financetracker.config;

import com.example.financetracker.model.Budget;
import com.example.financetracker.model.Transaction;
import com.example.financetracker.model.TransactionType;
import com.example.financetracker.repository.BudgetRepository;
import com.example.financetracker.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;

@Component
public class DataSeeder implements CommandLineRunner {

    private final BudgetRepository budgetRepository;
    private final TransactionRepository transactionRepository;

    @Autowired
    public DataSeeder(BudgetRepository budgetRepository, TransactionRepository transactionRepository) {
        this.budgetRepository = budgetRepository;
        this.transactionRepository = transactionRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        LocalDate today = LocalDate.now();
        int currentMonth = today.getMonthValue();
        int currentYear = today.getYear();

        // Seed default budget limits if none exist
        if (budgetRepository.count() == 0) {
            List<Budget> defaultBudgets = Arrays.asList(
                new Budget("Food", 8000.0, currentMonth, currentYear),
                new Budget("Housing", 25000.0, currentMonth, currentYear),
                new Budget("Transport", 5000.0, currentMonth, currentYear),
                new Budget("Health", 4000.0, currentMonth, currentYear),
                new Budget("Entertainment", 6000.0, currentMonth, currentYear),
                new Budget("Utilities", 7000.0, currentMonth, currentYear),
                new Budget("Shopping", 10000.0, currentMonth, currentYear)
            );
            budgetRepository.saveAll(defaultBudgets);
            System.out.println("Seeded default budgets for month: " + currentMonth + ", year: " + currentYear);
        }

        // Seed sample transactions if none exist
        if (transactionRepository.count() == 0) {
            List<Transaction> defaultTransactions = Arrays.asList(
                new Transaction("Monthly Salary", 75000.0, TransactionType.INCOME, "Salary", today.withDayOfMonth(1), "Direct deposit from office"),
                new Transaction("Freelance Website Design", 15000.0, TransactionType.INCOME, "Freelance", today.withDayOfMonth(5), "Completed landing page design"),
                new Transaction("House Rent", 22000.0, TransactionType.EXPENSE, "Housing", today.withDayOfMonth(2), "Rent for current month"),
                new Transaction("Supermarket Grocery", 4500.0, TransactionType.EXPENSE, "Food", today.withDayOfMonth(3), "Weekly groceries"),
                new Transaction("Monthly Electricity Bill", 3200.0, TransactionType.EXPENSE, "Utilities", today.withDayOfMonth(4), "Power utility bill payment"),
                new Transaction("Gas Station Fuel", 1500.0, TransactionType.EXPENSE, "Transport", today.withDayOfMonth(7), "Car petrol tank fill"),
                new Transaction("Movie Tickets & Popcorn", 1200.0, TransactionType.EXPENSE, "Entertainment", today.withDayOfMonth(10), "Weekend outing"),
                new Transaction("New Running Shoes", 4500.0, TransactionType.EXPENSE, "Shopping", today.withDayOfMonth(12), "Sportswear sale"),
                new Transaction("General Health Checkup", 1800.0, TransactionType.EXPENSE, "Health", today.withDayOfMonth(15), "Routine dental clean & checkup"),
                new Transaction("Stock Dividend", 2500.0, TransactionType.INCOME, "Investment", today.withDayOfMonth(18), "Quarterly payout from stocks")
            );
            transactionRepository.saveAll(defaultTransactions);
            System.out.println("Seeded sample transactions for month: " + currentMonth + ", year: " + currentYear);
        }
    }
}
