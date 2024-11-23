package com.innovate.solutions.invoice.repository;

import com.innovate.solutions.invoice.model.Client;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ClientRepository extends MongoRepository<Client, String> {
}
