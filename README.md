# React Events - A React Query Demo

This project is a simple event management application built to demonstrate the core features of the TanStack React Query library. It allows users to view, create, and manage events, with a focus on efficient data fetching, caching, and state synchronization with a backend server.

## ✨ Features

- **View a list of events:** Fetches and displays a list of available events.
- **View event details:** Shows detailed information for a specific event.
- **Create new events:** A form to add new events to the list.
- **Edit and delete events:** Modify or remove existing events.

## 🚀 Tech Stack

- **Frontend:**
  - [React](https://reactjs.org/)
  - [Vite](https://vitejs.dev/)
  - [React Router](https://reactrouter.com/) for routing
  - [TanStack React Query](https://tanstack.com/query/latest) for server state management

## ⚙️ Getting Started

To get a local copy up and running, follow these simple steps.

### Installation

1.  Clone the repo:
    ```sh
    git clone https://github.com/natata08/react-events.git
    ```
2.  Navigate to the project directory:
    ```sh
    cd react-events
    ```
3.  Install NPM packages for the frontend:
    ```sh
    npm install
    ```

### Running the Application

1.  Start the frontend development server:
    ```sh
    npm run dev
    ```
2.  Open your browser and navigate to `http://localhost:5173` (or the address shown in your terminal).

## ⚛️ React Query in Action

This project heavily utilizes React Query to manage server state. Here's how:

- **`useQuery` for Data Fetching:** The `useQuery` hook is used to fetch data like the list of all events or the details of a single event. React Query automatically handles caching, background refetching, and stale data management, which simplifies the code and improves user experience.

- **`useMutation` for Data Modification:** For creating, updating, and deleting events, the `useMutation` hook is employed. This hook provides a simple and declarative way to handle side effects and server state changes.

- **Query Invalidation:** After a successful mutation (e.g., creating a new event), query invalidation is used to tell React Query that certain data is stale. This triggers an automatic refetch of the affected queries, ensuring that the UI always displays the most current data from the server.

- **Optimistic Updates:** To make the UI feel instantaneous, optimistic updates are implemented for some mutations. When a user performs an action (like deleting an event), the UI is updated immediately, even before the server confirms the change. If the server request fails, the UI is rolled back to its previous state. This is a powerful feature of React Query that significantly enhances the perceived performance of the application.
