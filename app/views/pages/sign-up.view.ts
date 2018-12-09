import { baseLayout } from '../layouts/base-layout.view';
import { CURRENCIES } from '../../../config/constants';

export function signUpView(page, view?: any) {
    return baseLayout(page, `
        <div class="site-container">
        
            <form id="sign_up_form" name="sign_up_form" class="form" data-method="post" action="api/users">
                <h1>${view.title}</h1>
                <div class="form-group">
                    <div>Who are you? <sup class="text-danger">*</sup></div>
                    <div class="d-flex">
                        <div>
                            <label for="buyer_type">Buyer</label>
                            <input class="form-control" id="buyer_type" type="radio" name="role" value="buyer" required>
                        </div>
                        <div>
                            <label for="seller_type">Seller</label>
                            <input class="form-control" id="seller_type" type="radio" name="role" value="seller" required>
                        </div>
                    </div>
                </div>
                
                
                
                <div>
                    <div class="form-group">
                        <label for="name">Name <sup class="text-danger">*</sup></label>
                        <input class="form-control" id="name" type="text" name="name" minlength="2" required>    
                    </div>
                    <div class="form-group">
                        <label for="email">Email <sup class="text-danger">*</sup></label>
                        <input class="form-control" id="email" type="email" name="email" required>    
                    </div>
                    <div class="form-group">
                        <label for="password">Password <sup class="text-danger">*</sup></label>
                        <input class="form-control" id="password" type="password" name="password" minlength="8" required>
                    </div>
                </div>
                     
                <div class="form-group">
                    <label for="address">Address <sup class="text-danger">*</sup></label>
                    <textarea class="form-control" name="address" id="address" cols="30" rows="10" minlength="10" required></textarea>
                </div>
                
                <div class="form-group">
                    <label for="description">Description</label>
                    <textarea class="form-control" name="description" id="description" cols="30" rows="10"></textarea>
                </div>
                
                <div class="form-group">
                    <label for="currency">Currency <sup class="text-danger">*</sup></label>
                    <select class="form-control" name="currency" id="currency" required>
                        ${
                            CURRENCIES
                                .map(currency => `<option value="${currency.code}">${currency.sign}</option>`)
                                .join('\r\n')
                        }
                    </select>
                </div>
                
                <div class="form-group">
                    <button class="btn btn-primary btn-submit" disabled>Sign up</button>
                </div>
                
                <div id="errors" class="form-group d-none"></div>
            </form>
        </div>
    `);
}