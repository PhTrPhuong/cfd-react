import Button from "@/components/Button";
import CourseItem from "@/components/CourseItem";
import PATHS from "@/constants/path";
import { Empty } from "antd";
import React from "react";

const CoursesSection = ({ courses = [], loading = false }) => {
    return (
        <section className="courses">
            <div className="container">
                <div className="heading">
                    <h2 className="heading__title title --t2">
                        Tất cả <span className="color--primary">khóa học</span>
                    </h2>
                </div>

                {/* --- Dùng Empty render khi không tìm thấy data --- */}
                {!loading && courses?.length === 0 ? (
                    <Empty
                        description="Không tìm thấy dữ liệu nào"
                        style={{ margin: "0 auto" }}
                    />
                ) : (
                    <>
                        <div className="courses__list">
                            {/* --- Map data render list CourseItem --- */}
                            {courses?.length > 0 &&
                                !loading &&
                                courses.map((course, index) => {
                                    return (
                                        <CourseItem
                                            key={course?.id || index}
                                            {...course}
                                        />
                                    );
                                })}
                        </div>

                        <div className="courses__btnall">
                            {/* --- Dùng button link để link tới danh sách khoá học --- */}
                            <Button
                                link={PATHS.COURSE.INDEX}
                                className="course__btn"
                                variant="grey"
                            >
                                Tất cả khoá học
                            </Button>
                        </div>
                    </>
                )}
            </div>
        </section>
    );
};

export default CoursesSection;
