package com.example.financetracker.service;

import com.example.financetracker.model.Transaction;
import com.example.financetracker.model.TransactionType;
import com.example.financetracker.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TransactionService {

    private final TransactionRepository transactionRepository;

    @Autowired
    public TransactionService(TransactionRepository transactionRepository) {
        this.transactionRepository = transactionRepository;
    }

    public List<Transaction> getAllTransactions() {
        return transactionRepository.findAllByOrderByDateDesc();
    }

    public Optional<Transaction> getTransactionById(Long id) {
        return transactionRepository.findById(id);
    }

    public List<Transaction> getTransactionsByMonthAndYear(int month, int year) {
        return transactionRepository.findByMonthAndYear(month, year);
    }

    public List<Transaction> getTransactionsByType(TransactionType type) {
        return transactionRepository.findByTypeOrderByDateDesc(type);
    }

    public List<Transaction> getTransactionsByCategory(String category) {
        return transactionRepository.findByCategoryIgnoreCaseOrderByDateDesc(category);
    }

    public Transaction saveTransaction(Transaction transaction) {
        return transactionRepository.save(transaction);
    }

    public Transaction updateTransaction(Long id, Transaction transactionDetails) {
        Transaction transaction = transactionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Transaction not found with id " + id));
        transaction.setTitle(transactionDetails.getTitle());
        transaction.setAmount(transactionDetails.getAmount());
        transaction.setType(transactionDetails.getType());
        transaction.setCategory(transactionDetails.getCategory());
        transaction.setDate(transactionDetails.getDate());
        transaction.setNote(transactionDetails.getNote());
        return transactionRepository.save(transaction);
    }

    public void deleteTransaction(Long id) {
        transactionRepository.deleteById(id);
    }

    public double calculateTotalIncome(int month, int year) {
        return transactionRepository.findByTypeAndMonthAndYear(TransactionType.INCOME, month, year)
                .stream()
                .mapToDouble(Transaction::getAmount)
                .sum();
    }

    public double calculateTotalExpense(int month, int year) {
        return transactionRepository.findByTypeAndMonthAndYear(TransactionType.EXPENSE, month, year)
                .stream()
                .mapToDouble(Transaction::getAmount)
                .sum();
    }
}
