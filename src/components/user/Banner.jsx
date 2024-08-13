import { Carousel } from "@material-tailwind/react";

export default function Banner() {
  return (
    <Carousel autoplay autoplayDelay={4000} loop className="rounded-xl mt-8">
      <img
        src="https://cdn-new.topcv.vn/unsafe/https://static.topcv.vn/img/BANNER%20(2).png"
        className="h-full w-full object-cover"
      />
      <img
        src="https://cdn-new.topcv.vn/unsafe/https://static.topcv.vn/img/TOPCV%200308_TOPCV%20(1).png"
        alt="image 2"
        className="h-full w-full object-cover"
      />
      <img
        src="https://cdn-new.topcv.vn/unsafe/https://static.topcv.vn/img/Vcu01VpymXxg6EtnOaA30ss1hEJKioiF_1721893835____6a876215f94305f140826c1af20c28ef.png"
        alt="image 3"
        className="h-full w-full object-cover"
      />
      <img
        src="https://cdn-new.topcv.vn/unsafe/https://static.topcv.vn/img/CVO-T1-1100x220.jpg"
        alt="image 3"
        className="h-full w-full object-cover"
      />
    </Carousel>
  );
}
