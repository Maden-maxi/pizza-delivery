import { baseLayout } from '../layouts/base-layout.view';

export function loginView(page, view?: any) {
    return baseLayout(page, `
        <form id="login_form" name="login_form" class="form" data-method="post" action="api/tokens">
            <h1>${view.title}</h1>
            <div class="form-group">
                <label for="email">Email <sup class="text-danger">*</sup></label>
                <input class="form-control" id="email" type="email" name="email" required>    
            </div>
            <div class="form-group">
                <label for="password">Password <sup class="text-danger">*</sup></label>
                <input class="form-control" id="password" type="password" name="password" minlength="8" required>
            </div>
            <div class="form-group">
                <button class="btn btn-success btn-submit" disabled>Login</button>
            </div>
            <div id="errors" class="form-group d-none"></div>
        </form>
    `);
}