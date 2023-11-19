import htmlPages from "../modules/htmlPaths.js";
import { getName } from "../modules/user-data.js";

const trilhaMainpage = htmlPages.trilhas;
const perfilMainpage = htmlPages.perfilMainpage;
const forumMainpage = htmlPages.forumExplorar; //explore is the mainpage of a forum
const homepage = htmlPages.homepage;

const username = getName();

export function generateAppHeader () {
    return ( /*html*/`
        <div class="sidebarHeader"> 
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <div class="container-fluid" id="navbarDimensions">
                    <a class="navbar-brand" href="${homepage}">LOGO</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText"
                        aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarText">
                        <ul class="navbar-nav mb-2 mb-lg-0">
                            <li class="nav-item mb-2">
                                <a class="nav-link" href="#" data-bs-toggle="offcanvas"
                                    data-bs-target="#offcanvasOptions"><i class="fa fa-user-circle"></i>
                                    <span class="header-username-display">${username}</a></span>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <!-- Offcanvas -->
            <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasOptions">
                <div class="offcanvas-header">
                    <h5 class="offcanvas-title" style="margin: 0 auto;">Para onde vamos ?</h5>
                    <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas"
                        aria-label="Close"></button>
                </div>
                <div class="offcanvas-body">
                    <ul class="list-group">
                        <li class="list-group-item trilha-link"><a href="${trilhaMainpage}">Minha Trilha</a></li>
                        <li class="list-group-item"><a href="${perfilMainpage}">Meu Perfil</a></li>
                        <li class="list-group-item"><a href="${forumMainpage}">Forum</a></li>

                        <!--handled by script-->
                        <li class="list-group-item"><a class="exit-button" href="#" >Sair</a></li>
                    </ul>
                </div>
            </div>
        </div> 

    `);
}