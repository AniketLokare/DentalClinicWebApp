import React, { useRef } from "react";
import { useLocation } from "react-router-dom";
import { useGetSaleOrderDetail, useGetMedicinesListBySaleOrderId } from "src/hooks/useSalesOrder";
import jsPDF from "jspdf"; // ✅ Correct Import
import "jspdf-autotable"; // ✅ Import AutoTable Plugin

const PrintBill: React.FC = () => {
  const location = useLocation();
  const saleOrderId = location.state; // ✅ Get sale order ID from navigation

  // ✅ Ensure we have an ID before fetching
  if (!saleOrderId) return <p>Error: No sale order ID provided.</p>;

  // ✅ Fetch order & medicines data
  const { data: saleOrder, isLoading: orderLoading, error: orderError } = useGetSaleOrderDetail({ id: saleOrderId });
  const { response: medicines, isLoading: medLoading, error: medError } = useGetMedicinesListBySaleOrderId(saleOrderId);

  const billRef = useRef<HTMLDivElement | null>(null);

  const downloadPDF = () => {
    if (!saleOrder || !medicines) return;

    const doc = new jsPDF();

    // ✅ Title
    doc.setFontSize(18);
    doc.text("Medical Bill", 14, 20);

    // ✅ Sale Order Details
    doc.setFontSize(12);
    doc.text(`Patient Name: ${saleOrder?.patientName}`, 14, 30);
    doc.text(`Total Amount: $${saleOrder?.totalAmount}`, 14, 40);
    doc.text(`Date: ${saleOrder?.billDate}`, 14, 50);

    // ✅ Medicines Table
    const tableColumn = ["Medicine", "Quantity", "Price ($)"];
    const tableRows = medicines?.content.map((med) => [med.medName, med.medQuantity, med.totalAmount]) || [];

    // ✅ Fix AutoTable TypeScript Issue
    (doc as any).autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 60,
    });

    // ✅ Save as PDF
    doc.save(`Medical_Bill_${saleOrder?.patientName}.pdf`);
  };

  if (orderLoading || medLoading) return <p>Loading...</p>;
  if (orderError || medError) return <p>Error loading bill data.</p>;

  return (
    <div>
      <div ref={billRef} className="p-4 border rounded bg-white">
        <h2 className="text-xl font-bold">Medical Bill</h2>
        <p><strong>Patient Name:</strong> {saleOrder?.patientName}</p>
        <p><strong>Total Amount:</strong> ${saleOrder?.totalAmount}</p>
        <p><strong>Date:</strong> {saleOrder?.billDate}</p>

        <h3 className="mt-4 text-lg font-semibold">Medicines</h3>
        <ul>
          {medicines?.content.map((med) => (
            <li key={med.medicineNumber}>
              {med.medName} - {med.medQuantity} x ${med.totalAmount}
            </li>
          ))}
        </ul>
      </div>

      <button
        onClick={downloadPDF}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Download PDF
      </button>
    </div>
  );
};

export default PrintBill;
