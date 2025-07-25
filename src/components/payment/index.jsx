import { useCallback, useEffect, useState } from 'react';
import BillingInformation from './billingInformation';
import OrderDetails from './orderDetails';
import OrderSummary from './orderSummary';
import PaymentMethod from './paymentMethods';
import PropTypes from 'prop-types';
import { useSessions } from '../../hooks/useSessions';
import { formValidation } from '../../utils/formValidation';
import Form from '../../UI/form';

// Helper function to generate your cardholder
import { validateCardNumber, validateExpiryDate } from '../../utils/helper/getCardNumber'

const defaultPaymentState = {
  fullName: '',
  email: '',
  country: '',
  selectedPayment: null,
  cardDetails: {
    cardNumber: '',
    cardholderName: '',
    expiryDate: '',
    cvv: '',
    saveCard: false
  },
  bankDetails: {
    accountNumber: '',
    routingNumber: '',
    accountName: '',
    bankName: '',
    bankAddress: '',
    swiftCode: '',
    iban: '',
    transferType: 'domestic'
  }
};

// In real app, this validation stored in the server.
const paymentValidationRules = {
  fullName: { required: true, type: 'text' },
  email: { required: true, type: 'email' },
  selectedPayment: { required: true },
  cardDetails: {
    required: true,
    rules: {
      cardNumber: {
        required: true,
        validate: (value) => {
          // Only perform Luhn validation in production mode
          const isProd = import.meta.env.VITE_NODE_ENV === 'production';
          const digitsOnly = value.replace(/\D/g, '');

          if (digitsOnly.length < 13 || digitsOnly.length > 19) {
            return 'Card number must be between 13-19 digits';
          };

          if (isProd && !validateCardNumber(digitsOnly)) {
            return 'Please enter a valid card number'
          };

          return true
        }
      },
      cardholderName: { required: true, minLength: 3 },
      expiryDate: {
        required: true,
        validate: (value) => validateExpiryDate(value) || 'Card has expired'
      },
      cvv: {
        required: true,
        validate: (value) => {
          const digitsOnly = value.replace(/\D/g, '');
          return (digitsOnly.length >= 3 && digitsOnly.length <= 4) || 'CVV must be 3-4 digits'
        }
      }
    }
  },
  bankDetails: {
    required: (state) => state.selectedPayment === 'bank transfer',
    rules: {
      // Always required fields for any bank transfer
      bankName: {
        required: true,
        validate: (value) => {
          return value && value.trim().length >= 2 || 'Bank name must be at least 2 characters';
        }
      },
      accountName: {
        required: true,
        minLength: 2
      },
      accountNumber: {
        required: true,
        validate: (value) => {
          const digitsOnly = value.replace(/\D/g, '');
          return digitsOnly.length >= 5 && digitsOnly.length <= 17 || 'Account number must be 5-17 digits';
        }
      },
      bankAddress: {
        required: true,
        validate: (value) => {
          return value && value.trim().length >= 5 || 'Please enter a complete bank address';
        }
      },
      // Domestic transfer specific fields
      routingNumber: {
        required: (state) => {
          return state.selectedPayment === 'bank transfer' &&
            state.bankDetails &&
            state.bankDetails.transferType === 'domestic';
        },
        validate: (value, state) => {
          // Skip validation if this field shouldn't be required
          if (state.bankDetails?.transferType !== 'domestic') return true;

          const digitsOnly = value.replace(/\D/g, '');
          return digitsOnly.length === 9 || 'Routing number must be exactly 9 digits';
        }
      },
      // International transfer specific fields
      swiftCode: {
        required: (state) => {
          return state.selectedPayment === 'bank transfer' &&
            state.bankDetails &&
            state.bankDetails.transferType === 'international';
        },
        validate: (value, state) => {
          // Skip validation if this field shouldn't be required
          if (state.bankDetails?.transferType !== 'international') return true;

          // SWIFT/BIC format: 8 or 11 characters (first 6 are letters, followed by country and location codes)
          const swiftCode = value.replace(/\s/g, '').toUpperCase();
          const swiftRegex = /^[A-Z]{6}[A-Z0-9]{2}([A-Z0-9]{3})?$/;

          return swiftRegex.test(swiftCode) || 'Please enter a valid SWIFT/BIC code (8 or 11 characters)';
        }
      },
      iban: {
        required: (state) => {
          return state.selectedPayment === 'bank transfer' &&
            state.bankDetails &&
            state.bankDetails.transferType === 'international';
        },
        validate: (value, state) => {
          // Skip validation if this field shouldn't be required
          if (state.bankDetails?.transferType !== 'international') return true;

          // Basic IBAN validation: country code (2 letters) + check digits (2 numbers) + basic number (up to 30 chars)
          // For a more comprehensive validation, you could implement the modulo 97 check
          const iban = value.replace(/\s/g, '').toUpperCase();
          const ibanRegex = /^[A-Z]{2}[0-9]{2}[A-Z0-9]{1,30}$/;

          return ibanRegex.test(iban) || 'Please enter a valid IBAN';
        }
      },
      // Virtual field to track transfer type
      transferType: {
        required: (state) => state.selectedPayment === 'bank transfer',
        validate: (value) => {
          return ['domestic', 'international'].includes(value) || 'Please select a valid transfer type';
        }
      }
    }
  }
};

