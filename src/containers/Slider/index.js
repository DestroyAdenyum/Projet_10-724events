import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);

  const byDateDesc = data?.focus.sort((evtA, evtB) =>
    // Changement de < en > pour inverser le tri des évènements dans le slider
    // du plus récent au plus ancien.
    new Date(evtA.date) > new Date(evtB.date) ? -1 : 1
  );

  const nextCard = () => {
    // Ajout de la vérification si "byDateDesc" existé et a une valeur
    // et si la lenght de "byDateDesc" est supérieure à 0
    // Si oui on exécute setTimeout
    if (byDateDesc && byDateDesc.length > 0) {
      setTimeout(
        // Ajout du -1 pour vérifier si la prochaine carte à afficher est la dernière carte du slider
        () => setIndex(index < byDateDesc.length - 1 ? index + 1 : 0),
        5000
      );
    }
  };

  useEffect(() => {
    nextCard();
  });

  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => (
        // Changement de place de la key
        <div key={event.title}>
          <div
            // Ancien emplacement de la key
            className={`SlideCard SlideCard--${
              index === idx ? "display" : "hide"
            }`}
          >
            <img src={event.cover} alt="forum" />
            <div className="SlideCard__descriptionContainer">
              <div className="SlideCard__description">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <div>{getMonth(new Date(event.date))}</div>
              </div>
            </div>
          </div>
          <div className="SlideCard__paginationContainer">
            <div className="SlideCard__pagination">
              {/* Changement de _ par dotItem (bouton) */}
              {byDateDesc.map((dotItem, radioIdx) => (
                <input
                  // Changement de la key anciennement key={`${event.id}`}
                  // clé construite en utilisant le titre de l'élément dotItem
                  // et en  en ajoutant le texte "radio-" ce qui la rend unique.
                  key={`radio-${dotItem.title}`}
                  type="radio"
                  name="radio-button"
                  // Modification d'idx (= indice de l'élément dans le tableau byDataDesc) en index (= indice de la carte du slider affiché)
                  checked={index === radioIdx}
                  readOnly
                />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Slider;
