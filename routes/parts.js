const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {check, validationResult} = require('express-validator/check');

const User = require('../models/User');   // import user model
const Part = require('../models/Part');   // import contact model


// @route   GET api/contacts
// @desc    Get all user's contacts
// @access  Private
router.get('/', auth, async (req, res) => {
    try {
        const parts = await Part.find({user: req.user.id}).sort({date: -1});   //get array of most recent contacts
        res.json(parts);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error - try again');
    }
});



// @route   POST api/contacts
// @desc    Add new contact
// @access  Private
router.post('/', [auth, [
    check('name', 'Please enter a name').not().isEmpty()
    ]],
    async (req, res) => {
        const errors = validationResult(req);

        if(!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});    // give 400 and display error array detailing issues
        }

        const {name, url, imgUrl, price, type} = req.body;

        try {
            const newPart = new Part({
                name,
                url,
                imgUrl,
                price,
                type,
                user: req.user.id
            });

            const part = await newPart.save();   // puts new part into db
            res.json(part);                         

        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error - try again');
        }
    });



// @route   PUT api/parts/:id
// @desc    Update part
// @access  Private
router.put('/:id', auth, async (req, res) => {
    const {name, url, imgUrl, price, type} = req.body;

    // Build part object
    const partFields = {};
    if(name) partFields.name = name;             // if there is a name, add to partfields obj.
    if(url) partFields.url = url;
    partFields.imgUrl = imgUrl;             // always update imgUrl as have a default in place
    if(price) partFields.price = price;
    if(type) partFields.type = type;

    // Update part
    try {
        let part = await Part.findById(req.params.id);            // find the part by id (url above)
    
        if(!part) return res.status(404).json({msg: 'Part not found'});  // if part not found

        // Ensure user owns the part they are editing, if not...
        if (part.user.toString() !== req.user.id) {
            return res.status(401).json({msg: 'Unauthorised access to this part'});
        }

        // Update part

        part = await Part.findByIdAndUpdate(req.params.id,       // pass in part id and fields
            {$set: partFields},
            {new: true});                       // if part doesn't exist, create it
        
            res.json(part);

    } catch (err) {
        console.error(err.message);
            res.status(500).send('Server error - try again');
    };


});




// @route   DELETE api/parts/:id
// @desc    Delete part
// @access  Private
router.delete('/:id', auth, async (req, res) => {
    try {
        let part = await Part.findById(req.params.id);            // find the part by id (url above)
    
        if(!part) return res.status(404).json({msg: 'Part not found'});  // if part not found

        // Ensure user owns the part they are deleting, if not...
        if (part.user.toString() !== req.user.id) {
            return res.status(401).json({msg: 'Unauthorised access to this part'});
        }

        // Delete part
        await Part.findByIdAndRemove(req.params.id);         // find part by id and remove
        
        res.json({msg: 'Part deleted'});                     

    } catch (err) {
        console.error(err.message);
            res.status(500).send('Server error - try again');
    };

});

module.exports = router;