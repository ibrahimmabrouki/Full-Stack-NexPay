# NexPay - Digital Wallet Platform

## Overview
NexPay is a full-stack fintech digital wallet application built with Next.js (App Router) and TypeScript. Designed to simplify multi-currency digital finance, the platform allows users to securely manage their funds, perform instant peer-to-peer transfers, execute real-time currency conversions, and deposit money via Stripe. It also provides platform operators with a comprehensive administrative dashboard for user management, transaction oversight, and exchange rate control.

## Features

### User Features
*   **Wallet Management**: View and manage multi-currency balances in real-time.
*   **Stripe Deposits**: Securely fund wallets using debit/credit cards via Stripe Checkout.
*   **Peer-to-Peer Transfers**: Send money instantly to other users on the platform.
*   **Currency Conversion**: Convert between supported currencies using current exchange rates.
*   **Transaction History**: Browse past transactions seamlessly with infinite scrolling.
*   **Notifications**: Receive updates regarding incoming transfers and platform announcements.

### Admin Features
*   **User Management**: Monitor and manage user accounts across the platform.
*   **Deposit Monitoring**: Track and verify user deposit statuses.
*   **Transaction Tracking**: Maintain comprehensive oversight of all platform transfers and conversions.
*   **Exchange Rate Control**: Manage currency exchange rates manually or systemically.
*   **Announcements**: Broadcast important system-wide messages to all users.

## Tech Stack
*   **Frontend**: Next.js (App Router), React, TypeScript
*   **Styling**: Tailwind CSS
*   **API Client**: Axios
*   **Payments**: Stripe Integration
*   **Backend**: REST API built with Fastify and Prisma ORM

## Architecture & Data Flow
The project is built on a clean separation of concerns, dividing the application into distinct layers to improve maintainability and scalability:

*   **Pages & Routing**: Leveraging the Next.js App Router, pages are strictly organized by domain:
    *   `(auth)`: Handles authentication flows (login, registration).
    *   `(dashboard)`: Contains all user-facing wallet functionality (deposit, pay, convert, transactions, notifications).
    *   `(admin)`: Protected routes dedicated to administrative controls.
*   **UI Components**: Reusable, stateless React components styled with Tailwind CSS.
*   **Hooks**: Custom React hooks encapsulate complex logic and side effects, separating UI from business logic. 
*   **Service Layer**: A dedicated module for all external API communications (Axios calls), isolating network requests from UI components.
*   **State Management**: Global application state is managed cleanly using centralized stores (`authStore`, `walletStore`, `notificationStore`).

**Data Flow**: UI Components trigger user actions ➡️ Custom Hooks process the logic ➡️ Service Layer makes REST API requests ➡️ Global Stores update upon success ➡️ UI re-renders with new state.

## Folder Structure
```text
src/
├── app/
│   ├── (auth)/             # Authentication pages
│   ├── (dashboard)/        # User-facing wallet pages
│   └── (admin)/            # Administrative control pages
├── components/             # Reusable, stateless UI elements
├── hooks/                  # Custom React hooks
├── services/               # API clients and network requests
├── store/                  # Global state management modules
├── types/                  # TypeScript interfaces and types
└── utils/                  # Helper functions and constants
```

## Key Hooks & Services

### Hooks
*   `useAuth`: Manages the user's authentication state, session token, and login/logout functions.
*   `useWallet`: Retrieves and mutates the user's current multi-currency wallet balances.
*   `useTransactions`: Handles data fetching for standard transaction lists.
*   `useInfiniteQuery`: A utility hook to manage paginated API fetching for the infinite scrolling transaction history.

### Services
*   `authService`: Manages API interactions for registration, login, and session validation.
*   `walletService`: Handles API calls for balance inquiries and currency conversion requests.
*   `stripeService`: Communicates with the backend to initialize Stripe checkout sessions.
*   `adminService`: Dedicated endpoints for administrative actions (e.g., fetching all users, updating rates).

## Stripe Integration Flow
NexPay leverages Stripe for secure, frictionless user deposits using Checkout Sessions and Webhooks:

1.  **Session Creation**: A user inputs a deposit amount. The frontend (`stripeService`) calls the backend API to generate a Stripe Checkout Session.
2.  **Checkout Redirect**: The user is temporarily redirected to a secure Stripe-hosted payment page.
3.  **Return Routing**:
    *   **Success**: The user is redirected back to `/transactions?session_id={CHECKOUT_SESSION_ID}`. The frontend queries the backend to verify the session and reflects the pending or completed deposit.
    *   **Cancel**: If the user aborts, they are redirected to `/deposit?cancel=true&topup_id={INTENT_ID}`, allowing them to retry the payment.
4.  **Webhook Processing**: Stripe sends an asynchronous webhook event to the Fastify backend. The backend verifies the signature, processes the successful payment, and updates the user's wallet balance in the database.

## Getting Started

### Prerequisites
*   Node.js (v18+)
*   npm, yarn, or pnpm
*   Running instance of the Fastify/Prisma backend
*   Stripe Developer Account

### Environment Variables
Create a `.env.local` file in the root of your project and add the following keys:

```env
# API and App URLs
NEXT_PUBLIC_API_URL=http://localhost:5000/api/

```

### Installation
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd nexpay-frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Access the application at `http://localhost:3000`.

## Future Improvements
*   **Real-Time Notifications**: Implement WebSockets to deliver instant updates for peer-to-peer transfers and admin announcements.
*   **Performance Optimizations**: Integrate frontend caching and deeper component-level code splitting to improve initial load times.
*   **Analytics Dashboards**: Add data visualization libraries to provide users with spending graphs and admins with platform growth metrics.
