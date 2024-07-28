# DashVendas

## 💻 Projeto

Este projeto de Back End tem como objetivo criar gráficos sobre a venda de determinados produtos, buscando fazer previsões para a venda de mais produtos. O projeto possui as seguintes funcionalidades:
 - Listar os produtos
 - Mostrar o gráfico de venda de um determinado produto
 - Comparar vendas de produtos
 - Mostrar os 10 produtos mais vendidos


## 🚀 Tecnologias

Este projeto foi desenvolvido com as seguintes tecnologias:

- NodeJS
- Typescript
- Prisma
- Fastify
- HTML
- Javascript
- ChartJS

## 🕹️ Executar

### Instalar as dependências:
```bash
npm install -y
```

### Executar servidor
```bash
npm run dev
```

### Rotas
#### Produtos
- GET - `/products` : Captura Todos os produtos cadastrados

#### Gráficos
**É preciso que no Header(cabeçalho) tenha o campo email com valor do email de um usuário cadastrado**
- GET - `/graph/:id` : Mostra o gráfico de um produto
- GET - `/graph` : Mostra o gráfico de todos os 10 produtos mais vendidos
- GET - `/graph/compare` : Compara o gráfico de venda de até 10 produtos, passando no corpo da requisição os ID produtos a serem comparados:
```json
{
  "products": [
        "idProduct1",
        "idProduct2",
        "idProduct3"
    ]
}
```

---
###### 🚀KaikMcpe12🚀