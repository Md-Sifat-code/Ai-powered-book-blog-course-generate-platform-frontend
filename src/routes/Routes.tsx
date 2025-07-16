import AuthLayout from "@/layout/AuthLayout";
import DashboardLayout from "@/layout/DashboardLayout";
import PreReset from "@/NewComponent/AuthComponents/PreReset";
import Reset from "@/NewComponent/AuthComponents/Reset";
import BlogBotBasic from "@/NewComponent/BlogBotComponents/BlogBotBasic";
import BlogBotDetails from "@/NewComponent/BlogBotComponents/BlogBotDetails";
import BookGenieBasic from "@/NewComponent/BookGenieComponents/BookGenieBasic";
import BookGenieDetails from "@/NewComponent/BookGenieComponents/BookGenieDetails";
import CourseComposerBasic from "@/NewComponent/CourseComposerComponents/CourseComposerBasic";
import CourseComposerDetails from "@/NewComponent/CourseComposerComponents/CourseComposerDetails";
import Basic from "@/NewComponent/HomeComponents/Basic";
import VideoVisionBasic from "@/NewComponent/VideoVisionComponents/VideoVisionBasic";
import VideoVisionDetails from "@/NewComponent/VideoVisionComponents/VideoVisionDetails";
import Login from "@/pages/Login";

import { createBrowserRouter } from "react-router-dom";


const routes = createBrowserRouter([
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      {
        path: "/",
        element: <Login />
      },
      {
        path: "/prereset",
        element: <PreReset />

      },
      {
        path: "/reset-password",
        element: <Reset />
      }
    ]

  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        path: "/dashboard",
        element: <Basic />
      },
      {
        path: "/dashboard/videovision",
        element: <VideoVisionBasic />

      },
      {
        path: "/dashboard/videovision/:id",
        element: <VideoVisionDetails />

      },
      {
        path: "/dashboard/bookgenie",
        element: <BookGenieBasic></BookGenieBasic>

      },
      {
        path: "/dashboard/bookgenie/:id",
        element: <BookGenieDetails></BookGenieDetails>

      },
      {
        path: "/dashboard/blogbot",
        element: <BlogBotBasic />

      },
      {
        path: "/dashboard/blogbot/:id",
        element: <BlogBotDetails />

      },
      {
        path: "/dashboard/coursecomposer",
        element: <CourseComposerBasic />

      },
      {
        path: "/dashboard/coursecomposer/:id",
        element: <CourseComposerDetails />

      },
    ]
  }


]);

export default routes;