const Payment = ({ dark }) => {
  const { selectedSessions } = useSessions();
  const [paymentState, setPaymentState] = useState(defaultPaymentState);
  const [errors, setErrors] = useState({});
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null);

  // Calculate subtotal (before discounts)
  const calculatePrices = useCallback(() => {
    return selectedSessions?.reduce((total, session) => total + parseFloat(session.price), 0).toFixed(2);
  }, [selectedSessions]);

  // Calculate total after add the discount
  const calculateTotals = useCallback(() => {
    const subtotal = parseFloat(calculatePrices());
    const total = Math.max(0, subtotal - promoDiscount).toFixed(2);
    return total;
  }, [calculatePrices, promoDiscount]);

  // Function to handle promo code application - can be passed down to child components
  const applyPromoCode = (promoCode) => {
    // In a real app, this would validate the code against an API
    // For now, we'll just apply a hardcoded discount if any code is entered
    if (promoCode && promoCode.trim() !== '') {
      setPromoDiscount(4.99); // Apply $4.99 discount
    } else {
      setPromoDiscount(0); // reset discount if code is removed
    }
  };

  const handlePaymentChange = (e) => {
    const { name, value } = e.target;

    // Helper function to set values in nested objects using dot notation paths
    const createNestedValue = (obj, path, value) => {
      const keys = path.split('.');
      const lastKey = keys.pop();
      const lastObj = keys.reduce((obj, key) => obj[key] = obj[key] || {}, { ...obj })
      lastObj[lastKey] = value;
      return obj;
    };

    // update form state
    setPaymentState(prev => {
      if (name.includes('.')) {
        const newObj = createNestedValue({ ...prev }, name, value);
        return newObj
      } else {
        return { ...prev, [name]: value }
      }
    });

    // Handle validation separately to avoid validation issues with nested fields
    setPaymentState((prevState) => {
      const formErrors = formValidation(prevState, paymentValidationRules);

      // Update only the errors for the changed field
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name.split('.')[0]]: formErrors[name.split('.')[0]] || undefined
      }));

      return prevState;
    })
  };

  // handler for the transfer type radio button change
  const handleTransferTypeChange = (type) => {
    setPaymentState(prev => ({
      ...prev,
      bankDetails: {
        ...prev.bankDetails,
        transferType: type
      }
    }));

    // Clear any field errors that may no longer be relevant
    setErrors(prevErrors => {
      // If we have bankDetails errors, recalculate them after changing transfer type
      if (prevErrors.bankDetails) {
        const updatedState = {
          ...paymentState,
          bankDetails: {
            ...paymentState.bankDetails,
            transferType: type
          }
        };

        const newErrors = formValidation(updatedState, paymentValidationRules);
        return {
          ...prevErrors,
          bankDetails: newErrors.bankDetails || undefined
        };
      }
      return prevErrors;
    });
  };

  const handlePaymentSubmit = useCallback((e) => {
    e.preventDefault();
    console.log("Form submitted, checking validation...");

    // Run validation on the entire form
    const fieldErrors = formValidation(paymentState, paymentValidationRules);
    setErrors(fieldErrors);

    // Check if there are any top-level keys in the errors object
    const hasErrors = Object.keys(fieldErrors).length > 0;
    console.log("Has errors:", hasErrors);

    if (!hasErrors) {
      try {
        // In a real implementation, this would be an API call to your payment processor
        setTimeout(() => {
          const formData = new FormData();

          formData.append('fullName', paymentState.fullName);
          formData.append('email', paymentState.email);
          formData.append('country', paymentState.country);
          formData.append('selectedPayment', paymentState.selectedPayment);
          formData.append('totalPayment', calculateTotals());
          formData.append('selectedSessions', JSON.stringify(selectedSessions.map(session => session.title)));

          // Add payment method-specific details
          if (paymentState.selectedPayment === 'debit card') {
            // Add card details (in a real app, you'd use a secure tokenization service)
            formData.append('paymentDetails', JSON.stringify({
              type: 'debit_card',
              cardholderName: paymentState.cardDetails.cardholderName,
              // Only include last 4 digits for security
              cardNumber: `xxxx-xxxx-xxxx-${paymentState.cardDetails.cardNumber.slice(-4)}`,
              expiryDate: paymentState.cardDetails.expiryDate
            }));
          } else if (paymentState.selectedPayment === 'bank transfer') {
            // Add bank transfer details
            const bankDetails = {
              type: 'bank_transfer',
              transferType: paymentState.bankDetails.transferType,
              bankName: paymentState.bankDetails.bankName,
              accountName: paymentState.bankDetails.accountName,
              // Mask account number for security
              accountNumber: `xxxx${paymentState.bankDetails.accountNumber.slice(-4)}`,
              bankAddress: paymentState.bankDetails.bankAddress
            };

            // Add transfer type specific details
            if (paymentState.bankDetails.transferType === 'domestic') {
              // Add routing number (masked)
              bankDetails.routingNumber = `xxxx${paymentState.bankDetails.routingNumber.slice(-4)}`;
            } else {
              // Add international transfer details
              bankDetails.swiftCode = paymentState.bankDetails.swiftCode;
              // Mask IBAN for security
              bankDetails.iban = `xx${paymentState.bankDetails.iban.slice(-4)}`;
            }

            formData.append('paymentDetails', JSON.stringify(bankDetails));
          }

          const paymentDataInformation = Object.fromEntries(formData);
          console.log('Payment successful:', paymentDataInformation);

          // Reset form state and show success message
          setPaymentState(defaultPaymentState);
          setIsSubmitting(false);
          setPaymentStatus({
            success: true,
            message: 'Payment successful! Thank you for your order.'
          });

          alert('Payment successful! Thank you for your order.');

          // In a real app, you might redirect to a receipt page
        }, 1500)
      } catch (error) {
        console.error('Payment processing error:', error);
        setIsSubmitting(false);
        setPaymentStatus({
          success: false,
          message: 'There was an error processing your payment. Please try again.'
        });
      }
    } else {
      console.log("Form has validation errors:", fieldErrors);
      setIsSubmitting(false);
    }

  }, [paymentState, calculateTotals, selectedSessions]);

  useEffect(() => {
    if (selectedSessions.length === 0) {
      console.log('No Sessions selected, should redirect');
    };

    if (paymentStatus) {
      const timer = setTimeout(() => {
        setPaymentStatus(null);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [selectedSessions, paymentStatus]);

  return (
    <div className='w-full h-auto px-[8%]' aria-label='payment detail'>
      <Form className='w-full h-auto flex gap-10' submitForm={handlePaymentSubmit} autoComplete="off">
        <div className='flex-[60%] w-full h-auto flex flex-col gap-10'>
          <BillingInformation dark={dark} billingInformation={paymentState} handleBillingInformation={handlePaymentChange} errors={errors} />
          <PaymentMethod calculateTotals={calculateTotals} paymentMethod={paymentState} handlePaymentMethod={handlePaymentChange} errors={errors} handleTransferTypeChange={handleTransferTypeChange} isSubmitting={isSubmitting} />
        </div>
        <div className='flex-[40%] w-full h-auto flex flex-col gap-10'>
          <OrderDetails selectedSessions={selectedSessions} calculatePrices={calculatePrices} />
          <OrderSummary
            selectedSessions={selectedSessions}
            calculatePrices={calculatePrices}
            calculateTotals={calculateTotals}
            promoDiscount={promoDiscount}
            applyPromoCode={applyPromoCode}
            isSubmitting={isSubmitting}
          />
        </div>
      </Form>
    </div>
  )
};

Payment.propTypes = {
  dark: PropTypes.bool
};

export default Payment;