import React,{useMemo,useState} from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { InfoField, ErrorBoundary, PageLoader, Table, TableError ,Button,Actions} from 'src/components';
import { WHITE_SMOKE } from 'src/constants/colors';
import { formatDate } from 'src/util/common';
import { useGetMedicinesListByPurchaseOrderId } from 'src/hooks/usePurchaseOrder';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetMedicinesList } from 'src/hooks/useMedicines';

import useDeleteConfirmationModal from 'src/hooks/useDelete';
import {
  Avatar,
  FormControl,
  Card,
  Select,
  CardActions,
  CardContent,
  CardHeader,
  CircularProgress,
  Divider,
  Grid,
  InputLabel,
  MenuItem,
  SelectChangeEvent,
  TextField,
  
} from '@mui/material';


import { usePagination } from 'src/hooks/usePagination';
import { PurchaseTransactionTableColumns } from '../PurchaseTransactions/constants';
import { getEditPurchaseTransactionRoute, NEW_PURCHASE_PATH } from 'src/constants/paths';
import { deletePurchaseTransaction } from 'src/hooks/usePurchaseTransaction';

interface PurchaseBasicInfoProps {
  purchaseOrderDetails?: PurchaseOrder;
}

const PurchaseBasicInfo: React.FC<PurchaseBasicInfoProps> = ({
  purchaseOrderDetails,
}): JSX.Element => {
  const { id = '' } = useParams();
  const navigate = useNavigate();  
  const { pageNumber, changePageNumber } = usePagination();

  
  const formatToDDMMYYYY = (date: string | Date): string => {
    if (typeof date === 'string') {
      // Assume the string is already in DD-MM-YYYY format
      return date;
    }
    // Format a Date object to DD-MM-YYYY
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-based
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };


  
  // Handle purchase date
  const purchaseDateString = purchaseOrderDetails?.purchaseDate
    ? formatToDDMMYYYY(purchaseOrderDetails.purchaseDate)
    : 'N/A';
  
 // Fetch medicines list
 const { response: medicinesResponse, isFetching: isFetchingMedicines } = useGetMedicinesList({
  apiConfig: { params: { _page: pageNumber } },
});

const [selectedMedicine, setSelectedMedicine] = useState('');
const handleMedicineChange = (event: SelectChangeEvent<string>) => {
  setSelectedMedicine(event.target.value);
};

  const { response, isFetching } = useGetMedicinesListByPurchaseOrderId(id, {
    apiConfig: {
        params: {
          _page: pageNumber,
        },
      },
    });

    const {
        deleteConfirmationModalValues,
        onDeleteConfirm,
        showDeleteConfirmationModal,
        onShowDeleteConfirmationModal,
        onClose,
      } = useDeleteConfirmationModal({ onDelete: deletePurchaseTransaction });

      const purchaseTransactionTableColumnsWithActions = useMemo(
        () => [
          ...PurchaseTransactionTableColumns,
          {
            header: 'Actions',
            id: 'actions',
            cell: ({ row }) => {
              const purchaseTransactionValues = row.original;
      
              return (
                <Actions
                  onEditClick={() => {
                    navigate(
                      getEditPurchaseTransactionRoute(
                        purchaseTransactionValues.medtransactionId.toString()
                      )
                    );
                  }}
                  onDeleteClick={() => {
                    onShowDeleteConfirmationModal(
                      purchaseTransactionValues.medtransactionId.toString(),
                      purchaseTransactionValues.medicineName || 'No Transaction Number'
                    );
                  }}
                />
              );
            },
          },
        ],
        [PurchaseTransactionTableColumns, navigate, onShowDeleteConfirmationModal]
      );
      

    
      return (
        <Stack spacing={6}>
  {/* Vendor Details Section */}
  <Stack spacing={2}>
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'whiteSmoke', // Use a variable for color (you can replace it with the exact color you prefer)
        padding: '20px',
        borderRadius: '10px',
        boxShadow: 3, // Added box shadow for the card effect
      }}
    >
      <InfoField
        label="Invoice Number"
        value={purchaseOrderDetails?.inoviceNumber || 'N/A'}
      />
      <InfoField
        label="Purchase Date"
        value={purchaseDateString}
      />
      <InfoField
        label="Total Cost"
        value={`Rs. ${purchaseOrderDetails?.totalAmount || 0}`}
      />
    </Box>
  </Stack>

  {/* Medicine Form Section */}
  <Grid container spacing={2} sx={{ minHeight: '80vh',  justifyContent: 'center' }}>
    {/* Left Section: Vendor Details */}
    

    {/* Right Section: Medicine Form */}
    <Grid item xs={12} md={12}>
      <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
        <CardHeader
          title="Add Medicine"
          sx={{ textAlign: 'center', color: 'primary.main' }}
        />
        <Divider />
        <CardContent>
          {/* Here you can place your form fields (inputs, selects, etc.) similar to the previous code */}
          <Box component="form">
            {/* Example Form Fields */}
            <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
  <FormControl fullWidth variant="outlined" disabled={isFetchingMedicines}>
    <InputLabel id="medicine-select-label">Medicine Name</InputLabel>
    <Select
      labelId="medicine-select-label"
      value={selectedMedicine}
      onChange={handleMedicineChange}
      label="Medicine Name"
    >
      {medicinesResponse?.content?.map((medicine) => (
        <MenuItem key={medicine.medicineId} value={medicine.medicineName}>
          {medicine.medicineName}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
</Grid>

<Grid item xs={12} sm={6}>
  <TextField
    label="Medicine Id"
    fullWidth
    variant="outlined"
    InputProps={{ readOnly: true }}
    value={
      medicinesResponse?.content?.find((med) => med.medicineName === selectedMedicine)?.medicineId || ''
    }
  />
</Grid>

        {/* Medicine Batch */}
        

        {/* Medicine Batch */}
        <Grid item xs={12} sm={6}>
          <TextField
            label="Medicine Batch"
            fullWidth
            variant="outlined"
            
          />
        </Grid>

        {/* Expiry Date */}
        <Grid item xs={12} sm={6}>
          <TextField
            label="Expiry Date"
            fullWidth
            type="date"
            variant="outlined"
            InputLabelProps={{ shrink: true }}
            
          />
        </Grid>

        {/* Medicine Pack */}
        <Grid item xs={12} sm={6}>
          <TextField
            label="Medicine Pack"
            fullWidth
            type="number"
            variant="outlined"
            
          />
        </Grid>

        {/* Quantity */}
        <Grid item xs={12} sm={6}>
          <TextField
            label="Quantity"
            fullWidth
            type="number"
            variant="outlined"
            
          />
        </Grid>

        {/* Available Quantity */}
        <Grid item xs={12} sm={6}>
          <TextField
            label="Available Quantity"
            fullWidth
            type="number"
            variant="outlined"
            
          />
        </Grid>

        {/* MRP */}
        <Grid item xs={12} sm={6}>
          <TextField
            label="MRP"
            fullWidth
            type="number"
            variant="outlined"
            
          />
        </Grid>

        {/* Rate */}
        <Grid item xs={12} sm={6}>
          <TextField
            label="Rate"
            fullWidth
            type="number"
            variant="outlined"
           
          />
        </Grid>

        {/* Amount */}
        <Grid item xs={12} sm={6}>
          <TextField
            label="Amount"
            fullWidth
            type="number"
            variant="outlined"
           
          />
        </Grid>

        {/* Invoice Id */}
        <Grid item xs={12} sm={6} sx={{ display: 'none' }}>
          <TextField
            label="Invoice Id"
            fullWidth
            type="number"
            variant="outlined"
            value={purchaseOrderDetails?.invoiceId} 
          />
        </Grid>
      </Grid>

      <Divider sx={{  mt: 2}} />
        <Button type="submit" variant="contained" color="primary" sx={{ mr: 2, mt: 2 }}>
            Save Inventory
          </Button>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  </Grid>



          

          {/* Medicines List Section */}
          <Box>
            <Typography variant="h6">Medicines List</Typography>
            
            <ErrorBoundary fallbackComponent={TableError}>
              <PageLoader
                isLoading={isFetching}
                Components={{ Loading: 'table' }}
                emptyMessage="No Medicines Found"
              >
                <Table
                  columns={purchaseTransactionTableColumnsWithActions}
                  data={response?.content || []}
                  totalRecords={response?.items || 0}
                  onPageChange={changePageNumber}
                  pageNumber={pageNumber}
                />
              </PageLoader>
            </ErrorBoundary>
          </Box>
        </Stack>
      );
    };

export default PurchaseBasicInfo;
