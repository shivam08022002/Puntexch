import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './Banner.css';

const Banner = () => {
  const bannerData = [
    {
      title: "Play Aviator",
      subtitle: "Coming Soon",
      date: "10 Feb 2025",
      bgImage: "https://play-lh.googleusercontent.com/XyiYpFsxAHiO5AvHWYWBTe5e3P8R46yZb6dT0cQQsbpdl1M6lIVYwOJ5V95yRHQ4KJQ=h500",
    },
    {
      title: "IPL CRICKET",
      subtitle: "SEASON 2025",
      date: "22ND MAR, 2025",
      bgImage: "https://media.licdn.com/dms/image/v2/D4D12AQGhaKCtKRjCLg/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1732800198638?e=2147483647&v=beta&t=Y1CL_hoeLMeDzXTAn83V2nJU5Ul4BvhDISV-e8qQ1po",
    },
    {
      title: "UEFA CHAMPIONS",
      subtitle: "ROUND OF 16",
      date: "13TH FEB, 2025",
      bgImage: "https://static.vecteezy.com/system/resources/previews/003/810/470/original/online-casino-red-banner-with-smartphone-red-slot-machine-casino-roulette-poker-chips-and-playing-cards-vector.jpg",
    },
    {
      title: "PRO KABADDI",
      subtitle: "Coming Soon",
      date: "18TH FEB, 2025",
      bgImage: "https://i.ytimg.com/vi/QrID0EA3hhI/maxresdefault.jpg"
    }
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    fade: true,
    cssEase: 'linear',
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          dots: true,
          arrows: false
        }
      },
      {
        breakpoint: 600,
        settings: {
          dots: true,
          arrows: false,
          autoplaySpeed: 2000
        }
      }
    ]
  };

  return (
    <div className="banner-container">
      <Slider {...settings}>
        {bannerData.map((banner, index) => (
          <div key={index}>
            <div 
              className="banner-slide"
              style={{ 
                background: `url(${banner.bgImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
              }}>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Banner;
