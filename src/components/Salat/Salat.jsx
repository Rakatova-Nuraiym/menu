import { useState } from "react";
import css from "./Salat.module.css";
import axios from "axios";
import { useEffect } from "react";
import { useKeenSlider } from "keen-slider/react";
import Modal from "../Modal";

const url = " https://elchocrud.pro/api/v1/mypizza/salads";
const Salat = () => {
  const [salat, setSalat] = useState([]);
  const [modal, setModal] = useState(false);
  const [getModal, setGetModal] = useState(null);

  const openModal = (item) => {
    setGetModal(item);
    setModal(true);
  };
  const CloseModal = () => {
    setGetModal(null);
    setModal(false);
  };

  const [sliderRef] = useKeenSlider({
    breakpoints: {
      "(min-width: 400px)": {
        slides: { perView: 1, spacing: 5 },
      },
      "(min-width: 700px)": {
        slides: { perView: 2, spacing: 5 },
      },
      "(min-width: 1000px)": {
        slides: { perView: 3, spacing: 10 },
      },
    },
    slides: { perView: 1 },
  });

  const getRequest = async () => {
    try {
      const response = await axios.get(url);
      setSalat(response.data);
    } catch (error) {
      console.error("Error ", error);
    }
  };

  useEffect(() => {
    getRequest();
  }, []);
  if (salat.length === 0) {
    return null;
  }

  return (
    <div className={css.salat_card}>
      <div ref={sliderRef} className="keen-slider">
        {salat?.map((item) => (
          <div
            onClick={()=>openModal(item)}
            id={css.salat}
            className="keen-slider__slide"
            key={item._id}
          >
            <img src={item.image} alt="" />
            <div className={css.ingridients}>
              <h2>{item.name}</h2>
              <p>{item.ingredients}</p>
              <div className={css.prise_weight}>
                <p>Вес:{item.weight}</p>
                <h3>{item.price}</h3>
              </div>
            </div>
          </div>
        ))}
        <Modal modal={modal} CloseModal={CloseModal}>
          {getModal && (
            <div
              id={css.salat}
              className="keen-slider__slide"
              key={getModal._id}
            >
              <img src={getModal.image} alt="" />
              <div className={css.ingridients}>
                <h2>{getModal.name}</h2>
                <p>{getModal.ingredients}</p>
                <div className={css.prise_weight}>
                  <p>Вес:{getModal.weight}</p>
                  <h3>{getModal.price}</h3>
                </div>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </div>
  );
};

export default Salat;
