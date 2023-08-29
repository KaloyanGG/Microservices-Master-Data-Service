Scenario: 

Organization ABC Corp. is a tyre manufacturing company. This organization has details of all the buyers (Master data) for ex. Organization XYZ a car manufacturing company which buys tyres from ABC Corp. Once the sales invoice is issued, ABC Corp updates its accounts accordingly and sends the invoice details over a mail to XYZ company’s registered email Id.  

Summary on each microservice: 

Master Data service 

You will have a master data service, which will have seller and buyer information. like Organization Name, Registration ID, Date of registration, contact No, email Id. 

 

HTTP Operations: 

POST – Add new entry Organisation 

GET – Get master data based on registration Id 

 

Consignment service 

Captures the transactions carried out, for example sales or purchase of goods. 

For simplicity let us only focus on sales of goods as part of this assignment. To further simplify let us only take scenario of issuing an invoice. With Below format. 

 

Invoice Header (1…1) 

Invoice Number 

Invoice Date 

Item_amount 

Invoice Amount 

Invoice Line Item (1…N) 

Item Number 

Quantity 

Item amount 

This service will persist the invoice details(synchronous) and in asynchronous fashion it will make a call to another micro service to update the ledger accounts and finally send invoice details to buyer email Id 

 

HTTP Operations: 

POST – Persist new invoice 

GET – Get Invoice based on Invoice Number 

 

Accounts service 

Simple service depicting the cash balance of Seller (Invoice issuer +) and buyer (receiver -) 

 

For sending mail we will be using SAP Cloud Platform Integration (SCPI) Mail Adapter, if you prefer to use Gmail SMTP server refer below document for configuration and testing it from SCPI 

  

Ensure to write unit tests. 

![alt text](https://github.com/KaloyanGG/Microservices-Master-Data-Service/blob/main/schema.png?raw=true)
