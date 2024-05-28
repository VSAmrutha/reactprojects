import './App.css';
import Accordion from "./components/accordion"
import RandomColorGenerator from "./components/random-color"
import StarRating from "./components/star-rating"
function App() {
  return (
    <div className="App">
    {/* <Accordion/> */}
    {/* <RandomColorGenerator/> */}
    <StarRating noOfStars={10}/>
    </div>
  );
}

export default App;
