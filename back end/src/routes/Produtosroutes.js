import { Router } from "express";

const router = Router();

console.log("Arquivo productRoutes carregado");

// POST (postar)
router.post("/", (req, res) => {

    const newProduct ={
        id: products.length + 1,
        name: req.body.name,
        price: req.body.price
    }

    products.push(newProduct);

    res.status(201).json({
        message: "Produto adicionado",
        product: newProduct
    })


});

//A lista de produtos
const products = [
    {
        id: 1,
        name: "Notebook Gamer",
        price: 5000
    },
    {
        id: 2,
        name: "bonequim do max",
        price: 6700
    },
    {
        id: 3,
        name: "bonequim do bigas",
        price: 420
    },
    {
        id: 4,
        name: "bonequim do japa",
        price: 1102
    }
];

// GET (Pegar)
router.get("/", (req, res) => {
    console.log("Entrou na rota GET /products");

    res.json(products);
});

// DELETAR (DELETE)
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const productIndex = products.findIndex(p => p.id === Number(id));
  const deletedProduct = products.splice(productIndex, 1);

  res.json({
    message: "Produto removido com sucesso!",
    product: deletedProduct[0]
  });
});

// ATUALIZAR (PUT)
router.put("/:id", (req, res) => {

  const { id } = req.params;
  const { name, price } = req.body;
  const productIndex = products.findIndex(p => p.id === Number(id));

  products[productIndex] = {
    ...products[productIndex],
    name: name || products[productIndex].name,
    price: price !== undefined ? price : products[productIndex].price
  };

  res.json({
    message: "Produto atualizado com sucesso!",
    product: products[productIndex]
  });
});

export default router;
