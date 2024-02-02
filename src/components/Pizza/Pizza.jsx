import axios from "axios";

import { useEffect, useState } from "react";
import style from "./Pizza.module.scss";
import { useKeenSlider } from "keen-slider/react";
import Modal from "../Modal";

const url =
  "https://api.elchocrud.pro/api/v1/f37f4c969d89bdf38b55b726737aadd1/pizza";

const Pizza = () => {
  const [pizza, setPizza] = useState([]);
  console.log(pizza);
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
    setPizza(response.data);
  };

  useEffect(() => {
    getRequest();
  }, [pizza]);

  if (pizza.length === 0) {
    return null;
  }

  console.log(pizza);

  return (
    <div id={style.pizza_Card} ref={sliderRef} className="keen-slider">
      {pizza.map((item) => (
        <div
          onClick={() => openModal(item)}
          id={style.pizza}
          className="keen-slider__slide"
          key={item._id}
        >
          <img src={item.image} alt="" />
          <div className={style.ingridients}>
            <h2>{item.name}</h2>
            <div className={style.prise_weight}>
              <p>{item.ingredients}</p>
              <h3> {item.price}</h3>
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
              <div className={style.prise_weight}>
                <p>{getModal.ingredients}</p>
                <h3> {getModal.price}</h3>
                <p>Вес:{getModal.weight}</p>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Pizza;
