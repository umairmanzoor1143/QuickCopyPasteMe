import Header from "UI/Header";
import Routes from "routes";

function App() {
  return (
    <>
      <Header />
      <main className='main h-100'>
        <section className='home h-100' id='home'>
          <Routes />
        </section>
      </main>
      <div className='scrollup' id='scroll-up'>
        <i className='bx bx-up-arrow-alt scrollup__icon'></i>
      </div>
    </>
  );
}

export default App;
