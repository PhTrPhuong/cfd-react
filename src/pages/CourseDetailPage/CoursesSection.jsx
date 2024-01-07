import CourseItem from "@/components/CourseItem";
import { Empty, Skeleton } from "antd";

const CoursesSection = ({ courses = [], loading = false }) => {
    return (
        <section className="courses">
            <div className="container">
                <div className="heading --center --noline">
                    <h2 className="heading__title title --t2">Khoá học đề xuất</h2>
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
                        Array(4)
                            .fill("")
                            .map((_, index) => (
                                <div key={index} className="courses__list-item">
                                    <Skeleton active />
                                </div>
                            ))}

                    {/* -- Case: data -- */}
                    {courses?.length > 0 &&
                        !loading &&
                        courses.map((course, index) => {
                            if (index < 3) {
                                return (
                                    <CourseItem key={course?.id || index} {...course} />
                                );
                            }
                            return "";
                        })}
                </div>
            </div>
        </section>
    );
};

export default CoursesSection;
