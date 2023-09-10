import { Routes, Route } from 'react-router-dom';
import { Home } from "./components/Home";
import MealDetails from "./components/MealDetails";


function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/:id' element={<MealDetails />} />
      </Routes>
    </>
  );
}
export default App;