import React, {useState} from "react";
import "./App.scss";
import occupationsData from "./occupations";
import goodtraitsData from "./goodtraits";
import badtraitsData from "./badtraits";
import Occupation from "./Occupation";
import Goodtrait from "./Goodtrait";
import Badtrait from "./Badtrait";

function App() {



  const [active, setActive] = useState(occupationsData[0])
  const [selectedTraits, setSelectedTraits] = useState([])


  const selectedlist = selectedTraits.map((item) => {
    return  <div key={item.name} onClick={() => handleChosenClick(item)} className={`selected-item ${item.value > 0 ? 'red' : 'green'}`}>
    <div className="selected-item-icon"><img src={item.icon} alt="" /></div>
    <div className="selected-item-name">{item.name}</div>
    <div className="selected-item-points">{item.value}</div>
  </div>
  })


  const jobs = occupationsData.map((item) => {
    return <Occupation key={item.name}{...item} onClick={() => handleJobChange(item)} className={`occupation-item ${active == item && 'highlight'}` }/>;
  });
  const goodtraits = goodtraitsData.map((item) => {
    return <Goodtrait key={item.name} {...item} onClick={() => handleTraitClick(item)} />;
  });
  const badtraits = badtraitsData.map((item) => {
    return <Badtrait key={item.name} {...item} onClick={() => handleTraitClick(item)} />;
  });


  const handleJobChange = (item) => {
    setStartValue(item.value)
    setActive(item)
  }

  const handleTraitClick = (item) => {
    setSelectedTraits(prevState => [...prevState, item ] )
  }

  const handleChosenClick = (item) => {
    console.log(item)
    
  }

  const [startValue, setStartValue] = useState(jobs[0].props.value)





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
              {selectedlist}
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
      <div className="points">Starting value: {startValue} Total value: {0}</div>
    </div>
  );
}

export default App;
