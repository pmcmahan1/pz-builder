import React, { useEffect, useState } from "react";
import "./App.scss";

// All of the job and traits data
import occupationsData from "./occupations";
import goodTraitsData from "./goodtraits";
import badTraitsData from "./badtraits";

import Occupation from "./Occupation";
import Goodtrait from "./Goodtrait";
import Badtrait from "./Badtrait";

// Local images for special job traits
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
  // (1)
  // Make traits mutually exclusive
  // Full list of traits that are mutually exclusive to one another: https://pzwiki.net/wiki/Traits
  // example: Speed Demon and Sunday Driver are mutually exclusive...
  // If you select Speed Demon as a selectedTraits,
  // Sunday Driver should no longer be an option from badTraits and vice versa.
  // If you remove Speed Demon from selectedTraits, Sunday Driver should again appear in badTraits.

  // (2)
  // Figure out how to modify skills depending on what traits are in selectedTraits
  // example: If angler is selectedTrait, add +1 to fishing skill. If feeble is selectedTrait,
  // -2 to strength skill.

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
        onMouseEnter={(e) => handleHover(e, item)}
        onMouseLeave={(e) => setDesc("")}
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
        onMouseEnter={(e) => handleHover(e, item)}
        onMouseLeave={(e) => setDesc("")}
        className={`occupation-item ${active == item && "highlight"}`}
      />
    );
  });

  //Good traits initialization 
  const [goodTraits, setGoodTraits] = useState(
    goodTraitsData.map((item) => {
      return (
        <Goodtrait
          index={item.index}
          key={item.name}
          {...item}
          onClick={() => handleTraitClickGood(item)}
          onMouseEnter={(e) => handleHover(e, item)}
          onMouseLeave={(e) => setDesc("")}
        />
      );
    })
  );

  //Bad traits initialization 
  const [badTraits, setBadTraits] = useState(
    badTraitsData.map((item) => {
      return (
        <Badtrait
          index={item.index}
          key={item.name}
          {...item}
          onClick={() => handleTraitClickBad(item)}
          onMouseEnter={(e) => handleHover(e, item)}
          onMouseLeave={(e) => setDesc("")}
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
    // Belows commented code was an idea on how to work out the mutually exclusive traits
    // To the traits data, if they disabled one another, I added something like
    // variant : "one", if they matched, they would be filtered from the list.
    // Couldn't get it to work right however.
    // const foundItemWithSameVariant = selectedTraits.find(x=>x.variant === item.variant)
    // const sameAsbadTraits = badTraits.find(x => x.props.variant === item.variant)
    // console.log(sameAsbadTraits.props.variant)
    // console.log(badTraits)
    // console.log(badTraits.filter(x=>x.props.variant !== sameAsbadTraits.props.variant))
    // setBadTraits(badTraits.filter(x=>x.props.variant !== sameAsbadTraits.props.variant))
    handleVariant(item)
  };


  const handleTraitClickBad = (item) => {
    setSelectedTraits((prevState) => [...prevState, item]);
    setBadTraits((prevTraits) => {
      return prevTraits.filter((prev) => prev.props.name !== item.name);
    });
    handleVariant(item)
  };

  const handleVariant = (item) => {
    const sameAsgoodTraits = goodTraits.find(x => x.props.variant === item.variant)
    const sameAsbadTraits = badTraits.find(x => x.props.variant === item.variant)
    setBadTraits(badTraits.filter(x=>x.props.variant !== sameAsbadTraits.props.variant))
    setGoodTraits(goodTraits.filter(x=>x.props.variant !== sameAsgoodTraits.props.variant))
  }



  //Function that removes an object from selectedTraits and returns it back to
  //either goodTraits or badTraits depending on it's value.
  const handleChosenClick = (item) => {
    if (item.value < 0) {
      setGoodTraits((prevState) => [
        ...prevState,
        <Goodtrait
          key={item.name}
          {...item}
          onClick={() => handleTraitClickGood(item)}
          onMouseEnter={(e) => handleHover(e, item)}
          onMouseLeave={(e) => setDesc("")}
        />,
      ]);
    } else {
      setBadTraits((prevState) => [
        ...prevState,
        <Badtrait
          key={item.name}
          {...item}
          onClick={() => handleTraitClickBad(item)}
          onMouseEnter={(e) => handleHover(e, item)}
          onMouseLeave={(e) => setDesc("")}
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
    const sortedDataGood = [...goodTraits].sort((a, b) => {
      return a.props.index > b.props.index ? 1 : -1;
    });
    setGoodTraits(sortedDataGood);
    const sortedDataBad = [...badTraits].sort((a, b) => {
      return a.props.index > b.props.index ? 1 : -1;
    });
    setBadTraits(sortedDataBad);
  }

  //This function updates the skills depending on what job is selected.
  //The jobs default skills are saved in a .js file imported from jobSkills folder
  //Later on I will have the selectedTraits modify skills.
  //This should be the base stats I guess, and afterwards selectedTraits changes them.
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
  // Just for show, and works perfectly fine.
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

  //Array of all the skills. Defaults to unemployed.
  const [skills, setSkills] = useState(unemployedSkills);

  // This is how I display the skills. If the skills value is 0, it does not display.
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

  //the description of whatever trait/job is being hovered
  const [desc, setDesc] = useState("");
  //tracks the position of the mouse when displaying desc
  const [position, setPosition] = useState([0, 0]);

  function handleHover(e, item) {
    setDesc(item.desc);
    setPosition([e.pageX, e.pageY]);
  }

  // This is for the unique traits given from jobs.
  function handleHoverUnique(e, desc) {
    setDesc(desc);
    setPosition([e.pageX, e.pageY]);
  }

  // use effects that updates the points and sorts traits by index on change
  // Ensures the traits when removed from selectedTraits return to where they should be in order.
  useEffect(() => {
    const values = selectedTraits.map((item) => item.value);
    const result = values.reduce((a, b) => a + b, 0);
    setTraitsValue(result);
    handleSort();
  }, [selectedTraits]);

  //adds the job value and selected traits value to display.
  // Points system working perfectly fine. No need to mess with.
  useEffect(() => {
    setTotalValue(startValue + traitsValue);
  });

  return (
    <div className="app">
      {desc && (
        <div
          className="desc"
          style={{
            left: position[0],
            top: position[1],
          }}
        >
          {desc}
        </div>
      )}
      <div className="header">Project Zomboid Character Builder</div>
      <div className="builder">
        <div className="builder-item occupation">{jobs}</div>
        <div className="builder-item traits">
          <div className="traits-item positive">
            <div className="positive-header">
              <div className="positive-header-left">Description</div>
              <div className="positive-header-right">Cost</div>
            </div>
            <div className="positive-container">{goodTraits}</div>
          </div>
          <div className="traits-item negative">
            <div className="negative-container">{badTraits}</div>
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
              into the points. Still unsure if this was the best way to do it, but it works.
              Only issue I could see in the future is, for example, nutritionist still being an option
              from goodTraits even with the fitness instructor job as active, which gives that trait.
              Maybe something like if active.name == "Fitness Instructor" then goodTraits.filter 
              nutritionist?
              */}
              {active.name == "Veteran" && (
                <div
                  className={`selected-item`}
                  onMouseEnter={(e) =>
                    handleHoverUnique(e, "Does not reach states of panic.")
                  }
                  onMouseLeave={(e) => setDesc("")}
                >
                  <div className="selected-item-icon">
                    <img src={desensitized} alt="" />
                  </div>
                  <div className="selected-item-name">Desensitized</div>
                </div>
              )}
              {active.name == "Security Guard" && (
                <div
                  className={`selected-item`}
                  onMouseEnter={(e) =>
                    handleHoverUnique(
                      e,
                      "Requires little sleep. Stays extra alert even when sleeping."
                    )
                  }
                  onMouseLeave={(e) => setDesc("")}
                >
                  <div className="selected-item-icon">
                    <img src={nightowl} alt="" />
                  </div>
                  <div className="selected-item-name">Night Owl</div>
                </div>
              )}
              {active.name == "Burglar" && (
                <div
                  className={`selected-item`}
                  onMouseEnter={(e) =>
                    handleHoverUnique(
                      e,
                      "Can hotwire vehicles, less chance of breaking the lock of a window."
                    )
                  }
                  onMouseLeave={(e) => setDesc("")}
                >
                  <div className="selected-item-icon">
                    <img src={burglar} alt="" />
                  </div>
                  <div className="selected-item-name">Burglar</div>
                </div>
              )}
              {active.name == "Chef" && (
                <div
                  className={`selected-item`}
                  onMouseEnter={(e) => handleHoverUnique(e, "Know cooking.")}
                  onMouseLeave={(e) => setDesc("")}
                >
                  <div className="selected-item-icon">
                    <img src={cook2} alt="" />
                  </div>
                  <div className="selected-item-name">Cook</div>
                </div>
              )}
              {active.name == "Burger Flipper" && (
                <div
                  className={`selected-item`}
                  onMouseEnter={(e) => handleHoverUnique(e, "Know cooking.")}
                  onMouseLeave={(e) => setDesc("")}
                >
                  <div className="selected-item-icon">
                    <img src={cook2} alt="" />
                  </div>
                  <div className="selected-item-name">Cook</div>
                </div>
              )}
              {active.name == "Lumberjack" && (
                <div
                  className={`selected-item`}
                  onMouseEnter={(e) =>
                    handleHoverUnique(
                      e,
                      "Better at chopping trees. Faster axe swing."
                    )
                  }
                  onMouseLeave={(e) => setDesc("")}
                >
                  <div className="selected-item-icon">
                    <img src={axeman} alt="" />
                  </div>
                  <div className="selected-item-name">Axe Man</div>
                </div>
              )}
              {active.name == "Fitness Instructor" && (
                <div
                  className={`selected-item`}
                  onMouseEnter={(e) =>
                    handleHoverUnique(
                      e,
                      "Can see the nutritional values of any food."
                    )
                  }
                  onMouseLeave={(e) => setDesc("")}
                >
                  <div className="selected-item-icon">
                    <img src={nutritionist} alt="" />
                  </div>
                  <div className="selected-item-name">Nutritionist</div>
                </div>
              )}
              {active.name == "Mechanic" && (
                <div
                  className={`selected-item`}
                  onMouseEnter={(e) =>
                    handleHoverUnique(
                      e,
                      "Familiar with the maintenance and repair of all vehicle models on the roads of Kentucky."
                    )
                  }
                  onMouseLeave={(e) => setDesc("")}
                >
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
            <div className="chosen-container">{majorskills}</div>
          </div>
        </div>
      </div>
      <div className="points">
        Points to Spend
        <span className={`${totalValue > -1 ? "green" : "red"}`}>
          {totalValue}
        </span>
      </div>
      <div className="footer">Special thanks to <a href="https://pzwiki.net/wiki/Main_Page" target="_blank" rel="noopener noreferrer">The Project Zomboid wiki </a>for the icons and data. Background image by <a href="https://alphacoders.com/users/profile/88593" target="_blank" rel="noopener noreferrer">IQuit</a></div>
    </div>
  );
}

export default App;
