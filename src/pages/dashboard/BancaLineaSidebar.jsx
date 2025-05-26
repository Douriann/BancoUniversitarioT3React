import { Link , useNavigate} from 'react-router-dom';
import userimg from '../../assets/img/user.png';
import homeimg from '../../assets/img/home.png';
import transferimg from '../../assets/img/transfer.png';
import contactimg from '../../assets/img/contact.png';
import configimg from '../../assets/img/config.png';
import moveimg from '../../assets/img/movement.png';

const BancaLineaSidebar = () => {
    const navigate = useNavigate();

    return (
            <aside class="sidebar">
                <div class="sidebar-user-container">
                    <div class="sidebar-user-img-container">
                        <img src={userimg} alt="Usuario" class="sidebar-user-img"/>
                    </div>
                    <h3>Menú de usuario</h3>
                </div>
                <nav class="sidebar-nav">
                    <div class="sidebar-nav-btn"><Link to="/bancalinea/dashboard" class="btn-sidebar"><img src={homeimg}/> Posición Global</Link></div>
                    <div class="sidebar-nav-btn"><Link to="/bancalinea/movements" class="btn-sidebar"><img src={moveimg}/>Movimientos</Link></div>
                    <div class="sidebar-nav-btn"><Link to="/bancalinea/transfer" class="btn-sidebar"><img src={transferimg}/>Transferir</Link></div>
                    <div class="sidebar-nav-btn"><Link to="/bancalinea/contacts" class="btn-sidebar"><img src={contactimg}/>Contactos</Link></div>
                    <div class="sidebar-nav-btn"><Link to="/bancalinea/usermanagement" class="btn-sidebar"><img src={configimg}/>Gestión</Link></div>
                </nav>
            </aside>
    );
}

export default BancaLineaSidebar;