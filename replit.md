# Overview

This is a full-stack corporate website for SUMERICA, a Chilean industrial supplier specializing in HVAC/climatization and telecommunications equipment. The application is built with React frontend and Express backend, targeting both B2B corporate clients (mining/construction companies) and B2C customers. The site features a product catalog, quote generation system, and contact functionality with a modern, professional design using SUMERICA's yellow and black branding.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript and Vite for development/build tooling
- **Routing**: Wouter for client-side routing (lightweight alternative to React Router)
- **State Management**: React Context for quote cart functionality, React Query for server state
- **UI Components**: Shadcn/ui component library built on Radix UI primitives
- **Styling**: Tailwind CSS with custom CSS variables for theming, Montserrat font family
- **Forms**: React Hook Form with Zod validation for type-safe form handling

## Backend Architecture
- **Framework**: Express.js with TypeScript
- **Database ORM**: Drizzle ORM with PostgreSQL dialect for type-safe database operations
- **Storage**: Currently using in-memory storage with interface pattern for easy database migration
- **API Design**: RESTful endpoints for products, quotes, and contacts
- **Validation**: Zod schemas shared between frontend and backend for consistent validation

## Database Schema
The application defines four main entities:
- **Users**: Basic user authentication (id, username, password)
- **Products**: Product catalog (id, name, category, brand, description, imageUrl, code)
- **Quotes**: Quote requests (id, customer info, products array, status, timestamp)
- **Contacts**: Contact form submissions (id, name, email, subject, message, timestamp)

## Key Features
- **Product Catalog**: Searchable and filterable product listings with category/brand filters
- **Quote System**: Shopping cart-like functionality for building quote requests
- **Contact Forms**: Both general contact and quote-specific forms
- **Responsive Design**: Mobile-first approach with desktop optimizations
- **Performance**: Image optimization, lazy loading, and efficient state management

## Design Patterns
- **Component Composition**: Reusable UI components following single responsibility principle
- **Hook Pattern**: Custom hooks for cart management and mobile detection
- **Provider Pattern**: Context providers for global state (quote cart, toast notifications)
- **Repository Pattern**: Storage interface allows switching between in-memory and database storage

# External Dependencies

## Core Dependencies
- **@neondatabase/serverless**: PostgreSQL database connectivity optimized for serverless
- **@tanstack/react-query**: Server state management and caching
- **@radix-ui/***: Headless UI component primitives for accessibility
- **drizzle-orm**: Type-safe ORM for PostgreSQL with Zod integration
- **react-hook-form**: Performant form library with minimal re-renders
- **wouter**: Lightweight routing library for React

## Development Tools
- **Vite**: Fast development server and build tool
- **TypeScript**: Static typing for better developer experience
- **Tailwind CSS**: Utility-first CSS framework
- **ESBuild**: Fast JavaScript bundler for production builds

## UI/UX Libraries
- **class-variance-authority**: Type-safe component variants
- **clsx & tailwind-merge**: Conditional CSS class composition
- **lucide-react**: Consistent icon set
- **embla-carousel-react**: Touch-friendly carousel component

## Validation & Forms
- **zod**: Schema validation library
- **@hookform/resolvers**: React Hook Form integration with Zod
- **drizzle-zod**: Generate Zod schemas from Drizzle database schemas

The application is configured for deployment on Replit with development-specific tooling and optimizations for the platform's environment.