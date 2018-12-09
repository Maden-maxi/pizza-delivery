import { TEMPLATE_GLOBALS } from '../../../config/constants';

const d = new Date();

export function baseLayout(page: any, content: string) {
    return `
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <meta name="description" content="${page.description}">
        <base href="${TEMPLATE_GLOBALS.baseUrl}">
        <link rel="stylesheet" href="public/app.css">
        <title>${page.title ? page.title + ' | ' + TEMPLATE_GLOBALS.siteName : TEMPLATE_GLOBALS.siteName }</title>
    </head>
    <body ${page.customClass ? `class="${page.customClass}"` : ''}>
        <div class="wrapper">
            <div class="content">
                <header id="header">
                    <div class="site-container">
                        <div class="d-flex justify-content-between align-items-center"> 
                            <a href="/" class="logo-wrapper">
                                <img src="public/img/logo.png" alt="logo" class="logo img-responsive" title="logo">
                            </a>
                            <nav class="nav">
                                ${
                                    TEMPLATE_GLOBALS.menu
                                        .map(menuItem => `<a class="nav-link ${menuItem.visibility.join(' ')}" title="${menuItem.title}" href="${menuItem.url}">${menuItem.title}</a>` )
                                        .join('\r\n')
                                }
                                <a class="nav-link cart buyer" title="Cart" href="/cart">Cart <span id="cart-counter" class="product-count"></span></a>
                            </nav>
                        </div>
                    </div>
                </header>
                <main id="main">${content}</main>
            </div>
            <footer id="footer">
                <div class="site-container">
                    <div class="footer-content">All right reserved. ${d.getFullYear()}</div>
                </div>
            </footer>
        </div>
        <script src="public/app.js"></script>
    </body>
</html>      
`;
}