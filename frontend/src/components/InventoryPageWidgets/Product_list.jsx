import {
    Card,
    CardHeader,
    CardBody,
    Heading,
    Stack
  } from '@chakra-ui/react'
  

import React from 'react'

function Inventory_list() {
    return (
        <Card size="sm">
          <CardHeader>
            <Heading size="md">Card - sm</Heading>
          </CardHeader>
          <CardBody>
            This is the card body. Lorem ipsum dolor sit amet.
          </CardBody>
        </Card>
    )
}

export default Inventory_list
