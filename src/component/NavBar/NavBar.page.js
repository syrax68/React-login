import React from "react";
import './NavBar.style.scss';

const NavBar = () => {
  return (
    <header>
      <div id="menu" className="navbar-fixed-top">
        <div className="container-fluid">
          <nav className="navbar">
            <div className="navbar-header">
              <img src={process.env.PUBLIC_URL+'/logo.png'} alt=""></img>
              <div class="title-logo hidden-xs hidden-sm">
                <p>Optédif formation</p>
                <span>Apprendre autrement</span>
              </div>
            </div>
            <form className="form-search">
              <div className="bloc-search">
                  <input type="text" id="sujet_input" className="form-control" name="sujet" placeholder="Sujet de formation" data-url="https://optedif-formation.fr/searchJson/" required="required" value="" autocomplete="off"/>
              </div>
            </form> 
            <div className="menu-right">
                <ul>
                  <li>Formations</li>
                  <li className="menu-contact">Contact</li>
                  <li>Inscription/Connexion</li>
                </ul>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default NavBar;
