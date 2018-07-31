module.exports = async (ctx, next) => {
  let lat = ctx.query.lat;
  let lon = ctx.query.lon;
  ctx.body = {
    code: 1,
    msg: 'test ok',
    lat: lat,
    lon: lon
  }
}