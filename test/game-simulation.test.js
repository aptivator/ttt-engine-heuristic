import {expect}            from 'chai';
import {pickRandomElement} from '../src/_lib/utils';
import {ttt}               from '../src';

describe('two-player game simulation', () => {
  it('plays perfect player to beat lower-level player and to draw perfect players', () => {
    let results = {imperfect: {}, perfect: {}};
    let perfect = (board) => ttt(board, 'x');
    
    for(let level = 0; level <= 10; level++) {
      let imperfect = (board) => ttt(board, 'o', true, level);
      
      results.imperfect[level] = {wins: 0};
      results.perfect[level] = {wins: 0};
      
      for(let game = 0; game < 100; game++) {
        let startingPoint = pickRandomElement([0, 1]);

        let board = [
          null, null, null,
          null, null, null,
          null, null, null
        ];
        
        do {
          let player = startingPoint % 2 === 0 ? perfect : imperfect;
          let {move, ch, win, draw} = player(board);
          
          if(draw) {
            break;
          }
          
          if(win) {
            let playerType = ch === 'x' ? 'perfect' : 'imperfect';
            results[playerType][level].wins++;
            break;
          }
          
          board[move] = ch;
        } while(++startingPoint);
      }
    }

    expect(results.perfect[0].wins).to.be.above(results.imperfect[0].wins);
    expect(results.perfect[5].wins).to.be.above(results.imperfect[5].wins);
    expect(results.perfect[10].wins).to.equal(0);
    expect(results.imperfect[10].wins).to.equal(0);
  });
});
