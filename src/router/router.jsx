// routes.js
import { createBrowserRouter } from "react-router-dom";

import ProtectedRoute from "../auth/ProtectedRoute.jsx";
import UserProfilePage from "../page/user/UserProfilePage.jsx";
import UpdateRecruiterProfilePage from "../page/recruiter/UpdateRecruiterProfilePage.jsx";
import RecruiterJobPage from "../page/recruiter/RecruiterJobPage.jsx";
import JobForm from "../page/recruiter/JobForm.jsx";
import AdminLayout from "../layout/AdminLayout.jsx";
import AdminHomePage from "../page/admin/AdminHomePage.jsx";
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
import RecruiterProfileDetailPage from "../page/recruiter/RecruiterProfileDetailPage.jsx";
import FollowedCompanyPage from "../page/user/FollowedCompanyPage.jsx";
import CompaniesPage from "../page/recruiter/CompaniesPage.jsx";
import RecruiterApplicationPage from "../page/recruiter/RecruiterApplicationPage.jsx";
import ResumePage from "../page/user/ResumePage.jsx";
import UserProfileViewPage from "../page/user/UserProfileViewPage.jsx";
import InterviewSchedulePage from "../page/recruiter/InterviewSchedulePage.jsx";
import CreateInterviewSchedulePage from "../page/recruiter/CreateInterviewSchedulePage.jsx";
import InterviewScheduleUserPage from "../page/user/InterviewScheduleUserPage.jsx";
import UpdateInterviewSchedulePage from "../page/recruiter/UpdateInterviewSchedulePage.jsx";



const router = createBrowserRouter([
    {
        path: "/",
        element: <PageLayout />,
        children: [
            { path: "/",index:true, element: <JobListPage /> },
            { path: "/job-detail/:id", element: <JobDetailPage /> },
            { path: "/recruiter-detail/:id", element: <RecruiterProfileDetailPage /> },
            { path: "/companies", element: <CompaniesPage /> },
            //{ path: "/",index: true, element: <HomePage /> },
            {
                element: <ProtectedRoute />,
                children: [
                    { path: "profile/user/:id", element: <UserProfileViewPage /> },
                ]


            },


            {
                element: <ProtectedRoute requiredRole="USER" />,
                children: [
                    { path: "user-profile", element: <UserProfilePage /> },
                    { path: "applied-jobs", element: <JobAppliedPage /> },
                    { path: "saved-jobs", element: <JobSavedPage /> },
                    { path: "followed-companies", element: <FollowedCompanyPage /> },
                    { path: "resumes", element: <ResumePage /> },
                    { path: "/interview-schedule/view", element: <InterviewScheduleUserPage /> },

                ],


            },
            {
                element: <ProtectedRoute requiredRole="RECRUITER" />,
                children: [
                    { path: "/recruiter/profile", element: <UpdateRecruiterProfilePage /> },
                    { path: "/recruiter/jobs", element: <RecruiterJobPage /> },
                    { path: "/recruiter/applications", element: <RecruiterApplicationPage /> },
                    { path: "/recruiter/interview-schedule", element: <InterviewSchedulePage /> },
                    { path: "/recruiter/interview-schedule/create", element: <CreateInterviewSchedulePage /> },
                    { path: "/recruiter/interview-schedule/update/:id", element: <UpdateInterviewSchedulePage /> },

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
                    { path: "home", element: <AdminHomePage /> },
                    { path: "jobs", element: <JobPage />}
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
