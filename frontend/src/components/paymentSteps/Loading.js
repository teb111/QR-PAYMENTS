import { useEffect, useRef, useState } from "react";
import gsap, { Power3 } from "gsap";

export default function Loading({ payment }) {
  let wrapper = useRef(null);
  let text = useRef(null);
  let image = useRef(null);

  useEffect(() => {
    let animationTimeline = gsap.timeline();

    animationTimeline
      .to(wrapper, {
        duration: 0,
        css: {
          visibility: "visible",
        },
      })
      .from([image, text], {
        duration: 0.8,
        opacity: 0,
        delay: 0.3,
        y: 40,
        stagger: {
          amount: 0.3,
        },
        ease: Power3.easeOut,
      });
  }, []);
  const [confirmObj, setConfirmObj] = useState({})
  // window.location.href = confirmObj

  let obj;
  const fetchFromLocalStorage = () => {
    obj = localStorage.getItem("PaymentURL")
    obj = JSON.parse(obj);
    console.log(obj)
    setConfirmObj(obj)
  }

  useEffect(() => {
    fetchFromLocalStorage()
  }, [])

  return (
    <div
      ref={(el) => {
        wrapper = el;
      }}
      className="payment--loading"
    >
      <div
        ref={(el) => {
          image = el;
        }}
      >
        <div className="circle--loader"></div>
      </div>

      <h6
        ref={(el) => {
          text = el;
        }}
        className="title-text text-center"
      >
        {payment && payment}

      </h6>
    </div>
  );
}
