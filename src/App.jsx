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

// Importing in all of the default skills you get from jobs.
import unemployedSkills from "./jobSkills/unemployedSkills";
import fireofficerSkills from "./jobSkills/fireofficerSkills";
import policeofficerSkills from "./jobSkills/policeofficerSkills";
import parkrangerSkills from "./jobSkills/parkrangerSkills";
import constructionworkerSkills from "./jobSkills/constructionworkerSkills";
import securityguardSkills from "./jobSkills/securityguardSkills";
import carpenterSkills from "./jobSkills/carpenterSkills";
import burglarSkills from "./jobSkills/burglarSkills";
import chefSkills from "./jobSkills/chefSkills";
import repairmanSkills from "./jobSkills/repairmanSkills";
import farmerSkills from "./jobSkills/farmerSkills";
import fishermanSkills from "./jobSkills/fishermanSkills";
import doctorSkills from "./jobSkills/doctorSkills";
import veteranSkills from "./jobSkills/veteranSkills";
import nurseSkills from "./jobSkills/nurseSkills";
import lumberjackSkills from "./jobSkills/lumberjackSkills";
import fitnessinstructorSkills from "./jobSkills/fitnessinstructorSkills";
import burgerflipperSkills from "./jobSkills/burgerflipperSkills";
import electricianSkills from "./jobSkills/electricianSkills";
import engineerSkills from "./jobSkills/engineerSkills";
import metalworkerSkills from "./jobSkills/metalworkerSkills";
import mechanicSkills from "./jobSkills/mechanicSkills";

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
    handleJobSkills(item);
  };

  //function that moves whatever object is clicked into the selected traits
  //Currently the good and bad traits have their own function
  const handleTraitClickGood = (item) => {
    setSelectedTraits((prevState) => [...prevState, item]);
    setGoodTraits((prevTraits) => {
      return prevTraits.filter((prev) => prev.props.name !== item.name);
    });
    // const foundItemWithSameVariant = selectedTraits.find(x=>x.variant === item.variant)
    // const sameAsBadTraits = badtraits.find(x => x.props.variant === item.variant)
    // setBadTraits(badtraits.filter(x=>x.props.variant === sameAsBadTraits.variant))
  };
    
  const handleTraitClickBad = (item) => {
    setSelectedTraits((prevState) => [...prevState, item]);
    setBadTraits((prevTraits) => {
      return prevTraits.filter((prev) => prev.props.name !== item.name);
    });
    // const sameAsGoodTraits = goodtraits.find(x => x.props.variant === item.variant)
    // console.log(sameAsGoodTraits)
    // setGoodTraits(goodtraits.filter(x=>x.props.variant === sameAsGoodTraits.variant))
    // console.log(sameAsGoodTraits)
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

  //This function updates the skills depending on what job is selected.
  //The jobs default skills are saved in a .js file imported
  //Later on I will have the traits selected modify the skills from the job selected
  //This should be the 'base' stats.
  function handleJobSkills(item) {
    if (item.name === "Unemployed") {
      setSkills(unemployedSkills);
    } else if (item.name === "Fire Officer") {
      setSkills(fireofficerSkills);
    } else if (item.name === "Police Officer") {
      setSkills(policeofficerSkills);
    } else if (item.name === "Park Ranger") {
      setSkills(parkrangerSkills);
    } else if (item.name === "Construction Worker") {
      setSkills(constructionworkerSkills);
    } else if (item.name === "Security Guard") {
      setSkills(securityguardSkills);
    } else if (item.name === "Carpenter") {
      setSkills(carpenterSkills);
    } else if (item.name === "Burglar") {
      setSkills(burglarSkills);
    } else if (item.name === "Chef") {
      setSkills(chefSkills);
    } else if (item.name === "Repairman") {
      setSkills(repairmanSkills);
    } else if (item.name === "Farmer") {
      setSkills(farmerSkills);
    } else if (item.name === "Fisherman") {
      setSkills(fishermanSkills);
    } else if (item.name === "Doctor") {
      setSkills(doctorSkills);
    } else if (item.name === "Veteran") {
      setSkills(veteranSkills);
    } else if (item.name === "Nurse") {
      setSkills(nurseSkills);
    } else if (item.name === "Lumberjack") {
      setSkills(lumberjackSkills);
    } else if (item.name === "Fitness Instructor") {
      setSkills(fitnessinstructorSkills);
    } else if (item.name === "Burger Flipper") {
      setSkills(burgerflipperSkills);
    } else if (item.name === "Electrician") {
      setSkills(electricianSkills);
    } else if (item.name === "Engineer") {
      setSkills(engineerSkills);
    } else if (item.name === "Metalworker") {
      setSkills(metalworkerSkills);
    } else if (item.name === "Mechanic") {
      setSkills(mechanicSkills);
    }
  }

  // This function determines the xp boost you receive from having a skill
  // Voids strength and fitness as they do not receive xp boosts
  function handlePercent(item) {
    let percent = 0;
    if (item.name === "Fitness") {
      percent = 0;
    } else if (item.name === "Strength") {
      percent = 0;
    } else if (item.value === 0) {
      percent = 0;
    } else if (item.value === 1) {
      percent = 75;
    } else if (item.value === 2) {
      percent = 100;
    } else if (item.value >= 3) {
      percent = 125;
    }
    return percent;
  }

  //Array of all the major skills in the game. Defaults to unemployed.
  const [skills, setSkills] = useState(unemployedSkills);

  const majorskills = skills.map((item) => {
    let percent = handlePercent(item);
    if (item.value > 0) {
      return (
        <div key={item.name} className="chosen-container-item">
          <div className="chosen-item-name">{item.name}</div>
          <div className="chosen-item-value">{item.value}</div>
          <div className="chosen-item-percent">
            {percent > 0 && `+${percent}%`}
          </div>
        </div>
      );
    }
  });



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
            {majorskills}
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
