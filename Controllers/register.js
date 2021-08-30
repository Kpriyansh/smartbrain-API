const handleRegister = (req, res, bcrypt, db) => {
    const hashedPassword = bcrypt.hashSync(req.body.password, 10);
    if(!req.body.password||!req.body.name||!req.body.email){
        return res.status(400).json('Invalid');
    }
    db.transaction(trx => {

        trx.insert({
            name: req.body.name,
            email: req.body.email,
            joined: new Date()

        })
            .into('users')
            .returning('*')
            .then((data) => {
                // console.log(data[0].email);
                return db('login')
                    .insert({
                        email: data[0].email,
                        hash: hashedPassword
                    })

                    .returning('*')
                    .then(response => {
                        // console.log(data[0]);
                        // console.log(response);
                        res.json(data[0]);
                    })
                    .catch(err => res.status(400).json('Invalid'))
            })
            .then(trx.commit)
            .catch(trx.rollback)
    })
        .catch(err => res.status(400).json('Invalid'));
}

module.exports = {
    handleRegister:handleRegister
}