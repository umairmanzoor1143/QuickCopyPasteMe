import Header from "UI/Header";
import Scrollbar from "components/Scrollbar";
import Routes from "routes";
import 'style.scss'
function App() {
  return (
    <>
      <Scrollbar className='home-custom-scroll'>
      <Header />
        <main className='main h-100'>
          <section className='home h-100' id='home'>
            <Routes />
          </section>
        </main>
        <div className='scrollup' id='scroll-up'>
          <i className='bx bx-up-arrow-alt scrollup__icon'></i>
        </div>
      </Scrollbar>
    </>
  );
}

export default App;
