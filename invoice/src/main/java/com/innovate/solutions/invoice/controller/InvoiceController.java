package com.innovate.solutions.invoice.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.innovate.solutions.invoice.model.Client;
import com.innovate.solutions.invoice.model.Invoice;
import com.innovate.solutions.invoice.model.InvoiceItem;
import com.innovate.solutions.invoice.service.ClientService;
import com.innovate.solutions.invoice.service.InvoiceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/invoices")
public class InvoiceController {

  private static final Logger logger = LoggerFactory.getLogger(InvoiceController.class);

  @Autowired
  private InvoiceService invoiceService;

  @Autowired
  private ClientService clientService;

  @PostMapping("/generate")
  public Invoice generateInvoice(@RequestParam String clientId, @RequestBody List<InvoiceItem> items) {
    logger.info("Handling generateInvoice request", clientId, items);
    Client client = clientService.getClientById(clientId);
    return invoiceService.generateInvoice("INV" + System.currentTimeMillis(), client, items);
  }

  @GetMapping
  public List<Invoice> getAllInvoices() {
    logger.info("Handling getAllInvoices request");
    return invoiceService.getAllInvoices();
  }

  @GetMapping("/{invoiceId}")
  public Invoice getInvoice(@PathVariable String invoiceId) {
    logger.info("Handling getInvoice request", invoiceId);
    return invoiceService.getInvoiceById(invoiceId);
  }
}
