export default function formatCurrency(priceCents) {
    return (Math.round(priceCents) / 100).toFixed(2);
}