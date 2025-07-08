import React from "react";
import "./Cuisines.css";

import us from "../../assets/Images/imgi_3_us.svg";
import br from "../../assets/Images/imgi_8_br.svg";
import cn from "../../assets/Images/imgi_9_cn.svg";
import et from "../../assets/Images/imgi_5_et.svg";
import fr from "../../assets/Images/imgi_10_fr.svg";
import de from "../../assets/Images/imgi_11_de.svg";
import gr from "../../assets/Images/imgi_12_gr.svg";
import inFlag from "../../assets/Images/imgi_13_in.svg";
import it from "../../assets/Images/imgi_7_it.svg";
import jp from "../../assets/Images/imgi_14_jp.svg";
import kr from "../../assets/Images/imgi_15_kr.svg";
import lb from "../../assets/Images/imgi_16_lb.svg";
import mx from "../../assets/Images/imgi_17_mx.svg";
import ma from "../../assets/Images/imgi_18_ma.svg";
import ir from "../../assets/Images/imgi_19_ir.svg";
import es from "../../assets/Images/imgi_20_es.svg";
import th from "../../assets/Images/imgi_21_th.svg";
import tr from "../../assets/Images/imgi_22_tr.svg";

const cuisines = [
  { name: "American", count: 5, img: us },
  { name: "Brazilian", count: 1, img: br },
  { name: "Chinese", count: 1, img: cn },
  { name: "Ethiopian", count: 4, img: et },
  { name: "French", count: 3, img: fr },
  { name: "German", count: 3, img: de },
  { name: "Greek", count: 3, img: gr },
  { name: "Indian", count: 2, img: inFlag },
  { name: "Italian", count: 8, img: it },
  { name: "Japanese", count: 1, img: jp },
  { name: "Korean", count: 3, img: kr },
  { name: "Lebanese", count: 4, img: lb },
  { name: "Mexican", count: 5, img: mx },
  { name: "Moroccan", count: 4, img: ma },
  { name: "Persian", count: 1, img: ir },
  { name: "Spanish", count: 4, img: es },
  { name: "Thai", count: 5, img: th },
  { name: "Turkish", count: 6, img: tr },
];

const Cuisines = () => {
  return (
    <section className="cuisine-section">
      <div className="cuisine-container">
        <h2 className="cuisine-title">Cuisines</h2>
        <p className="cuisine-subtitle">
          Discover the rich diversity of global cuisines with our collection of
          authentic recipes. From comforting classics to exotic flavors, find
          inspiration for every meal and occasion!
        </p>

        <div className="cuisine-grid">
          {cuisines.map((cuisine, index) => (
            <div className="cuisine-card" key={index}>
              <div className="flag-container">
                <img src={cuisine.img} alt={cuisine.name} />
              </div>
              <h4>{cuisine.name}</h4>
              <p>{cuisine.count} {cuisine.count > 1 ? "Recipes" : "Recipe"}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Cuisines;
