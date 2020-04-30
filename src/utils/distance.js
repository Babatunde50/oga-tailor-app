import distanceFrom from 'distance-from';

const distanceDiff = (d1, d2) => distanceFrom(d1).to(d2).in('mi')

export default distanceDiff;