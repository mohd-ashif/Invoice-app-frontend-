import React from "react";
import { BrowserRouter, Routes , Route} from 'react-router-dom'
import InvoiceList from "./components/InvoiceList";

function App (){
  return(
    
   <div className="app">
     <BrowserRouter>
     <Routes>
     <Route path="/" element={<InvoiceList />} />
     </Routes>
     </BrowserRouter>
   </div>
  )
}

export default App 