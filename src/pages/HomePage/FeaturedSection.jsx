import React, { useEffect } from "react";

const FeaturedSection = () => {
    useEffect(() => {
        function testimonialSlider() {
            if ($(".testimonial__slider").length) {
                var $carousel = $(".testimonial__slider .images .list").flickity({
                    contain: true,
                    wrapAround: false,
                    freeScroll: false,
                    cellAlign: "center",
                    lazyLoad: 2,
                    imagesLoaded: true,
                    prevNextButtons: false,
                    dragThreshold: 0,
                    on: {
                        ready: function () {
                            let dotsSlideTes = $(
                                ".testimonial__slider .flickity-page-dots"
                            );
                            let dotsNew = $(".testimonial__slider .dots");
                            dotsSlideTes.appendTo(dotsNew);
                        },
                        change: function (index) {
                            $(".testimonial__slider .ct").removeClass("active");
                            $(".testimonial__slider .ct-" + (index + 1)).addClass(
                                "active"
                            );
                        },
                    },
                });
                var flkty = $carousel.data("flickity");
                var $imgs = $(".testimonial__slider .carousel-cell picture img");

                $carousel.on("scroll.flickity", function (event, progress) {
                    flkty.slides.forEach(function (slide, i) {
                        var img = $imgs[i];
                        var x = ((slide.target + flkty.x) * -1) / 2;
                        img.style.transform = "translateX( " + x + "px)";
                    });
                });

                let ctrPrevTes = $(".testimonial .control .control__prev"),
                    ctrNextTes = $(".testimonial .control .control__next");

                ctrPrevTes.on("click", function () {
                    $carousel.flickity("previous", true);
                });
                ctrNextTes.on("click", function () {
                    $carousel.flickity("next", true);
                });
            }
        }

        const myTimeout = setTimeout(() => {
            testimonialSlider();
        }, 300);

        return () => {
            clearTimeout(myTimeout);
        };
    }, []);

    return (
        <section className="featured">
            <img src="img/icon-cfd.svg" alt className="featured__c" />
            <div className="container">
                <div className="featured__title">
                    <h2 className="title --t2 --white">
                        Những điều <br />
                        <span>Đặc biệt</span> Tại CFD
                    </h2>
                </div>
                <div className="featured__content">
                    <div className="featured__content-item">
                        <h3 className="title --t3 --white">
                            Chương trình học thực chiến
                        </h3>
                        <p>
                            CFD Circle đào tạo thực chiến trên dự án, đi thẳng vào trọng
                            tâm, sát với yêu cầu thực tế, được truyền đạt từ những giảng
                            viên giàu kinh nghiệm và tâm huyết.
                        </p>
                    </div>
                    <div className="featured__content-item">
                        <h3 className="title --t3 --white">Đồng hành và hỗ trợ 24/7</h3>
                        <p>
                            Giảng viên, mentor và học viên là một team gắn kết, cùng nhau
                            hỗ trợ, kết nối và giúp đỡ lẫn nhau trong suốt quá trình học
                            và phát triển sự nghiệp.
                        </p>
                    </div>
                    <div className="featured__content-item">
                        <h3 className="title --t3 --white">Hình thức học đa dạng</h3>
                        <p>
                            Học offline hoặc online cùng lớp offline thông qua Google
                            Meet, học viên được hỗ trợ và đánh giá như học viên học
                            offline.
                        </p>
                    </div>
                    <div className="featured__content-item">
                        <h3 className="title --t3 --white">
                            Đặt chữ "Tâm" trong tất cả mọi việc
                        </h3>
                        <p>
                            Cái tâm của người dạy, cùng sự tâm huyết của người học, ắt sẽ
                            thành công trên con đường sự nghiệp của mỗi chúng ta.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FeaturedSection;
