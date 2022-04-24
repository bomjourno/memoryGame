import React, {useCallback, useState} from 'react'

export const useSwitcher = (defaultValue) => {
  const [value, setValue] = useState(defaultValue);

  const on = useCallback(() => setValue(true), []);
  const off = useCallback(() => setValue(false), []);
  const switcher = useCallback(() => setValue(value => !value), [])

  return [value, on, off, switcher];
};
