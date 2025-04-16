import React, { useEffect, useState } from 'react'
import Catogory_Card from './Catogory_Card'
import axios from 'axios';
import { Center, Flex, Heading, Spinner, Stack, Text } from '@chakra-ui/react';
function Catogories() {
  const [categories , setCategories] = useState([]);
  const [loading , setLoading] = useState(true);
  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/api/catagory/get-catagory");
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
    return <Center><Text><Spinner size={'md'}/>Loading ...........</Text></Center>
  }
  return (
    <div className='flex flex-row overflow'>
      <Stack direction={'column'} spacing={4} width={'full'} paddingTop={'5'} >
      <Heading mb={4} textAlign="center" > Product Categories  </Heading>
        <Catogory_Card catagories = {categories} /> 
      </Stack>
    </div>
  )
}

export default Catogories
