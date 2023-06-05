import React, {useEffect, useState} from "react";
import "./App.scss";
import occupationsData from "./occupations";
import goodtraitsData from "./goodtraits";
import badtraitsData from "./badtraits";
import Occupation from "./Occupation";
import Goodtrait from "./Goodtrait";
import Badtrait from "./Badtrait";

function App() {


  // setting unemployed as the default selected job
  const [active, setActive] = useState(occupationsData[0])

  // initializing selected traits as empty
  const [selectedTraits, setSelectedTraits] = useState([])

  // List of selected traits
  const selectedlist = selectedTraits.map((item) => {
    return  <div key={item.name} onClick={() => handleChosenClick(item)} className={`selected-item ${item.value > 0 ? 'red' : 'green'}`}>
    <div className="selected-item-icon"><img src={item.icon} alt="" /></div>
    <div className="selected-item-name">{item.name}</div>
    <div className="selected-item-points">{`${item.value > 0 ? "+" : ""}`}{item.value}</div>
  </div>
  })

 // Mapping over the three datas, creating an array of objects that return the divs
  const jobs = occupationsData.map((item) => {
    return <Occupation key={item.name}{...item} onClick={() => handleJobChange(item)} className={`occupation-item ${active == item && 'highlight'}` }/>;
  });

  const [goodtraits, setGoodTraits] = useState(goodtraitsData.map((item) => {
    return <Goodtrait key={item.name} {...item} onClick={() => handleTraitClickGood(item)} />;
  }));

  const [badtraits, setBadTraits] = useState(badtraitsData.map((item) => {
    return <Badtrait key={item.name} {...item} onClick={() => handleTraitClickBad(item)} />;
  }));


  const handleJobChange = (item) => {
    setStartValue(item.value)
    setActive(item)
  }

  //function that moves whatever object is clicked into the selected traits
  const handleTraitClickGood = (item) => {
    setSelectedTraits(prevState => [...prevState, item ] )
    setGoodTraits(prevTraits => {
      return prevTraits.filter(prev => prev !== item)
    })

  }

  //function that moves whatever object is clicked into the selected traits
  const handleTraitClickBad = (item) => {
    setSelectedTraits(prevState => [...prevState, item ] )
  
  }


  //Function that filters out an object on click if it's in the selected list
  const handleChosenClick = (item) => {
    setSelectedTraits(prevTraits => {
      return prevTraits.filter(prev => prev !== item)
    })
    
  }

  //states to keep track of points to spend
  const [startValue, setStartValue] = useState(jobs[0].props.value)
  const [traitsValue, setTraitsValue] = useState(0)
  const [totalValue, setTotalValue] = useState(0)


  // use effects that updates the points
  useEffect(() => {
    const values = selectedTraits.map((item) => item.value)
    const result = values.reduce((a, b) => a + b, 0)
    setTraitsValue(result)
  }, [selectedTraits])

  useEffect(() => {
    setTotalValue(startValue + traitsValue)
  })





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
      <div className="points">Points to Spend<span className={`${totalValue > -1 ? 'green' : 'red'}`}>{totalValue}</span></div>
    </div>
  );
}

export default App;
