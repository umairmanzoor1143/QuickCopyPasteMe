import "./style.scss";

type Props = {};

function Header({}: Props) {
  return (
    <header className='header' id='header'>
      <nav className='nav container'>
        <a href='/home' className='nav__logo'>
          CopyPasteMe
        </a>
        <div className='nav__menu' id='nav-menu'>
          <ul className='nav__list'>
            <button className='notification-btn'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                width='24'
                height='24'
              >
                <path fill='none' d='M0 0h24v24H0z'></path>
                <path
                  fill='currentColor'
                  d='M20 17h2v2H2v-2h2v-7a8 8 0 1 1 16 0v7zm-2 0v-7a6 6 0 1 0-12 0v7h12zm-9 4h6v2H9v-2z'
                ></path>
              </svg>
            </button>
          </ul>
        </div>
        <div className='nav__toggle' id='nav-toggle'>
          <i className='bx bx-grid-alt'></i>
        </div>
      </nav>
    </header>
  );
}

export default Header;
