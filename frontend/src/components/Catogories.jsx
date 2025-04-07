import React, { useEffect, useState } from 'react'
import Catogory_Card from './Catogory_Card'
import axios from 'axios';
import { Spinner, Text } from '@chakra-ui/react';
function Catogories() {
  const [categories , setCategories] = useState([]);
  const [loading , setLoading] = useState(true);
  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:5000/api/catagory/get-catagory");
      setCategories(res.data || []);
    } catch (err) {
      console.error('Failed to fetch categories:', err);
    } finally {
      setLoading(false);
    }
  };
  useEffect (() => {
    fetchCategories();
  },[])
  if(loading) {
    return <Text><Spinner size={'md'}/>Loading ...........</Text>
  }
  return (
    <div className='flex flex-row overflow'>
        <Catogory_Card catagories = {categories} /> 
    </div>
  )
}

export default Catogories