package com.innovate.solutions.invoice.service;

import com.innovate.solutions.invoice.controller.ClientController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.innovate.solutions.invoice.model.Client;
import com.innovate.solutions.invoice.repository.ClientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ClientService {

  private static final Logger logger = LoggerFactory.getLogger(ClientService.class);

  @Autowired
  private ClientRepository clientRepository;

  public Client registerClient(Client client) {
    logger.info("Handling registerClient request", client);
    return clientRepository.save(client);
  }

  public List<Client> getAllClients() {
    logger.info("Handling getAllClients request");
    return clientRepository.findAll();
  }

  public Client getClientById(String clientId) {
    logger.info("Handling getClientById request", clientId);
    return clientRepository.findById(clientId).orElse(null);
  }
}
