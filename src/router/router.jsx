// routes.js
import { createBrowserRouter } from "react-router-dom";

import ProtectedRoute from "../auth/ProtectedRoute.jsx";
import UserProfilePage from "../page/user/UserProfilePage.jsx";
import UpdateCompanyPage from "../page/recruiter/UpdateCompanyPage.jsx";
import JobManagementPage from "../page/recruiter/JobManagementPage.jsx";
import JobForm from "../page/recruiter/JobForm.jsx";
import AdminLayout from "../layout/AdminLayout.jsx";
import LoginPage from "../page/auth/LoginPage.jsx";
import UnauthorizedPage from "../page/unauthorized/UnauthorizedPage.jsx";
import PageLayout from "../layout/PageLayout.jsx";
import RegisterPage from "../page/auth/RegisterPage.jsx";
import CallBack from "../page/auth/CallBack.jsx";
import NotFoundPage from "../page/not_found/NotFoundPage.jsx";
import JobPage from "../page/admin/JobPage.jsx";
import JobListPage from "../page/public/JobListPage.jsx";
import JobDetailPage from "../page/public/JobDetailPage.jsx";
import JobAppliedPage from "../page/user/JobAppliedPage.jsx";
import JobSavedPage from "../page/user/JobSavedPage.jsx";
import CompanyPage from "../page/public/CompanyPage.jsx";
import CompaniesPage from "../page/public/CompaniesPage.jsx";
import ApplicationPage from "../page/recruiter/ApplicationPage.jsx";
import ResumePage from "../page/user/ResumePage.jsx";
import UserProfileViewPage from "../page/user/UserProfileViewPage.jsx";
import InterviewSchedulePage from "../page/recruiter/InterviewSchedulePage.jsx";
import InterviewScheduleForm from "../page/recruiter/InterviewScheduleForm.jsx";
import ReportPage from "../page/admin/ReportPage.jsx";
import AccountsPage from "../page/admin/AccountsPage.jsx";
import PlanPage from "../page/admin/PlanPage.jsx";
import DashboardPage from "../page/admin/DashboardPage.jsx";
import AccountForm from "../page/user/AccountForm.jsx";
import SearchAIPage from "../page/public/SearchAIPage.jsx";
import ConversationPage from "../page/conversation/ConversationPage.jsx";
import ConversationDetail from "../page/conversation/ConversationDetail.jsx";
import NotificationPage from "../page/notification/NotificationPage.jsx";
import PricingPage from "../page/recruiter/PricingPage.jsx";
import PaymentSuccess from "../page/public/PaymentSuccess.jsx";
import PaymentFailed from "../page/public/PaymentFailed.jsx";
import PlanManagementPage from "../page/recruiter/PlanManagementPage.jsx";
import EmployerDashboard from "../page/recruiter/EmployerDashboard.jsx";
import TestRateLimit from "../page/auth/TestRateLimit.jsx";
import EmployerLayout from "../layout/EmployerLayout.jsx";
import SearchCandidatePage from "../page/recruiter/SearchCandidatePage.jsx";



const router = createBrowserRouter([
    {
        path: "/",
        element: <PageLayout />,
        children: [
            { path: "/",index:true, element: <JobListPage /> },
            { path: "/job-detail/:id", element: <JobDetailPage /> },
            { path: "/company/:id", element: <CompanyPage /> },
            { path: "/companies", element: <CompaniesPage /> },
            { path: "/sematic-search", element: <SearchAIPage /> },
            { path: "/test", element: <TestRateLimit /> },


            //{ path: "/",index: true, element: <HomePage /> },
            {
                element: <ProtectedRoute />,
                children: [
                    { path: "profile/user/:id", element: <UserProfileViewPage /> },

                ]


            },


            {
                element: <ProtectedRoute requiredRole="CANDIDATE" />,
                children: [
                    { path: "user-profile", element: <UserProfilePage /> },
                    { path: "update-account", element: <AccountForm /> },
                    { path: "applied-jobs", element: <JobAppliedPage /> },
                    { path: "saved-jobs", element: <JobSavedPage /> },
                    { path: "resumes", element: <ResumePage /> },
                    { path: "conversations", element: <ConversationPage /> },
                    { path: "candidate/conversation/:id", element: <ConversationDetail /> },
                    { path: "notifications", element: <NotificationPage /> },




                ],


            },






        ],
    },
    {
        path: "/recruiter",
        element: <EmployerLayout />,
        children: [
            {
                element: <ProtectedRoute requiredRole="EMPLOYER" />,
                children: [
                    { path: "profile", element: <UpdateCompanyPage /> },
                    { path: "jobs", element: <JobManagementPage /> },
                    { path: "applications", element: <ApplicationPage /> },
                    { path: "interview-schedule", element: <InterviewSchedulePage /> },
                    { path: "interview-schedule/create", element: <InterviewScheduleForm /> },
                    { path: "interview-schedule/edit/:id", element: <InterviewScheduleForm /> },
                    { path: "job/create", element: <JobForm /> },
                    { path: "job/edit/:id", element: <JobForm /> },
                    { path: "pricing", element: <PricingPage /> },
                    { path: "payment/success", element: <PaymentSuccess /> },
                    { path: "payment/cancel", element: <PaymentFailed /> },
                    { path: "plans", element: <PlanManagementPage /> },
                    { path: "dashboard", element: <EmployerDashboard /> },
                    { path: "conversations", element: <ConversationPage /> },
                    { path: "conversation/:id", element: <ConversationDetail /> },
                    { path: "notifications", element: <NotificationPage /> },
                    { path: "search-candidate", element: <SearchCandidatePage /> },

                ],
            },

        ],
    },

    {
        path: "/admin",
        element: <AdminLayout />,
        children: [
            {
                element: <ProtectedRoute requiredRole="ADMIN" />,
                children: [
                    { path: "dashboard", element: <DashboardPage /> },
                    { path: "jobs", element: <JobPage />},
                    { path: "users", element: <AccountsPage />},
                    { path: "packages", element: <PlanPage />},
                    { path: "reports", element: <ReportPage />}
                ],
            },

        ],
    },

    {
        path: "/admin",
        element: <AdminLayout />,
        children: [
            {
                element: <ProtectedRoute requiredRole="ADMIN" />,
                children: [
                    { path: "dashboard", element: <DashboardPage /> },
                    { path: "jobs", element: <JobPage />},
                    { path: "users", element: <AccountsPage />},
                    { path: "packages", element: <PlanPage />},
                    { path: "reports", element: <ReportPage />}
                ],
            },

        ],
    },


    { path: "/login", element: <LoginPage /> },
    { path: "/register", element: <RegisterPage /> },
    { path: "/callback", element: <CallBack /> },
    { path: "/unauthorized", element: <UnauthorizedPage /> },
    { path: "*", element: <NotFoundPage /> },
]);

export default router;
