async function calculateProfitLoss(positions) {
    let openPositions = [];
    let totalPositionValue = 0;
    let totalProfitLoss = 0;

    // Iterate through each position in the array
    for (const position of positions) {
        const { ticker, amount, averagePrice } = position;

        try {
            // Fetch the current price for the ticker
            const response = await fetch(`https://atlasapi-4oe2.onrender.com/quote?ticker=${ticker}`);
            if (!response.ok) {
                console.log(`Failed to fetch data for ${ticker}`);
                continue; // Skip this position and continue with the next one
            }

            const data = await response.json();

            if (!data || typeof data.price !== 'number') {
                console.log(`Invalid data received for ${ticker}`);
                continue; // Skip this position and continue with the next one
            }

            const currentPrice = data.price;

            // Calculate profit or loss for this position
            const positionValue = amount * currentPrice;
            const costBasis = amount * averagePrice;
            const profitLoss = positionValue - costBasis;

            // Add this position's profit or loss to the position object
            const positionWithPnL = {
                ...position,
                profitLoss,
                positionValue
            };

            // Add this position's value to the total position value
            totalPositionValue += positionValue;

            // Add this position's profit or loss to the total profit/loss
            totalProfitLoss += profitLoss;

            // Add this position to the openPositions array
            openPositions.push(positionWithPnL);
        } catch (error) {
            console.error(`Error processing position for ${ticker}: ${error.message}`);
        }
    }

    return { openPositions, totalPositionValue, totalProfitLoss };
}



const openPositions = [
    {
        "ticker" :"MSFT",
        "amount": 2,
        "averagePrice": 158.3
    },
    {
        "ticker" :"TSLA",
        "amount": 2,
        "averagePrice": 280.3
    },
];
async function calculate (openPositions){
    return await calculateProfitLoss(openPositions);
}
calculate(openPositions)
    .then(res => {

         console.log(res);
    })


