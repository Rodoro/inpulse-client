import React, { useEffect, useRef, useState } from "react";

import { useTranslation } from "react-i18next";

import bg_image_desk from "./assets/desktop.png";
import bg_image_tablet from "./assets/tablet.png";
import bg_image_mobile from "./assets/mobile.png";
import lock from "./assets/lock.svg";

import style from "./LiquidAnimation.module.css";
import { TCanvas } from "./three/TCanvas";

interface ILiquidAnimationProps {
  classes?: string;
}

export const LiquidAnimation: React.FC<ILiquidAnimationProps> = ({ classes }) => {
  const { t, i18n } = useTranslation();
  const canvasRef = useRef<HTMLImageElement>(null)

  const [width, setWidth] = useState<number>(window.innerWidth);
  const [wCanvas, setWCanvas] = useState(100)

  useEffect(() => {
    window.addEventListener("resize", onGetCurrentWindowWidth);
    if (canvasRef) setWCanvas(canvasRef.current?.offsetWidth ? canvasRef.current?.offsetWidth : 100)

    return () => {
      window.removeEventListener("resize", onGetCurrentWindowWidth);
    };
  }, []);

  useEffect(() => {

  }, [wCanvas])

  function onGetCurrentWindowWidth(e: any) {
    setWidth(e.target.innerWidth)
    setWCanvas(canvasRef.current?.offsetWidth ? canvasRef.current?.offsetWidth : 100);
  }

  function selectBackground() {
    if (width >= 800) {
      return bg_image_desk;
    }

    if (width >= 530) {
      return bg_image_tablet;
    }

    return bg_image_mobile;
  }

  function engText() {
    return (
      <>
        {/* <div className={`${style.sub_title_text} ${style.sub_title_en}`}>
          {width >= 800 ? (
            <>
              {t("in_pulse_is_a_global")} {t("event_agency")}
            </>
          ) : (
            <>
              {t("in_pulse_is_a_global")} <br /> {t("event_agency")}
            </>
          )}
        </div> */}
        {width >= 529 ? (
          <>
            <div className={`${style.title_text}`}>
              {t("bridging")} <br /> {t("cultures")} <br />
              <span className={`text-[#E11800]`}> {t("create")}</span> <br />
              <span> {t("effective")} </span>
            </div>
          </>
        ) : (
          <>
            <div className={`${style.title_text}`}>
              {t("bridging")} <br /> {t("cultures")} <br />
              <span className={`text-[#E11800]`}> {t("create")}</span><br />
              <span> {t("effective")}</span>
            </div>
          </>
        )}
      </>
    );
  }

  function ruText() {
    return (
      <div className={`${style.sub_title_text}`}>
        {/* {width >= 800 ? (
          <>
            {t("in_pulse_is_a_global")} <br /> {t("event_agency")}
          </>
        ) : (
          <>
            {t("in_pulse_is_a_global_p1")} <br />
            {t("in_pulse_is_a_global_p2")} <br />
            {t("in_pulse_is_a_global_p3")} <br />
            {t("event_agency_p1")} <br />
            {t("event_agency_p2")}
          </>
        )} */}
        <>
          <div className={`${style.title_text}`}>
            {t("in_pulse_is_a_global_p1")} <br />
            {t("in_pulse_is_a_global_p2")} <br />
            <span className={`text-[#E11800]`}>{t("in_pulse_is_a_global_p3")}</span><br />
            {t("event_agency_p1")} <br />
            {t("event_agency_p2")}
          </div>
        </>
      </div>
    );
  }

  return (
    <div id="home" className={`${style.LiquidAnimation} ${classes}`}>
      {selectBackground() == bg_image_desk ?
        <div ref={canvasRef} className={`${style.bg_canvas}`} style={{ height: `${((wCanvas / (1199 / 100)) * (677 / 100))}px`, maskImage: `url(${process.env.PUBLIC_URL}/assets/three/desktop.png)` }}>
          {/* // <div ref={canvasRef} className={`${style.bg_canvas}`} style={{ maskImage: `url(${process.env.PUBLIC_URL}/assets/three/desktop.png)` }}> */}
          <TCanvas />
        </div>
        :
        selectBackground() == bg_image_tablet ?
          <div ref={canvasRef} className={`${style.bg_canvas}`} style={{ height: `${((wCanvas / (1340 / 100)) * (1014 / 100))}px`, maskImage: `url(${process.env.PUBLIC_URL}/assets/three/tablet.png)` }}>
            <TCanvas />
          </div>
          :
          selectBackground() == bg_image_mobile ?
            <div ref={canvasRef} className={`${style.bg_canvas}`} style={{ height: `${((wCanvas / (1481 / 100)) * (3004 / 100))}px`, maskImage: `url(${process.env.PUBLIC_URL}/assets/three/mobile.png)` }}>
              <TCanvas />
            </div>
            :
            <img src={selectBackground()} className={`${style.bg_image}`} />
      }
      <div className={`${style.circle_explore}`}>
        <div className={`${style.circle_explore_text}`}>
          <div>{t("explore")}</div>
          <div>{t("explore_more")}</div>
        </div>
        <img src={lock} className={style.circle_explore_lock} alt="" />
      </div>
      <div className={`${style.title_container}`}>{i18n.language === "ru" ? ruText() : engText()}</div>
    </div>
  );
};
