const router = require('express').Router();

router.get('/',function(req, res){
res.render('main/about');
});

router.get('/about',function(req, res){
res.render('partials/boilerplates');
});

module.exports = router;