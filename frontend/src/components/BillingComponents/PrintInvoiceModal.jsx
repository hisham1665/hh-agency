// Import necessary components
import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
  useDisclosure,
  Spinner
} from "@chakra-ui/react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import InvoicePdf from "../InvoicePdf"; 
import axios from "axios";

const PrintInvoiceModal = ({ isOpen, onClose, latestBillId }) => {
  const [billData, setBillData] = useState(null);
  const [loading, setLoading] = useState(false);
    
  React.useEffect(() => {
    if (isOpen && latestBillId) {
      setLoading(true);
      axios
        .get(`http://localhost:5000/api/bills/search-bill?q=${latestBillId}`)
        .then((res) => {
        console.log(res);
          setBillData(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Failed to fetch bill", err);
          setLoading(false);
        });
    }
  }, [isOpen, latestBillId]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="lg">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Print Invoice</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {loading ? (
            <Spinner size="lg" />
          ) : billData ? (
            <Text>Do you want to print the invoice for <strong>{billData.Customer_name}</strong>?</Text>
          ) : (
            <Text color="red.500">Could not load bill data.</Text>
          )}
        </ModalBody>

        <ModalFooter>
          {billData && (
            <PDFDownloadLink
              document={
                <InvoicePdf
                  invoiceData={{
                    clientName: billData.Customer_name,
                    clientAddress: "Phone: " + billData.Customer_Number,
                    invoiceNumber: billData.Bill_ID,
                    date: new Date(billData.Bill_Date).toLocaleDateString(),
                    time: billData.Bill_Time,
                    items: billData.Billing_Products.map((p) => ({
                      name: p.Product_Name,
                      quantity: p.Product_QTY,
                      unitPrice: p.Product_Price,
                    })),
                    total: billData.Billing_Products.reduce(
                      (acc, item) => acc + item.Product_Price * item.Product_QTY,
                      0
                    ),
                    discount:
                      billData.Billing_Products.reduce(
                        (acc, item) => acc + item.Product_Price * item.Product_QTY,
                        0
                      ) - billData.Grand_total,
                    grandTotal: billData.Grand_total,
                    paidAmount: billData.Paid_amount,
                    balance: billData.Grand_total - billData.Paid_amount,
                    paymentMethod: billData.Payment_Method,
                    saleMan: billData.Sale_Man,
                    isPaid: billData.isPaid,
                  }}
                />
              }
              fileName={`Invoice_${billData.Customer_name}_${billData.Bill_ID}.pdf`}
              style={{ textDecoration: 'none' }}
            >
              {({ loading }) => (
                <Button colorScheme="teal" onClick={onClose} mr={3} isLoading={loading}>
                  Print Invoice
                </Button>
              )}
            </PDFDownloadLink>
          )}
          <Button onClick={onClose} variant="ghost">
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default PrintInvoiceModal;
