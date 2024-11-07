import './App.css'
import  Header from './components/Header'
import  Footer from './components/Footer'
import  Main from './components/Main'

function App() {

  return (
    <>
      <div className="min-h-screen bg-gray-100">
        <Header/>
          <Main/>
        <Footer/>
      </div>
    </>
  )
}

export default App
