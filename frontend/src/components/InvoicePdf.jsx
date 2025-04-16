import React from "react";
import {
    Page,
    Text,
    View,
    Document,
    StyleSheet,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
    page: {
        fontFamily: "Helvetica",
        fontSize: 11,
        padding: 40,
        backgroundColor: "#fff",
        color: "#333",
        position: "relative"
    },
    header: {
        borderBottom: "1 solid #e0e0e0",
        paddingBottom: 10,
        marginBottom: 20,
    },
    companyName: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#2c3e50",
    },
    sectionTitle: {
        fontSize: 12,
        fontWeight: "bold",
        marginBottom: 5,
        color: "#555",
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    invoiceDetails: {
        marginBottom: 10,
    },
    tableRow: {
        flexDirection: "row",
        borderBottomWidth: 1,
        borderColor: "#e0e0e0",
        paddingVertical: 6,
        paddingHorizontal: 8,
    },
    tableHeader: {
        backgroundColor: "#f8f8f8",
        fontWeight: "bold",
    },
    tableCol: {
        flex: 1,
        fontSize: 10,
    },
    billingSummaryContainer: {
        position: "absolute",
        bottom: 80,
        left: 40,
        right: 40,
        padding: 10,
        border: "1 solid #ccc",
        borderRadius: 8,
        backgroundColor: "#f9f9f9",
    },
    summaryRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 4,
    },
    summaryLabel: {
        fontWeight: "bold",
    },
    statusWrapper: {
        flexDirection: "row",
        justifyContent: "flex-end",
        marginTop: 8,
    },
    status: {
        paddingVertical: 4,
        paddingHorizontal: 10,
        borderRadius: 20,
        fontSize: 11,
        fontWeight: "bold",
        textAlign: "center",
        minWidth: 70,
    },
    paid: {
        backgroundColor: "#d4edda",
        color: "#155724",
    },
    unpaid: {
        backgroundColor: "#f8d7da",
        color: "#721c24",
    },
    footer: {
        position: "absolute",
        bottom: 40,
        left: 40,
        right: 40,
        flexDirection: "row",
        justifyContent: "space-between",
        fontSize: 9,
        color: "#999",
    },
});

const InvoicePdf = ({ invoiceData }) => {
    const {
        clientName,
        clientAddress,
        invoiceNumber,
        date,
        time,
        items,
        total,
        grandTotal,
        discount,
        paymentMethod,
        paidAmount,
        balance,
        saleMan,
        isPaid,
    } = invoiceData;

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                {/* Company Header */}
                <View style={styles.header}>
                    <Text style={styles.companyName}>Hisham Agency</Text>
                    <Text>Ala Gothuruth , Kothaparambu , Kodugallur</Text>
                </View>

                {/* Invoice and Client Info */}
                <View style={[styles.row, styles.invoiceDetails]}>
                    <View>
                        <Text style={styles.sectionTitle}>Bill To:</Text>
                        <Text>{clientName}</Text>
                        <Text>{clientAddress}</Text>
                    </View>
                    <View>
                        <Text style={styles.sectionTitle}>Invoice: #{invoiceNumber}</Text>
                        <Text>Date: {date}</Text>
                        <Text>Time: {time}</Text>
                    </View>
                </View>

                {/* Salesperson Info */}
                <Text style={{ fontWeight: "bold", marginBottom: 10 }}>
                    Salesperson: {saleMan}
                </Text>

                {/* Product Table Header */}
                <View style={[styles.tableRow, styles.tableHeader]}>
                    <Text style={styles.tableCol}>Item</Text>
                    <Text style={styles.tableCol}>Qty</Text>
                    <Text style={styles.tableCol}>Unit Price</Text>
                    <Text style={styles.tableCol}>Amount</Text>
                </View>

                {/* Table Rows */}
                {items.map((item, index) => (
                    <View key={index} style={styles.tableRow}>
                        <Text style={styles.tableCol}>{item.name}</Text>
                        <Text style={styles.tableCol}>{item.quantity}</Text>
                        <Text style={styles.tableCol}>₹{item.unitPrice.toFixed(2)}</Text>
                        <Text style={styles.tableCol}>₹{(item.quantity * item.unitPrice).toFixed(2)}</Text>
                    </View>
                ))}

                {/* Billing Summary at Bottom */}
                <View style={styles.billingSummaryContainer}>
                    <View style={styles.summaryRow}>
                        <Text>Total Price:</Text>
                        <Text>₹{total.toFixed(2)}</Text>
                    </View>
                    <View style={styles.summaryRow}>
                        <Text>Discount:</Text>
                        <Text>₹{discount.toFixed(2)}</Text>
                    </View>
                    <View style={styles.summaryRow}>
                        <Text style={[styles.summaryLabel, { fontSize: 13 }]}>Grand Total:</Text>
                        <Text style={[styles.summaryLabel, { fontSize: 13 }]}>₹{grandTotal.toFixed(2)}</Text>
                    </View>

                    <View style={styles.summaryRow}>
                        <Text>Payment Method:</Text>
                        <Text>{paymentMethod}</Text>
                    </View>
                    <View style={styles.summaryRow}>
                        <Text>Paid Amount:</Text>
                        <Text>₹{paidAmount.toFixed(2)}</Text>
                    </View>
                    <View style={styles.summaryRow}>
                        <Text>Balance:</Text>
                        <Text>₹{balance.toFixed(2)}</Text>
                    </View>

                    {/* Paid/Unpaid Label to Right */}
                    <View style={styles.statusWrapper}>
                        <Text
                            style={[
                                styles.status,
                                isPaid ? styles.paid : styles.unpaid,
                            ]}
                        >
                            {isPaid ? "PAID" : "UNPAID"}
                        </Text>
                    </View>
                </View>

                {/* Footer */}
                <View style={styles.footer}>
                    <Text>Email: hishamkhofficial@gmail.com</Text>
                    <Text>Phone: +91-9349818253</Text>
                </View>
            </Page>
        </Document>
    );
};

export default InvoicePdf;
