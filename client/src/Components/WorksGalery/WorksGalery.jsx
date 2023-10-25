import React from "react";
import s from "../WorksGalery/WorksGalery.module.css"

const slides = [
    {
      title: "Carlos Paz",
      subtitle: "Cordoba",
      description: "Pintura",
      image:
        "https://i.imgur.com/XLVG9DT.png"
    },
    {
      title: "Alta Gracia",
      subtitle: "Cordoba",
      description: "Revestimiento y pintura",
      image:
        "https://i.imgur.com/YjMltVH.png"
    },
    {
      title: "Cuesta Blanca",
      subtitle: "Cordoba",
      description: "Pintura",
      image:
        "https://i.imgur.com/mHYtZDl.png"
    },
    {
      title: "Villa Allende",
      subtitle: "Cordoba",
      description: "Pintura",
      image:
        "https://i.imgur.com/mvhpAuh.png"
    },
    {
      title: "Colonia Tirolesa",
      subtitle: "Cordoba",
      description: "Pintura",
      image:
        "https://i.imgur.com/4a6sGPh.png"
    },
    {
      title: "B° Ayacucho ",
      subtitle: "Cordoba",
      description: "Pintura",
      image:
        "https://i.imgur.com/SyH3Gjp.png"
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
        <div title="RD pintores de piscinas"
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