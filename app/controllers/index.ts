import { HomeController } from './pages/home.controller';
import { AssetsController } from './misc/assets.controller';
import { UserController } from './api/user.controller';
import { UsersController } from './api/users.controller';
import { SignUpController } from './pages/sign-up.controller';
import { LoginController } from './pages/login.controller';
import { TokenController } from './api/token.controller';
import { AccountController } from './pages/account.controller';
import { ProductController } from './api/product.controller';
import { ProductsController } from './api/products.controller';
import { CreateProductController } from './pages/create-product.controller';
import { ProductDetailController } from './pages/product-detail.controller';
import { CartController } from './pages/cart.controller';
import { CartListController } from './api/cart-list.controller';
import { OrderController } from './api/order.controller';

export const controllers = [
    // api
    new UserController(),
    new UsersController(),
    new TokenController(),
    new ProductController(),
    new ProductsController(),
    new CartListController(),
    new OrderController(),
    // assets
    new AssetsController(),
    // pages
    new HomeController(),
    new SignUpController(),
    new LoginController(),
    new AccountController(),
    new CreateProductController(),
    new ProductDetailController(),
    new CartController()
];
