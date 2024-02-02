import style from "./Snack.module.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import { useKeenSlider } from "keen-slider/react";
import Modal from "../Modal";

const url = "https://elchocrud.pro/api/v1/mypizza/snacks";

const Snack = () => {
  const [snack, setSnack] = useState([]);
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
    try {
      const response = await axios.get(url);
      setSnack(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getRequest();
  }, []);

  if (snack.length === 0) {
    return null;
  }

  return (
    <>
      <div id={style.salat_card} ref={sliderRef} className="keen-slider">
        {snack?.map((item) => (
          <div
            onClick={() => openModal(item)}
            id={style.snack}
            className="keen-slider__slide"
            key={item._id}
          >
            <img src={item.image} alt="" />

            <div className={style.ingridients}>
              <h2>{item.name}</h2>
              <p>{item.ingredients}</p>
              <div className={style.prise_weight}>
                <p>Вес:{item.weight}</p>
                <h3>{item.price}c</h3>
              </div>
            </div>
          </div>
        ))}
        <Modal modal={modal} CloseModal={CloseModal}>
          {getModal && (
            <div
              id={style.snack}
              className="keen-slider__slide"
              key={getModal._id}
            >
              <img src={getModal.image} alt="" />

              <div className={style.ingridients}>
                <h2>{getModal.name}</h2>
                <p>{getModal.ingredients}</p>
                <div className={style.prise_weight}>
                  <p>Вес:{getModal.weight}</p>
                  <h3>{getModal.price}c</h3>
                </div>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </>
  );
};

export default Snack;
