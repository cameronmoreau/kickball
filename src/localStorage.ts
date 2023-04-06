import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";

export const usePersistentState = <S>(
  key: string,
  initialState: S | (() => S)
): [S, Dispatch<SetStateAction<S>>] => {
  useEffect(() => {
    const item = localStorage.getItem(key);

    if (!!item) {
      let value;
      try {
        value = JSON.parse(item);
      } catch {
        value = item;
      }

      setValue(value);
    }
  }, [key]);

  const [value, setValue] = useState(initialState);

  const setPersistentValue = useCallback(
    (v: any) => {
      let persisted = v;

      if (typeof v === "object") {
        persisted = JSON.stringify(v);
      }

      localStorage.setItem(key, persisted);
      setValue(v);
    },
    [key, setValue]
  );

  return [value, setPersistentValue];
};

export const clearAllStorage = () => {
  localStorage.clear();
  window.location.reload();
};
