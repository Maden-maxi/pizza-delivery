import { baseLayout } from '../layouts/base-layout.view';

export function homeView(page, view: any) {
    return baseLayout(page, `
        <div class="site-container">
            <div class="jumbotron hide-loggedIn"> 
                <h1 class="text-center">${view.title}</h1>
                <p class="text-center">${view.description}</p>
                <div class="d-flex justify-content-center">
                    <a class="btn btn-primary mx-1" href="/sign-up">Sign up</a>
                    <a class="btn btn-success mx-1" href="/login">Login</a>
                </div>
            </div>
            <div id="catalog" class="row show-loggedIn"></div>
        </div>
    `);
}