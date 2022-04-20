import React from 'react';
import logo from './logo.svg';
import './App.css';

const title = ["manu","theo","arnaud le boss"]
function App() {
  console.count('render start')

  const [i, setI] = React.useState(0)
  const [page, setPage] = React.useState(0)
  const [last, setLast] = React.useState(0)

  React.useEffect(() => {
    console.count('first useEffect')
    setPage(Math.floor(Math.random()*3))
  },[Math.floor(i/3)])
  
  React.useEffect(() => {
    console.count('second useEffect')
   
   document.title = title[page]
    return () => {
      console.count('effect')
      setLast(page)
    }
  },[page])


  console.count('render end')
  return (
    <div className="App">
      <div>
        <h4>{i}</h4>
        <h4>Last : {title[last]}</h4>
        <button onClick={() => {setI(i+1)}}>incremente</button>
      </div>
    </div>
  );
}

export default App;

