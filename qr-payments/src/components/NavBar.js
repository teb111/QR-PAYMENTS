import { useEffect, useRef } from "react";
import gsap, { Strong } from "gsap";
import { PAYMENT_STEP } from "../services/constants";
import { useNavigate } from "react-router-dom";

import Button from "./Button";

export default function NavBar({ screen, handleClick }) {
  let navigate = useNavigate();
  let wrapper = useRef(null);
  let navLogo = useRef(null);
  let navMenu = useRef(null);
  let navContainer = useRef(null);
  useEffect(() => {
    let animationTimeline = gsap.timeline();
    if (screen === PAYMENT_STEP.DETAILS) {
      animationTimeline
        .to(wrapper, {
          duration: 0,
          css: {
            visibility: "visible",
          },
        })
        .from([navMenu, navLogo], {
          duration: 1,
          y: 30,
          opacity: 0,
          ease: Strong.easeInOut,
        })
        .from(
          navContainer,
          {
            duration: 0.5,
            css: {
              borderBottom: "0px",
            },
          },
          "-=0.5"
        );
    } else {
      animationTimeline.to(wrapper, {
        duration: 0,
        css: {
          visibility: "visible",
        },
      });
    }
  }, [screen]);

  const goBack = () => {
    let id = "27472";
    switch (screen) {
      case PAYMENT_STEP.AMOUNT:
        navigate(`/${id}`);
        handleClick(PAYMENT_STEP.DETAILS);
        break;
      case PAYMENT_STEP.METHOD:
        navigate("/amount");
        handleClick(PAYMENT_STEP.AMOUNT);
        break;
      case PAYMENT_STEP.CARD:
        navigate("/method");
        handleClick(PAYMENT_STEP.METHOD);
        break;
      case PAYMENT_STEP.CONFIRMATION:
        navigate("/confirmation");
        handleClick(PAYMENT_STEP.CARD);
        break;
      case PAYMENT_STEP.SUCCESS:
        navigate("/success");
        handleClick(PAYMENT_STEP.DETAILS);
        break;

      default:
        navigate(`/${id}`);
        handleClick(PAYMENT_STEP.DETAILS);
        break;
    }
  };

  return (
    <div
      ref={(el) => {
        wrapper = el;
      }}
      className="nav"
    >
      <div
        ref={(el) => {
          navContainer = el;
        }}
        className="nav--container"
      >
        {screen === PAYMENT_STEP.DETAILS ? (
          <img
            ref={(el) => {
              navLogo = el;
            }}
            src="./images/logo.svg"
            className="nav--logo"
            alt="QR-Payment-logo"
          />
        ) : (
          <Button full={false} Click={() => goBack()}>
            <img src="./images/arrow-left.svg" alt="Back" />
          </Button>
        )}

        <div
          ref={(el) => {
            navMenu = el;
          }}
          className="nav--menu"
        >
          <div className="nav--menu__button"></div>
        </div>
      </div>
    </div>
  );
}
