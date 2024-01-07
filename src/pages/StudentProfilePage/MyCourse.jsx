import CourseItem from "@/components/CourseItem";
import { COURSE_ITEM_TYPE } from "@/constants/general";
import { useAuthContext } from "@/context/AuthContext";
import { Empty } from "antd";
import React from "react";

const MyCourse = () => {
    const { courseInfo } = useAuthContext();

    return (
        <div className="tab__content-item" style={{ display: "block" }}>
            <div className="courses__list">
                {/* -- Case: No data -- */}
                {!!!courseInfo.length && (
                    <Empty
                        description="Không tìm thấy dữ liệu nào"
                        style={{ margin: "0 auto" }}
                    />
                )}

                {/* -- Case: data -- */}
                {!!courseInfo.length &&
                    courseInfo.map((item, index) => (
                        <CourseItem
                            key={item.id || new Date().getTime() + index}
                            type={COURSE_ITEM_TYPE.normal}
                            {...item?.course}
                        />
                    ))}
            </div>
        </div>
    );
};

export default MyCourse;
