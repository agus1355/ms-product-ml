# Products API

## Architecture Overview

This project follows a **Hexagonal Architecture (Ports & Adapters)** approach to separate business logic from infrastructure.

* **Domain Layer:** Contains core business logic, entities (e.g., `Offer`, `Product`), and value objects. It also includes repository interfaces, which are implemented in the infrastructure layer.
* **Application Layer / Use Cases:** Layer responsible for orchestrating the steps necessary to fulfill a functionality. Delegates its responsibilities to services or repositories.
* **Infrastructure Layer:** Includes repositories for database, external services, and caching.
* **Presentation Layer:** REST controllers exposing API endpoints.


### Core Domain Classes:

* **Product**: Contains all static information about a product, like name, description, and attributes. Multiple sellers can use the same product.
* **Offer**: Contains specific sale information for a product, like price, discounts, installment plans, and shipments. Allows each seller to create their own offers, enabling features like interest-free installments, faster shipping, or competition between sellers.

## Main Endpoints

* `GET /products/:id` – Get a product by ID.
* `GET /products/offers` – List all offers.
* `GET /products/:id/related` – List related product based on a specific product.
* `GET /products/:id/offers` – List offers for a specific product.
* `GET /products/:id/reviews` – List reviews for a specific product.
* Swagger UI: Available at `/api/docs` for interactive API exploration.

## Setup Instructions

Setup instructions are in RUN.md file.

## Key Architectural Decisions

* **Hexagonal Architecture:** Allows swapping repositories or external integrations without affecting the domain logic.
* **Domain-Driven Design:** Core entities like `Offer`, `Product`, and `Discount` encapsulate business rules.
* **Caching Strategy:** Optional caching layer to improve read performance, implemented via a repository adapter.

## Technology Stack (Backend)
* **Language:** TypeScript (Node.js)
* **Framework:** NestJS
* **Testing:** Jest
* **Containerization:** Docker & Docker Compose
* **API Documentation:** Swagger (via OpenAPI)

## The advantage of using GenAI and development tools
Generative AI tools are used to automate code generation, while engineers focus on reviewing, validating, and refining the implementation. This approach allows the team to dedicate more time to deeper analysis and architectural design, resulting in a more robust and well-adapted solution for the problem domain.