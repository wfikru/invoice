package com.innovate.solutions.invoice.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.innovate.solutions.invoice.model.Client;
import com.innovate.solutions.invoice.service.ClientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/clients")
public class ClientController {

  private static final Logger logger = LoggerFactory.getLogger(ClientController.class);

  @Autowired
  private ClientService clientService;

  @PostMapping("/register")
  public Client registerClient(@RequestBody Client client) {
    logger.info("Handling registerClient request", client);
    return clientService.registerClient(client);
  }

  @GetMapping
  public List<Client> getAllClients() {
    logger.info("Handling getAllClients request");
    return clientService.getAllClients();
  }

  @GetMapping("/{clientId}")
  public Client getClient(@PathVariable String clientId) {
    logger.info("Handling getClient request", clientId);
    return clientService.getClientById(clientId);
  }
}

