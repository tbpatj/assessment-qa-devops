const {shuffleArray} = require('./utils')
const {bots, playerRecord} = require('./data')

describe('shuffleArray should', () => {
    // CODE HERE
    let testArr = [1,2,3,4,5];
    let shuffledArr = shuffleArray(testArr);
    it("check if the array is indeed shuffled", () =>{
        expect(shuffleArray).not.toEqual(testArr)
    });
    it("check if the shuffled arr is the same length", () => {
        expect(shuffledArr).toHaveLength(testArr.length);
    });
    it("check if the shuffled arr still contains all the previous arrgs", () => {
        shuffledArr.sort();
        expect(shuffledArr).toEqual(testArr);
    });
    
})