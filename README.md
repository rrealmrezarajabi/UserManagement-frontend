# User Management Dashboard

A React + TypeScript admin panel for managing users. Built with Vite, React Query, and Tailwind CSS.

## What it does

- Login/logout with JWT tokens stored in localStorage
- Protected routes that redirect to login if you're not authenticated
- Full CRUD for users (create, read, update, delete)
- User list with pagination and search (debounced)
- Dashboard with some basic stats and charts
- User detail page showing all user info

## Tech stack

- React 19
- TypeScript
- Vite
- React Router 7
- React Query (TanStack Query) for API calls and caching
- React Hook Form for forms
- Axios for HTTP requests
- Tailwind CSS 4

## Setup

```bash
npm install
```

Create a `.env` file:

```
VITE_API_BASE_URL=http://localhost:3000
```

Run dev server:

```bash
npm run dev
```

Build:

```bash
npm run build
```

## Project structure

```
src/
├── api/              # API calls (authApi, userApi)
├── components/       # NavBar, SideBar
├── features/         # Organized by feature
│   ├── auth/         # Login, AuthContext, useAuth hook
│   ├── dashboard/    # HomePage with stats
│   └── users/        # User CRUD pages and hooks
├── layout/           # MainLayout, DashBoardLayout
├── routes/           # AppRoute, ProtectedRoute
├── types/            # TypeScript types
└── utils/            # Helper functions
```

## How it works

### Authentication

- Login form sends credentials to `/auth/login`
- Token gets saved to localStorage
- `AuthContext` manages auth state globally
- `ProtectedRoute` checks if user is logged in before rendering
- If not authenticated, redirects to `/login`

### User management

- List page fetches users with pagination (10 per page)
- Search is debounced by 1 second
- Create/Edit forms use React Hook Form
- After mutations, React Query invalidates the cache to refetch data
- Delete works with optimistic updates

### State management

- React Query handles all server state (users, auth)
- AuthContext for authentication state
- Local state (useState) for UI stuff like search input, page number

## API endpoints needed

The backend should have:

- `POST /auth/login` - returns `{ user, token }`
- `GET /auth/me` - returns current user
- `GET /users?page=1&limit=10&q=search` - paginated user list
- `GET /users/:id` - single user
- `POST /users` - create user
- `PUT /users/:id` - update user
- `DELETE /users/:id` - delete user

All authenticated requests need `Authorization: Bearer <token>` header. Axios interceptor handles this automatically.

## What I learned/built

- Set up React Query for API calls and caching
- Implemented protected routes with React Router
- Used React Hook Form for form handling
- Created reusable components (NavBar, SideBar, layouts)
- Organized code by features instead of file types
- Added TypeScript types for everything
- Built a simple dashboard with stats and charts (no chart library, just CSS)
- Handled loading and error states
- Debounced search input
- Used Axios interceptors for auth tokens

## Things that could be improved

- Add tests (Vitest + React Testing Library)
- Token refresh logic
- Better error handling/toast notifications
- More robust form validation
- Loading skeletons instead of just "Loading..."
- Dark mode maybe
- Export to CSV functionality

## Notes

- The dashboard chart is a simple CSS bar chart, no external library
- Search debounce is 1 second
- Pagination is 10 items per page
- Token is stored in localStorage (not the most secure, but works for this project)
