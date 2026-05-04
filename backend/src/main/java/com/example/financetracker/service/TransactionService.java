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

    @Autowired
    private TransactionRepository repo;

    public List<Transaction> getAll() { return repo.findAllByOrderByDateDesc(); }

    public Optional<Transaction> getById(Long id) { return repo.findById(id); }

    public List<Transaction> getByMonthAndYear(int month, int year) {
        return repo.findByMonthAndYear(month, year);
    }

    public List<Transaction> getByType(TransactionType type) {
        return repo.findByTypeOrderByDateDesc(type);
    }

    public List<Transaction> getByCategory(String category) {
        return repo.findByCategoryIgnoreCaseOrderByDateDesc(category);
    }

    public Transaction save(Transaction t) { return repo.save(t); }

    public void delete(Long id) { repo.deleteById(id); }

    public double getTotalByTypeAndMonth(TransactionType type, int month, int year) {
        return repo.findByTypeAndMonthAndYear(type, month, year)
                .stream().mapToDouble(Transaction::getAmount).sum();
    }
}
