import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  Container,
  Box,
  Alert,
  CircularProgress
} from '@mui/material';
import { ShoppingCart, CreditCard } from '@mui/icons-material';
import axios from 'axios';
import { serverEndpoint } from '../config/config';

const CreditPacks = () => {
  const [creditPacks, setCreditPacks] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedPack, setSelectedPack] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchCreditPacks();
  }, []);

  const fetchCreditPacks = async () => {
    try {
      const response = await axios.get(`${serverEndpoint}/payment/credit-packs`);
      setCreditPacks(response.data.data);
    } catch (error) {
      setError('Failed to load credit packs');
      console.error('Error fetching credit packs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePackSelect = (amount) => {
    setSelectedPack(amount);
    setError('');
    setSuccess('');
  };

      const handlePurchase = async () => {
        if (!selectedPack) {
            setError('Please select a credit pack');
            return;
        }

        setProcessing(true);
        setError('');
        setSuccess('');

        try {
            // Create payment order
            const orderResponse = await axios.post(
                `${serverEndpoint}/payment/create-order`,
                { credits: selectedPack },
                { withCredentials: true }
            );

            const { order } = orderResponse.data;

                  // Initialize Razorpay
            const options = {
                key: process.env.REACT_APP_RAZORPAY_KEY_ID,
                amount: order.amount,
                currency: 'INR',
                name: 'Your App Name',
                description: `${selectedPack} Credits`,
                order_id: order.id,
                handler: async function (response) {
                    try {
                        // Verify payment
                        const verifyResponse = await axios.post(
                            `${serverEndpoint}/payment/verify-order`,
                            {
                                razorpay_order_id: response.razorpay_order_id,
                                razorpay_payment_id: response.razorpay_payment_id,
                                razorpay_signature: response.razorpay_signature,
                                credits: selectedPack
                            },
                            { withCredentials: true }
                        );

                        setSuccess('Payment successful! Credits added to your account.');
                        setSelectedPack(null);
                    } catch (error) {
                        setError('Payment verification failed');
                        console.error('Payment verification error:', error);
                    }
                },
        prefill: {
          name: 'User Name', // You can get this from user context
          email: 'user@example.com', // You can get this from user context
        },
        theme: {
          color: '#1976d2'
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (error) {
      setError('Failed to create payment order');
      console.error('Payment order error:', error);
    } finally {
      setProcessing(false);
    }
  };

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Box display="flex" justifyContent="center">
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        <CreditCard sx={{ mr: 1, verticalAlign: 'middle' }} />
        Credit Packs
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {success && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {success}
        </Alert>
      )}

      <Grid container spacing={3}>
        {Object.entries(creditPacks).map(([amount, credits]) => (
          <Grid item xs={12} sm={6} md={3} key={amount}>
            <Card 
              sx={{ 
                cursor: 'pointer',
                border: selectedPack === parseInt(amount) ? 2 : 1,
                borderColor: selectedPack === parseInt(amount) ? 'primary.main' : 'divider',
                '&:hover': {
                  boxShadow: 3
                }
              }}
              onClick={() => handlePackSelect(parseInt(amount))}
            >
              <CardContent sx={{ textAlign: 'center' }}>
                <Typography variant="h5" component="h2" gutterBottom>
                  {credits} Credits
                </Typography>
                <Typography variant="h6" color="primary" gutterBottom>
                  ₹{amount}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Best value for money
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Button
          variant="contained"
          size="large"
          startIcon={<ShoppingCart />}
          onClick={handlePurchase}
          disabled={!selectedPack || processing}
          sx={{ minWidth: 200 }}
        >
          {processing ? 'Processing...' : 'Purchase Credits'}
        </Button>
      </Box>

      {selectedPack && (
        <Box sx={{ mt: 2, textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            Selected: {selectedPack} Credits for ₹{selectedPack}
          </Typography>
        </Box>
      )}
    </Container>
  );
};

export default CreditPacks; 