import React, { useEffect, useState } from "react";
import "./App.scss";
import occupationsData from "./occupations";
import goodtraitsData from "./goodtraits";
import badtraitsData from "./badtraits";
import Occupation from "./Occupation";
import Goodtrait from "./Goodtrait";
import Badtrait from "./Badtrait";
import nightowl from "../public/goodtraits/nightowl.png";
import burglar from "../public/goodtraits/burglar.png";
import cook2 from "../public/goodtraits/cook2.png";
import desensitized from "../public/goodtraits/desensitized.png";
import axeman from "../public/goodtraits/axeman.png";
import nutritionist from "../public/goodtraits/nutritionist.png";

function App() {
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

  const handleJobChange = (item) => {
    setStartValue(item.value);
    setActive(item);
  };

  //function that moves whatever object is clicked into the selected traits
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

  //states to keep track of points to spend
  const [startValue, setStartValue] = useState(jobs[0].props.value);
  const [traitsValue, setTraitsValue] = useState(0);
  const [totalValue, setTotalValue] = useState(0);

  //Actively sorts so traits return to where they need to be by index
  function handleSort() {
    const sortedDataGood = [...goodtraits].sort((a, b) => {
      return a.props.index > b.props.index ? 1 : -1;
    });
    setGoodTraits(sortedDataGood);
    const sortedDataBad = [...badtraits].sort((a, b) => {
      return a.props.index > b.props.index ? 1 : -1;
    });
    setBadTraits(sortedDataBad);
    const sortedDataSelected = [...selectedlist].sort((a, b) => {
      return a.props.index > b.props.index ? 1 : -1;
    });
  }

  //Array of skills
  const [skills, setSkills] = useState([
    {
      name: "Fitness",
      value: 5,
      percent: 0
    },
    {
      name: "Strength",
      value: 5,
      percent: 0
    },
  ])

  // use effects that updates the points and sorts traits by index
  useEffect(() => {
    const values = selectedTraits.map((item) => item.value);
    const result = values.reduce((a, b) => a + b, 0);
    setTraitsValue(result);
    handleSort();
  }, [selectedTraits]);

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
