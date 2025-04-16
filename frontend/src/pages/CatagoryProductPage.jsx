import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import {
    Box,
    Heading,
    SimpleGrid,
    Text,
    Spinner,
    Image,
} from '@chakra-ui/react';

const CategoryProductsPage = () => {
    const { categoryName } = useParams();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [catagories, setCategories] = useState([]);
    const fetchProducts = async () => {
        try {
            const res = await axios.get(`/api/product/get-by-category/${categoryName}`);
            const url = `/api/catagory/get-catagory?q=${categoryName}`
            const catagoryRes = await axios.get(url)
            setProducts(res.data);
            setCategories(catagoryRes.data);
            console.log(url)
        } catch (err) {
            console.error('Error loading products', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, [categoryName]);

    if (loading) return <Spinner size="xl" />;

    return (
        <Box p={8}>
            <Heading mb={6}>Products in "{categoryName}"</Heading>
            {products.length === 0 ? (
                <Text>No products found in this category.</Text>
            ) : (
                <SimpleGrid columns={[1, 2, 3, 4]} spacing={8}>
                    {products.map((product) => (
                        <Box key={product._id} borderWidth="1px" borderRadius="lg" p={4}>
                            <Text fontWeight="bold">{product.Product_name}</Text>
                            <Image
                                src={catagories[0]?.Catagory_Image}
                                alt={catagories[0]?.Catagory_name}
                                objectFit="contain"
                                width="100%"
                                height="160px"
                                p={3}
                                borderWidth="1px"
                                borderColor="gray.200"
                                borderRadius="xl"
                                boxShadow="sm"
                            />
                            <Text>Price: ₹{product.Product_price}</Text>
                        </Box>
                    ))}
                </SimpleGrid>
            )}
        </Box>
    );
};

export default CategoryProductsPage;
