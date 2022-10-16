const express = require('express')
const app = express()

// import repositories and use cases
const ProductRepository = require('../repository/productRepo');
const CategoryRepository = require('../repository/categoryRepo');
const UserRepository = require('../repository/userRepo');


const ProductUseCase = require('../usecase/productUseCase');
const CategoryUseCase = require('../usecase/categoryUseCase');
const AuthUseCase = require('../usecase/authUseCase');
const UserUseCase = require('../usecase/userUseCase');

// import routers
const authRouter = require('./routes/auth');
const productRouter = require('./routes/product');
const categoryRouter = require('./routes/category');
const userRouter = require('./routes/user')

// init repositories and use cases
const authUC = new AuthUseCase(new UserRepository())
const categoryUC = new CategoryUseCase(new CategoryRepository())
const productUC = new ProductUseCase(new ProductRepository())
const userUC = new UserUseCase(new UserRepository())


// json
app.use(express.json())

// inject use cases
app.use((req,res,next) => {
    req.categoryUC = categoryUC;
    req.productUC = productUC;
    req.authUC = authUC;
    req.userUC = userUC
    next()
})

app.get('', function (req, res) {
    // #swagger.ignore = true
    res.send('Hello World')
})

// init routers
app.use('/customer', userRouter)
app.use('/category', categoryRouter)
app.use('/item', productRouter)
app.use('/', authRouter)

// documentation
// const swaggerUi = require('swagger-ui-express');
// const swaggerDocument = require('../docs/docs.json');

// app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

module.exports = app

