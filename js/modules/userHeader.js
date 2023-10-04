
///MODULATES THE LOGGED IN HEADER

document.addEventListener("DOMContentLoaded", function () {
    const newHeader = document.createElement("header");

    // Create content for the new header
    newHeader.innerHTML = `
<!--HEADER WITH SIDEBAR FOR LOGGED WEBSITE-->
<div class="sidebarHeader"> <!--class="container" allows background to blend more-->
<nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid" id="navbarDimensions">
        <a class="navbar-brand" href="/outras/telainicial.html">LOGO</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText"
            aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarText">
            <ul class="navbar-nav mb-2 mb-lg-0">
                <li class="nav-item mb-2">
                    <a class="nav-link" href="#" data-bs-toggle="offcanvas"
                        data-bs-target="#offcanvasOptions"><i class="fa fa-user-circle"></i>Breno Eboli</a>
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
            <!--for now the standart is given as adhd but if more options are added this value will need to be server updated-->
            <li class="list-group-item"><a href="/outras/trilhas/adhd.html">Minha trilha</a></li>
            <li class="list-group-item"><a href="/outras/perfil/perfil.html">Meu Perfil</a></li>
            <li class="list-group-item"><a href="../index.html">Sair</a></li>
        </ul>
    </div>
</div>
</div>
`

    //newHeader.classList.add("container")
    //option for header to not fill the top

    //gets first child of body and inserts header before it
    document.body.insertBefore(newHeader, document.body.firstElementChild);
});