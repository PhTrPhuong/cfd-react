import React from "react";
import CourseItem from "@/components/CourseItem";
import useDebounce from "@/hooks/useDebounce";
import useQuery from "@/hooks/useQuery";
import { courseService } from "@/services/courseService";
import { Empty, Skeleton } from "antd";

const CoursePage = () => {
    const { data, loading: apiLoading } = useQuery(courseService.getCourses);
    const courses = data?.courses || [];

    const loading = useDebounce(apiLoading, 500);

    return (
        <main className="mainwrapper courses --ptop">
            <div className="container">
                <div className="textbox">
                    <div className="container">
                        <h2 className="title --t2">Tất cả khoá học</h2>
                    </div>
                </div>

                <div className="courses__list">
                    {/* -- Case: No data -- */}
                    {!loading && courses?.length === 0 && (
                        <Empty
                            description="Không tìm thấy dữ liệu nào"
                            style={{ margin: "0 auto" }}
                        />
                    )}

                    {/* -- Case: calling API-- */}
                    {loading &&
                        Array.from({ length: 4 })
                            .fill("")
                            .map((_, index) => (
                                <div
                                    key={index}
                                    className="courses__list-item"
                                    style={{ height: "50vh" }}
                                >
                                    <Skeleton active />
                                    <br />
                                    <Skeleton active />
                                </div>
                            ))}

                    {/* -- Case: data -- */}
                    {courses?.length > 0 &&
                        !loading &&
                        courses.map((course, index) => {
                            return <CourseItem key={course?.id || index} {...course} />;
                        })}
                </div>
            </div>
        </main>
    );
};

export default CoursePage;
