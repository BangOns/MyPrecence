export const ValidationPrev = (PrevData, StatePrev) => {
  //   if (PrevData && StatePrev) {
  //     return false;
  //   } else if (PrevData && !StatePrev) {
  //     return false;
  //   } else if (!PrevData && StatePrev) {
  //     return true;
  //   } else {
  //     return true;
  //   }
  return PrevData && StatePrev
    ? false
    : PrevData && !StatePrev
    ? false
    : !PrevData && StatePrev
    ? true
    : true;
};
