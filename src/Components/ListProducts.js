import { useEffect, useState } from 'react';
import { Carousel, Card, Empty } from 'antd';
import { toast } from 'react-toastify';
import { DeleteOutlined } from '@ant-design/icons';
import { db } from '../firebase';

const { Meta } = Card;

const contentStyle = {
    height: '160px',
    width: '100%',
    lineHeight: '160px',
    background: 'black',
};

const getCarrousel = (images) => (
    <Carousel autoplay>
        {images.map((image, i) => (
            <div key={i} style={contentStyle}>
                <img alt="" src={image.url} />
            </div>
        ))}
    </Carousel>
);

const Product = ({ id, title, description, images, deleteProduct }) => (
    <Card
        className="product"
        cover={getCarrousel(images)}
        actions={[
            <DeleteOutlined onClick={() => deleteProduct(id) } key="delete" />
        ]}
    >
        <Meta
            title={title}
            description={description}
        />
    </Card>
);

const ListProducts = () => {
    const [products, setProducts] = useState([]);

    const getProducts = () => {
        db.collection('products').onSnapshot((querySnapshot) => {
            const docs = [];
            querySnapshot.forEach((doc) => {
                docs.push({ ...doc.data(), id: doc.id });
            });
            setProducts(docs);
            console.log(docs);
        });
    };

    useEffect(() => {
        getProducts();
    }, []);

    const handleDeleteProduct = async (id) => {
        console.log('Deleting product with id:', id)
        await db.collection('products').doc(id).delete();
        toast('You deleted a product!', {
            type: 'error'
        });
        getProducts();
    }

    return (
        <>
            {products.length ? (
                products.map((product) => <Product {...product} deleteProduct={handleDeleteProduct} key={product.id} />)
            ) : (
                <Empty description="No Products Registered" />
            )}
        </>
    );
};

export default ListProducts;
