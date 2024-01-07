import { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import MainLayout from "./layouts/MainLayout";
// import ContactPage from "./pages/ContactPage";
// import AboutPage from "./pages/AboutPage";
// import BlogPage from "./pages/BlogPage";
// import BlogDetailPage from "./pages/BlogDetailPage";
// import CoursePage from "./pages/CoursePage";
// import CourseDetailPage from "./pages/CourseDetailPage";
// import Page404 from "./pages/Page404";
// import PrivacyPage from "./pages/PrivacyPage";
// import PaymentMethodPage from "./pages/PaymentMethodPage";
// import CourseOrderPage from "./pages/CourseOrderPage";
// import StudentProfilePage from "./pages/StudentProfilePage";
// import MyInfo from "./pages/StudentProfilePage/MyInfo";
// import MyCourse from "./pages/StudentProfilePage/MyCourse";
// import MyPayment from "./pages/StudentProfilePage/MyPayment";
// import HomePage from "./pages/HomePage";
// import PrivateRoute from "./components/PrivateRoute";
import PATHS from "./constants/path";
import PageLoading from "./components/PageLoading";

const MainLayout = lazy(() => import("./layouts/MainLayout"));
const ContactPage = lazy(() => import("./pages/AboutPage"));
const BlogPage = lazy(() => import("./pages/BlogPage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const BlogDetailPage = lazy(() => import("./pages/BlogDetailPage"));
const CoursePage = lazy(() => import("./pages/CoursePage"));
const CourseDetailPage = lazy(() => import("./pages/CourseDetailPage"));
const Page404 = lazy(() => import("./pages/Page404"));
const PrivacyPage = lazy(() => import("./pages/PrivacyPage"));
const PaymentMethodPage = lazy(() => import("./pages/PaymentMethodPage"));
const CourseOrderPage = lazy(() => import("./pages/CourseOrderPage"));
const StudentProfilePage = lazy(() => import("./pages/StudentProfilePage"));
const MyInfo = lazy(() => import("./pages/StudentProfilePage/MyInfo"));
const MyCourse = lazy(() => import("./pages/StudentProfilePage/MyCourse"));
const MyPayment = lazy(() => import("./pages/StudentProfilePage/MyPayment"));
const HomePage = lazy(() => import("./pages/HomePage"));
const PrivateRoute = lazy(() => import("./components/PrivateRoute"));

function App() {
    return (
        <Suspense fallback={<PageLoading />}>
            <BrowserRouter>
                <Routes>
                    <Route path={PATHS.HOME} element={<MainLayout />}>
                        {/* <Route path="/" element={<HomePage />} /> */}
                        <Route index element={<HomePage />} />
                        {/* -- blog -- */}
                        <Route path={PATHS.BLOG.INDEX} element={<BlogPage />} />
                        <Route path={PATHS.BLOG.DETAIL} element={<BlogDetailPage />} />
                        {/* -- course -- */}
                        <Route path={PATHS.COURSE.INDEX} element={<CoursePage />}></Route>
                        <Route
                            path={PATHS.COURSE.DETAIL}
                            element={<CourseDetailPage />}
                        />
                        <Route path={PATHS.CONTACT} element={<ContactPage />} />
                        <Route path={PATHS.ABOUT} element={<AboutPage />} />
                        <Route path={PATHS.PAYMENT} element={<PaymentMethodPage />} />
                        <Route path={PATHS.PRIVACY} element={<PrivacyPage />} />

                        <Route element={<PrivateRoute />}>
                            {/* -- course -- */}
                            <Route
                                path={PATHS.COURSE.ORDER}
                                element={<CourseOrderPage />}
                            />
                            {/* -- profile -- */}
                            <Route
                                path={PATHS.PROFILE.INDEX}
                                element={<StudentProfilePage />}
                            >
                                {/* <Route path="/profile/my-info" element={<MyInfo />} /> */}
                                <Route index element={<MyInfo />} />
                                <Route
                                    path={PATHS.PROFILE.MY_COURSE}
                                    element={<MyCourse />}
                                />
                                <Route
                                    path={PATHS.PROFILE.MY_PAYMENT}
                                    element={<MyPayment />}
                                />
                            </Route>
                        </Route>

                        <Route path="*" element={<Page404 />} />
                    </Route>
                </Routes>

                {/* <MainLayout>
                <HomePage />
                <ContactPage />
                <AboutPage />
                <BlogPage />
                <BlogDetailPage />
                <CoursePage />
                <CourseDetailPage />
                <Page404 />
                <PrivacyPage />
                <PaymentMethodPage />
                <StudentProfilePage />
            </MainLayout> */}
            </BrowserRouter>
        </Suspense>
    );
}

export default App;
