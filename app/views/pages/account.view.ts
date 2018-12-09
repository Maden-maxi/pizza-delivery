import { baseLayout } from '../layouts/base-layout.view';
import { CURRENCIES } from '../../../config/constants';

export function accountView(page, view: any) {
    return baseLayout(page, `
        <div class="site-container">
            <form id="account_form" name="account_form" class="form" data-method="put" action="api/users/" data-entity="true">
                <h1>Edit Profile</h1>
                <div class="form-group">
                    <label for="name">Name <sup class="text-danger">*</sup></label>
                    <input class="form-control" id="name" type="text" name="name" minlength="2" required>    
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
                    <button class="btn btn-success btn-submit" disabled>Update</button>
                </div>
                <div id="errors" class="form-group d-none"></div>
            </form>
        </div>
    `);
}