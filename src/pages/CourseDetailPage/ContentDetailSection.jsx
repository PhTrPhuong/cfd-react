import Accordion from "@/components/Accordion";
import React from "react";

const ContentDetailSection = ({
    description,
    startDate,
    schedule = {},
    content = [],
    required = [],
    teams = [],
}) => {
    /* --Xử lí phần Accordion  */
    const modifiedContent = content?.map((item, index) => {
        const { id, title, description } = item;
        return {
            id: id || new Date().getTime() + index,
            title: title,
            content: description,
        };
    });
    return (
        <section className="contentdetail">
            <div className="content">
                <div className="container">
                    <div className="contentrow ctintro">
                        <h3 className="contentrow__title title --t3">Giới thiệu</h3>
                        {/* ---- */}
                        <div
                            className="contenteditor"
                            dangerouslySetInnerHTML={{ __html: description }}
                        />
                        <div className="videowrap">
                            <iframe
                                title="YouTube video player"
                                src="https://www.youtube.com/embed/C7GoVPoamdM?rel=0"
                                width={560}
                                height={315}
                                allowFullScreen="allowfullscreen"
                            />
                        </div>
                    </div>
                    <div className="contentrow ctschedule">
                        <h3 className="contentrow__title title --t3">Lịch học</h3>
                        <div className="ctschedule__box">
                            <div className="info">
                                <div className="labeltext">
                                    <span className="label --blue">Khai giảng</span>
                                    <p className="title --t3">{startDate}</p>
                                </div>
                                <div className="labeltext">
                                    <span className="label --blue">Ngày học</span>
                                    <p className="title --t3">{schedule.days}</p>
                                </div>
                                <div className="labeltext">
                                    <span className="label --blue">Thời gian</span>
                                    <p className="title --t3">{schedule.time}</p>
                                </div>
                                <div className="labeltext">
                                    <span className="label --blue">Địa điểm</span>
                                    <p className="title --t3">{schedule.address}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="contentrow ctlession">
                        <h3 className="contentrow__title title --t3">
                            Nội dung khoá học
                        </h3>
                        {/* -- Accordion -- */}
                        {!!content.length && <Accordion data={modifiedContent} />}
                    </div>
                    <div className="contentrow ctrequest">
                        <h3 className="contentrow__title title --t3">Yêu cầu cần có</h3>
                        <div className="ctrequest__content">
                            {/* ---- */}
                            {required?.map((item, index) => (
                                <p key={index}>{item}</p>
                            ))}
                        </div>
                    </div>
                    <div className="contentrow ctteacher">
                        <h3 className="contentrow__title title --t3">Giảng viên</h3>
                        <div className="ctteacher__content">
                            {/* ---- */}
                            {teams?.map((team) => {
                                const { id, name, image, description, jobTitle, tags } =
                                    team || {};
                                const tag = tags[0];
                                return (
                                    <div className="itemteacher" key={id}>
                                        <div className="itemteacher__avatar">
                                            <img src={image} alt="CFD Circle" />
                                        </div>
                                        <div className="itemteacher__info">
                                            <div className="itemteacher__info-name">
                                                <p className="title --t3">{tag}</p>
                                                <span className="label badge --teacher">
                                                    {name}
                                                </span>
                                            </div>
                                            <h5 className="itemteacher__info-pos label">
                                                {jobTitle}
                                            </h5>
                                            <p className="itemteacher__info-des">
                                                {description}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* <div className="ctteacher__content">
                            <div className="itemteacher">
                                <div className="itemteacher__avatar">
                                    <img
                                        src="https://cfdcircle.vn/files/avatars/VAOXpQdhq3yNvBMQlDItAYKU29ZO0gsxPTxdryL5.jpg"
                                        alt="CFD Circle"
                                    />
                                </div>
                                <div className="itemteacher__info">
                                    <div className="itemteacher__info-name">
                                        <p className="title --t3">Trần Nghĩa</p>
                                        <span className="label badge --teacher">
                                            Teacher
                                        </span>
                                    </div>
                                    <h5 className="itemteacher__info-pos label">
                                        Founder
                                    </h5>
                                    <p className="itemteacher__info-des">
                                        Xin chào! Tôi là Trần Nghĩa - Creative Frontend
                                        Developer, người sáng lập CFD Circle và CFD
                                        Studio. Trong hơn 7 năm kinh nghiệm trong nghề,
                                        tôi luôn tạo ra những sản phẩm chất lượng cao,
                                        sáng tạo, tinh tế và phù hợp cho khách hàng trong
                                        và ngoài nước, cũng như mong muốn truyền đạt lại
                                        cho các bạn trẻ có đam mê và định hướng theo nghề
                                        Front-End Developer.
                                    </p>
                                </div>
                            </div>
                            <div className="itemteacher">
                                <div className="itemteacher__avatar">
                                    <img
                                        src="https://cfdcircle.vn/files/avatars/clnqEpgnMNYKIqNbxoOHi4QPCiDhH3Fklnyz2239.jpg"
                                        alt="CFD Circle"
                                    />
                                </div>
                                <div className="itemteacher__info">
                                    <div className="itemteacher__info-name">
                                        <p className="title --t3">Đức Huy</p>
                                        <span className="label badge --mentor">
                                            Mentor
                                        </span>
                                    </div>
                                    <h5 className="itemteacher__info-pos label">
                                        Fullstack Developer
                                    </h5>
                                    <p className="itemteacher__info-des">
                                        Xin chào! Tôi là Huy Nguyễn - Fullstack Developer,
                                        người đồng sáng lập CFD Circle &amp; CFD Studio.
                                        Với mong muốn truyền đạt những kinh nghiệm thực tế
                                        có được trong hơn 5 năm đi làm cho các bạn trẻ có
                                        đam mê với lập trình front-end, cũng như back-end.
                                        Hi vọng tôi sẽ giúp cho các bạn có cái đầy đủ kiến
                                        thức và kỹ năng để ứng tuyển vào vị trí mà bạn
                                        hướng đến.
                                    </p>
                                </div>
                            </div>
                            <div className="itemteacher">
                                <div className="itemteacher__avatar">
                                    <img
                                        src="https://cfdcircle.vn/files/avatars/3QNIeOtW3IMj0cy1OWfCAB6s8vNpMus4sOatVm20.jpg"
                                        alt="CFD Circle"
                                    />
                                </div>
                                <div className="itemteacher__info">
                                    <div className="itemteacher__info-name">
                                        <p className="title --t3">Huỳnh Anh Kiệt</p>
                                        <div className="label badge --mentor">Mentor</div>
                                    </div>
                                    <h5 className="itemteacher__info-pos label">
                                        Front-end Developer
                                    </h5>
                                    <p className="itemteacher__info-des">
                                        Chào bạn, nếu bạn đọc những dòng này hẳn là bạn
                                        rất quan tâm đến việc trở thành một developer,
                                        nhất là Front-end Developer. Vì vậy, mình là Huỳnh
                                        Anh Kiệt - hiện đang làm việc với vị trí Software
                                        Engineer - chapter Front-End tại Kyanon Digital và
                                        CFD Studio, đồng thời, là cựu học viên của CFD
                                        Circle sẽ đồng hành cùng bạn trong hành trình
                                        chinh phục mong ước đó. Sau thời gian dài học tập
                                        và làm việc, mình đã tích lũy được một số kinh
                                        nghiệm để có thể giúp đỡ những bạn có niềm đam mê
                                        với Front-end.
                                    </p>
                                </div>
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContentDetailSection;
