import gsap, { Cubic, Strong, Power3 } from "gsap";

export const exitScreen = (element, handleClick, nextScreen) => {
  gsap.to(element, {
    duration: 0.2,
    opacity: 0.5,
    ease: Cubic.easeOut,
    onComplete: () => handleClick(nextScreen),
  });
};

export const detailsInteraction = (wrapper, card, text) => {
  let animationTimeline = gsap.timeline();
  animationTimeline
    .to(wrapper, {
      duration: 0,
      css: {
        visibility: "visible",
      },
    })
    .from(card.current, {
      duration: 0.91,
      opacity: 0,
      y: 110,
      delay: 0.7,
      ease: Cubic.easeOut,
    })
    .from(
      text,
      {
        duration: 0.5,
        opacity: 0,
        ease: Cubic.easeOut,
      },
      "-=0.4"
    );
};

export const amountInteraction = (
  wrapper,
  image,
  heading,
  input,
  emailField,
  nameField,
  button
) => {
  let animationTimeline = gsap.timeline();
  animationTimeline
    .to(wrapper, {
      duration: 0,
      css: {
        visibility: "visible",
      },
    })
    .from(image, {
      duration: 0.61,
      css: {
        left: "50%",
        top: "136px",
        transform: "translateX(-50%)",
        height: "80px",
        width: "80px",
      },
      ease: Strong.easeIn,
    })
    .from(heading, {
      duration: 0.57,
      opacity: 0,
      ease: Cubic.easeOut,
    })
    .from(
      [nameField, emailField, input],
      {
        duration: 0.5,
        opacity: 0,
        y: 30,
        stagger: {
          amount: 0.5,
        },
        ease: Cubic.easeOut,
      },
      "-=0.5"
    )
    .from(button, {
      duration: 0.5,
      opacity: 0,
      y: 30,
      ease: Cubic.easeOut,
    });
};

export const methodInteraction = (wrapper, text, buttonsRef) => {
  let animationTimeline = gsap.timeline();
  animationTimeline
    .to(wrapper, {
      duration: 0,
      css: {
        visibility: "visible",
      },
    })
    .from(text, {
      duration: 0.7,
      delay: 0.3,
      y: 2,
      opacity: 0,
      ease: Cubic.easeOut,
    })
    .from(
      buttonsRef.current.map((el) => el.current),
      {
        duration: 0.8,
        opacity: 0,
        delay: 0.3,
        y: 100,
        stagger: {
          amount: 1.2,
        },
        ease: Cubic.easeOut,
      },
      "-=0.8"
    );
};

export const cardInteraction = (wrapper, array) => {
  let animationTimeline = gsap.timeline();
  animationTimeline
    .to(wrapper, {
      duration: 0,
      css: {
        visibility: "visible",
      },
    })
    .from(
      array,
      {
        duration: 0.59,
        opacity: 0,
        delay: 0.3,
        y: 96,
        stagger: {
          amount: 0.4,
        },
        ease: Cubic.easeOut,
      },
      "-=0.2"
    );
};

export const confirmationInteraction = (wrapper, array) => {
  let animationTimeline = gsap.timeline();

  animationTimeline
    .to(wrapper, {
      duration: 0,
      css: {
        visibility: "visible",
      },
    })
    .from(
      array,
      {
        duration: 0.63,
        opacity: 0,
        delay: 0.12,
        y: 50,
        stagger: {
          each: 0.12,
        },
        ease: Power3.easeOut,
      },
      "-=0.2"
    );
};

export const successInteraction = (wrapper, elements) => {
  let animationTimeline = gsap.timeline();

  animationTimeline
    .to(wrapper, {
      duration: 0,
      css: {
        visibility: "visible",
      },
    })
    .from(elements, {
      duration: 1.4,
      opacity: 0,
      delay: 0.3,
      y: 88,
      stagger: {
        amount: 0.74,
      },
      ease: Power3.easeOut,
    });
};
