/**
 * Initializes the Case A calculator by setting up event listeners for target calculation
 * Case A handles interruption after team 1 completes innings but before team 2 begins
 */
function initializeCaseACalculator() {
    // Get input elements from the DOM // Get required input fields
    const team1ScoreInput = document.getElementById('team1-score'); // Input for team 1's score
    const oversRemainingInput = document.getElementById('overs-remaining-after-interruption'); // Input for remaining overs after interruption
    const updatedTargetInput = document.getElementById('updated-target'); // Output field for updated target

    // Add event listeners to inputs that trigger calculation
    [team1ScoreInput, oversRemainingInput].forEach(input => {
        input.addEventListener('input', calculateCaseATarget); // Add input event listeners to recalculate on change
    });

    /**
     * Calculates the target score for Case A using the Jayadevan method
     * Formula: Target = (Team 1 score * Available overs percentage) + 1
     */
    function calculateCaseATarget() {
        const team1Score = parseInt(team1ScoreInput.value); // Get team 1's score as integer
        const remainingOvers = parseFloat(oversRemainingInput.value); // Get remaining overs as float
        const totalOvers = 20; // T20 match has 20 overs total

        // Validate inputs before calculation
        if (isNaN(team1Score) || isNaN(remainingOvers) || 
            remainingOvers <= 0 || remainingOvers > totalOvers) {
            updatedTargetInput.value = ''; // Clear target if inputs invalid
            return;
        }

        // Calculate target using Jayadevan method
        const PercentageCumulativeOvers = Math.round((remainingOvers / totalOvers) * 100); // Calculate percentage of overs as integer between 1-100
        // Create lookup table for percentage cumulative runs based on overs percentage
        const percentageRunsTable = {
            1: 1.837095027, 2: 2.980201116, 3: 4.120141111, 4: 5.256918762, 5: 6.39053782,
            6: 7.521002034, 7: 8.648315155, 8: 9.772480932, 9: 10.89350312, 10: 12.01138545,
            11: 13.1261317, 12: 14.2377456, 13: 15.34623091, 14: 16.45159138, 15: 17.55383075,
            16: 18.65295278, 17: 19.74896121, 18: 20.8418598, 19: 21.9316523, 20: 23.01834245,
            21: 24.10193402, 22: 25.18243073, 23: 26.25983635, 24: 27.33415463, 25: 28.40538932,
            26: 29.47354416, 27: 30.53862291, 28: 31.60062932, 29: 32.65956713, 30: 33.71544009,
            31: 34.76825197, 32: 35.8180065, 33: 36.86470744, 34: 37.90835853, 35: 38.94896353,
            36: 39.98652619, 37: 41.02105025, 38: 42.05253947, 39: 43.08099759, 40: 44.10642837,
            41: 45.12883556, 42: 46.14822291, 43: 47.16459416, 44: 48.17795307, 45: 49.18830338,
            46: 50.19564885, 47: 51.19999323, 48: 52.20134026, 49: 53.1996937, 50: 54.19505729,
            51: 55.1874348, 52: 56.17682996, 53: 57.16324652, 54: 58.14668824, 55: 59.12715887,
            56: 60.10466215, 57: 61.07920184, 58: 62.05078169, 59: 63.01940545, 60: 63.98507685,
            61: 64.94779967, 62: 65.90757764, 63: 66.86441452, 64: 67.81831406, 65: 68.76928,
            66: 69.7173161, 67: 70.6624261, 68: 71.60461376, 69: 72.54388283, 70: 73.48023705,
            71: 74.41368019, 72: 75.34421597, 73: 76.27184816, 74: 77.19658051, 75: 78.11841677,
            76: 79.03736068, 77: 79.953416, 78: 80.86658648, 79: 81.77687586, 80: 82.68428789,
            81: 83.58882634, 82: 84.49049494, 83: 85.38929745, 84: 86.28523761, 85: 87.17831918,
            86: 88.06854591, 87: 88.95592154, 88: 89.84044983, 89: 90.72213452, 90: 91.60097937,
            91: 92.47698813, 92: 93.35016455, 93: 94.22051237, 94: 95.08803535, 95: 95.95273723,
            96: 96.81462177, 97: 97.67369272, 98: 98.52995382, 99: 99.38340883, 100: 100.0
        }; // Lookup table mapping overs percentage to runs percentage

        const percentageRunsForOvers = percentageRunsTable[PercentageCumulativeOvers] || 0; // Get corresponding runs percentage from table
        const target = Math.ceil((team1Score * (percentageRunsForOvers/100)) + 1); // Calculate target using Jayadevan method with percentage runs

        updatedTargetInput.value = target; // Display calculated target
    }
}

// Initialize the calculator when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', initializeCaseACalculator); // Start calculator on page load