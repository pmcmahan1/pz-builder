import React, { useState } from 'react'
import './App.scss'

function App() {


  return (
<div className="app">
  <div className="builder">
    <div className="builder-item occupation">
      Occupation
    </div>
    <div className="builder-item traits">
      <div className="traits-item top">Traits</div>
      <div className="traits-item bottom">Negative Traits</div>
    </div>
    <div className="builder-item chosen">
      <div className="chosen-item top">Chosen Traits</div>
      <div className="chosen-item bottom">Major Skills</div>
    </div>
  </div>
</div>
  )
}

export default App
