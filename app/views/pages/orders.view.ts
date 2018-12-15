import { baseLayout } from '../layouts/base-layout.view';

export function ordersView(page, view: any) {
    return baseLayout(page, `
    <div class="site-container">
        <h1 class="text-center">Orders</h1>
        <table id="orders-table" class="orders-table text-center">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Price</th>
                    <th>Details</th>
                    <th>Created At</th>
                    <th></th>
                </tr>
            </thead>
            <tbody class="text-center"></tbody>
            <tfoot></tfoot>
        </table>
    </div>
    `);
}