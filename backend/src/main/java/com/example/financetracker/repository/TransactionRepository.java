package com.example.financetracker.repository;

import com.example.financetracker.model.Transaction;
import com.example.financetracker.model.TransactionType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Long> {
    List<Transaction> findByTypeOrderByDateDesc(TransactionType type);
    List<Transaction> findAllByOrderByDateDesc();

    @Query("SELECT t FROM Transaction t WHERE MONTH(t.date) = :month AND YEAR(t.date) = :year ORDER BY t.date DESC")
    List<Transaction> findByMonthAndYear(int month, int year);

    @Query("SELECT t FROM Transaction t WHERE t.type = :type AND MONTH(t.date) = :month AND YEAR(t.date) = :year")
    List<Transaction> findByTypeAndMonthAndYear(TransactionType type, int month, int year);

    List<Transaction> findByCategoryIgnoreCaseOrderByDateDesc(String category);
}
