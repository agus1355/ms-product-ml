# Prompts

## Principal Prompt / Context

```
I'm building a backend API using NestJS following a Hexagonal Architecture (Ports & Adapters).
The project structure separates layers as follows:

- Domain Layer: Contains core business logic, domain entities, and value objects. All domain models should encapsulate rules and be immutable when appropriate.
- Application Layer: Implements use cases or services that orchestrate domain logic without depending on infrastructure.
- Infrastructure Layer: Contains adapters for repositories, databases, caching, and external services. The domain layer should never depend directly on infrastructure.
- Presentation Layer: REST controllers or GraphQL resolvers exposing the API endpoints.

The code should follow:
- Domain-Driven Design (DDD) principles.
- Clean, maintainable, and testable code patterns.
- Proper typing and use of readonly attributes for immutable objects.
- Optional integration with Swagger (OpenAPI) for documenting endpoints.

Write code in a clean, professional way, with clear naming, consistent formatting, and minimal boilerplate.
You can assume the use of TypeScript and NestJS best practices.

Use this context as a basis for any further request to:
- Define domain classes
- Create repositories or repository interfaces
- Implement functions or calculations
- Build ViewModels with Swagger decorators
- Add DTOs or validation where needed
```

## Common Coding Prompts

1. **Repository Interface Prompt**

```
Create a repository interface for [EntityName] with methods: [Method1], [Method2], [Method3]. Follow Hexagonal Architecture principles.
```

2. **Function Implementation Prompt**

```
Write a function that calculates [specific calculation]. Ensure proper typing, immutability if needed, and include any relevant error handling.
```

3. **Domain Class Prompt**

```
Create a domain class named [ClassName] with the following readonly attributes: [Attribute1], [Attribute2], [Attribute3]. Include constructor and ensure immutability. Follow DDD principles.
```

4. **ViewModel / DTO Prompt**

```
Create a ViewModel or DTO for [EntityName] using NestJS and Swagger decorators. Include validation decorators where appropriate and map from the domain entity.
```

5. **General Prompt Usage**

```
Always prepend these prompts with the Principal Context. Include any relevant constraints, business rules, or examples when necessary.
```
