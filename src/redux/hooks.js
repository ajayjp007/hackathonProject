import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
// import type {Root}

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch();
export const useAppSelector = useSelector;
