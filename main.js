const express = require('express');
const app = express();
const port = 3000;

const products = [
    { id: 1, title: "iPhone 15 Pro", price: 1000, slug: "iphone-15-pro" },
    { id: 2, title: "Samsung S24 Ultra", price: 1200, slug: "samsung-s24-ultra" },
    { id: 3, title: "MacBook Air M2", price: 900, slug: "macbook-air-m2" },
    { id: 4, title: "Sony WH-1000XM5", price: 350, slug: "sony-wh-1000xm5" },
];

app.get('/products', (req, res) => {
    let { title, minPrice, maxPrice, slug } = req.query;
    let filteredProducts = [...products];

    if (title) {
        filteredProducts = filteredProducts.filter(p => 
            p.title.toLowerCase().includes(title.toLowerCase())
        );
    }
    if (slug) {
        filteredProducts = filteredProducts.filter(p => p.slug === slug);
    }
    if (minPrice) {
        filteredProducts = filteredProducts.filter(p => p.price >= Number(minPrice));
    }
    if (maxPrice) {
        filteredProducts = filteredProducts.filter(p => p.price <= Number(maxPrice));
    }
    res.json(filteredProducts);
});

app.get('/products/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const product = products.find(p => p.id === id);

    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ message: "Sản phẩm không tồn tại" });
    }
});

app.listen(port, () => {
    console.log(`Server đang chạy tại http://localhost:${port}`);
});
//