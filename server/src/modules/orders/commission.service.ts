
export const calculateCommission = (subTotal: number, rate: number): number => {
    return (subTotal * rate) / 100;
};

// Future expansion:
// - Different rates per category
// - Tiered commission
