'use strict';

module.exports = function (Stock) {
    Stock.observe('before save', function computePercentage(ctx, next) {
        console.log("context", ctx)
        /*if (ctx.instance) {
            ctx.instance.percentage = 100 * ctx.instance.part / ctx.instance.total;
        } else if (ctx.data.part && ctx.data.total) {
            ctx.data.percentage = 100 * ctx.data.part / ctx.data.total;
        } else if (ctx.data.part || ctx.data.total) {
            // either report an error or fetch the missing properties from DB
        }*/
        next();
    });
};
