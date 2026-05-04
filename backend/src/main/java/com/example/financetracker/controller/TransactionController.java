package com.example.financetracker.controller;

import com.example.financetracker.model.Transaction;
import com.example.financetracker.model.TransactionType;
import com.example.financetracker.service.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/transactions")
@CrossOrigin(origins = "http://localhost:5174")
public class TransactionController {

    @Autowired
    private TransactionService service;

    @GetMapping
    public List<Transaction> getAll() { return service.getAll(); }

    @GetMapping("/{id}")
    public ResponseEntity<Transaction> getById(@PathVariable Long id) {
        return service.getById(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/month")
    public List<Transaction> getByMonth(@RequestParam int month, @RequestParam int year) {
        return service.getByMonthAndYear(month, year);
    }

    @GetMapping("/type/{type}")
    public List<Transaction> getByType(@PathVariable TransactionType type) {
        return service.getByType(type);
    }

    @GetMapping("/category/{category}")
    public List<Transaction> getByCategory(@PathVariable String category) {
        return service.getByCategory(category);
    }

    @GetMapping("/summary")
    public Map<String, Double> getSummary(@RequestParam int month, @RequestParam int year) {
        double income = service.getTotalByTypeAndMonth(TransactionType.INCOME, month, year);
        double expense = service.getTotalByTypeAndMonth(TransactionType.EXPENSE, month, year);
        return Map.of(
            "income", income,
            "expense", expense,
            "balance", income - expense
        );
    }

    @PostMapping
    public Transaction create(@RequestBody Transaction t) { return service.save(t); }

    @PutMapping("/{id}")
    public ResponseEntity<Transaction> update(@PathVariable Long id, @RequestBody Transaction t) {
        return service.getById(id).map(existing -> {
            t.setId(id);
            return ResponseEntity.ok(service.save(t));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
