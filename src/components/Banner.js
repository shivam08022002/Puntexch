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
      bgImage: "https://exchange4media.gumlet.io/news-photo/139188-IPL.jpg",
    },
    {
      title: "UEFA CHAMPIONS",
      subtitle: "ROUND OF 16",
      date: "13TH FEB, 2025",
      bgImage: "https://img.freepik.com/premium-psd/dynamic-champions-league-banner-with-trophy-swirling-colors-stadium_952796-597.jpg",
    },
    {
      title: "PRO KABADDI",
      subtitle: "Coming Soon",
      date: "18TH FEB, 2025",
      bgImage: "https://media.sportstiger.com/media/pro-kabaddi-league-sportstiger-1688380325489-large.jpg"
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
