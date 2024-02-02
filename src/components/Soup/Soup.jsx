import React, { useState, useEffect } from "react";
import { useKeenSlider } from "keen-slider/react";
import axios from "axios";

import style from "./Soup.module.scss";
import Modal from "../Modal";

const url =
  "https://api.elchocrud.pro/api/v1/ff5e5357491664fcb251ec9aa564c850/soup";

const Soup = () => {
  const [soup, setSoup] = useState([]);
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
      "(min-width: 1100px)": {
        slides: { perView: 3, spacing: 10 },
      },
    },
    slides: { perView: 1 },
  });

  const getRequest = async () => {
    const response = await axios.get(url);
    setSoup(response.data);
  };

  useEffect(() => {
    getRequest();
  }, []);

  if (soup.length === 0) {
    return null;
  }

  return (
    <div id={style.soup_card} ref={sliderRef} className="keen-slider">
      {soup.map((item) => (
        <div
          onClick={() => openModal(item)}
          id={style.pizza}
          className="keen-slider__slide"
          key={item._id}
        >
          <img src={item.image} alt="" />

          <div className={style.ingridients}>
            <h2>{item.name}</h2>
            <p>{item.ingredients}</p>
            <div className={style.prise_weight}>
              <h3>{item.price}c</h3>
              <p>Вес:{item.weight}</p>
            </div>
          </div>
        </div>
      ))}
      <Modal modal={modal} CloseModal={CloseModal}>
        {getModal && (
          <div
            id={style.pizza}
            className="keen-slider__slide"
            key={getModal._id}
          >
            <img src={getModal.image} alt="" />

            <div className={style.ingridients}>
              <h2>{getModal.name}</h2>
              <p>{getModal.ingredients}</p>
              <div className={style.prise_weight}>
                <h3>{getModal.price}c</h3>
                <p>Вес:{getModal.weight}</p>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Soup;
