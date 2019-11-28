const exists = num => !Number.isNaN(num);


const Elo = {
  probibility: function (r1, r2, d = 400) {
    return (1 / (1 + Math.pow(10, ((r2 - r1) / d))));
  },
  calculateProbibility: function (r1, r2, d = 400) {
    const EofR1 = this.probibility(r1, r2, d);
    const EofR2 = this.probibility(r2, r1, d);

    return [EofR1, EofR2];
  },
  rating: function (rating, K, S, EofA) {
    const r = Number(rating) + Number(K * (S - EofA));
    return Number(r.toFixed());
  },
  calculateRatings: function (A, B, K, SofA, SofB, EofA, EofB, d = 400) {
    const EA = EofA || this.probibility(A, B, d);
    const EB = EofB || this.probibility(B, A, d);
    const Rp1 = this.rating(A, K, SofA, EA);
    const Rp2 = this.rating(B, K, SofB, EB);
    return [
      {
        prevRating: A,
        rating: Rp1,
        diff: Rp1 - A,
        prob: EA,
      },
      {
        prevRating: B,
        rating: Rp2,
        diff: Rp2 - B,
        prob: EB,
      },
    ];
  }
};

module.exports = Elo;
