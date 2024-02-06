import { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PATHS from "./constants/path";
import PageLoading from "./components/PageLoading";
import ReduxPage from "./pages/ReduxPage";

const MainLayout = lazy(() => import("@/layouts/MainLayout/index"));
const ContactPage = lazy(() => import("@/pages/ContactPage/index"));
const BlogPage = lazy(() => import("@/pages/BlogPage/index"));
const AboutPage = lazy(() => import("@/pages/AboutPage/index"));
const BlogDetailPage = lazy(() => import("@/pages/BlogDetailPage/index"));
const CoursePage = lazy(() => import("@/pages/CoursePage/index"));
const CourseDetailPage = lazy(() => import("@/pages/CourseDetailPage/index"));
const Page404 = lazy(() => import("@/pages/Page404/index"));
const PrivacyPage = lazy(() => import("@/pages/PrivacyPage/index"));
const PaymentMethodPage = lazy(() => import("@/pages/PaymentMethodPage/index"));
const CourseOrderPage = lazy(() => import("@/pages/CourseOrderPage/index"));
const StudentProfilePage = lazy(() => import("@/pages/StudentProfilePage/index"));
const MyInfo = lazy(() => import("@/pages/StudentProfilePage/MyInfo"));
const MyCourse = lazy(() => import("@/pages/StudentProfilePage/MyCourse"));
const MyPayment = lazy(() => import("@/pages/StudentProfilePage/MyPayment"));
const HomePage = lazy(() => import("@/pages/HomePage/index"));
const PrivateRoute = lazy(() => import("@/components/PrivateRoute/index"));

function App() {
    return (
        <Suspense fallback={<PageLoading />}>
            <BrowserRouter>
                <Routes>
                    <Route path={PATHS.HOME} element={<MainLayout />}>
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

                        <Route path="/redux" element={<ReduxPage />} />
                        <Route path="*" element={<Page404 />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </Suspense>
    );
}

export default App;
