import React, {useState, useEffect} from "react";
import "./App.scss";
import occupationsData from "./occupations";
import goodtraitsData from "./goodtraits";
import badtraitsData from "./badtraits";
import Occupation from "./Occupation";
import Goodtrait from "./Goodtrait";
import Badtrait from "./Badtrait";

function App() {

  const jobs = occupationsData.map((item) => {
    return <Occupation key={item.name} {...item} />;
  });
  const goodtraits = goodtraitsData.map((item) => {
    return <Goodtrait key={item.name} {...item} />;
  });
  const badtraits = badtraitsData.map((item) => {
    return <Badtrait key={item.name} {...item} />;
  });


  const [startPoints, setStartPoints] = useState(0)
  const [points, setPoints] = useState(0)




  return (
    <div className="app">
      <div className="builder">
        <div className="builder-item occupation">
        {jobs}
        </div>
        <div className="builder-item traits">
          <div className="traits-item positive">
            <div className="positive-header">
              <div className="positive-header-left">Description</div>
              <div className="positive-header-right">Cost</div>
            </div>
            <div className="positive-container">
            {goodtraits}
            </div>
          </div>
          <div className="traits-item negative">
          <div className="negative-container">
            {badtraits}
            </div>
          </div>
        </div>
        <div className="builder-item chosen">
          <div className="chosen-item">
            <div className="chosen-header">Chosen Traits</div>
            <div className="selected-container">
              <div className="selected-item">
                <div className="selected-item-icon">A</div>
                <div className="selected-item-name">Speed Demon</div>
                <div className="selected-item-points">-1</div>
              </div>
            </div>
          </div>
          <div className="chosen-item">
            <div className="chosen-header">Major Skills</div>
            <div className="chosen-container">
              <div className="chosen-container-item">
                <div className="chosen-item-name">Fitness</div>
                <div className="chosen-item-value">5</div>
              </div>
              <div className="chosen-container-item">
                <div className="chosen-item-name">Strength</div>
                <div className="chosen-item-value">5</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="points">Points to spend {points}</div>
    </div>
  );
}

export default App;
