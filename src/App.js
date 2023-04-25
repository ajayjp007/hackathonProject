import './App.css';
import { Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage';

function App() {
  // const { counter } = useAppSelector((state) => state.reduxStore);
  // const dispatch = useAppDispatch();
  // const counterChange = (val) => {
  //   dispatch(incrementCounterAction(val));
  // };
  return (
    <Routes>
      <Route path={'/'} element={<Homepage />} />
      <Route path={'/homepage'} element={<Homepage />} exact />
      <Route path={'*'} element={<p>404 page</p>} />
    </Routes>
  );
}

export default App;
