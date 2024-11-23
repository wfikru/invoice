package com.innovate.solutions.invoice.repository;

import com.innovate.solutions.invoice.model.Invoice;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface InvoiceRepository extends MongoRepository<Invoice, String> {
}
