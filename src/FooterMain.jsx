import React from 'react';
import './FooterMain.css';

function Footer() {
  return (
    <footer>
      <div class="media-icons-container">
            <a href="https://www.instagram.com/bancouniversitariove" class="instagram">
                <i class="fa-brands fa-square-instagram"></i>
            </a>
            <a href="https://x.com/bancouniversitariove" class="xtwitter">
                <i class="fa-brands fa-square-x-twitter"></i>
            </a>
            <a href="https://www.facebook.com/bancouniversitariove" class="facebook">
                <i class="fa-brands fa-square-facebook"></i>
            </a>
        </div>
        <p>© 2025 Banco Universitario. Todos los derechos reservados.</p>
    </footer>
  );
}

export default Footer;