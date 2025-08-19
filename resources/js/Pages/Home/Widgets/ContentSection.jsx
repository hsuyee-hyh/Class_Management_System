import { Carousel, Card } from "antd";
import { ProCard } from "@ant-design/pro-components";
import { Image, Typography, Row, Col, Pagination } from "antd";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleUp, faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { Link, router, usePage } from "@inertiajs/react";

export default function ContentSection({ courses }) {
    // console.log(courses);

    const { loginSuccess, registerationSuccess } = usePage().props;
    const { Title, Paragraph } = Typography;
    const [activeIndex, setActiveIndex] = useState(null);
    const [visible, setVisible] = useState(false);
    const [initials, setInitials] = useState(null);

    useEffect(() => {
        if (loginSuccess || registerationSuccess) {
            setVisible(true);
            const timer = setTimeout(() => {
                setVisible(false);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [loginSuccess, registerationSuccess]);

    useEffect(() => {
        if (courses) {
            courses.data.map((course) => {
                if (course.photo === null) {
                    const parts = course.course_name
                        .split(" ")
                        .filter(Boolean)
                        .slice(0, 2)
                        .map((char) => char[0].toUpperCase());
                    setInitials(parts.join("") || "NA");
                }
            });
        }
    }, [courses]);

    // slideshow img
    const slideshowPhotoList = [
        "/storage/home/cover_photos/10.jpg",
        "/storage/home/cover_photos/14.jpg",
        "/storage/home/cover_photos/18.jpg",
    ];
    const blogs = [
        {
            id: 1,
            title: "Learning Web Development",
            teacher_id: "Alice",
        },
        {
            id: 2,
            title: "Data Management in the era of AI",
            teacher_id: "Alice",
        },
        {
            id: 3,
            title: "Building Data Architecture efficiently and effectively",
            teacher_id: "Alice",
        },
        {
            id: 4,
            title: "Software Engineering",
            teacher_id: "Alice",
        },
        {
            id: 5,
            title: "Building Data Architecture efficiently and effectively",
            teacher_id: "Alice",
        },
        {
            id: 6,
            title: "Software Engineering",
            teacher_id: "Alice",
        },
    ];
    const quesAndAns = [
        {
            id: 1,
            question: "How to enroll the web programming course?",
            answer: "Click on 'Read More' and then click on 'Enroll' on the next page",
        },
        {
            id: 2,
            question: "What is the course duration?",
            answer: "The course lasts for 12 weeks",
        },
    ];

    // courses
    const handlePageChange = (page) => {
        router.get(
            route("home"),
            { page },
            {
                preserveScroll: true,
                preserveState: true,
            }
        );
    };

    // const data = Array.from({ length: 10 }, (_, i) => ({
    // title: `Course Title ${i + 1}`,
    // content: `This is content for card ${i + 1}`,
    // }));

    // const ITEMS_PER_PAGE = 3;
    // const [currentPage, setCurrentPage] = useState(1);

    // const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    // const currentItems = courses.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    // Blogs
    const BLOGS_PER_PAGE = 4;
    const [currentBlogPage, setCurrentBlogPage] = useState(1);

    const startBlogIndex = (currentBlogPage - 1) * BLOGS_PER_PAGE;
    const currentBlogs = blogs.slice(
        startBlogIndex,
        startBlogIndex + BLOGS_PER_PAGE
    );

    // Q & A click
    const handleIndexClick = (index) => {
        setActiveIndex(index);
    };

    return (
        <>
            <section>
                {loginSuccess && visible && (
                    <div className="fixed top-24 left-1/3 z-50 bg-green-200 p-3 px-40 rounded shadow-md transition-opacity duration-1000 ease-out">
                        {loginSuccess}
                    </div>
                )}
                {registerationSuccess && visible && (
                    <div className="fixed top-24 left-1/3 z-50 bg-green-200 p-3 px-40 rounded shadow-md transition-opacity duration-1000 ease-out ">
                        {registerationSuccess}
                    </div>
                )}

                {/* img section  */}
                <div className="mt-10">
                    <Carousel autoplay>
                        {slideshowPhotoList.map((src, index) => {
                            return (
                                <div key={index}>
                                    <img
                                        src={src}
                                        alt={`Slide ${index}`}
                                        className="w-full h-[400px] object-cover"
                                    />
                                </div>
                            );
                        })}
                    </Carousel>
                </div>

                {/* Premium Courses */}
                {courses && (
                    <div className="py-10 lg:px-48 mt-10 md:mx-10">
                        <div>
                            <Row gutter={[70, 20]}>
                                {courses &&
                                    courses.data.map((item, index) => (
                                        <Col
                                            xs={24}
                                            sm={24}
                                            md={12}
                                            lg={8}
                                            key={index}
                                        >
                                            <ProCard
                                                // title={item.title}
                                                bordered
                                                hoverable
                                            >
                                                <div className="h-[450px] md:h-[500px] flex flex-col justify-center items-center">
                                                    <p
                                                        className="text-xl lg:text-2xl font-bold text-yellow-500
                                                     h-10 flex flex-row items-center p-5 md:pt-10 pt-16 "
                                                    >
                                                        {item.course_name}
                                                    </p>
                                                    <div className=" flex flex-col justify-center items-center md:p-10 p-5">
                                                        {!item.photo && (
                                                            <div className="w-[150px] h-[250px] md:w-[250px] lg:w-[300px] bg-gray-200 flex items-center justify-center rounded-lg">
                                                                <span className="text-6xl font-bold text-yellow-500">
                                                                    {initials}
                                                                </span>
                                                            </div>
                                                        )}
                                                        {item.photo && (
                                                            <img
                                                                src={`/storage/${item.photo}`}
                                                                alt="course_photo"
                                                                className="w-[200px] h-[250px] lg:w-[300px]"
                                                            />
                                                        )}
                                                        <p className=" mt-5 h-15 text-lg px-auto md:px-10 mb-3 ">
                                                            {item.description}
                                                        </p>
                                                        {/* need to define authorization */}
                                                        <button
                                                            className="bg-yellow-500 font-semibold text-md p-3 rounded-2xl mt-2"
                                                            onClick={() => {
                                                                router.get(
                                                                    route(
                                                                        "course.show",
                                                                        item.id
                                                                    ),
                                                                    {}
                                                                );
                                                            }}
                                                        >
                                                            See More
                                                        </button>
                                                    </div>
                                                </div>
                                            </ProCard>
                                        </Col>
                                    ))}
                            </Row>

                            <div className="flex justify-center mt-4">
                                <Pagination
                                    current={courses.current_page}
                                    pageSize={courses.per_page}
                                    total={courses.total}
                                    onChange={handlePageChange}
                                    className="mt-5 self-center"
                                />
                            </div>
                        </div>
                    </div>
                )}

                {/* Blog and Q&A */}
                <div className="px-10 mx-10">
                    {/* blog */}
                    <ProCard gutter={[100, 30]} wrap>
                        <ProCard
                            colSpan={{ xs: 24, sm: 24, md: 24, lg: 11, xl: 11 }}
                            layout="center"
                        >
                            <div className="flex flex-col justify-center">
                                <div className="overflow-y-auto space-y-4 max-w-[500px]">
                                    {currentBlogs.map((item, index) => (
                                        <Card key={index} hoverable>
                                            <p className="text-lg text-yellow-500 font-bold">
                                                {item.title}
                                            </p>
                                            <p>by Tr.{item.teacher_id}</p>
                                        </Card>
                                    ))}
                                </div>
                                {/* Pagination for blogs */}
                                <div className="flex justify-center mt-4">
                                    <Pagination
                                        current={currentBlogPage}
                                        pageSize={BLOGS_PER_PAGE}
                                        total={blogs.length}
                                        onChange={(page) =>
                                            setCurrentBlogPage(page)
                                        }
                                        style={{ marginTop: 24 }}
                                    />
                                </div>
                            </div>
                        </ProCard>

                        {/* Q & A */}
                        <ProCard
                            colSpan={{ xs: 24, sm: 24, md: 24, lg: 11, xl: 11 }}
                            layout="center"
                        >
                            <div className=" overflow-y-auto space-y-4 ">
                                {quesAndAns.map((item, index) => (
                                    <Card key={index} hoverable>
                                        <button
                                            onClick={() =>
                                                handleIndexClick(index)
                                            }
                                        >
                                            <div className="flex justify-stretch items-center space-x-5">
                                                <FontAwesomeIcon
                                                    icon={faAngleUp}
                                                    className=""
                                                />
                                                <p className="text-lg text-yellow-500 font-bold mr-5">
                                                    {item.question}
                                                </p>
                                            </div>
                                        </button>
                                        {index === activeIndex && (
                                            <p
                                                className={`
                                                transition-opacity duration-3000 ease-in-out
                                                ${
                                                    activeIndex === index
                                                        ? "opacity-100 mt-4"
                                                        : "opacity-0 pointer-events-none"
                                                }
                                                `}
                                            >
                                                {item.answer}
                                            </p>
                                        )}
                                    </Card>
                                ))}
                            </div>
                        </ProCard>
                    </ProCard>
                </div>
            </section>
        </>
    );
}
