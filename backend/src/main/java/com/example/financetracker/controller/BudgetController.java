package com.example.financetracker.controller;

import com.example.financetracker.model.Budget;
import com.example.financetracker.service.BudgetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/budgets")
@CrossOrigin(origins = "http://localhost:5174")
public class BudgetController {

    @Autowired
    private BudgetService service;

    @GetMapping
    public List<Budget> getByMonth(@RequestParam int month, @RequestParam int year) {
        return service.getByMonthAndYear(month, year);
    }

    @PostMapping
    public Budget create(@RequestBody Budget budget) { return service.save(budget); }

    @PutMapping("/{id}")
    public ResponseEntity<Budget> update(@PathVariable Long id, @RequestBody Budget budget) {
        budget.setId(id);
        return ResponseEntity.ok(service.save(budget));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
