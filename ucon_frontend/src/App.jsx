import { useEffect, useState } from "react";

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchHello().then(data => {
      setMessage(data.message);
    }).catch(err => {
      console.error(err);
      setMessage("Error connecting to backend");
    });
  }, []);


  return (
    <div className="App">
      <h1>{message}</h1>
    </div>
  );
}

export default App;
