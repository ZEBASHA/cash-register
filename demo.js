document.getElementById('submit').addEventListener('click', function () {

    document.getElementsByClassName('wrapper')[0].style.display = "block"
    document.getElementById('form').style.display = "none"

    let monete = [
        { name: '5000rup', value: 5000 },
        { name: '2000rup', value: 2000 },
        { name: '1000rup', value: 1000 },
        { name: '500rup', value: 500 },
        { name: '200rup', value: 200 },
        { name: '100jpg', value: 100 },
        { name: '50rup', value: 50 },
        { name: '20rup', value: 20 },
        { name: '10rup', value: 10 },
        { name: '5rup', value: 5 },
        { name: '2rup', value: 2 },
        { name: '1rup', value: 1 }
    ];

    function checkCashRegister(price, cash, cir) {

        cash = document.getElementById('new-cash').value
        price = document.getElementById('new-price').value
                                                                             // price is price for customer to pay, cash is how much customer give to us and cir is cash in register

        let pr = document.getElementById('price').innerHTML = ` Total Amount: ${price}`
        let ca = document.getElementById('cash').innerHTML = `Cash: ${cash}`

                                                                                              // calculate how much is the change
        let change = cash - price;

                                                                                               // calcuate the total cash in register
        let totalCir = cir.reduce(function (acc, curr) {
            acc.total += curr[1];
            acc[curr[0]] = curr[1];
            return acc;
        }, { total: 0 });


                                                                                            // Retutrn if there is insufficient funds in register or if there is no change
        if (totalCir.total < change) {
            return 'Insufficient Funds in Register';
        } else if (totalCir.total === change) {
            return 'No Change';
        }

        document.getElementById('change').innerHTML = `YOUR CHANGE IS: ${change}`;

        cir = cir.reverse();

        let result = monete.reduce(function (acc, next, index) {
           		                                                                // if the change is greater than or equal to the value of current monete
            if (change >= next.value) {
                let currentValue = 0;
                count = 0;
                                                                                    // keep looping as long as we have same monete of current value
                while (change >= next.value && cir[index][1] >= next.value) {

                    currentValue += next.value;
                    count = currentValue / next.value;
                    change -= next.value;
                }

              acc.push(`<div class="result mdl-shadow--2dp">
                                <img src="/F:/my web code/domo_image/${next.name}.jpg">
                                <span class="amount">X${count}</span>
                                </div>`)
                return acc;

            } else {
                return acc;
            }
        }, []);

        return change === 0 ? result : 'Insufficient cash in wallet';
    }

    let output = document.getElementById('output').innerHTML = checkCashRegister(price, cash, [["8rup", 8], ["", 14], ["PET", 35], ["10rupes", 100], ["DVADESET", 60], ["PEDESET", 50], ["STO", 100], ["DVESTA", 200], ["PETSTO", 500], ["HILJADU", 1000], ["DVE HILJADE", 2000], ["PET HILJADA", 10000]]);

})