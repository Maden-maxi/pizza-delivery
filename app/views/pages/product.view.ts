import { baseLayout } from '../layouts/base-layout.view';

export function productView(page, view) {
    return baseLayout(page, `
    <div class="site-container">
            <form id="edit_product" name="edit_product" class="form" data-method="put" action="api/products/${view.id}" data-entity="true">
                <h1>Product Details</h1>
                <input type="hidden" name="userId" id="userId">
                <div class="form-group">
                    <label for="title">Title <sup class="text-danger">*</sup></label>
                    <input class="form-control" id="title" type="text" name="title" minlength="2" required>    
                </div>
                
                <div class="form-group">
                    <label for="description">Description</label>
                    <textarea class="form-control" name="description" id="description" cols="30" rows="10" required></textarea>
                </div>
                
                <div class="form-group">
                    <label for="price">Price <sup class="text-danger">*</sup></label>
                    <input class="form-control" id="price" type="number" name="price" required>    
                </div>
                
                <div class="form-group hide-buyer">
                    <button class="btn btn-success btn-submit" disabled>Edit</button>
                </div>
                
                <div class="form-group hide-seller">
                    <button class="btn btn-primary btn-add-to-cart" data-product_id="${view.id}" type="button">Add to cart</button>
                </div>
                
                <div id="errors" class="form-group d-none"></div>
                
            </form>
        </div>
    `);
}