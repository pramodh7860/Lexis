# Lexis CLM — Project Walkthrough

Lexis is a premium **Contract Lifecycle Management (CLM)** platform designed for legal and finance teams. It automates the journey of a contract from an initial request to a signed, active agreement.

## 1. User Roles & Permissions
The system uses **Role-Based Access Control (RBAC)** to ensure the right people see the right data:

| Role | Capabilities |
| :--- | :--- |
| **User** | Create new contracts, view contract lists, upload new document versions, and add comments. |
| **Manager** | Everything a User can do, plus: Access the Analytics Dashboard and **Approve/Reject** contracts in the pipeline. |
| **Admin** | Full system access, including the **User Management** portal to promote/demote users or revoke access. |

---

## 2. The Contract Lifecycle
A contract in Lexis moves through five distinct stages:

1.  **Draft**: The initial phase where a user fills in details, selects templates, and attaches initial files.
2.  **Review**: Legal or finance teams review the clauses and flag any risks.
3.  **Approval**: The contract sits in the manager's queue. **This is where you are currently testing.**
4.  **Execution**: The contract is sent for signature.
5.  **Active**: The contract is fully signed and its obligations are being tracked.

---

## 3. The Approval Workflow (Your Question)
You asked: *"Why am I approving it? The other user should approve it."*

In a real environment, **User A** (Requestor) creates the contract, and **User B** (Manager) receives an alert to approve it. 

### How to test this:
1.  **Create a 'User'**: Go to the **Users** tab (as Admin) and invite a new person with the **User** role.
2.  **Logout / Login as User**: Log out and log back in as that new 'User'.
3.  **Create Contract**: As the User, create a contract. You will notice you **cannot** approve it. You can only see its status.
4.  **Login as Admin/Manager**: Log back in as yourself. Now you will see the **Approve** button for that contract because you have the authority to advance it.

---

## 4. Technical Architecture
- **Frontend**: React.js with a custom CSS design system ("Bloomberg meets Vogue").
- **Backend**: Node.js & Express.
- **Database**: MongoDB (Atlas).
- **File Storage**: Local `uploads/` folder on the server (managed via `multer`).
- **Session**: Persisted via `localStorage`.

## 5. Key Features You've Built
- **Dynamic Action Bar**: The buttons in the contract detail page change based on the contract's stage and your user role.
- **Activity Timeline**: Every action (creation, upload, approval) is logged with a timestamp and user initials.
- **Risk Detection**: Clauses are flagged as "Approved" (green) or "Flagged" (red) for manual review.
- **Document Versioning**: You can upload "v2.0" or "v3.0" of a contract, and the system keeps the old versions accessible.

---

### Pro-Tip for Testing
Open two different browsers (e.g., Chrome and Edge). Log in as a **User** in one and as an **Admin** in the other. When the User creates a contract, you can refresh the Admin's page to see the new request appear for approval!
