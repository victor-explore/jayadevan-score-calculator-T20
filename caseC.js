/**
 * Initializes the Case C calculator by setting up event listeners for target calculation
 * Case C handles interruption during team 1's innings
 */
function initializeCaseCCalculator() {
    // Get input elements from the DOM
    const team1ScoreInput = document.getElementById('team1-score');
    const team1WicketsInput = document.getElementById('team1-wickets'); 
    const oversPlayedInput = document.getElementById('overs-played-before-interruption');
    const oversLostInput = document.getElementById('overs-lost-due-to-interruption');
    const finalScoreInput = document.getElementById('final-score-after-interruption');
    const updatedTargetInput = document.getElementById('updated-target');

    // Add event listeners to inputs that trigger calculation
    [team1ScoreInput, team1WicketsInput, oversPlayedInput, 
     oversLostInput, finalScoreInput].forEach(input => {
        input.addEventListener('input', calculateCaseCTarget);
    });

    /**
     * Calculates the target score for team 2 based on team 1's final score
     * Uses the Jayadevan method to determine a fair target
     */
    function calculateCaseCTarget() {
        // Validate inputs
        if (!team1ScoreInput.value || !team1WicketsInput.value || 
            !oversPlayedInput.value || !oversLostInput.value || !finalScoreInput.value) {
            updatedTargetInput.value = '';
            return;
        }

        // Get input values
        const team1Score = parseInt(team1ScoreInput.value);
        const wicketsLost = parseInt(team1WicketsInput.value);
        const oversPlayed = parseFloat(oversPlayedInput.value);
        const oversLost = parseFloat(oversLostInput.value);
        const finalScore = parseInt(finalScoreInput.value);

        // Validate numeric constraints
        if (wicketsLost > 10 || oversPlayed > 20 || oversLost > 20 || 
            oversPlayed < 0 || oversLost < 0 || team1Score < 0 || finalScore < 0) {
            updatedTargetInput.value = '';
            return;
        }

        // Calculate target using Jayadevan method
        // Calculate percentage of overs played before interruption (out of 20 overs)
        const percentageOversPlayedAtInterruption = (oversPlayed / 20) * 100;
 
        let percentageNormalScore; // Variable to store percentage normal score based on wickets lost // 
        
        switch(wicketsLost) { // Switch statement to handle different wicket loss cases //
            case 0: // Case for 0 wickets lost //
                const percentageNormalScoreTable0Wickets = { // Lookup table for 0 wickets percentage normal score //
                    1: 0.8, 2: 1.6, 3: 2.6, 4: 3.5, 5: 4.4, 6: 5.3, 7: 6.2, 8: 7.0, 9: 7.9, 10: 8.8,
                    11: 9.6, 12: 10.5, 13: 11.3, 14: 12.1, 15: 12.9, 16: 13.7, 17: 14.6, 18: 15.4, 19: 16.2, 20: 16.9,
                    21: 17.7, 22: 18.5, 23: 19.3, 24: 20.1, 25: 20.8, 26: 21.6, 27: 22.4, 28: 23.1, 29: 23.9, 30: 24.7,
                    31: 25.4, 32: 26.2, 33: 27.0, 34: 27.7, 35: 28.5, 36: 29.3, 37: 30.0, 38: 30.8, 39: 31.6, 40: 32.4,
                    41: 33.2, 42: 33.9, 43: 34.7, 44: 35.5, 45: 36.3, 46: 37.1, 47: 37.9, 48: 38.8, 49: 39.6, 50: 40.4,
                    51: 41.3, 52: 42.1, 53: 43.0, 54: 43.8, 55: 44.7, 56: 45.6, 57: 46.5, 58: 47.4, 59: 48.3, 60: 49.2,
                    61: 50.2, 62: 51.1, 63: 52.1, 64: 53.0, 65: 54.0, 66: 55.0, 67: 56.1, 68: 57.1, 69: 58.1, 70: 59.2,
                    71: 60.3, 72: 61.4, 73: 62.5, 74: 63.6, 75: 64.7, 76: 65.9, 77: 67.1, 78: 68.3, 79: 69.5, 80: 70.7,
                    81: 72.0, 82: 73.2, 83: 74.5, 84: 75.8, 85: 77.2, 86: 78.6, 87: 79.9, 88: 81.3, 89: 82.7, 90: 84.1,
                    91: 85.5, 92: 87.0, 93: 88.5, 94: 90.0, 95: 91.6, 96: 93.2, 97: 94.8, 98: 96.5, 99: 98.2, 100: 100
                }; // Lookup table mapping percentage overs to percentage normal score for 0 wickets //
                percentageNormalScore = percentageNormalScoreTable0Wickets[Math.round(percentageOversPlayedAtInterruption)] || 0; // Get percentage normal score from lookup table based on overs played percentage //
                break;
            case 1: // Case for 1 wicket lost //
                const percentageNormalScoreTable1Wicket = { // Lookup table for 1 wicket percentage normal score //
                    1: 10, 2: 10, 3: 10, 4: 10, 5: 10, 6: 10, 7: 10, 8: 10, 9: 10, 10: 10,
                    11: 10, 12: 10.57, 13: 11.59, 14: 12.61, 15: 13.63, 16: 14.65, 17: 15.66, 18: 16.68, 19: 17.69, 20: 18.71,
                    21: 19.73, 22: 20.74, 23: 21.76, 24: 22.78, 25: 23.79, 26: 24.81, 27: 25.82, 28: 26.84, 29: 27.86, 30: 28.87,
                    31: 29.89, 32: 30.90, 33: 31.92, 34: 32.94, 35: 33.95, 36: 34.97, 37: 35.98, 38: 37.00, 39: 38.02, 40: 39.03,
                    41: 40.05, 42: 41.07, 43: 42.08, 44: 43.10, 45: 44.11, 46: 45.13, 47: 46.15, 48: 47.16, 49: 48.18, 50: 49.19,
                    51: 50.21, 52: 51.23, 53: 52.24, 54: 53.26, 55: 54.27, 56: 55.29, 57: 56.31, 58: 57.32, 59: 58.34, 60: 59.36,
                    61: 60.37, 62: 61.39, 63: 62.40, 64: 63.42, 65: 64.44, 66: 65.45, 67: 66.47, 68: 67.48, 69: 68.50, 70: 69.52,
                    71: 70.53, 72: 71.55, 73: 72.56, 74: 73.58, 75: 74.60, 76: 75.61, 77: 76.63, 78: 77.65, 79: 78.66, 80: 79.68,
                    81: 80.69, 82: 81.71, 83: 82.73, 84: 83.74, 85: 84.76, 86: 85.77, 87: 86.79, 88: 87.81, 89: 88.82, 90: 89.84,
                    91: 90.85, 92: 91.87, 93: 92.89, 94: 93.90, 95: 94.92, 96: 95.94, 97: 96.95, 98: 97.97, 99: 98.98, 100: 100
                }; // Lookup table mapping percentage overs to percentage normal score for 1 wicket //
                percentageNormalScore = percentageNormalScoreTable1Wicket[Math.round(percentageOversPlayedAtInterruption)] || 0; // Get percentage normal score from lookup table based on overs played percentage //
                break;
            case 2: // Case for 2 wickets lost //
                const percentageNormalScoreTable2Wickets = { // Lookup table for 2 wickets percentage normal score //
                    1: 20, 2: 20, 3: 20, 4: 20, 5: 20, 6: 20, 7: 20, 8: 20, 9: 20, 10: 20,
                    11: 20, 12: 20, 13: 20, 14: 20, 15: 20, 16: 20, 17: 20, 18: 20, 19: 20, 20: 20,
                    21: 20, 22: 20.75, 23: 21.77, 24: 22.79, 25: 23.81, 26: 24.83, 27: 25.84, 28: 26.86, 29: 27.86, 30: 28.89,
                    31: 29.91, 32: 30.92, 33: 31.94, 34: 32.95, 35: 33.95, 36: 34.98, 37: 36, 38: 37.02, 39: 38.03, 40: 39.05,
                    41: 40.06, 42: 41.08, 43: 42.1, 44: 43.11, 45: 44.13, 46: 45.14, 47: 46.16, 48: 47.17, 49: 48.19, 50: 49.21,
                    51: 50.22, 52: 51.24, 53: 52.25, 54: 53.27, 55: 54.29, 56: 55.3, 57: 56.32, 58: 57.33, 59: 58.35, 60: 59.37,
                    61: 60.38, 62: 61.4, 63: 62.41, 64: 63.43, 65: 64.44, 66: 65.46, 67: 66.48, 68: 67.49, 69: 68.51, 70: 69.52,
                    71: 70.54, 72: 71.56, 73: 72.57, 74: 73.59, 75: 74.6, 76: 75.62, 77: 76.64, 78: 77.65, 79: 78.67, 80: 79.68,
                    81: 80.7, 82: 81.71, 83: 82.73, 84: 83.75, 85: 84.76, 86: 85.78, 87: 86.79, 88: 87.81, 89: 88.83, 90: 89.84,
                    91: 90.86, 92: 91.87, 93: 92.89, 94: 93.9, 95: 94.92, 96: 95.94, 97: 96.95, 98: 97.97, 99: 98.98, 100: 100
                }; // Lookup table mapping percentage overs to percentage normal score for 2 wickets //
                percentageNormalScore = percentageNormalScoreTable2Wickets[Math.round(percentageOversPlayedAtInterruption)] || 0; // Get percentage normal score from lookup table based on overs played percentage //
                break;
            case 3: // Case for 3 wickets lost //
                const percentageNormalScoreTable3Wickets = { // Lookup table for 3 wickets percentage normal score //
                    1: 35, 2: 35, 3: 35, 4: 35, 5: 35, 6: 35, 7: 35, 8: 35, 9: 35, 10: 35,
                    11: 35, 12: 35, 13: 35, 14: 35, 15: 35, 16: 35, 17: 35, 18: 35, 19: 35, 20: 35,
                    21: 35, 22: 35, 23: 35, 24: 35, 25: 35, 26: 35, 27: 35, 28: 35, 29: 35, 30: 35,
                    31: 35, 32: 35, 33: 35, 34: 35, 35: 35, 36: 35, 37: 35, 38: 37.02, 39: 38.03, 40: 39.05,
                    41: 40.06, 42: 41.08, 43: 42.1, 44: 43.11, 45: 44.13, 46: 45.14, 47: 46.16, 48: 47.17, 49: 48.19, 50: 49.21,
                    51: 50.22, 52: 51.24, 53: 52.25, 54: 53.27, 55: 54.29, 56: 55.3, 57: 56.32, 58: 57.33, 59: 58.35, 60: 59.37,
                    61: 60.38, 62: 61.4, 63: 62.41, 64: 63.43, 65: 64.44, 66: 65.46, 67: 66.48, 68: 67.49, 69: 68.51, 70: 69.52,
                    71: 70.54, 72: 71.56, 73: 72.57, 74: 73.59, 75: 74.6, 76: 75.62, 77: 76.64, 78: 77.65, 79: 78.67, 80: 79.68,
                    81: 80.7, 82: 81.71, 83: 82.73, 84: 83.75, 85: 84.76, 86: 85.78, 87: 86.79, 88: 87.81, 89: 88.83, 90: 89.84,
                    91: 90.86, 92: 91.87, 93: 92.89, 94: 93.9, 95: 94.92, 96: 95.94, 97: 96.95, 98: 97.97, 99: 98.98, 100: 100
                }; // Lookup table mapping percentage overs to percentage normal score for 3 wickets //
                percentageNormalScore = percentageNormalScoreTable3Wickets[Math.round(percentageOversPlayedAtInterruption)] || 0; // Get percentage normal score from lookup table based on overs played percentage //
                break;
            case 4: // Case for 4 wickets lost //
                const percentageNormalScoreTable4Wickets = { // Lookup table for 4 wickets percentage normal score //
                    1: 50, 2: 50, 3: 50, 4: 50, 5: 50, 6: 50, 7: 50, 8: 50, 9: 50, 10: 50,
                    11: 50, 12: 50, 13: 50, 14: 50, 15: 50, 16: 50, 17: 50, 18: 50, 19: 50, 20: 50,
                    21: 50, 22: 50, 23: 50, 24: 50, 25: 50, 26: 50, 27: 50, 28: 50, 29: 50, 30: 50,
                    31: 50, 32: 50, 33: 50, 34: 50, 35: 50, 36: 50, 37: 50, 38: 50, 39: 50, 40: 50,
                    41: 50, 42: 50, 43: 50, 44: 50, 45: 50, 46: 50, 47: 50, 48: 50, 49: 50, 50: 50,
                    51: 50, 52: 50, 53: 52.25, 54: 53.27, 55: 54.29, 56: 55.3, 57: 56.32, 58: 57.33, 59: 58.35, 60: 59.37,
                    61: 60.38, 62: 61.4, 63: 62.41, 64: 63.43, 65: 64.44, 66: 65.46, 67: 66.48, 68: 67.49, 69: 68.51, 70: 69.52,
                    71: 70.54, 72: 71.56, 73: 72.57, 74: 73.59, 75: 74.6, 76: 75.62, 77: 76.64, 78: 76.79, 79: 78.67, 80: 79.68,
                    81: 80.7, 82: 81.71, 83: 82.73, 84: 83.75, 85: 84.76, 86: 85.78, 87: 86.79, 88: 87.81, 89: 88.83, 90: 89.84,
                    91: 90.86, 92: 91.87, 93: 92.89, 94: 93.9, 95: 94.92, 96: 95.94, 97: 96.95, 98: 97.97, 99: 98.98, 100: 100
                }; // Lookup table mapping percentage overs to percentage normal score for 4 wickets //
                percentageNormalScore = percentageNormalScoreTable4Wickets[Math.round(percentageOversPlayedAtInterruption)] || 0; // Get percentage normal score from lookup table based on overs played percentage //
                break;
            case 5: // Case for 5 wickets lost //
                const percentageNormalScoreTable5Wickets = { // Lookup table for 5 wickets percentage normal score //
                    1: 60, 2: 60, 3: 60, 4: 60, 5: 60, 6: 60, 7: 60, 8: 60, 9: 60, 10: 60,
                    11: 60, 12: 60, 13: 60, 14: 60, 15: 60, 16: 60, 17: 60, 18: 60, 19: 60, 20: 60,
                    21: 60, 22: 60, 23: 60, 24: 60, 25: 60, 26: 60, 27: 60, 28: 60, 29: 60, 30: 60,
                    31: 60, 32: 60, 33: 60, 34: 60, 35: 60, 36: 60, 37: 60, 38: 60, 39: 60, 40: 60,
                    41: 60, 42: 60, 43: 60, 44: 60, 45: 60, 46: 60, 47: 60, 48: 60, 49: 60, 50: 60,
                    51: 60, 52: 60, 53: 60, 54: 60, 55: 60, 56: 60, 57: 60, 58: 60, 59: 60, 60: 60,
                    61: 60, 62: 60, 63: 60, 64: 63.43, 65: 64.44, 66: 65.46, 67: 66.48, 68: 67.49, 69: 68.51, 70: 69.52,
                    71: 70.54, 72: 71.56, 73: 72.57, 74: 73.59, 75: 74.6, 76: 75.62, 77: 76.64, 78: 76.79, 79: 78.67, 80: 79.68,
                    81: 80.7, 82: 81.71, 83: 82.73, 84: 83.75, 85: 84.76, 86: 85.78, 87: 86.79, 88: 87.81, 89: 88.83, 90: 89.84,
                    91: 90.86, 92: 91.87, 93: 92.89, 94: 93.9, 95: 94.92, 96: 95.94, 97: 96.95, 98: 97.97, 99: 98.98, 100: 100
                }; // Lookup table mapping percentage overs to percentage normal score for 5 wickets //
                percentageNormalScore = percentageNormalScoreTable5Wickets[Math.round(percentageOversPlayedAtInterruption)] || 0; // Get percentage normal score from lookup table based on overs played percentage //
                break;
            case 6: // Case for 6 wickets lost //
                const percentageNormalScoreTable6Wickets = { // Lookup table for 6 wickets percentage normal score //
                    1: 70, 2: 70, 3: 70, 4: 70, 5: 70, 6: 70, 7: 70, 8: 70, 9: 70, 10: 70,
                    11: 70, 12: 70, 13: 70, 14: 70, 15: 70, 16: 70, 17: 70, 18: 70, 19: 70, 20: 70,
                    21: 70, 22: 70, 23: 70, 24: 70, 25: 70, 26: 70, 27: 70, 28: 70, 29: 70, 30: 70,
                    31: 70, 32: 70, 33: 70, 34: 70, 35: 70, 36: 70, 37: 70, 38: 70, 39: 70, 40: 70,
                    41: 70, 42: 70, 43: 70, 44: 70, 45: 70, 46: 70, 47: 70, 48: 70, 49: 70, 50: 70,
                    51: 70, 52: 70, 53: 70, 54: 70, 55: 70, 56: 70, 57: 70, 58: 70, 59: 70, 60: 70,
                    61: 70, 62: 70, 63: 70, 64: 70, 65: 70, 66: 70, 67: 70, 68: 70, 69: 70, 70: 70,
                    71: 70.54, 72: 71.56, 73: 72.57, 74: 73.59, 75: 74.6, 76: 75.62, 77: 76.64, 78: 76.79, 79: 78.67, 80: 79.68,
                    81: 80.7, 82: 81.71, 83: 82.73, 84: 83.75, 85: 84.76, 86: 85.78, 87: 86.79, 88: 87.81, 89: 88.83, 90: 89.84,
                    91: 90.86, 92: 91.87, 93: 92.89, 94: 93.9, 95: 94.92, 96: 95.94, 97: 96.95, 98: 97.97, 99: 98.98, 100: 100
                }; // Lookup table mapping percentage overs to percentage normal score for 6 wickets //
                percentageNormalScore = percentageNormalScoreTable6Wickets[Math.round(percentageOversPlayedAtInterruption)] || 0; // Get percentage normal score from lookup table based on overs played percentage //
                break;
            case 7: // Case for 7 wickets lost //
                const percentageNormalScoreTable7Wickets = { // Lookup table for 7 wickets percentage normal score //
                    1: 79, 2: 79, 3: 79, 4: 79, 5: 79, 6: 79, 7: 79, 8: 79, 9: 79, 10: 79,
                    11: 79, 12: 79, 13: 79, 14: 79, 15: 79, 16: 79, 17: 79, 18: 79, 19: 79, 20: 79,
                    21: 79, 22: 79, 23: 79, 24: 79, 25: 79, 26: 79, 27: 79, 28: 79, 29: 79, 30: 79,
                    31: 79, 32: 79, 33: 79, 34: 79, 35: 79, 36: 79, 37: 79, 38: 79, 39: 79, 40: 79,
                    41: 79, 42: 79, 43: 79, 44: 79, 45: 79, 46: 79, 47: 79, 48: 79, 49: 79, 50: 79,
                    51: 79, 52: 79, 53: 79, 54: 79, 55: 79, 56: 79, 57: 79, 58: 79, 59: 79, 60: 79,
                    61: 79, 62: 79, 63: 79, 64: 79, 65: 79, 66: 79, 67: 79, 68: 79, 69: 79, 70: 79,
                    71: 79, 72: 79, 73: 79, 74: 79, 75: 79, 76: 79, 77: 79, 78: 79, 79: 79, 80: 79.68,
                    81: 80.7, 82: 81.71, 83: 82.73, 84: 83.75, 85: 84.76, 86: 85.78, 87: 86.79, 88: 87.81, 89: 88.83, 90: 89.84,
                    91: 90.86, 92: 91.87, 93: 92.89, 94: 93.9, 95: 94.92, 96: 95.94, 97: 96.95, 98: 97.97, 99: 98.98, 100: 100
                }; // Lookup table mapping percentage overs to percentage normal score for 7 wickets //
                percentageNormalScore = percentageNormalScoreTable7Wickets[Math.round(percentageOversPlayedAtInterruption)] || 0; // Get percentage normal score from lookup table based on overs played percentage //
                break;
            case 8: // Case for 8 wickets lost //
                const percentageNormalScoreTable8Wickets = { // Lookup table for 8 wickets percentage normal score //
                    1: 87, 2: 87, 3: 87, 4: 87, 5: 87, 6: 87, 7: 87, 8: 87, 9: 87, 10: 87,
                    11: 87, 12: 87, 13: 87, 14: 87, 15: 87, 16: 87, 17: 87, 18: 87, 19: 87, 20: 87,
                    21: 87, 22: 87, 23: 87, 24: 87, 25: 87, 26: 87, 27: 87, 28: 87, 29: 87, 30: 87,
                    31: 87, 32: 87, 33: 87, 34: 87, 35: 87, 36: 87, 37: 87, 38: 87, 39: 87, 40: 87,
                    41: 87, 42: 87, 43: 87, 44: 87, 45: 87, 46: 87, 47: 87, 48: 87, 49: 87, 50: 87,
                    51: 87, 52: 87, 53: 87, 54: 87, 55: 87, 56: 87, 57: 87, 58: 87, 59: 87, 60: 87,
                    61: 87, 62: 87, 63: 87, 64: 87, 65: 87, 66: 87, 67: 87, 68: 87, 69: 87, 70: 87,
                    71: 87, 72: 87, 73: 87, 74: 87, 75: 87, 76: 87, 77: 87, 78: 87, 79: 87, 80: 87,
                    81: 87, 82: 87, 83: 87, 84: 87, 85: 87, 86: 87, 87: 87, 88: 87.81, 89: 88.83, 90: 89.84,
                    91: 90.86, 92: 91.87, 93: 92.89, 94: 93.9, 95: 94.92, 96: 95.94, 97: 96.95, 98: 97.97, 99: 98.98, 100: 100
                }; // Lookup table mapping percentage overs to percentage normal score for 8 wickets //
                percentageNormalScore = percentageNormalScoreTable8Wickets[Math.round(percentageOversPlayedAtInterruption)] || 0; // Get percentage normal score from lookup table based on overs played percentage //
                break;
            case 9: // Case for 9 wickets lost //
                const percentageNormalScoreTable9Wickets = { // Lookup table for 9 wickets percentage normal score //
                    1: 95, 2: 95, 3: 95, 4: 95, 5: 95, 6: 95, 7: 95, 8: 95, 9: 95, 10: 95,
                    11: 95, 12: 95, 13: 95, 14: 95, 15: 95, 16: 95, 17: 95, 18: 95, 19: 95, 20: 95,
                    21: 95, 22: 95, 23: 95, 24: 95, 25: 95, 26: 95, 27: 95, 28: 95, 29: 95, 30: 95,
                    31: 95, 32: 95, 33: 95, 34: 95, 35: 95, 36: 95, 37: 95, 38: 95, 39: 95, 40: 95,
                    41: 95, 42: 95, 43: 95, 44: 95, 45: 95, 46: 95, 47: 95, 48: 95, 49: 95, 50: 95,
                    51: 95, 52: 95, 53: 95, 54: 95, 55: 95, 56: 95, 57: 95, 58: 95, 59: 95, 60: 95,
                    61: 95, 62: 95, 63: 95, 64: 95, 65: 95, 66: 95, 67: 95, 68: 95, 69: 95, 70: 95,
                    71: 95, 72: 95, 73: 95, 74: 95, 75: 95, 76: 95, 77: 95, 78: 95, 79: 95, 80: 95,
                    81: 95, 82: 95, 83: 95, 84: 95, 85: 95, 86: 95, 87: 95, 88: 95, 89: 95, 90: 95,
                    91: 95, 92: 95, 93: 95, 94: 95, 95: 95, 96: 95.94, 97: 96.95, 98: 97.97, 99: 98.98, 100: 100
                }; // Lookup table mapping percentage overs to percentage normal score for 9 wickets //
                percentageNormalScore = percentageNormalScoreTable9Wickets[Math.round(percentageOversPlayedAtInterruption)] || 0; // Get percentage normal score from lookup table based on overs played percentage //
                break;
            default: // Default case for invalid wicket count //
                percentageNormalScore = 0; // Set default value for invalid cases //
        }

        const remainingOvers = 20 - oversPlayed;
        const remainingOversPercentage = ((remainingOvers - oversLost) / remainingOvers) * 100;
        
        const percentageRemainingOversTable = { // Lookup table mapping percentage remaining overs to target percentage //
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
            96: 96.81462177, 97: 97.67369272, 98: 98.52995382, 99: 99.38340883, 100: 100
        }; // Lookup table for mapping percentage remaining overs to corresponding target percentage //
        const correspondingTargetPercentage = percentageRemainingOversTable[Math.round(remainingOversPercentage)] || 0; // Get corresponding target percentage from lookup table based on remaining overs percentage
        const ENS = percentageNormalScore + (((100 - percentageNormalScore)*correspondingTargetPercentage)/100);
        const targetScorePercentageOvers = ((20 - oversLost)/20)*100;
        const targetScorePercentagefortargetScorePercentageOvers = percentageRemainingOversTable[Math.round(targetScorePercentageOvers)] || 0;
        const MF = targetScorePercentagefortargetScorePercentageOvers/ENS;
        const target = MF*finalScore;
        // Update target output
        //updatedTargetInput.value = target;
        updatedTargetInput.value = target;

        
    }
}

// Initialize the calculator when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', initializeCaseCCalculator);
