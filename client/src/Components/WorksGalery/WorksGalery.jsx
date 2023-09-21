import React from 'react';
import s from "../WorksGalery/WorksGalery.module.css"

const slides = [
    {
      title: "Carlos Paz",
      subtitle: "Cordoba",
      description: "Pintura",
      image:
        "https://i.ibb.co/K5Rv5Th/Imagen-de-Whats-App-2023-09-03-a-las-20-46-13.jpg"
    },
    {
      title: "Alta Gracia",
      subtitle: "Cordoba",
      description: "Revestimiento y pintura",
      image:
        "https://i.ibb.co/PhbjNMc/Imagen-de-Whats-App-2023-09-03-a-las-20-39-47.jpg"
    },
    {
      title: "Mimisa Rocks",
      subtitle: "Australia",
      description: "A piece of heaven",
      image:
        "https://images.unsplash.com/photo-1566522650166-bd8b3e3a2b4b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=800&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ"
    },
    {
      title: "Four",
      subtitle: "Australia",
      description: "A piece of heaven",
      image:
        "https://images.unsplash.com/flagged/photo-1564918031455-72f4e35ba7a6?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=800&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ"
    },
    {
      title: "Five",
      subtitle: "Australia",
      description: "A piece of heaven",
      image:
        "https://images.unsplash.com/photo-1579130781921-76e18892b57b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=800&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ"
    }
  ];
  
  function useTilt(active) {
    const ref = React.useRef(null);
  
    React.useEffect(() => {
      if (!ref.current || !active) {
        return;
      }
  
      const state = {
        rect: undefined,
        mouseX: undefined,
        mouseY: undefined
      };
  
      let el = ref.current;
  
      const handleMouseMove = (e) => {
        if (!el) {
          return;
        }
        if (!state.rect) {
          state.rect = el.getBoundingClientRect();
        }
        state.mouseX = e.clientX;
        state.mouseY = e.clientY;
        const px = (state.mouseX - state.rect.left) / state.rect.width;
        const py = (state.mouseY - state.rect.top) / state.rect.height;
  
        el.style.setProperty("--px", px);
        el.style.setProperty("--py", py);
      };
  
      el.addEventListener("mousemove", handleMouseMove);
  
      return () => {
        el.removeEventListener("mousemove", handleMouseMove);
      };
    }, [active]);
  
    return ref;
  }
  
  const initialState = {
    slideIndex: 0
  };
  
  const slidesReducer = (state, event) => {
    if (event.type === "NEXT") {
      return {
        ...state,
        slideIndex: (state.slideIndex + 1) % slides.length
      };
    }
    if (event.type === "PREV") {
      return {
        ...state,
        slideIndex:
          state.slideIndex === 0 ? slides.length - 1 : state.slideIndex - 1
      };
    }
  };
  
  function Slide({ slide, offset }) {
    const active = offset === 0 ? true : null;
    const ref = useTilt(active);

    // const handleclick = (e) =>{
    //   e.target.style.width = '50vw';
    //   e.target.style.height = '50vw';
    //   e.target.style.display = 'flex';
    //   console.log(e.target.style)
    // }
  
    return (
      <div
        ref={ref}
        className={s.slide}
        data-active={active}
        style={{
          "--offset": offset,
          "--dir": offset === 0 ? 0 : offset > 0 ? 1 : -1
        }}
      >
        <div
          className={s.slideContent}
          style={{
            backgroundImage: `url('${slide.image}')`
          }}
          // onClick={(e)=>handleclick(e)}
        >
          <div className={s.slideContentInner}>
            <h2 className={s.slideTitle}>{slide.title}</h2>
            <h3 className={s.slideSubtitle}>{slide.subtitle}</h3>
            <p className={s.slideDescription}>{slide.description}</p>
          </div>
        </div>
      </div>
    );
  }
  
 export default function WorksGalery() {
    const [state, dispatch] = React.useReducer(slidesReducer, initialState);
  
    return (
      <div className={s.slides}>
        <button onClick={() => dispatch({ type: "PREV" })}>‹</button>
  
        {[...slides, ...slides, ...slides].map((slide, i) => {
          let offset = slides.length + (state.slideIndex - i);
          return <Slide slide={slide} offset={offset} key={i} />;
        })}
        <button onClick={() => dispatch({ type: "NEXT" })}>›</button>
      </div>
    );
  }