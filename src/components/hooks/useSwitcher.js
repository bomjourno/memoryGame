import React, {useCallback, useState} from 'react'

const useSwitcher = (defaultValue) => {
  const [value, setValue] = useState(defaultValue);

  const on = useCallback(() => setValue(true), []);
  const off = useCallback(() => setValue(false), []);

  return [value, on, off];
};

export default useSwitcher;
