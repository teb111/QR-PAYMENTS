import { useEffect, useRef } from "react";
import gsap, { Expo } from "gsap";

export default function LinearLoader() {
  let loader = useRef(null);
  useEffect(() => {
    let animationTimeline = gsap.timeline();
    animationTimeline.from(loader, {
      duration: 1.07,
      css: {
        width: "0%",
      },
      ease: Expo.easeInOut,
    });
  }, []);
  return (
    <div
      ref={(el) => {
        loader = el;
      }}
      className="linear--loader"
    ></div>
  );
}
