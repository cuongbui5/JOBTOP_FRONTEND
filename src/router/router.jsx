// routes.js
import { createBrowserRouter } from "react-router-dom";

import ProtectedRoute from "../auth/ProtectedRoute.jsx";
import UserProfilePage from "../page/user/UserProfilePage.jsx";
import UpdateCompanyPage from "../page/recruiter/UpdateCompanyPage.jsx";
import CompanyJobPage from "../page/recruiter/CompanyJobPage.jsx";
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
import FollowedCompanyPage from "../page/user/FollowedCompanyPage.jsx";
import CompaniesPage from "../page/public/CompaniesPage.jsx";
import ApplicationPage from "../page/recruiter/ApplicationPage.jsx";
import ResumePage from "../page/user/ResumePage.jsx";
import UserProfileViewPage from "../page/user/UserProfileViewPage.jsx";
import InterviewSchedulePage from "../page/recruiter/InterviewSchedulePage.jsx";
import InterviewScheduleForm from "../page/recruiter/InterviewScheduleForm.jsx";
import ReportPage from "../page/admin/ReportPage.jsx";
import UserPage from "../page/admin/UserPage.jsx";
import PackagePage from "../page/admin/PackagePage.jsx";
import DashboardPage from "../page/admin/DashboardPage.jsx";
import AccountForm from "../page/user/AccountForm.jsx";
import SearchAIPage from "../page/public/SearchAIPage.jsx";
import ConversationPage from "../page/conversation/ConversationPage.jsx";
import ConversationDetail from "../page/conversation/ConversationDetail.jsx";



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
            //{ path: "/",index: true, element: <HomePage /> },
            {
                element: <ProtectedRoute />,
                children: [
                    { path: "profile/user/:id", element: <UserProfileViewPage /> },
                    { path: "/conversations", element: <ConversationPage /> },
                    { path: "/conversation/:id", element: <ConversationDetail /> },
                ]


            },


            {
                element: <ProtectedRoute requiredRole="CANDIDATE" />,
                children: [
                    { path: "user-profile", element: <UserProfilePage /> },
                    { path: "update-account", element: <AccountForm /> },
                    { path: "applied-jobs", element: <JobAppliedPage /> },
                    { path: "saved-jobs", element: <JobSavedPage /> },
                    { path: "followed-companies", element: <FollowedCompanyPage /> },
                    { path: "resumes", element: <ResumePage /> },



                ],


            },
            {
                element: <ProtectedRoute requiredRole="EMPLOYER" />,
                children: [
                    { path: "/recruiter/profile", element: <UpdateCompanyPage /> },
                    { path: "/recruiter/jobs", element: <CompanyJobPage /> },
                    { path: "/recruiter/applications", element: <ApplicationPage /> },
                    { path: "/recruiter/interview-schedule", element: <InterviewSchedulePage /> },
                    { path: "/recruiter/interview-schedule/create", element: <InterviewScheduleForm /> },
                    { path: "/recruiter/interview-schedule/edit/:id", element: <InterviewScheduleForm /> },
                    { path: "job/create", element: <JobForm /> },
                    { path: "job/edit/:id", element: <JobForm /> },

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
                    { path: "users", element: <UserPage />},
                    { path: "packages", element: <PackagePage />},
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
