import ProductForm from './Components/ProductForm';
import ListProducts from './Components/ListProducts';
import { toast } from 'react-toastify';
import { db } from './firebase';

import 'antd/dist/antd.css';
import './App.css';

function App() {

    const onCreateProduct = async ({ title, description, images: { fileList } }) => {
        console.log(title, description, fileList);
        await db.collection('products').doc().set({ 
            title,
            description,
            images: fileList.map(({ name, thumbUrl }) => ({ name, url: thumbUrl }))
        });
        toast('You created a product!', {
            type: 'success'
        });
    }

    return (
        <div className="App">
            <div id="wrapProducts">
                <div className="wrapProductForm">
                    <h1>Create Product</h1>
                    <ProductForm onSubmit={onCreateProduct} />
                </div>
                <h1>Products</h1>
                <div className="listProducts">
                    <ListProducts />
                </div>
            </div>
        </div>
    );
}

export default App;
