import { ProductController } from "../controllers/product";
import { Router } from "./Router";
import { Required } from "../middlewares/userRequired";

const router = new Router()
const controllers = new ProductController()
const required = new Required()


router.get('/product/list', controllers.getAllProducts)
router.get('/hello', controllers.helloApi)
router.post('/product/detail', controllers.getProduct)
router.post('/product/create-product', required.adminRequired, controllers.createProduct)
router.post('/product/delete-product', required.adminRequired, controllers.deleteProduct)
router.post('/product/update-product', required.adminRequired, controllers.updateProduct)


export default router