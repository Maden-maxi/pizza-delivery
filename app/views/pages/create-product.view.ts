import { baseLayout } from '../layouts/base-layout.view';

export function createProductView(page, view: any) {
    return baseLayout(page, `
        <div class="site-container">
            <form id="create_product" name="create_product" class="form" data-method="post" action="api/products">
                <h1>Create product</h1>
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
                
                <div class="form-group">
                    <button class="btn btn-success btn-submit" disabled>Create</button>
                </div>
                <div id="errors" class="form-group d-none"></div>
                
            </form>
        </div>
    `);
}