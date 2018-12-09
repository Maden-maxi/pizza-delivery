import { baseLayout } from '../layouts/base-layout.view';

export function cartView(page, view: any) {
    return baseLayout(page, `
        <div class="site-container">
            <h1>Cart</h1>
            <form id="cart_form">
                <table class="cart-table">
                    <thead>
                        <tr>
                            <th>Title</th><th>Price</th><th>Count</th><th></th>
                        </tr>
                    </thead>
                    <tbody id="cart_items"></tbody>
                    <tfoot>
                        <tr>
                            <td></td>
                            <td>Total: <span id="total_price"></span>$</td>
                            <td>Count: <span id="total_count"></span></td>
                            <td><button class="btn btn-success" type="submit">Make order</button></td>
                        </tr>
                    </tfoot>
                </table>
            </form>
        </div>
    `);
}