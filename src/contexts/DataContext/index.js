import PropTypes from "prop-types";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

const DataContext = createContext({});

export const api = {
  loadData: async () => {
    const json = await fetch("/events.json");
    return json.json();
  },
};

export const DataProvider = ({ children }) => {
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  // Ajout de la déclaration d'état de "last"
  // Cette déclaration d'état permet de conserver la dernière date de chargement des données.
  const [last, setLast] = useState(null);

  // Ajout de la fonction "getLast" qui prend "items" en argument
  const getLast = (items) => {
    // Vérification si "items" est défini et qu'il a au moins un élément.
    if (items && items.length > 0) {
      // "sort" sert à trier les éléments d'un tableau en les comparant (ici evtA et evtB)
      const lastItemByDate = items.sort((evtA, evtB) =>
      // si "evtA" > à "evtB" il renvoie -1 sinon 1. Les événements sont triés du plus récent au moins récent.
      new Date(evtA.date) > new Date(evtB.date) ? -1 : 1)
      // Et MàJ "last" avec le premier élément de lastItemByDate (index 0).
      setLast(lastItemByDate[0])
    }
  }

  const getData = useCallback(async () => {
    try {
      setData(await api.loadData());
      // Ajout de "setLast" pour la MàJ de la valeur de "last"
      setLast();
    } catch (err) {
      setError(err);
    }
  }, []);

  useEffect(() => {
    if (data) {
      // Ajout de "getLast" avec comme argument les events de data
      getLast(data.events);
    }
    if (data) return;
    getData();
  });
  
  return (
    <DataContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        data,
        error,
        // Ajout de last comme objet qui contient la dernière date de chargement des données
        // pour que les childrens puissent y avoir accès
        last,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

DataProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export const useData = () => useContext(DataContext);

export default DataContext;
