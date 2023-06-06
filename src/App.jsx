import React, { useEffect, useState } from "react";
import "./App.scss";

import occupationsData from "./occupations";
import goodtraitsData from "./goodtraits";
import badtraitsData from "./badtraits";

import Occupation from "./Occupation";
import Goodtrait from "./Goodtrait";
import Badtrait from "./Badtrait";

import nightowl from "./assets/nightowl.png";
import burglar from "./assets/burglar.png";
import cook2 from "./assets/cook2.png";
import desensitized from "./assets/desensitized.png";
import axeman from "./assets/axeman.png";
import nutritionist from "./assets/nutritionist.png";

function App() {
  // CURRENT GOALS:
  // Make traits mutually exclusive (ex: can't take sunday driver if speed demon is selected)
  // onhover display details about jobs and traits
  // Figure out how to properly store the major skills data and display it

  // setting unemployed as the default selected job
  const [active, setActive] = useState(occupationsData[0]);

  // initializing selected traits as empty
  const [selectedTraits, setSelectedTraits] = useState([]);

  // List of selected traits
  const selectedlist = selectedTraits.map((item) => {
    return (
      <div
        key={item.name}
        onClick={() => handleChosenClick(item)}
        className={`selected-item ${item.value > 0 ? "red" : "green"}`}
      >
        <div className="selected-item-icon">
          <img src={item.icon} alt="" />
        </div>
        <div className="selected-item-name">{item.name}</div>
        <div className="selected-item-points">
          {`${item.value > 0 ? "+" : ""}`}
          {item.value}
        </div>
      </div>
    );
  });

  // Mapping over three data sheets for the traits values/names/etc.
  // Jobs data
  const jobs = occupationsData.map((item) => {
    return (
      <Occupation
        key={item.name}
        {...item}
        onClick={() => handleJobChange(item)}
        className={`occupation-item ${active == item && "highlight"}`}
      />
    );
  });
  
  //Good traits (green)
  const [goodtraits, setGoodTraits] = useState(
    goodtraitsData.map((item) => {
      return (
        <Goodtrait
          index={item.index}
          key={item.name}
          {...item}
          onClick={() => handleTraitClickGood(item)}
        />
      );
    })
  );

  //Bad traits (red)
  const [badtraits, setBadTraits] = useState(
    badtraitsData.map((item) => {
      return (
        <Badtrait
          index={item.index}
          key={item.name}
          {...item}
          onClick={() => handleTraitClickBad(item)}
        />
      );
    })
  );

  //When change jobs, set the initial points value and set that job item as the active one
  const handleJobChange = (item) => {
    setStartValue(item.value);
    setActive(item);
  };

  //function that moves whatever object is clicked into the selected traits
  //Currently the good and bad traits have their own function
  const handleTraitClickGood = (item) => {
    setSelectedTraits((prevState) => [...prevState, item]);
    setGoodTraits((prevTraits) => {
      return prevTraits.filter((prev) => prev.props.name !== item.name);
    });
  };
  const handleTraitClickBad = (item) => {
    setSelectedTraits((prevState) => [...prevState, item]);
    setBadTraits((prevTraits) => {
      return prevTraits.filter((prev) => prev.props.name !== item.name);
    });
  };

  //Function that removes an object on click in the selected list
  const handleChosenClick = (item) => {
    //This if else statement determines if the trait was a good or bad trait to put it back in
    //the right list
    //Maybe I can combine the good and bad traits array into one single array by using this condition?
    //If that would be necessary for functionality I want.
    //Just have one big 'traits' array and display them in the right area by if their value is positive
    //or negative.
    if (item.value < 0) {
      setGoodTraits((prevState) => [
        ...prevState,
        <Goodtrait
          key={item.name}
          {...item}
          onClick={() => handleTraitClickGood(item)}
        />,
      ]);
    } else {
      setBadTraits((prevState) => [
        ...prevState,
        <Badtrait
          key={item.name}
          {...item}
          onClick={() => handleTraitClickBad(item)}
        />,
      ]);
    }
    setSelectedTraits((prevTraits) => {
      return prevTraits.filter((prev) => prev !== item);
    });
  };

  //states to keep track of points to spend, the inital job value, the value of all the traits, and 
  //finally the total value that is displayed.
  const [startValue, setStartValue] = useState(jobs[0].props.value);
  const [traitsValue, setTraitsValue] = useState(0);
  const [totalValue, setTotalValue] = useState(0);

  //Actively sorts so traits return to where they need to be by an index number
  function handleSort() {
    const sortedDataGood = [...goodtraits].sort((a, b) => {
      return a.props.index > b.props.index ? 1 : -1;
    });
    setGoodTraits(sortedDataGood);
    const sortedDataBad = [...badtraits].sort((a, b) => {
      return a.props.index > b.props.index ? 1 : -1;
    });
    setBadTraits(sortedDataBad);
  }

  //Array of skills, not sure if this is the best way to do it...
  const [skills, setSkills] = useState([
    {
      name: "Fitness",
      value: 5,
      percent: 0,
    },
    {
      name: "Strength",
      value: 5,
      percent: 0,
    },
  ]);

  // use effects that updates the points and sorts traits by index on change
  useEffect(() => {
    const values = selectedTraits.map((item) => item.value);
    const result = values.reduce((a, b) => a + b, 0);
    setTraitsValue(result);
    handleSort();
  }, [selectedTraits]);

  //adds the job value and selected traits value to display. working fine.
  useEffect(() => {
    setTotalValue(startValue + traitsValue);
  });

  return (
    <div className="app">
      <div className="builder">
        <div className="builder-item occupation">{jobs}</div>
        <div className="builder-item traits">
          <div className="traits-item positive">
            <div className="positive-header">
              <div className="positive-header-left">Description</div>
              <div className="positive-header-right">Cost</div>
            </div>
            <div className="positive-container">{goodtraits}</div>
          </div>
          <div className="traits-item negative">
            <div className="negative-container">{badtraits}</div>
          </div>
        </div>
        <div className="builder-item chosen">
          <div className="chosen-item">
            <div className="chosen-header">Chosen Traits</div>
            <div className="selected-container">
              {/*
              Bunch of conditional renders for the 'special' traits given my certain jobs 
              if the job name is veteran, displays a trait only given to veterans for example.
              These traits are special in that they have no cost so don't have to be factored
              into the points. Still unsure if this is a good way to do it, ESPECIALLY since
              a few of the traits are also selectable in the good traits list. For example,
              nutritionist is a selectable good trait, but the fitness instructor gives it for free,
              so i'll have to somehow disable/remove the nutritionist trait whenever that job is selected.
              */}
              {active.name == "Veteran" && (
                <div className={`selected-item`}>
                  <div className="selected-item-icon">
                    <img src={desensitized} alt="" />
                  </div>
                  <div className="selected-item-name">Desensitized</div>
                </div>
              )}
              {active.name == "Security Guard" && (
                <div className={`selected-item`}>
                  <div className="selected-item-icon">
                    <img src={nightowl} alt="" />
                  </div>
                  <div className="selected-item-name">Night Owl</div>
                </div>
              )}
              {active.name == "Burglar" && (
                <div className={`selected-item`}>
                  <div className="selected-item-icon">
                    <img src={burglar} alt="" />
                  </div>
                  <div className="selected-item-name">Burglar</div>
                </div>
              )}
              {active.name == "Chef" && (
                <div className={`selected-item`}>
                  <div className="selected-item-icon">
                    <img src={cook2} alt="" />
                  </div>
                  <div className="selected-item-name">Cook</div>
                </div>
              )}
              {active.name == "Burger Flipper" && (
                <div className={`selected-item`}>
                  <div className="selected-item-icon">
                    <img src={cook2} alt="" />
                  </div>
                  <div className="selected-item-name">Cook</div>
                </div>
              )}
              {active.name == "Lumberjack" && (
                <div className={`selected-item`}>
                  <div className="selected-item-icon">
                    <img src={axeman} alt="" />
                  </div>
                  <div className="selected-item-name">Axe Man</div>
                </div>
              )}
              {active.name == "Fitness Instructor" && (
                <div className={`selected-item`}>
                  <div className="selected-item-icon">
                    <img src={nutritionist} alt="" />
                  </div>
                  <div className="selected-item-name">Nutritionist</div>
                </div>
              )}
              {active.name == "Mechanic" && (
                <div className={`selected-item`}>
                  <div className="selected-item-icon">
                    <img src="" alt="" />
                  </div>
                  <div className="selected-item-name">Amateur Mechanic</div>
                </div>
              )}

              {selectedlist}
            </div>
          </div>
          <div className="chosen-item">
            <div className="chosen-header">Major Skills</div>
            <div className="chosen-container">
              {/*
              Currently how the major skills are displayed by grabbing the values
              from the skills state array. Unsure how i'll do this going forward,
              maybe conditional renders, if axe skill > 0 then display it here probably.
              */}
              <div className="chosen-container-item">
                <div className="chosen-item-name">{skills[0].name}</div>
                <div className="chosen-item-value">{skills[0].value}</div>
                <div className="chosen-item-percent"></div>
              </div>
              <div className="chosen-container-item">
                <div className="chosen-item-name">{skills[1].name}</div>
                <div className="chosen-item-value">{skills[1].value}</div>
                <div className="chosen-item-percent"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="points">
        Points to Spend
        <span className={`${totalValue > -1 ? "green" : "red"}`}>
          {totalValue}
        </span>
      </div>
    </div>
  );
}

export default App;
