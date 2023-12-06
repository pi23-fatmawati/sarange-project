document.addEventListener("DOMContentLoaded", function () {
    const orderDetails = JSON.parse(localStorage.getItem('currentOrderDetails'));
    document.getElementById('orderID').textContent = `Detail Order #${orderDetails.orderID}`;
    document.getElementById('productName').textContent = orderDetails.productName;
    document.getElementById('quantity').textContent = `${orderDetails.quantity} kg`;
    document.getElementById('coin-tag').textContent = orderDetails.coin;
    document.getElementById('status').textContent = orderDetails.status;
    document.getElementById('address').textContent = orderDetails.address;
    document.getElementById('dateTime').textContent = orderDetails.dateTime;
    document.getElementById('koin').textContent = orderDetails.koin;
});