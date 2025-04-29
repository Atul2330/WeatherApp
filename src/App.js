import './App.css';
import Input from './Component/Input/Input';

function App() {
  return (
    <div className="App">
      <header>
        <img src='icon.png' style={{height:50,alignSelf:'center', width:50}} alt='Weather'/>
        <h1>Weather App</h1>
      </header>
      <Input/>
    </div>
  );
}

export default App;
