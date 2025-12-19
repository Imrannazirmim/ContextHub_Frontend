# ContestHub

**ContestHub** is a modern, full-stack contest platform where creators can host paid creative contests, participants can register via secure Stripe payments, submit their work, and compete for cash prizes. Built with React, Vite, Tailwind CSS, Firebase Authentication, MongoDB, Express, and Stripe.

### Live Site URL

🔗 **https://contesthub.netlify.app**  
(Replace with your actual Netlify URL once deployed)

### Features

-   **User Authentication** – Secure login/register with Firebase Authentication (email/password) and protected routes for logged-in users.
-   **Browse & Search Contests** – View all confirmed contests with filtering by type, search by name/description, and pagination for smooth browsing.
-   **Popular Contests Section** – Homepage highlights the top 5 contests with the highest participant count.
-   **Contest Details Page** – Full contest information including prize money, deadline, task instructions, participant count, and registration status check.
-   **Secure Payment Integration** – Seamless Stripe Checkout for contest registration fees with automatic participant count increment on successful payment.
-   **Payment Success Handling** – Dedicated success page that confirms payment, registers the user as a participant, and auto-redirects.
-   **Dashboard for Users** – Private dashboard with sections for My Participated Contests, My Winning Contests, Payment History, and User Profile.
-   **Creator Dashboard** – Contest creators can create new contests, view/edit their pending contests, see submissions, and declare winners after the deadline.
-   **Admin Panel** – Admins can manage users (change roles), approve/reject contests, view analytics (revenue, total users, contests, participants), and manage all contests.
-   **Task Submission System** – Registered participants can submit (and update) their work for any contest they’ve paid for.
-   **Winner Declaration** – Creators declare winners from submissions; winner stats are updated and displayed publicly.
-   **Leaderboard** – Global ranking of users by number of wins, with search and pagination.
-   **Responsive & Modern UI** – Built with Tailwind CSS + daisyUI for a clean, mobile-friendly, and beautiful interface.
-   **Performance Optimized** – Code-splitting with React.lazy & Suspense, TanStack Query for efficient data fetching, and Vite for fast builds.
-   **Private & Admin Routes** – Role-based access control using custom hooks (PrivateRoute, AdminRoute) for secure navigation.

ContestHub brings creativity, competition, and fair rewards together in one powerful platform! 🚀
