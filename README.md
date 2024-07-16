# CreateInvoiceForm Component Refactor
This repository contains a refactored CreateInvoiceForm component for creating invoices in a React application. The refactor adheres to SOLID principles and employs design patterns to improve code maintainability, modularity, and extensibility.

Table of Contents
- Overview
- SOLID Principles
- Design Patterns
- Implementation


## Overview
The CreateInvoiceForm component is responsible for creating invoices by submitting data to an API. The refactored version follows SOLID principles and uses design patterns such as the Repository Pattern and Service Pattern to separate concerns and improve the overall structure of the code.

## SOLID Principles
Single Responsibility Principle (SRP)
The refactored component separates the concerns of presentation, business logic, and data access:

## Presentation: Handled by the React component.
Business Logic: Encapsulated in a service class.
Data Access: Managed by a repository class.
Dependency Inversion Principle (DIP)
The refactored component depends on abstractions rather than concrete implementations. This is achieved through the use of interfaces for data access.

## Design Patterns
# Repository Pattern
The Repository Pattern is used to centralize data access logic:

InvoiceRepository: Interface defining data access methods.
ApiInvoiceRepository: Concrete implementation of InvoiceRepository that interacts with the API.
# Service Pattern
The Service Pattern encapsulates business logic related to invoices:

InvoiceService: Contains methods for creating invoices and relies on InvoiceRepository for data access.

## Implementation
src/
│
├── components/
│   └── CreateInvoiceForm.tsx
│
├── services/
│   └── InvoiceService.ts
│
└── repositories/
    ├── InvoiceRepository.ts
    └── ApiInvoiceRepository.ts


# AR_ModelViewController

En esta aplicación que utiliza Express.js y React, se implementa el patrón Modelo-Vista-Controlador (MVC) para gestionar la autenticación de usuarios. El proceso comienza cuando el usuario interactúa con la interfaz de usuario, ingresando sus credenciales en el "Login View". 
Estas credenciales se envían como una solicitud HTTP a través de la API proporcionada por Express.js. El controlador, denominado "UserController", recibe y procesa esta solicitud, pasando las credenciales al modelo de autenticación, el "AuthModel". 
Este último verifica las credenciales consultando la base de datos y, si son válidas, genera un token de autenticación que se devuelve al "UserController". Finalmente, el "UserController" envía la respuesta al "Login View", proporcionando un mensaje de éxito o error según el resultado de la autenticación. Este enfoque sigue los principios de separación de responsabilidades y facilita la escalabilidad y el mantenimiento del sistema.
![image](https://github.com/Ariel454/AR_ModelViewController/assets/121766763/edff7b45-1bac-4f5c-8806-36fa6b9bc5c0)
