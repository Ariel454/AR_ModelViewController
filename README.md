# CreateForm and ApproveInvoices Components Refactored

This repository contains a refactored CreateForm component for creating invoices in a React application. The refactor adheres to SOLID principles and employs design patterns to improve code maintainability, modularity, and extensibility.

## Table of Contents
- Overview
- SOLID Principles
- Design Patterns
- Implementation

## Overview

The CreateInvoiceForm component is responsible for creating invoices by submitting data to an API. The refactored version follows SOLID principles and uses design patterns such as the Repository Pattern, Service Pattern, Facade Pattern, Strategy Pattern, Command Pattern, and Observer Pattern to separate concerns and improve the overall structure of the code.

## SOLID Principles

### Single Responsibility Principle (SRP)

The refactored component separates the concerns of presentation, business logic, and data access:

- **Presentation**: Handled by the React component.
- **Business Logic**: Encapsulated in service classes.
- **Data Access**: Managed by repository classes.

### Dependency Inversion Principle (DIP)

The refactored component depends on abstractions rather than concrete implementations. This is achieved through the use of interfaces for data access.

### Other Relevant Principles

- **Open/Closed Principle (OCP)**: New functionality can be added without modifying existing code, thanks to the use of design patterns.
- **Liskov Substitution Principle (LSP)**: Derived classes can be substituted for their base classes without affecting the correctness of the program.

## Design Patterns

### Repository Pattern

The Repository Pattern is used to centralize data access logic:

- **InvoiceRepository**: Interface defining data access methods.
- **ApiInvoiceRepository**: Concrete implementation of InvoiceRepository that interacts with the API.

### Service Pattern

The Service Pattern encapsulates business logic related to invoices:

- **InvoiceService**: Contains methods for creating invoices and relies on InvoiceRepository for data access.

### Facade Pattern

The Facade Pattern simplifies interactions with the underlying systems:

- **InvoiceFacade**: Provides a simplified interface for fetching and updating invoices, hiding the complexity of the underlying API calls.
![image](https://github.com/user-attachments/assets/33d5e64b-ad47-401b-ab3e-acb675e471c4)

### Strategy Pattern

The Strategy Pattern allows for interchangeable algorithms for bonus calculations:

- **BonusStrategy**: Interface defining methods for bonus calculation.
- **BasicBonusStrategy / PremiumBonusStrategy**: Concrete implementations of BonusStrategy for different bonus logic.
![image](https://github.com/user-attachments/assets/630a501b-932a-48c1-ab71-c29a799478ad)
### Command Pattern

The Command Pattern encapsulates actions as objects, allowing for parameterization and queuing of operations:

- **ApproveInvoiceCommand**: Command for approving an invoice.
- **DenyInvoiceCommand**: Command for denying an invoice.
![image](https://github.com/user-attachments/assets/0e382b9c-2449-4172-a223-6633acf8b288)

### Observer Pattern

The Observer Pattern enables a subscription mechanism to notify observers of changes:

- **InvoiceObserver**: Observes changes in invoice states.
- **InvoiceSubject**: Manages observers and notifies them of changes.
![image](https://github.com/user-attachments/assets/0b5e9b24-ea8c-4e65-9d8c-43c81275b97c)


## Implementation

The following diagram illustrates the structure and relationships among the various components:

![image](https://github.com/user-attachments/assets/5a4846bb-a95a-4d5e-a52a-234774d6d967)






This structure ensures that the CreateInvoiceForm and ApproveInvoices components are robust, maintainable, and adaptable to future changes in requirements.


# AR_ModelViewController

En esta aplicación que utiliza Express.js y React, se implementa el patrón Modelo-Vista-Controlador (MVC) para gestionar la autenticación de usuarios. El proceso comienza cuando el usuario interactúa con la interfaz de usuario, ingresando sus credenciales en el "Login View". 
Estas credenciales se envían como una solicitud HTTP a través de la API proporcionada por Express.js. El controlador, denominado "UserController", recibe y procesa esta solicitud, pasando las credenciales al modelo de autenticación, el "AuthModel". 
Este último verifica las credenciales consultando la base de datos y, si son válidas, genera un token de autenticación que se devuelve al "UserController". Finalmente, el "UserController" envía la respuesta al "Login View", proporcionando un mensaje de éxito o error según el resultado de la autenticación. Este enfoque sigue los principios de separación de responsabilidades y facilita la escalabilidad y el mantenimiento del sistema.
![image](https://github.com/Ariel454/AR_ModelViewController/assets/121766763/edff7b45-1bac-4f5c-8806-36fa6b9bc5c0)
