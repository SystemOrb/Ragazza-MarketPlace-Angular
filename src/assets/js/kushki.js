function init_kushki() {
    $(function() {
        "use strict";
        var kushki = new KushkiCheckout({
            form: 'kushki-pay-form',
            merchant_id: "1000000363948843353915366872700",
            amount: {
                subtotalIva: parseInt($('#totalAmount').val()),
                subtotalIva0: 0,
                ice: 0,
                iva: 0,
                currency: "USD"
            },
            currency: "USD",
            payment_methods: ["credit-card"],
            is_subscription: false,
            inTestEnvironment: true
        });
    });
}