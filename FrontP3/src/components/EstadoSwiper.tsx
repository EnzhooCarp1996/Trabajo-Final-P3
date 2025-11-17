import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

import "swiper/css";
import "swiper/css/navigation";

interface EstadoSwiperProps {
  items: { label: string; value: string }[];
  onChange: (value: string) => void;
}

export const EstadoSwiper: React.FC<EstadoSwiperProps> = ({ items, onChange }) => {
  return (
    <div style={{ width: "100%", marginBottom: 20, position: "relative" }}>

      {/* BOTÓN IZQUIERDO */}
      <button
        className="btn-prev"
        style={{
          position: "absolute",
          top: "50%",
          left: 10,
          transform: "translateY(-50%)",
          zIndex: 20,
          background: "rgba(255,255,255,0.85)",
          border: "none",
          padding: 10,
          borderRadius: "50%",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
        }}
      >
        <LeftOutlined style={{ fontSize: 22 }} />
      </button>

      {/* BOTÓN DERECHO */}
      <button
        className="btn-next"
        style={{
          position: "absolute",
          top: "50%",
          right: 10,
          transform: "translateY(-50%)",
          zIndex: 20,
          background: "rgba(255,255,255,0.85)",
          border: "none",
          padding: 10,
          borderRadius: "50%",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
        }}
      >
        <RightOutlined style={{ fontSize: 22 }} />
      </button>

      {/* SWIPER */}
      <Swiper
        modules={[Navigation]}
        navigation={{
          nextEl: ".btn-next",
          prevEl: ".btn-prev",
        }}
        spaceBetween={10}
        slidesPerView={1}
        onSlideChange={(swiper) => {
          const index = swiper.activeIndex;
          onChange(items[index].value);
        }}
        style={{
          width: "100%",
          maxWidth: "600px",
          margin: "0 auto",
          position: "relative",
        }}
      >
        {items.map((e) => (
          <SwiperSlide key={e.value}>
            <div
              style={{
                padding: 20,
                textAlign: "center",
                fontSize: 28,
                fontWeight: "bold",
                color: "white",
                backgroundColor: "black",
                borderRadius: 10,
                width: "90%",
                margin: "0 auto",
              }}
            >
              {e.label}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
