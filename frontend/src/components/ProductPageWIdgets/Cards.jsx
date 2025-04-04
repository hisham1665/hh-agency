import React from 'react'
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
  Text,
  Heading,
  Center
} from '@chakra-ui/react'

function Cards_product() {
  return (
    <Card maxW="sm" overflow="hidden" m={10} >
      <CardHeader>
        <Heading size="md">Living room Sofa</Heading>
      </CardHeader>

      <Image
        src="https://craftsmill.in/cdn/shop/files/sofas-accent-chairs-cider-orange-soft-velvet-touch-fabric-emily-flared-arm-2-seater-sofa-60-46567514931491.jpg?v=1725047510" // you can replace with your image URL
        alt="Green double couch with wooden legs"
        height={280}
        width={260}
        
        alignSelf={'center'}
      />

      <CardBody>
        <Text>
          This sofa is perfect for modern tropical spaces, baroque inspired spaces.
        </Text>
        <Text fontSize="2xl" fontWeight="medium" letterSpacing="tight" mt="1">
          $450
        </Text>
      </CardBody>

      <CardFooter>
        <Button variant="solid" colorScheme="blue" mr="2">
          Buy now
        </Button>
        <Button variant="ghost">Add to cart</Button>
      </CardFooter>
    </Card>
  )
}

export default Cards_product
