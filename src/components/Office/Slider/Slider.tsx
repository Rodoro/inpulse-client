import { useState } from "react";

import slide_two from "./assets/imgs/slide_two.png";
import slide_four from "./assets/imgs/slide_four.jpeg";
import slide_8 from "./assets/imgs/IMG_1819.jpg";
import slide_9 from "./assets/imgs/4CB3B315-1367-450E-B01C-D45E828B64CE.jpg";
import slide_10 from "./assets/imgs/5F020D50-E13D-446B-8F99-AC8D01952850.jpg";
import slide_5 from "./assets/imgs/IMG_4690.jpg";
import slide_6 from "./assets/imgs/IMGf_4201.jpg";
import slide_7 from "./assets/imgs/AdobeStock_854135624 (1).jpeg"

import left_arrow from "./assets/icons/left_arrow.svg";
import right_arrow from "./assets/icons/right_arrow.svg";

import style from "./Slider.module.css";

const slides = [slide_four, slide_5, slide_6, slide_7, slide_8, slide_9, slide_10];

export const Slider: React.FC = () => {
  const [number, setNumber] = useState<number>(0);

  function nextSlide() {
    if (number === slides.length - 1) {
      setNumber(0);

      return;
    }

    setNumber((prev) => prev + 1);
  }

  function prevSlide() {
    if (number - 1 === -1) {
      setNumber(slides.length - 1);

      return;
    }

    setNumber((prev) => prev - 1);
  }

  function changeSlide(position: number) {
    setNumber(position);
  }

  return (
    <div className={style.Slider}>
      <div className={style.arrows}>
        <div onClick={prevSlide} className={style.arrow_left}>
          <img src={left_arrow} alt="" />
        </div>
        <div onClick={nextSlide} className={style.arrow_right}>
          <img src={right_arrow} alt="" />
        </div>
      </div>
      <div className={style.sliders}>
        <img src={slides[number]} alt="" />
        <div className={style.points}>
          {slides.map((_, i) => {
            return <div onClick={() => changeSlide(i)} className={`${style.point} ${i === number ? style.active_point : ""}`}></div>;
          })}
        </div>
      </div>
    </div>
  );
};
