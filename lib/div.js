'use strict';
const { forceString } = require('../utils/type-check');
const { forcePositiveString, normalize, shiftLeft } = require('../utils/utils');
const { abs, negate, sameSign } = require('../utils/signs');
const { eq, gt, ge } = require('../utils/compare');
const  sub = require('./sub');
const  { sum } = require('./sum');

const quotientRemainderPositive = (dividend, divisor) => {
  /*
   Example division: 290 / 15

   29|0 = 0  // digits larger, can subtract
   15

   14|0 = 1  // digits smaller, must shift
   15

   140| = 10  // digits are 140, can subtract 9 times
   15

   (9 subtractions omitted)

   5| = 19  // divisor is now larger than the dividend, we are done: [19, 5]
   15
   */

  forcePositiveString(dividend);
  forcePositiveString(divisor);

  if (eq(dividend, divisor)) {
    return [ "1", "0" ];
  }
  if (gt(divisor, dividend)) {
    return [ "0", normalize(dividend) ];
  }
  var quotient = "0";
  var remainingDigits = dividend.length - divisor.length;

  while(true) {
    var digits = dividend.slice(0, dividend.length - remainingDigits);

    // Subtract as long as possible and count the times
    while (ge(digits, divisor)) {
      digits = sub(digits, divisor);
      quotient = sum(quotient, "1");
    }
    dividend = digits + dividend.slice(dividend.length - remainingDigits);

    // Done already?
    if (gt(divisor, dividend)) { // holds (at the lastest) at remainingDigits === 0
      quotient = shiftLeft(quotient, remainingDigits);
      return [ quotient, normalize(dividend) ];
    }

    // Not done, shift
    remainingDigits--;
    quotient = shiftLeft(quotient, 1);
    if (remainingDigits < 0) {
      throw new Error("Illegal state");
    }
  }
};

module.exports = (dividend, divisor) => {
  forceString(dividend);
  forceString(divisor);

  var absResult = quotientRemainderPositive(abs(dividend), abs(divisor))[0];
  return (sameSign(dividend, divisor) ? absResult : negate(absResult));
};