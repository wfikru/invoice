package com.innovate.solutions.invoice.service;

import com.innovate.solutions.invoice.controller.ClientController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.innovate.solutions.invoice.model.Client;
import com.innovate.solutions.invoice.model.Invoice;
import com.innovate.solutions.invoice.model.InvoiceItem;
import com.innovate.solutions.invoice.repository.InvoiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Service
public class InvoiceService {

  private static final Logger logger = LoggerFactory.getLogger(InvoiceService.class);

  @Autowired
  private InvoiceRepository invoiceRepository;

  public Invoice generateInvoice(String invoiceNumber, Client client, List<InvoiceItem> items) {
    logger.info("Handling generateInvoice request", invoiceNumber,client,items);
    Invoice invoice = new Invoice();
    invoice.setInvoiceNumber(invoiceNumber);
    invoice.setClient(client);
    invoice.setItems(items);
    invoice.setDate(LocalDate.now());

    BigDecimal totalDue = items.stream()
        .map(InvoiceItem::getAmount)
        .reduce(BigDecimal.ZERO, BigDecimal::add);
    invoice.setTotalDue(totalDue);

    return invoiceRepository.save(invoice);
  }

  public List<Invoice> getAllInvoices() {
    logger.info("Handling getAllInvoices request");
    return invoiceRepository.findAll();
  }

  public Invoice getInvoiceById(String invoiceId) {
    logger.info("Handling getInvoiceById request", invoiceId);
    return invoiceRepository.findById(invoiceId).orElse(null);
  }
}

